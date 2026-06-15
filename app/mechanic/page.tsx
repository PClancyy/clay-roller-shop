import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import {
getGarageBookings,
getWaitlistBookings,
} from "@/lib/bookings/queries";

import {
completeBookingAction,
deleteBookingAction,
} from "./actions";

import { updateStatusAction } from "@/app/dashboard/actions";

import {
Card,
CardContent,
CardHeader,
CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function MechanicPage() {
const supabase = await createClient();

const {
data: { user },
} = await supabase.auth.getUser();

if (!user) {
redirect("/login");
}

const { data: profile } = await supabase
.from("profiles")
.select("role")
.eq("id", user.id)
.single();

if (profile?.role !== "mechanic") {
redirect("/dashboard");
}

const active = await getGarageBookings();
const waitlist = await getWaitlistBookings();

const slots = Array.from(
{ length: 4 },
(_, i) => active[i] ?? null
);

return ( <main className="max-w-7xl mx-auto p-6 space-y-8">


  <h2 className="text-xl font-bold text-red-500">
    My Workshop Jobs
  </h2>

<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">    {slots.map((booking, index) => (
      <Card key={index}>
        <CardHeader>
          <CardTitle>
            Bay {index + 1}
          </CardTitle>
        </CardHeader>

        <CardContent>

          {!booking ? (
            <p className="text-muted-foreground">
              Empty Bay
            </p>
          ) : (
            <div className="space-y-3">

              <div>
                <p className="font-semibold">
                  {booking.bike_make}
                </p>

                <p className="text-sm text-muted-foreground">
                  {booking.bike_model}
                </p>

                <p className="break-all text-sm text-muted-foreground">
                  {booking.registration}
                </p>
              </div>

              <Badge>
                {booking.status}
              </Badge>

              {booking.status === "active" && (
                <form action={updateStatusAction}>
                  <input
                    type="hidden"
                    name="id"
                    value={booking.id}
                  />

                  <input
                    type="hidden"
                    name="status"
                    value="in_progress"
                  />

                  <Button className="w-full md:w-auto">
                    Start Work
                  </Button>
                </form>
              )}

              {booking.status === "in_progress" && (
                <form action={updateStatusAction}>
                  <input
                    type="hidden"
                    name="id"
                    value={booking.id}
                  />

                  <input
                    type="hidden"
                    name="status"
                    value="parts_ordered"
                  />

                  <Button className="w-full md:w-auto">
                    Parts Ordered
                  </Button>
                </form>
              )}

              {booking.status === "parts_ordered" && (
                <form action={updateStatusAction}>
                  <input
                    type="hidden"
                    name="id"
                    value={booking.id}
                  />

                  <input
                    type="hidden"
                    name="status"
                    value="ready_for_pickup"
                  />

                  <Button className="w-full md:w-auto">
                    Ready For Pickup
                  </Button>
                </form>
              )}

              <form action={completeBookingAction}>
                <input
                  type="hidden"
                  name="bookingId"
                  value={booking.id}
                />

                <Button
                  className="w-full md:w-auto"
                  variant="secondary"
                >
                  Complete Job
                </Button>
              </form>

              <form action={deleteBookingAction}>
                <input
                  type="hidden"
                  name="bookingId"
                  value={booking.id}
                />

                <Button
                   className="w-full md:w-auto"
                  variant="destructive"
                >
                  Delete
                </Button>
              </form>

            </div>
          )}

        </CardContent>
      </Card>
    ))}
  </div>

  <section>
    <h2 className="text-2xl font-bold mb-4">
      Waitlist
    </h2>

    <div className="space-y-2 max-h-[500px] overflow-y-auto">
      {waitlist.map((booking, index) => (
        <Card key={booking.id}>
          <CardContent className="p-4">
            <p className="font-medium">
              #{index + 1}{" "}
              {booking.bike_make} {booking.bike_model}
            </p>

            <p className="break-all text-sm text-muted-foreground">
              {booking.registration}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>

</main>

);
}
