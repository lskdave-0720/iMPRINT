import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardMockup } from "@/components/DashboardMockup";

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
      {/* Background grid */}
      <div aria-hidden className="absolute inset-0 grid-bg pointer-events-none" />
      {/* Top radial glow */}
      <div aria-hidden className="absolute inset-x-0 -top-40 h-[600px] bg-[radial-gradient(60%_50%_at_50%_0%,hsl(230_90%_60%/0.25),transparent_70%)] pointer-events-none" />

      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/80 bg-secondary/40 backdrop-blur-md text-xs text-muted-foreground animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            The career memory engine
          </div>

          <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.04em] leading-[1.02] animate-fade-in [animation-delay:80ms]">
            <span className="text-gradient">Your work leaves</span>
            <br />
            <span className="font-serif-display text-gradient-brand font-normal">an imprint.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in [animation-delay:160ms]">
            Imprint remembers your projects, skills, and wins — and turns them into
            CV bullets, interview answers, and career growth.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in [animation-delay:240ms]">
            <Button asChild variant="hero" size="lg" className="group">
              <a href="https://forms.gle/9DRFRDUuAqhmPw5s6" target="_blank" rel="noopener noreferrer">
                Get early access
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button asChild variant="glass" size="lg">
              <a href="#how">See how it works</a>
            </Button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground animate-fade-in [animation-delay:320ms]">
            Free forever for individuals. No credit card required.
          </p>
        </div>

        {/* Dashboard mockup */}
        <div className="mt-16 sm:mt-20 max-w-4xl mx-auto animate-scale-in [animation-delay:400ms]">
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
};
