// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\components\sections\Hero.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.18),_transparent_30%)]" />
      <div className="relative mx-auto max-w-7xl px-6 py-28 text-center sm:py-36 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="text-base font-semibold uppercase tracking-[0.35em] text-sky-300">She Can Foundation</p>
          <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-6xl">Empowering Women, Transforming Communities</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            We bring education, mentorship, and sustainable support to women across the globe so they can thrive with confidence and independence.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-sky-500 px-8 py-3 text-base font-semibold text-white transition hover:bg-sky-400">
              Get Involved
            </a>
            <a href="#about" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-3 text-base font-semibold text-white transition hover:bg-white/20">
              Learn More
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
