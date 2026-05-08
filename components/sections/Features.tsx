import { NotebookPen, Wand2, Target, MessagesSquare, LineChart, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: NotebookPen,
    title: "Smart Project Logging",
    desc: "Track what you worked on without overthinking. A few lines is enough.",
  },
  {
    icon: Wand2,
    title: "Skill Detection",
    desc: "Imprint automatically identifies the skills behind every project you log.",
  },
  {
    icon: Target,
    title: "Achievement Builder",
    desc: "Turn ordinary tasks into strong, results-driven bullet points with metrics.",
  },
  {
    icon: MessagesSquare,
    title: "Interview Mode",
    desc: "Generate tailored answers grounded in your real past experiences.",
  },
  {
    icon: LineChart,
    title: "Career Timeline",
    desc: "See your growth, scope, and skill compounding over months and years.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Proof",
    desc: "Every claim links back to the work that made it true. No more vague CVs.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 sm:py-32 relative">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="container">
        <div className="max-w-2xl mb-16">
          <div className="text-xs uppercase tracking-[0.2em] text-primary mb-3">Features</div>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-gradient">
            Built for the work <span className="font-serif-display text-muted-foreground">you actually do.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-border bg-card-gradient p-6 hover:border-primary/40 hover:bg-card transition-all duration-500"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform duration-500">
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold tracking-tight mb-1.5">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
