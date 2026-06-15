import { Card, CardContent } from "@/components/ui/card";
import { DesignUploadForm } from "@/components/dashboard/DesignUploadForm";
import { TopBar } from "@/components/dashboard/TopBar";

export default function HomePage() {
  return (
    <>
      <TopBar />

      <main className="min-h-screen bg-zinc-950 text-white space-y-8">

        {/* HERO */}
        <section>
          <Card className="overflow-hidden border-amber-700 bg-black">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-black via-zinc-900 to-amber-900 px-6 py-12 md:px-10 md:py-16">

                <div className="max-w-3xl space-y-4">

                  <span className="inline-flex rounded-full border border-amber-600 bg-amber-950 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300">
                    Custom Clay Roller
                  </span>

                  <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                    Turn Your Artwork Into Clay Patterns
                  </h1>

                  <p className="text-lg text-amber-300">
                    Upload your design and receive a custom 3D printed roller
                    plus a block of earthen clay ready to use.
                  </p>

                  <p className="text-zinc-300 max-w-2xl">
                    We review every design manually to ensure it prints well.
                    Once approved we'll send you a secure payment link and begin production.
                  </p>

                </div>

              </div>
            </CardContent>
          </Card>
        </section>

        {/* HOW IT WORKS */}
        <section className="grid gap-4 md:grid-cols-3">

          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">1. Upload Design</h3>
              <p className="text-sm text-zinc-400">
                Submit your artwork, logo, pattern or illustration.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">2. Review</h3>
              <p className="text-sm text-zinc-400">
                We check the design and confirm it is suitable for printing.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">3. Production</h3>
              <p className="text-sm text-zinc-400">
                Receive your custom roller and clay kit.
              </p>
            </CardContent>
          </Card>

        </section>

        {/* PRICING */}
        <section>
          <Card className="border-amber-700 bg-black">
            <CardContent className="p-8 text-center space-y-4">

              <h2 className="text-3xl font-black">
                £29.99
              </h2>

              <p className="text-zinc-400">
                Includes custom roller, clay block and UK shipping.
              </p>

            </CardContent>
          </Card>
        </section>

        {/* ENQUIRY FORM */}
        <section>
          <Card className="border-amber-700 bg-black">
            <CardContent className="p-8">
              <DesignUploadForm />
            </CardContent>
          </Card>
        </section>

      </main>
    </>
  );
}