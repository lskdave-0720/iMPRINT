import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FinalCTA = () => {
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card-gradient p-10 sm:p-16 text-center">
          {/* Glow */}
          <div aria-hidden className="absolute inset-x-0 -top-32 h-64 bg-[radial-gradient(50%_60%_at_50%_50%,hsl(230_90%_60%/0.4),transparent_70%)] pointer-events-none" />
          <div aria-hidden className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />

          <div className="relative">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] leading-[1.05]">
              <span className="text-gradient">Every project you ship</span>
              <br />
              <span className="font-serif-display text-gradient-brand font-normal">leaves an imprint.</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
              Capture the work, the skills, and the wins — so your career compounds instead of fading.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="hero" size="xl" className="group">
                <a href="https://forms.gle/9DRFRDUuAqhmPw5s6" target="_blank" rel="noopener noreferrer">
                  Leave your imprint
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Free forever for individuals · No credit card required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
