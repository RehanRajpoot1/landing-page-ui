import { motion } from 'framer-motion';
import Section from './Section.jsx';

const steps = [
  { title: 'Connect', text: 'Link your project in one click.' },
  { title: 'Configure', text: 'Pick a region and a plan that fits.' },
  { title: 'Launch', text: 'Hit deploy and share your link.' },
];

export default function HowItWorks() {
  return (
    <Section id="how" title="How it works" subtitle="Three steps from code to live website." alt>
      <div className="grid gap-10 text-center md:grid-cols-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <span className="bg-gradient-brand mx-auto grid h-14 w-14 place-items-center rounded-full text-xl font-extrabold text-white">
              {i + 1}
            </span>
            <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
            <p className="mt-1 text-muted">{step.text}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
