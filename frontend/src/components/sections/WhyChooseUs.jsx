// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\components\sections\WhyChooseUs.jsx
import { motion } from 'framer-motion';
import { FaLeaf, FaHandsHelping, FaGlobe, FaChartLine, FaUsers, FaShieldAlt } from 'react-icons/fa';

const features = [
  { icon: FaLeaf, title: 'Transparent Impact', description: 'We share progress and outcomes clearly so supporters see real results.' },
  { icon: FaHandsHelping, title: 'Community Focus', description: 'Local voices shape every program to ensure relevance and reach.' },
  { icon: FaShieldAlt, title: 'Expert Mentors', description: 'Professionals guide participants through training and career pathways.' },
  { icon: FaChartLine, title: 'Sustainable Programs', description: 'We design initiatives that continue delivering value year after year.' },
  { icon: FaGlobe, title: 'Global Reach', description: 'Supporting women across continents with culturally sensitive outreach.' },
  { icon: FaUsers, title: 'Volunteer-Driven', description: 'Passionate volunteers help every initiative thrive on the ground.' }
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-600">Why choose us</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Programs designed to uplift women, with care and expertise.</h2>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500 text-white">
                  <Icon size={20} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
                <p className="mt-3 text-slate-600 dark:text-slate-400">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
