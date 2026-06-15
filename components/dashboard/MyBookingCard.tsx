import { TopBar } from "@/components/dashboard/TopBar";
import { BookingForm } from "@/components/dashboard/BookingForm";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { createClient } from "@/lib/supabase/client";
import { getUserBooking } from "@/lib/bookings/queries";

import { RealtimeCustomerWrapper } from "@/components/realtime/RealtimeCustomerWrapper";
type Booking = {
  id: string;
  bike_make: string;
  bike_model: string;
  reason: string;
  status: string;
  position?: number;
};

type Props = {
  bookings?: Booking[] | null;
};

const colours: Record<BookingStatus, string> = {
  waitlist: "bg-gray-500",
  active: "bg-blue-500",
  in_progress: "bg-yellow-500",
  parts_ordered: "bg-orange-500",
  ready_for_pickup: "bg-purple-500",
  completed: "bg-green-500",
}
type BookingStatus =
  | "waitlist"
  | "active"
  | "in_progress"
  | "parts_ordered"
  | "ready_for_pickup"
  | "completed"

  type Bookings = {
    status: BookingStatus
  }
export function MyBookingCard({ bookings }: Props) {
  if (!bookings?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Bookings</CardTitle>
        </CardHeader>

        <CardContent>
          No bookings found.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-black to-red-950 text-white border-red-800">
      <CardHeader>
        <CardTitle>My Bookings</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="border rounded-lg p-4 space-y-2"
          >
            <p className="break-words">
              {booking.bike_make} {booking.bike_model}
            </p>

            <p className="text-sm text-muted-foreground">
              {booking.reason}
            </p>

<Badge className={colours[booking.status as BookingStatus]}>              {booking.status}
            </Badge>

            {booking.status === "waitlist" &&
              booking.position && (
                <p>
                  Position #{booking.position}
                </p>
              )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}