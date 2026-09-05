import { Database, Brain, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Database,
    title: "Upload Any Dataset",
    description:
      "CSV datasets instantly transformed into queryable tables.",
  },
  {
    icon: Brain,
    title: "AI SQL Generation",
    description:
      "Natural language to SQL powered by QueryMind AI.",
  },
  {
    icon: BarChart3,
    title: "Exasol Analytics",
    description:
      "Lightning-fast analytics using Exasol.",
  },
];

export default function FeatureCards() {
  return (
    <section className="py-32 px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:scale-105 transition"
          >
            <feature.icon size={40} />

            <h3 className="mt-6 text-2xl font-semibold">
              {feature.title}
            </h3>

            <p className="mt-3 text-slate-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}