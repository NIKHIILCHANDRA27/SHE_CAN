// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\components\sections\Impact.jsx
import { motion } from 'framer-motion';

const stats = [
  { value: '5,000+', label: 'Women Empowered' },
  { value: '120+', label: 'Programs Launched' },
  { value: '40+', label: 'Partner Organizations' },
  { value: '15+', label: 'Countries Reached' }
];

const Impact = () => {
  return (
    <section id="impact" className="py-24 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-400">Impact</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Measured change powered by community support.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-300">
            Every milestone shows how far women can go when they receive the right tools, mentorship, and compassionate support from their communities.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="rounded-3xl border border-slate-800/70 bg-slate-900/90 p-8 shadow-xl"
            >
              <p className="text-4xl font-bold text-sky-300">{item.value}</p>
              <p className="mt-4 text-sm uppercase tracking-[0.25em] text-slate-400">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact;
