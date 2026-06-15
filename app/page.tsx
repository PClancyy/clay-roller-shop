import Link from "next/link";


const images = {
  hero: "/images/workshop-hero.jpg",

  trustStrip: [
    "/images/bay1.jpg",
    "/images/mechanic.jpg",
    "/images/tools.jpg",
    "/images/bike-dropoff.jpg",
  ],

  howItWorks: {
    booking: "/images/booking.jpg",
    working: "/images/work-in-progress.jpg",
    escalation: "/images/workflow.jpg",
  },

  gallery: [
    "/images/workshop-wide.jpg",
    "/images/bays.jpg",
    "/images/tools-close.jpg",
    "/images/customer-handover.jpg",
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">

      <section className="relative h-[80vh] w-full overflow-hidden">

        {/* Background image */}
        <img
          src="/images/hero.jpg"
          alt="Workshop hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Center logo */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <img
            src="/images/logo.jpg"
            alt="Garage logo"
            className="w-48 md:w-64 lg:w-80 object-contain drop-shadow-xl"
          />
        </div>

      </section>

{/* HOW IT WORKS */}
<section id="how" className="py-24 bg-zinc-950 text-white">
  <div className="max-w-6xl mx-auto px-6">

    {/* Header */}
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
        How it works
      </h2>
      <p className="text-zinc-400 mt-3">
        Simple workflow from booking to workshop completion
      </p>
    </div>

    {/* Grid */}
    <div className="grid gap-6 md:grid-cols-3">

      {/* Card 1 */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 hover:bg-zinc-900 transition">
        <div className="text-red-500 font-semibold text-sm mb-2">
          I
        </div>
        <h3 className="text-lg font-semibold">
          Book a slot
        </h3>
        <p className="text-zinc-400 mt-2 text-sm leading-relaxed">
          Secure one of 4 active workshop bays instantly through the portal.
        </p>
      </div>

      {/* Card 2 */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 hover:bg-zinc-900 transition">
        <div className="text-red-500 font-semibold text-sm mb-2">
          II
        </div>
        <h3 className="text-lg font-semibold">
          Live workshop tracking
        </h3>
        <p className="text-zinc-400 mt-2 text-sm leading-relaxed">
          Watch your bike progress through each stage in real time.
        </p>
      </div>

      {/* Card 3 */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 hover:bg-zinc-900 transition">
        <div className="text-red-500 font-semibold text-sm mb-2">
          III
        </div>
        <h3 className="text-lg font-semibold">
          Smart waitlist
        </h3>
        <p className="text-zinc-400 mt-2 text-sm leading-relaxed">
          Overflow bookings are automatically placed into the queue system.
        </p>
      </div>

    </div>
  </div>
</section>
                <section className="grid grid-cols-4 gap-2 p-6">
                  <img src="/images/truststrip.jpg" className="aspect-square object-cover" />
                  <img src="/images/workshop1.jpg" className="aspect-square object-cover" />
                  <img src="/images/workshop2.jpg" className="aspect-square object-cover" />
                  <img src="/images/workshop.jpg" className="aspect-square object-cover" />
                </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <h2 className="text-3xl font-bold">
          Ready to get your bike booked in?
        </h2>

        <p className="mt-4 text-gray-600">
          Fast, transparent motorcycle servicing in Glasgow.
        </p>

        <div className="mt-8">
          <Link
            href="/dashboard"
            className="px-8 py-4 bg-black text-white rounded-xl"
          >
            Go to Booking System
          </Link>
        </div>
      </section>
<section className="grid grid-cols-2 gap-4 p-6">
  <img src="/images/wshop3.jpg" className="aspect-square object-cover" />
  <img src="/images/wshop2.jpg" className="aspect-square object-cover" />
  <img src="/images/wshop1.jpg" className="aspect-square object-cover" />
  <img src="/images/truststrip1.jpg" className="aspect-square object-cover" />
</section>
      {/* FOOTER */}
      <footer className="border-t py-10 text-center text-gray-500 text-sm">
        Racin' & Cruisin' Motorcycles
      </footer>
    </main>
  );
}