"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { completeBooking } from "@/lib/bookings";
import { updateBookingStatus } from "@/lib/bookings";
import { enforceActiveSlots } from "@/lib/bookings";


export async function completeBookingAction(formData: FormData) {
  const bookingId = formData.get("bookingId");

  console.log("ACTION RAW ID:", bookingId);
  console.log("TYPE:", typeof bookingId);

  await completeBooking(bookingId as string);
  await enforceActiveSlots();

  revalidatePath("/mechanic");
}

export async function updateStatusAction(formData: FormData) {
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;

  await updateBookingStatus(id, status);
}

export async function createBooking(input: {
  userId: string;
  bikeMake: string;
  bikeModel: string;
  registration: string;
  contact: string;
  reason: string;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

const { count, error: countError } = await supabase
  .from("bookings")
  .select("*", {
    count: "exact",
    head: true,
  })
  .eq("status", "active");

if (countError) throw countError;

const status = (count ?? 0) < 4
  ? "active"
  : "waitlist";

  console.log("AUTH USER:", user?.id);
  console.log("INSERT USER:", input.userId);


  if (!user) {
    throw new Error("User not authenticated")
  }

  console.log({
    user_id: user.id,
    bike_make: input.bikeMake,
    bike_model: input.bikeModel,
    registration: input.registration,
  })

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      user_id: user.id,
      bike_make: input.bikeMake,
      bike_model: input.bikeModel,
      registration: input.registration,
      reason: input.reason,
      status,
    })
    .select();
console.log("ACTIVE COUNT:", count);
console.log("NEW STATUS:", status);
  if (error) throw error;

  return data;
}