import { createClient } from "@/lib/supabase/server";

/**
 * Create booking
 */
export async function createBooking(input: {
  userId: string;
  bikeMake: string;
  bikeModel: string;
  registration: string;
  reason: string;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("bookings")
    .insert({
      user_id: input.userId,
      bike_make: input.bikeMake,
      bike_model: input.bikeModel,
      registration: input.registration,
      reason: input.reason,
    })
    .select();

  console.log("INSERT RESULT:", data, error);

  if (error) throw error;

  return data;
}

export async function updateBookingStatus(id: string, status: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", id);

  if (error) throw error;
}

export async function completeBooking(id: string) {
  const supabase = await createClient();

  // 1. complete job
  const { error } = await supabase
    .from("bookings")
    .update({ status: "completed" })
    .eq("id", id);

  if (error) throw error;
}

export async function enforceActiveSlots() {
  const supabase = await createClient();

  // 1. get active count
  const { data: active } = await supabase
    .from("bookings")
    .select("id")
    .eq("status", "active");
const MAX_ACTIVE = 4;

  const activeCount = active?.length ?? 0;

  const slotsToFill = MAX_ACTIVE - activeCount;

  if (slotsToFill <= 0) return;

  // 2. lock oldest waitlist candidates
  const { data: waitlist } = await supabase
    .from("bookings")
    .select("id")
    .eq("status", "waitlist")
    .order("created_at", { ascending: true })
    .limit(slotsToFill);

  if (!waitlist?.length) return;

  // 3. promote them one-by-one (safe + deterministic)
  for (const b of waitlist) {
    await supabase
      .from("bookings")
      .update({ status: "active" })
      .eq("id", b.id);
  }
}





