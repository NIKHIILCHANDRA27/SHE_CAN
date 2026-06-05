// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\components\sections\ContactSection.jsx
import { useContext } from 'react';
import { toast } from 'react-toastify';
import useForm from '../../hooks/useForm.js';
import { AuthContext } from '../../context/AuthContext.jsx';
import { submitContact } from '../../services/contactService.js';
import { validateContactForm } from '../../utils/validators.js';

const ContactSection = () => {
  const { admin } = useContext(AuthContext);

  const initialValues = { name: '', email: '', phone: '', subject: '', message: '' };

  const onSubmit = async (values) => {
    await submitContact(values);
    toast.success('Your inquiry was sent successfully.');
  };

  const { values, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = useForm({
    initialValues,
    validate: validateContactForm,
    onSubmit
  });

  return (
    <section id="contact" className="py-24 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          <div className="rounded-4xl bg-slate-900 p-10 shadow-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-400">Get in touch</p>
            <h2 className="mt-5 text-4xl font-bold tracking-tight">Reach out to the She Can team.</h2>
            <p className="mt-6 leading-8 text-slate-400">
              We are here to answer questions about our programs, partnerships, or volunteer opportunities. Send us a message and we will follow up shortly.
            </p>
            <div className="mt-10 space-y-6 text-slate-300">
              <div>
                <p className="font-semibold text-slate-100">Address</p>
                <p>123 Empowerment Lane, Suite 400</p>
              </div>
              <div>
                <p className="font-semibold text-slate-100">Email</p>
                <p>contact@shecan.org</p>
              </div>
              <div>
                <p className="font-semibold text-slate-100">Phone</p>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="mt-10 flex gap-4 text-slate-300">
              <a href="https://facebook.com" className="rounded-full border border-slate-700 p-3 transition hover:border-sky-400 hover:text-sky-400">Facebook</a>
              <a href="https://instagram.com" className="rounded-full border border-slate-700 p-3 transition hover:border-sky-400 hover:text-sky-400">Instagram</a>
              <a href="https://linkedin.com" className="rounded-full border border-slate-700 p-3 transition hover:border-sky-400 hover:text-sky-400">LinkedIn</a>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 rounded-4xl bg-white p-10 text-slate-900 shadow-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-600">Contact form</p>
            <h3 className="text-3xl font-bold">Send us your inquiry</h3>
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium">Full Name</span>
                <input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  required
                />
                {errors.name && <p className="mt-2 text-sm text-rose-600">{errors.name}</p>}
              </label>
              <label className="block">
                <span className="text-sm font-medium">Email</span>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  required
                />
                {errors.email && <p className="mt-2 text-sm text-rose-600">{errors.email}</p>}
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium">Phone Number</span>
                <input
                  type="tel"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  required
                />
                {errors.phone && <p className="mt-2 text-sm text-rose-600">{errors.phone}</p>}
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium">Subject</span>
                <input
                  type="text"
                  name="subject"
                  value={values.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  required
                />
                {errors.subject && <p className="mt-2 text-sm text-rose-600">{errors.subject}</p>}
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium">Message</span>
                <textarea
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows="6"
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  required
                />
                <div className="mt-2 flex items-center justify-between text-sm text-slate-500">
                  {errors.message ? <span className="text-rose-600">{errors.message}</span> : <span>Minimum 20 characters</span>}
                  <span>{values.message.length}/1000</span>
                </div>
              </label>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {isSubmitting ? 'Sending…' : 'Send Message'}
            </button>
            {admin && <p className="text-sm text-slate-500">Logged in as admin: {admin.name}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
