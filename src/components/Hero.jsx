import { motion } from 'framer-motion';
import { ArrowRight, Rocket } from 'lucide-react';

const lines = [
  { text: '$ nimbus deploy', className: 'text-muted' },
  { text: '✔ Installing dependencies...', className: 'text-emerald-400' },
  { text: '✔ Building app...', className: 'text-emerald-400' },
  { text: '✔ Running tests...', className: 'text-emerald-400' },
  { text: '✔ Deployed in 42s', className: 'text-emerald-400' },
  { text: '→ https://myapp.nimbus.dev', className: 'text-brand-2' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-brand/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-1.5 text-sm text-muted">
            <Rocket size={14} className="text-brand-2" /> Now in public beta
          </span>
          <h1 className="mt-6 text-5xl font-extrabold leading-tight sm:text-6xl">
            Ship faster.
            <br />
            <span className="text-gradient">Worry less.</span>
          </h1>
          <p className="mt-5 max-w-md text-lg text-muted">
            Nimbus helps small teams launch, host and scale their apps — without spending weeks on
            setup.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#waitlist"
              className="bg-gradient-brand inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5"
            >
              Start free <ArrowRight size={18} />
            </a>
            <a
              href="#features"
              className="rounded-lg border border-line px-6 py-3 font-semibold hover:border-brand"
            >
              Learn more
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="overflow-hidden rounded-2xl border border-line bg-[#070b17] shadow-2xl shadow-black/40"
        >
          <div className="flex gap-2 bg-ink-2 px-4 py-3">
            <i className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <i className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <i className="h-3 w-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="p-6 font-mono text-sm leading-8">
            {lines.map((line, i) => (
              <motion.div
                key={line.text}
                className={line.className}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.35 }}
              >
                {line.text}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
