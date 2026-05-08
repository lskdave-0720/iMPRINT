import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Waitlist = () => {
  return (
    <section id="waitlist" className="py-24 sm:py-32 relative">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card-gradient p-10 sm:p-16">
          <div
            aria-hidden
            className="absolute inset-x-0 -top-32 h-64 bg-[radial-gradient(50%_60%_at_50%_50%,hsl(250_95%_65%/0.35),transparent_70%)] pointer-events-none"
          />
          <div aria-hidden className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

          <div className="relative max-w-xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 backdrop-blur px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Early access
            </div>

            <h2 className="mt-5 text-4xl sm:text-5xl font-semibold tracking-[-0.04em] leading-[1.05]">
              <span className="text-gradient">Join the waitlist</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Be first to try Imprint.
            </p>

            <div className="mt-9 flex justify-center">
              <Button asChild variant="hero" size="xl" className="group">
                <a
                  href="https://forms.gle/9DRFRDUuAqhmPw5s6"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get early access
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </Button>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              No spam. One email when early access opens.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
