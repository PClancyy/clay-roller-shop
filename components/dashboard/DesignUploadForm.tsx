"use client";

import { useState } from "react";
import { UploadCloud, CheckCircle2 } from "lucide-react";

import { submitEnquiry } from "@/app/actions/submitEnquiry";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function DesignUploadForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(formData: FormData) {
    try {
      setLoading(true);

      await submitEnquiry(formData);

      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Submission failed");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <Card className="border-[#E8DCCB] bg-[#FAF7F4]">
        <CardContent className="py-12 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />

          <h3 className="mt-4 text-2xl font-semibold text-[#2A2A2A]">
            Design Received
          </h3>

          <p className="mt-3 text-[#666666]">
            Thanks for your submission.
            We'll review your design and contact you within 24 hours.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-8"
    >
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        autoComplete="off"
        tabIndex={-1}
        className="hidden"
      />

      <div className="space-y-3">
        <Badge
          variant="secondary"
          className="bg-[#E8DCCB] text-[#2A2A2A]"
        >
          Design Upload
        </Badge>

        <h3 className="text-2xl font-semibold text-[#2A2A2A]">
          Start Your Custom Roller
        </h3>

        <p className="text-[#666666]">
          Upload your artwork and we'll manually review it
          before production.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Name
          </label>

          <Input
            name="name"
            required
            placeholder="Jane Smith"
            className="h-12 border-[#E8DCCB]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Email
          </label>

          <Input
            name="email"
            type="email"
            required
            placeholder="jane@example.com"
            className="h-12 border-[#E8DCCB]"
          />
        </div>
      </div>

      <Card className="border-2 border-dashed border-[#C46A4A]/40 bg-[#FAF7F4]">
        <CardContent className="py-10">
          <div className="flex flex-col items-center text-center">

            <UploadCloud className="h-12 w-12 text-[#C46A4A]" />

            <h4 className="mt-4 text-lg font-medium">
              Upload Your Design
            </h4>

            <p className="mt-2 text-sm text-[#666666]">
              PNG, JPG, SVG or PDF
            </p>

            <Input
              name="design"
              type="file"
              accept=".png,.jpg,.jpeg,.svg,.pdf"
              required
              className="mt-6 max-w-md border-[#E8DCCB]"
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Project Notes
        </label>

        <Textarea
          name="notes"
          rows={6}
          placeholder="Tell us about your project, preferred roller size, intended use, or any special requirements."
          className="border-[#E8DCCB]"
        />
      </div>

      <Card className="bg-[#FAF7F4] border-[#E8DCCB]">
        <CardContent className="p-6">
          <div className="space-y-3 text-sm">

            <div>
              ✓ Design review within 24 hours
            </div>

            <div>
              ✓ Manual quality check before production
            </div>

            <div>
              ✓ Secure payment link sent after approval
            </div>

          </div>
        </CardContent>
      </Card>

      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className="w-full bg-[#C46A4A] hover:bg-[#b75f42] text-white rounded-xl h-14"
      >
        {loading
          ? "Submitting..."
          : "Request Design Review"}
      </Button>
    </form>
  );
}