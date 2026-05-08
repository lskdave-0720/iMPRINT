const testimonials = [
  {
    quote: "I finally have a place where my work doesn't disappear. CV updates take 5 minutes now.",
    name: "Maya R.",
    role: "Product Designer",
    initials: "MR",
  },
  {
    quote: "Interview prep used to take a week. Imprint turned my projects into answers in one sitting.",
    name: "Daniel K.",
    role: "Software Engineer",
    initials: "DK",
  },
  {
    quote: "It's the first career tool that actually feels like it's on my side.",
    name: "Priya S.",
    role: "Computer Science Student",
    initials: "PS",
  },
];

export const SocialProof = () => {
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="text-xs uppercase tracking-[0.2em] text-primary mb-3">Loved by</div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-gradient">
            Used by ambitious students <span className="font-serif-display text-muted-foreground">and professionals.</span>
          </h2>
        </div>

        {/* Avatars row */}
        <div className="flex items-center justify-center -space-x-3 mb-10">
          {["AL", "MR", "DK", "PS", "JT", "EV", "+"].map((i, idx) => (
            <div
              key={idx}
              className={`w-10 h-10 rounded-full border-2 border-background flex items-center justify-center text-xs font-medium ${
                i === "+"
                  ? "bg-secondary text-muted-foreground"
                  : "bg-gradient-primary text-primary-foreground"
              }`}
            >
              {i === "+" ? "+12k" : i}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="rounded-2xl border border-border bg-card-gradient p-6 hover:border-primary/30 transition-all duration-500"
            >
              <blockquote className="text-[15px] text-foreground/90 leading-relaxed">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
