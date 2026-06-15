
"use client";

import { useEffect } from "react";

import { ReactNode } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const router = useRouter()
  const supabase = createClient()

  return (
    <div>
      {children}
    </div>
  )
}