// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\components\sections\About.jsx
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-24 bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-8">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-600">Our story</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Building brighter futures for women and girls.</h2>
          <p className="mt-6 max-w-xl leading-8 text-slate-600 dark:text-slate-300">
            Since our beginning, She Can Foundation has supported women stepping into leadership, training, and economic opportunity. We partner with communities to deliver programs that create long-term independence.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-6 shadow-lg dark:bg-slate-900">
              <h3 className="font-semibold text-slate-900 dark:text-white">Mission</h3>
              <p className="mt-3 text-slate-600 dark:text-slate-300">
                To equip women with education, skills, and resources for independent, fulfilling lives.
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-6 shadow-lg dark:bg-slate-900">
              <h3 className="font-semibold text-slate-900 dark:text-white">Vision</h3>
              <p className="mt-3 text-slate-600 dark:text-slate-300">
                A world where every woman has equal opportunity to thrive.
              </p>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="flex items-center justify-center">
          <div className="relative w-full max-w-lg overflow-hidden rounded-4xl bg-gradient-to-br from-sky-500 via-indigo-500 to-fuchsia-500 p-1 shadow-glow">
            <div className="flex h-full flex-col justify-between rounded-4xl bg-slate-950 p-8 text-white">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-sky-200">Impact snapshot</p>
                <h3 className="mt-4 text-3xl font-bold">Community-first programming</h3>
                <p className="mt-4 leading-7 text-slate-200">
                  Providing mentorship, digital skills, and safe learning spaces to thousands of women across continents.
                </p>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-900 p-4">
                  <p className="text-3xl font-semibold">120+</p>
                  <p className="mt-2 text-sm text-slate-400">Programs Launched</p>
                </div>
                <div className="rounded-3xl bg-slate-900 p-4">
                  <p className="text-3xl font-semibold">40+</p>
                  <p className="mt-2 text-sm text-slate-400">Partner Organizations</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
