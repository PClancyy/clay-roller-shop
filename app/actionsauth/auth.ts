"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  console.log("SIGNOUT ERROR:", error);

  redirect("/login");
}