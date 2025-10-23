import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT ?? 'https://formspree.io/f/xkgqlvbj';

type FormState = {
  name: string;
  email: string;
  message: string;
  agree: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialFormState: FormState = {
  name: '',
  email: '',
  message: '',
  agree: false
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contact = () => {
  const { t } = useTranslation();
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const contactDetails = t('contact.details', { returnObjects: true }) as {
    title: string;
    location: string;
    email: string;
    linkedin: string;
    availability: string;
    github: string;
  };
  const detailLabels = t('contact.labels', { returnObjects: true }) as {
    email: string;
    linkedin: string;
    location: string;
    github: string;
    availability: string;
  };

  const handleChange = (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = field === 'agree' ? (event.target as HTMLInputElement).checked : event.target.value;
    setFormState((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: FormErrors = {};
    if (!formState.name.trim()) {
      nextErrors.name = t('form.errors.required');
    }
    if (!formState.email.trim()) {
      nextErrors.email = t('form.errors.required');
    } else if (!EMAIL_REGEX.test(formState.email.trim())) {
      nextErrors.email = t('form.errors.email');
    }
    if (!formState.message.trim()) {
      nextErrors.message = t('form.errors.required');
    }
    if (!formState.agree) {
      nextErrors.agree = t('form.errors.agreement');
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('idle');

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
          _subject: `Portfolio contact from ${formState.name}`
        })
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setStatus('success');
      setFormState(initialFormState);
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">{t('contact.title')}</h2>
          <p className="mt-4 text-lg text-slate-600">{t('contact.subtitle')}</p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <aside className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-sm backdrop-blur">
            <h3 className="text-base font-semibold uppercase tracking-wide text-primary">{contactDetails.title}</h3>
            <div className="mt-6 space-y-5 text-sm text-slate-600">
              <div>
                <p className="text-xs uppercase text-slate-400">{detailLabels.email}</p>
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="mt-1 inline-flex items-center gap-2 font-medium text-secondary underline-offset-4 hover:text-primary hover:underline"
                >
                  {contactDetails.email}
                </a>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400">{detailLabels.linkedin}</p>
                <a
                  href={`https://${contactDetails.linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex items-center gap-2 font-medium text-secondary underline-offset-4 hover:text-primary hover:underline"
                >
                  {contactDetails.linkedin}
                </a>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400">{detailLabels.location}</p>
                <p className="mt-1 font-medium text-secondary">{contactDetails.location}</p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400">{detailLabels.github}</p>
                <a
                  href={`https://${contactDetails.github}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex items-center gap-2 font-medium text-secondary underline-offset-4 hover:text-primary hover:underline"
                >
                  {contactDetails.github}
                </a>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400">{detailLabels.availability}</p>
                <p className="mt-1 font-medium text-secondary">{contactDetails.availability}</p>
              </div>
            </div>
          </aside>
          <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
            <div className="grid gap-6">
              <div className="text-left">
                <label htmlFor="name" className="block text-sm font-semibold text-secondary">
                  {t('form.name')}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange('name')}
                  placeholder={t('form.namePlaceholder')}
                  className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-base shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  required
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="text-left">
                <label htmlFor="email" className="block text-sm font-semibold text-secondary">
                  {t('form.email')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange('email')}
                  placeholder={t('form.emailPlaceholder')}
                  className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-base shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  required
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="text-left">
                <label htmlFor="message" className="block text-sm font-semibold text-secondary">
                  {t('form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange('message')}
                  placeholder={t('form.messagePlaceholder')}
                  rows={5}
                  className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2 text-base shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  required
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-600">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="flex items-start gap-3 text-left">
                <input
                  id="agree"
                  name="agree"
                  type="checkbox"
                  checked={formState.agree}
                  onChange={handleChange('agree')}
                  className="mt-1 h-5 w-5 rounded border border-slate-300 text-primary focus:ring-primary/60"
                  aria-invalid={Boolean(errors.agree)}
                  aria-describedby={errors.agree ? 'agree-error' : undefined}
                  required
                />
                <label htmlFor="agree" className="text-sm text-slate-600">
                  {t('form.agree')}
                </label>
              </div>
              {errors.agree && (
                <p id="agree-error" className="text-sm text-red-600">
                  {errors.agree}
                </p>
              )}
            </div>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? t('form.sending') : t('form.send')}
              </button>
              <div className="min-h-[1.5rem] text-sm" aria-live="polite">
                {status === 'success' && <span className="text-green-600">{t('contact.success')}</span>}
                {status === 'error' && <span className="text-red-600">{t('contact.error')}</span>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
