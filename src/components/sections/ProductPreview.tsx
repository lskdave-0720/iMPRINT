import { useState } from "react";
import { FileText, Mic, GitBranch, Plus, Sparkles, Check } from "lucide-react";

const tabs = [
  { id: "input", label: "Project input", icon: Plus },
  { id: "cv", label: "CV bullets", icon: FileText },
  { id: "interview", label: "Interview answers", icon: Mic },
  { id: "timeline", label: "Career timeline", icon: GitBranch },
] as const;

type TabId = typeof tabs[number]["id"];

export const ProductPreview = () => {
  const [active, setActive] = useState<TabId>("input");

  return (
    <section id="preview" className="py-24 sm:py-32 relative">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="text-xs uppercase tracking-[0.2em] text-primary mb-3">Product</div>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-gradient">
            One memory. <span className="font-serif-display text-muted-foreground">Many outputs.</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`inline-flex items-center gap-2 px-4 h-10 rounded-full text-sm transition-all duration-300 border ${
                  isActive
                    ? "bg-primary/15 border-primary/40 text-foreground shadow-glow"
                    : "bg-secondary/40 border-border text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-border bg-card/60 backdrop-blur-xl shadow-card overflow-hidden">
          <div className="p-6 sm:p-10 min-h-[360px] animate-fade-in" key={active}>
            {active === "input" && <InputPanel />}
            {active === "cv" && <CVPanel />}
            {active === "interview" && <InterviewPanel />}
            {active === "timeline" && <TimelinePanel />}
          </div>
        </div>
      </div>
    </section>
  );
};

const InputPanel = () => (
  <div className="space-y-4">
    <label className="text-xs uppercase tracking-wider text-muted-foreground">New project</label>
    <input
      defaultValue="Launched referral program for B2B SaaS"
      className="w-full bg-background/60 border border-border rounded-xl h-12 px-4 text-foreground outline-none focus:border-primary/60 transition"
    />
    <textarea
      defaultValue="Designed and shipped a 2-sided referral program. Wrote the spec, partnered with growth engineering, ran a 3-week pilot. Result: 14% of new signups now come from referrals."
      rows={5}
      className="w-full bg-background/60 border border-border rounded-xl p-4 text-sm text-foreground outline-none focus:border-primary/60 transition resize-none"
    />
    <div className="flex flex-wrap gap-2">
      {["Growth", "Product", "B2B SaaS"].map((t) => (
        <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-secondary border border-border text-muted-foreground">
          # {t}
        </span>
      ))}
      <button className="text-xs px-2.5 py-1 rounded-full border border-dashed border-border text-muted-foreground hover:text-foreground">
        + Add tag
      </button>
    </div>
    <div className="flex items-center justify-between pt-2 border-t border-border">
      <div className="flex items-center gap-2 text-xs text-primary">
        <Sparkles className="w-3.5 h-3.5" /> Imprint will extract skills & impact
      </div>
      <button className="bg-gradient-primary text-primary-foreground text-sm font-medium px-4 h-9 rounded-lg shadow-glow hover:-translate-y-0.5 transition-transform">
        Save project
      </button>
    </div>
  </div>
);

const CVPanel = () => (
  <div className="space-y-3">
    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Generated bullets · Senior Product Designer</div>
    {[
      "Drove 31% lift in onboarding completion by leading a 3-variant A/B test across 2,400 users.",
      "Reduced time-to-first-action from 4m12s to 2m08s by restructuring the welcome flow end-to-end.",
      "Launched a 2-sided referral program now driving 14% of net-new B2B signups.",
      "Built and shipped reusable design tokens adopted across 4 product surfaces.",
    ].map((b) => (
      <div key={b} className="flex gap-3 p-3 rounded-xl border border-border bg-background/40 hover:border-primary/30 transition">
        <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
          <Check className="w-3 h-3 text-primary" strokeWidth={3} />
        </span>
        <p className="text-sm text-foreground/90 leading-relaxed">{b}</p>
      </div>
    ))}
  </div>
);

const InterviewPanel = () => (
  <div className="space-y-5">
    <div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Question</div>
      <div className="text-base font-medium tracking-tight">
        "Tell me about a time you delivered measurable impact."
      </div>
    </div>
    <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
      <div className="flex items-center gap-2 text-xs text-primary mb-3">
        <Sparkles className="w-3.5 h-3.5" /> Drafted from your projects
      </div>
      <p className="text-sm text-foreground/90 leading-relaxed">
        At my last role, I led the redesign of our onboarding flow. I started with research —
        15 user interviews and a funnel analysis — then designed three variants and ran an A/B test
        over four weeks with 2,400 users. The winning variant lifted completion by 31% and cut
        time-to-first-action in half. The work shipped to production and is still the live experience today.
      </p>
    </div>
    <div className="flex gap-2">
      {["Make it shorter", "More technical", "Use STAR format"].map((p) => (
        <button key={p} className="text-xs px-3 h-8 rounded-full border border-border bg-secondary/40 text-muted-foreground hover:text-foreground hover:border-border transition">
          {p}
        </button>
      ))}
    </div>
  </div>
);

const TimelinePanel = () => {
  const items = [
    { date: "2026 · Q2", title: "Led referral program launch", tag: "Growth" },
    { date: "2026 · Q1", title: "Onboarding redesign — +31% completion", tag: "Product" },
    { date: "2025 · Q4", title: "Shipped design tokens v1", tag: "Systems" },
    { date: "2025 · Q3", title: "Scaled research practice to weekly cadence", tag: "Research" },
  ];
  return (
    <div className="relative pl-6">
      <div className="absolute left-1.5 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-border to-transparent" />
      <div className="space-y-6">
        {items.map((it) => (
          <div key={it.title} className="relative">
            <div className="absolute -left-[22px] top-1.5 w-3 h-3 rounded-full bg-gradient-primary shadow-glow" />
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">{it.date}</div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium text-foreground">{it.title}</h4>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary border border-border text-muted-foreground">{it.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
