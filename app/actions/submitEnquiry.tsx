"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitEnquiry(formData: FormData) {
  console.log("FORM KEYS:", Array.from(formData.keys()));
if (!file) throw new Error("No file uploaded");

const maxSize = 50 * 1024 * 1024; // 50MB

if (file.size > maxSize) {
  throw new Error("File too large (max 50MB)");
}

const allowed = [
  "image/png",
  "image/jpeg",
  "image/svg+xml",
  "application/pdf",
];

if (!allowed.includes(file.type)) {
  throw new Error("Invalid file type");
}
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const notes = formData.get("notes")?.toString();

  const file = formData.get("design") as File;

  console.log({
    name,
    email,
    notes,
    file: file?.name,
  });

  const supabase = await createClient();

  const fileName = `${Date.now()}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from("design-uploads")
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("design-uploads")
    .getPublicUrl(fileName);

  const { error } = await supabase.from("enquiries").insert({
    name,
    email,
    notes,
    design_url: publicUrl,
    status: "new",
  });

  if (error) throw error;
}