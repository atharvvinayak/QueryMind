import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
      <motion.h1
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-7xl md:text-8xl font-black tracking-tight"
      >
        QUERYMIND
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 text-xl text-slate-400 max-w-2xl"
      >
        Ask Questions. Get SQL. Analyze Anything.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex gap-4 mt-10"
      >
        <button className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 transition">
          Upload Dataset
        </button>

        <button className="px-8 py-4 rounded-2xl border border-white/20 hover:bg-white/10 transition">
          Explore
        </button>
      </motion.div>
    </section>
  );
}