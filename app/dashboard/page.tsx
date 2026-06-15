import { TopBar } from "@/components/dashboard/TopBar";
import { BookingForm } from "@/components/dashboard/BookingForm";
import { MyBookingCard } from "@/components/dashboard/MyBookingCard";
import { createClient } from "@/lib/supabase/server";
import { getUserBooking } from "@/lib/bookings/queries";
import { RealtimeCustomerWrapper } from "@/components/realtime/RealtimeCustomerWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const bookings = await getUserBooking();

  return (
    <>
      <TopBar userEmail={user.email ?? ""} />

      <main className="min-h-screen bg-zinc-950 text-white space-y-8">

        {/* HERO */}
        <section>
          <Card className="overflow-hidden border-red-700 bg-black text-white">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-black via-zinc-900 to-red-900 px-6 py-12 md:px-10 md:py-16">

                <div className="max-w-3xl space-y-4">
                  <span className="inline-flex rounded-full border border-red-600 bg-red-950 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-300">
                    Customer Portal
                  </span>

                  <h1 className="text-3xl md:text-5xl font-black tracking-tight">
                    Racin' & Cruisin'
                  </h1>

                  <p className="text-lg md:text-xl text-red-300">
                    Motorcycle Workshop Portal
                  </p>

                  <p className="text-sm md:text-base text-zinc-300">
                    Book servicing, track workshop progress, monitor queue status
                    and receive collection updates from the garage.
                  </p>
                </div>

              </div>
            </CardContent>
          </Card>
        </section>

        {/* STATS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4 space-y-1">
              <p className="text-sm text-zinc-400">Total Bookings</p>
              <p className="text-3xl font-bold">{bookings.length}</p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4 space-y-1">
              <p className="text-sm text-zinc-400">Active Jobs</p>
              <p className="text-3xl font-bold text-blue-400">
                {
                  bookings.filter(
                    b => b.status === "active" || b.status === "in_progress"
                  ).length
                }
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4 space-y-1">
              <p className="text-sm text-zinc-400">Ready For Pickup</p>
              <p className="text-3xl font-bold text-green-400">
                {
                  bookings.filter(
                    b => b.status === "ready_for_pickup"
                  ).length
                }
              </p>
            </CardContent>
          </Card>

        </section>

        {/* MAIN ACTION AREA */}
        <section>
          <Card className="border-red-800 bg-black text-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-red-500">
                Book a Motorcycle Service
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <BookingForm />
              <MyBookingCard bookings={bookings} />
            </CardContent>
          </Card>
        </section>

      </main>
    </>
  );
}