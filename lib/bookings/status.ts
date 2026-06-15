import { createClient } from "@/lib/supabase/server";

export const WORKFLOW_STATES = [
  "active",
  "in_progress",
  "parts_ordered",
  "ready_for_pickup",
  "completed",
] as const;

export type BookingStatus = typeof WORKFLOW_STATES[number];

export const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  active: ["in_progress", "parts_ordered"],
  in_progress: ["parts_ordered", "ready_for_pickup"],
  parts_ordered: ["in_progress", "ready_for_pickup"],
  ready_for_pickup: ["completed"],
};

export async function transitionBookingStatus(
  id: string,
  nextStatus: BookingStatus
) {
  const supabase = await createClient();

  const { data: booking } = await supabase
    .from("bookings")
    .select("status")
    .eq("id", id)
    .single();

  if (!booking) throw new Error("Booking not found");

  const allowed =
    ALLOWED_TRANSITIONS[booking.status as keyof typeof ALLOWED_TRANSITIONS] || [];

  if (!allowed.includes(nextStatus)) {
    throw new Error(`Invalid transition: ${booking.status} → ${nextStatus}`);
  }

  const { error } = await supabase
    .from("bookings")
    .update({ status: nextStatus })
    .eq("id", id);

  if (error) throw error;
}