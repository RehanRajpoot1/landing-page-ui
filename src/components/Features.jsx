import { motion } from 'framer-motion';
import { Zap, ShieldCheck, TrendingUp, GitBranch, Activity, Globe } from 'lucide-react';
import Section from './Section.jsx';

const features = [
  { icon: Zap, title: 'Fast deploys', text: 'Push your code and go live in seconds, not hours.' },
  {
    icon: ShieldCheck,
    title: 'Secure by default',
    text: 'Free SSL, safe defaults and automatic updates out of the box.',
  },
  {
    icon: TrendingUp,
    title: 'Scales with you',
    text: 'From your first user to your millionth — no rewrites needed.',
  },
  {
    icon: GitBranch,
    title: 'Git-based workflow',
    text: 'Every push builds a preview, every merge ships to production.',
  },
  {
    icon: Activity,
    title: 'Built-in monitoring',
    text: 'Health checks, logs and uptime alerts in one place.',
  },
  { icon: Globe, title: 'Global edge', text: 'Serve users quickly from regions close to them.' },
];

export default function Features() {
  return (
    <Section
      id="features"
      title="Everything you need"
      subtitle="Simple tools that just work, so you can focus on building."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, text }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="rounded-2xl border border-line bg-card p-7 transition hover:-translate-y-1 hover:border-brand"
          >
            <div className="bg-gradient-brand mb-4 grid h-11 w-11 place-items-center rounded-xl text-white">
              <Icon size={22} />
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-muted">{text}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
