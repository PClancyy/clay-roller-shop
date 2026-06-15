import Link from "next/link";
import { DesignUploadForm } from "@/components/dashboard/DesignUploadForm";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FAF7F4] text-[#2A2A2A]">

      {/* HERO */}
      {/* HERO */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden">

        {/* BACKGROUND IMAGE LAYER */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-clay.jpg"
            className="w-full h-full object-cover scale-105"
            alt="Clay studio background"
          />

          {/* soft overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F4]/60 via-[#FAF7F4]/40 to-[#FAF7F4]" />
        </div>

        {/* CONTENT LAYER */}
        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="max-w-3xl space-y-8">

            <span className="inline-flex rounded-full bg-white/70 backdrop-blur px-4 py-2 text-sm font-medium border border-[#E8DCCB]">
              Custom Clay Rollers
            </span>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Turn your artwork into
              <span className="block text-[#C46A4A]">
                physical surface texture.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[#5F5F5F] max-w-2xl">
              Upload your design and we transform it into a custom roller that
              imprints your artwork directly into clay.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">

              <Link
                href="#upload"
                className="inline-flex items-center justify-center rounded-2xl bg-[#C46A4A] px-8 py-4 text-white font-medium transition hover:scale-[1.02] active:scale-[0.98]"
              >
                Upload Design
              </Link>

              <Link
                href="#examples"
                className="inline-flex items-center justify-center rounded-2xl border border-[#E8DCCB] bg-white/70 backdrop-blur px-8 py-4 font-medium hover:bg-white"
              >
                View Examples
              </Link>

            </div>

          </div>
        </div>

      </section>

        {/* scroll hint */}
            <div className="mt-16 flex flex-col items-center text-[#666666] animate-pulse">
              <div className="text-xs uppercase tracking-widest">

              </div>
              <div className="w-1 h-10 bg-[#C46A4A]/40 mt-2"></div>
            </div>

            <section className="py-28 bg-[#FAF7F4]">
              <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

                {/* IMAGE SIDE */}
                <div className="rounded-3xl overflow-hidden">
                  <img
                    src="/images/process-clay.jpg"
                    className="w-full h-full object-cover"
                    alt="Clay roller process"
                  />
                </div>

                {/* TEXT SIDE */}
                <div className="space-y-6">

                  <h2 className="text-4xl font-bold leading-tight">
                    From digital artwork to physical texture.
                  </h2>

                  <p className="text-[#666666] text-lg leading-relaxed">
                    Every design begins as a flat image — a drawing, a pattern, a logo, or a sketch.
                    We translate that into a form that can exist in clay.
                  </p>

                  <p className="text-[#666666] text-lg leading-relaxed">
                    The result is a tool that doesn’t just decorate surfaces —
                    it reshapes them. Every impression becomes part of the material itself.
                  </p>

                  <div className="pt-4 space-y-3 text-sm text-[#666666]">

                    <div>• Designed from your original artwork</div>
                    <div>• Optimised for repeatable clay impressions</div>
                    <div>• Made for ceramics, craft, and studio use</div>

                  </div>

                </div>

              </div>
            </section>

            <section className="py-28 bg-white">
              <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

                {/* TEXT FIRST (FLIPPED) */}
                <div className="space-y-6">

                  <h2 className="text-4xl font-bold leading-tight">
                    Not just a tool — a new way to print ideas into matter.
                  </h2>

                  <p className="text-[#666666] text-lg leading-relaxed">
                    Clay holds memory. Every mark, every texture, every pass of the roller becomes part of the object itself.
                  </p>

                  <p className="text-[#666666] text-lg leading-relaxed">
                    We build tools that let you design those marks intentionally — turning sketches and digital forms into physical rhythm and surface.
                  </p>

                  <div className="pt-4 space-y-3 text-sm text-[#666666]">

                    <div>• For ceramicists, designers, and experimental makers</div>
                    <div>• Built for surface, texture, and repetition</div>
                    <div>• Designed to bridge digital design and physical craft</div>

                  </div>

                </div>

                {/* IMAGE SECOND */}
                <div className="rounded-3xl overflow-hidden">
                  <img
                    src="/images/roller-clay-action.jpg"
                    className="w-full h-full object-cover"
                    alt="Clay roller in use"
                  />
                </div>

              </div>
            </section>
      {/* scroll hint */}
      <div className="mt-16 flex flex-col items-center text-[#666666] animate-pulse">
        <div className="text-xs uppercase tracking-widest">

        </div>
        <div className="w-px h-120 bg-[#C46A4A]/40 mt-2"></div>
      </div>

      {/* EXAMPLES */}
      <section
        id="examples"
        className="max-w-6xl mx-auto px-6 py-24"
      >
        <div className="mb-12">
          <h2 className="text-4xl font-bold">
            Example Work
          </h2>

          <p className="mt-4 text-[#666666] max-w-2xl">
            Every roller is produced to order from your artwork
            and designed to create clean, repeatable impressions.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <img
            src="/images/example-1.jpg"
            alt="Clay Roller Example"
            className="aspect-[4/3] w-full rounded-3xl object-cover"
          />

          <img
            src="/images/example-2.jpg"
            alt="Clay Pattern Example"
            className="aspect-[4/3] w-full rounded-3xl object-cover"
          />

          <img
            src="/images/example-3.jpg"
            alt="Clay Impression Example"
            className="aspect-[4/3] w-full rounded-3xl object-cover"
          />

          <img
            src="/images/example-4.jpg"
            alt="Finished Product Example"
            className="aspect-[4/3] w-full rounded-3xl object-cover"
          />

        </div>
      </section>



      {/* HOW IT WORKS */}
      <section className="bg-[#E8DCCB] py-24">
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">
              How It Works
            </h2>

            <p className="mt-4 text-[#666666]">
              A simple process from artwork to finished roller.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="text-[#C46A4A] font-bold mb-4">
                01
              </div>

              <h3 className="text-xl font-semibold mb-3">
                Upload Your Design
              </h3>

              <p className="text-[#666666]">
                Send us your artwork, pattern, logo or illustration.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="text-[#C46A4A] font-bold mb-4">
                02
              </div>

              <h3 className="text-xl font-semibold mb-3">
                Design Review
              </h3>

              <p className="text-[#666666]">
                We review the design and confirm it is suitable
                for production.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="text-[#C46A4A] font-bold mb-4">
                03
              </div>

              <h3 className="text-xl font-semibold mb-3">
                Production & Delivery
              </h3>

              <p className="text-[#666666]">
                We print your custom roller and ship it directly
                to your door.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* PRICING */}
      <section className="py-28 bg-[#FAF7F4]">
        <div className="max-w-5xl mx-auto px-6">

          <div className="relative rounded-[2.5rem] bg-white border border-[#E8DCCB] shadow-sm overflow-hidden">

            {/* subtle background accent */}
            <div className="absolute inset-0 opacity-40">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#E8DCCB] rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#C46A4A] rounded-full blur-3xl opacity-20"></div>
            </div>

            <div className="relative p-12 md:p-16 text-center space-y-8">

              {/* label */}
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-widest text-[#666666]">
                  Studio Offering
                </p>

                <div className="w-12 h-px bg-[#C46A4A] mx-auto"></div>
              </div>

              {/* price */}
              <div className="space-y-3">
                <h2 className="text-6xl md:text-7xl font-bold tracking-tight">
                  £29.99
                </h2>

                <p className="text-[#666666] text-lg">
                  Everything you need to turn your design into a physical clay tool.
                </p>
              </div>

              {/* included items */}
              <div className="grid md:grid-cols-3 gap-6 pt-6 text-sm text-[#666666]">

                <div className="space-y-2">
                  <div className="font-medium text-[#2A2A2A]">Custom Roller</div>
                  <div>3D printed from your artwork</div>
                </div>

                <div className="space-y-2">
                  <div className="font-medium text-[#2A2A2A]">Starter Clay</div>
                  <div>500g earthenware clay included</div>
                </div>

                <div className="space-y-2">
                  <div className="font-medium text-[#2A2A2A]">UK Delivery</div>
                  <div>Tracked and fully insured</div>
                </div>

              </div>

              {/* subtle CTA hint */}
              <div className="pt-8">
                <p className="text-sm text-[#666666]">
                  One-off production • Made to order • Reviewed before printing
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* UPLOAD FORM */}
      <section
        id="upload"
        className="py-24"
      >
        <div className="max-w-3xl mx-auto px-6">

          <div className="rounded-[2rem] bg-white border border-[#E8DCCB] p-8 md:p-10 shadow-sm">

            <div className="mb-8">



            </div>
            <DesignUploadForm />

          </div>



        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#E8DCCB] py-12 text-center text-sm text-[#666666]">
        © 2026 Clay Roller Studio
      </footer>

    </main>
  );
}