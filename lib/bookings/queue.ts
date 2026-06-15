import { createClient } from "@/lib/supabase/server";

export const MAX_ACTIVE = 4;

export async function enforceActiveSlots() {
  const supabase = await createClient();

  const { data: active } = await supabase
    .from("bookings")
    .select("id")
    .eq("status", "active");

  const activeCount = active?.length ?? 0;
  const slotsToFill = MAX_ACTIVE - activeCount;

  if (slotsToFill <= 0) return;

  const { data: waitlist } = await supabase
    .from("bookings")
    .select("id")
    .eq("status", "waitlist")
    .order("created_at", { ascending: true })
    .limit(slotsToFill);

  if (!waitlist?.length) return;

  for (const b of waitlist) {
    await supabase
      .from("bookings")
      .update({ status: "active" })
      .eq("id", b.id);
  }
}