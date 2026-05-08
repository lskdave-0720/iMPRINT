import { Check, Sparkles, FileText, Layers } from "lucide-react";

/**
 * Hand-built dashboard mockup using HTML/CSS for crisp, real text
 * (instead of an AI-generated raster image).
 */
export const DashboardMockup = () => {
  return (
    <div className="relative">
      {/* Glow halos */}
      <div aria-hidden className="absolute -inset-10 bg-gradient-primary opacity-20 blur-3xl rounded-full" />

      <div className="relative rounded-2xl border border-border/80 bg-card/80 backdrop-blur-xl shadow-card overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 h-10 border-b border-border/80 bg-background/40">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
          </div>
          <div className="ml-3 text-xs text-muted-foreground font-medium">imprint.app / projects</div>
        </div>

        <div className="p-5 sm:p-7 grid gap-4 sm:gap-5">
          {/* Project entry */}
          <div className="rounded-xl border border-border bg-card-gradient p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                <Layers className="w-3.5 h-3.5" /> Project entry
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20">
                Live
              </span>
            </div>
            <div className="text-base sm:text-lg font-semibold tracking-tight mb-2">
              Redesigned onboarding flow
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Led research, designed 3 variants, ran A/B test with 2,400 users over 4 weeks.
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {["Research", "Figma", "A/B Testing"].map((t) => (
                <span key={t} className="text-[11px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* CV bullets */}
          <div className="rounded-xl border border-border bg-card-gradient p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                <FileText className="w-3.5 h-3.5" /> Auto-generated CV bullets
              </div>
              <div className="flex items-center gap-1 text-[11px] text-primary">
                <Sparkles className="w-3 h-3" /> Imprint AI
              </div>
            </div>
            <ul className="space-y-2.5">
              {[
                "Increased onboarding completion by 31% through a 3-variant A/B test on 2,400 users.",
                "Cut time-to-first-action from 4m12s to 2m08s by restructuring the welcome flow.",
                "Shipped reusable design tokens adopted across 4 product surfaces.",
              ].map((b) => (
                <li key={b} className="flex gap-2.5 text-sm leading-relaxed">
                  <span className="mt-0.5 w-4 h-4 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 text-primary" strokeWidth={3} />
                  </span>
                  <span className="text-foreground/90">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div className="rounded-xl border border-border bg-card-gradient p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
              Skills detected
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "User Research", level: 92 },
                { label: "A/B Testing", level: 88 },
                { label: "Figma", level: 95 },
                { label: "Design Systems", level: 81 },
                { label: "Data Analysis", level: 74 },
              ].map((s) => (
                <span
                  key={s.label}
                  className="text-xs px-2.5 py-1 rounded-full border border-border bg-secondary/60 text-foreground/90"
                >
                  {s.label} <span className="text-muted-foreground ml-1">{s.level}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
