import { createClient } from "@/lib/supabase/server";

export async function getGarageBookings() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .in("status", [
      "active",
      "in_progress",
      "parts_ordered",
      "ready_for_pickup",
    ])
    .order("created_at", { ascending: true })
    .limit(4);

  if (error) throw error;
  return data ?? [];
}

/**
 * Delete booking
 */
export async function deleteBooking(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function getWaitlistBookings() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("status", "waitlist")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function getUserBooking() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}