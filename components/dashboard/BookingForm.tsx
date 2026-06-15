"use client";

import { useState } from "react";
import { createBooking } from "@/app/dashboard/actions";
import { createClient } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function BookingForm() {
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const [bikeMake, setBikeMake] = useState("");
  const [bikeModel, setBikeModel] = useState("");
  const [registration, setRegistration] = useState("");
  const [reason, setReason] = useState("");
  const [contact, setContact] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please log in");
        return;
      }

      await createBooking({
        userId: user.id,
        bikeMake,
        bikeModel,
        registration,
        reason,
        contact
      });

      setBikeMake("");
      setBikeModel("");
      setRegistration("");
      setReason("");
      setContact("");
    } catch (error) {
      console.error("Booking failed:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        value={bikeMake}
        onChange={(e) => setBikeMake(e.target.value)}
        placeholder="Bike make"
        required
      />

      <input
        value={bikeModel}
        onChange={(e) => setBikeModel(e.target.value)}
        placeholder="Bike model"
        required
      />

      <input
        value={registration}
        onChange={(e) => setRegistration(e.target.value)}
        placeholder="Registration"
        required
      />

      <input
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        placeholder="Contact Number"
        required
      />

      <Textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Reason for booking"
        required
      />

      <Button
      className="w-full md:w-auto"
        type="submit"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Book Bike"}
      </Button>
    </form>
  );
}