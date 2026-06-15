"use server";

import { revalidatePath } from "next/cache";
import {
  completeBooking,
} from "@/lib/bookings";
import { transitionBookingStatus } from "@/lib/bookings/status";
import { WORKFLOW_STATES } from "@/lib/bookings/status";
import type { BookingStatus } from "@/lib/bookings/status";
import {
  enforceActiveSlots,
} from "@/lib/bookings/queue";

import {
  deleteBooking,
} from "@/lib/bookings/queries";



function isBookingStatus(value: string): value is BookingStatus {
  return (WORKFLOW_STATES as readonly string[]).includes(value);
}

export async function updateStatusAction(formData: FormData) {
  const id = formData.get("id") as string;
 const rawStatus = formData.get("status");

 if (typeof rawStatus !== "string") {
   throw new Error("Invalid status");
 }

 if (!isBookingStatus(rawStatus)) {
   throw new Error("Invalid booking status");
 }

 await transitionBookingStatus(id, rawStatus);
  await enforceActiveSlots();

  revalidatePath("/mechanic");
}

export async function completeBookingAction(formData: FormData) {
  const id = formData.get("bookingId") as string;

  await completeBooking(id);

  await enforceActiveSlots();

  revalidatePath("/mechanic");
}

export async function deleteBookingAction(formData: FormData) {
  const id = formData.get("bookingId") as string;

  await deleteBooking(id);

  // 🔥 IMPORTANT: refill slot
  await enforceActiveSlots();

  revalidatePath("/mechanic");
}