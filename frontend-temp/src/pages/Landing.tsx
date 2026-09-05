import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-white">

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">

        <div
          className="absolute top-[-150px] left-[-150px] h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-3xl"
          style={{
            animation: "float1 35s linear infinite",
          }}
        />

        <div
          className="absolute bottom-[-200px] right-[-150px] h-[600px] w-[600px] rounded-full bg-purple-500/20 blur-3xl"
          style={{
            animation: "float2 45s linear infinite",
          }}
        />

        <div
          className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl"
          style={{
            animation: "float3 40s linear infinite",
          }}
        />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">

        {/* HERO SECTION */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center">

          <span className="mb-6 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium">
            AI-Powered Data Analytics Platform
          </span>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold max-w-6xl leading-tight">
            Ask Better Questions.
            <br />
            <span className="text-cyan-500">
              Discover Better Insights.
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-xl md:text-2xl text-slate-600 dark:text-slate-400">
            Upload your dataset, ask questions in plain English,
            and instantly uncover meaningful insights with
            AI-generated SQL and interactive visualizations.
          </p>

          <Link to="/workspace">
            <button className="mt-12 px-10 py-5 rounded-2xl bg-cyan-500 text-black font-bold text-lg hover:scale-105 transition duration-300 shadow-lg shadow-cyan-500/30">
              Launch Workspace →
            </button>
          </Link>

        </section>

        {/* FEATURES */}
        <section className="py-24">

          <h2 className="text-5xl font-bold text-center mb-4">
            Everything You Need
          </h2>

          <p className="text-center text-slate-500 dark:text-slate-400 mb-16 text-lg">
            Turn raw datasets into actionable insights within seconds.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="p-8 rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 hover:scale-105 transition">

              <div className="text-4xl mb-4">
                💬
              </div>

              <h3 className="text-xl font-semibold">
                Natural Language Queries
              </h3>

              <p className="mt-3 opacity-70">
                Ask questions exactly the way you think.
                No SQL expertise required.
              </p>

            </div>

            <div className="p-8 rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 hover:scale-105 transition">

              <div className="text-4xl mb-4">
                ⚡
              </div>

              <h3 className="text-xl font-semibold">
                AI SQL Generation
              </h3>

              <p className="mt-3 opacity-70">
                Automatically convert business questions
                into optimized SQL queries.
              </p>

            </div>

            <div className="p-8 rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 hover:scale-105 transition">

              <div className="text-4xl mb-4">
                📊
              </div>

              <h3 className="text-xl font-semibold">
                Interactive Charts
              </h3>

              <p className="mt-3 opacity-70">
                Visualize results instantly using
                Bar, Pie, Histogram, and Scatter Charts.
              </p>

            </div>

            <div className="p-8 rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 hover:scale-105 transition">

              <div className="text-4xl mb-4">
                🕒
              </div>

              <h3 className="text-xl font-semibold">
                Query History
              </h3>

              <p className="mt-3 opacity-70">
                Revisit previous analyses and continue
                exploring your data effortlessly.
              </p>

            </div>

          </div>

        </section>

        {/* HOW IT WORKS */}
        <section className="py-24">

          <h2 className="text-5xl font-bold text-center mb-16">
            How It Works ?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-cyan-500 text-black flex items-center justify-center text-3xl font-bold">
                1
              </div>

              <h3 className="mt-6 text-2xl font-semibold">
                Upload
              </h3>

              <p className="mt-3 opacity-70">
                Import your CSV dataset in seconds.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-cyan-500 text-black flex items-center justify-center text-3xl font-bold">
                2
              </div>

              <h3 className="mt-6 text-2xl font-semibold">
                Ask
              </h3>

              <p className="mt-3 opacity-70">
                Type questions in plain English.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-cyan-500 text-black flex items-center justify-center text-3xl font-bold">
                3
              </div>

              <h3 className="mt-6 text-2xl font-semibold">
                Discover
              </h3>

              <p className="mt-3 opacity-70">
                Get SQL, tables, and visual insights instantly.
              </p>
            </div>

          </div>

        </section>

        {/* FINAL CTA */}
        <section className="py-32 text-center">

          <h2 className="text-5xl md:text-6xl font-bold">
            Ready to Unlock Your Data?
          </h2>

          <p className="mt-6 text-xl opacity-70 max-w-2xl mx-auto">
            Stop writing complex SQL manually.
            Let QueryMind turn your questions into answers.
          </p>

          <Link to="/workspace">
            <button className="mt-10 px-10 py-5 rounded-2xl bg-cyan-500 text-black font-bold text-lg hover:scale-105 transition duration-300 shadow-lg shadow-cyan-500/30">
              Get Started →
            </button>
          </Link>

        </section>

      </div>

    </div>
  );
}