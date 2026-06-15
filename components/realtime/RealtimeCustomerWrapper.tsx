import { ReactNode } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export function RealtimeCustomerWrapper({
  children,
}: {
  children: ReactNode
}) {
  const supabase = createClient()
  const router = useRouter()

  return <>{children}</>
}