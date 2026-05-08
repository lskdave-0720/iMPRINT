import { PenLine, Brain, Trophy } from "lucide-react";

const steps = [
  {
    icon: PenLine,
    n: "01",
    title: "Capture your work",
    desc: "Log projects, tasks, and what you actually did — in seconds, not essays.",
  },
  {
    icon: Brain,
    n: "02",
    title: "Imprint structures it",
    desc: "AI extracts the skills, impact, and achievements hidden in your day-to-day.",
  },
  {
    icon: Trophy,
    n: "03",
    title: "Get career outputs",
    desc: "Instant CV bullets, interview answers, and proof of experience — on demand.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how" className="py-24 sm:py-32 relative">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="text-xs uppercase tracking-[0.2em] text-primary mb-3">How it works</div>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-gradient">
            Three steps. <span className="font-serif-display text-muted-foreground">Lifelong leverage.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="group relative rounded-2xl border border-border bg-card-gradient p-7 hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <s.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-muted-foreground/60">{s.n}</span>
              </div>
              <h3 className="text-lg font-semibold tracking-tight mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>

              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-border to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
