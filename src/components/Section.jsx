import { motion } from 'framer-motion';

export default function Section({ id, title, subtitle, alt = false, children }) {
  return (
    <section id={id} className={`py-20 sm:py-24 ${alt ? 'bg-ink-2' : ''}`}>
      <div className="mx-auto max-w-6xl px-5">
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-extrabold sm:text-4xl">{title}</h2>
            {subtitle && <p className="mt-3 text-muted">{subtitle}</p>}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
