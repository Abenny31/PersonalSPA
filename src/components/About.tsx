import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  const paragraphs = t('about.body', { returnObjects: true }) as string[];
  const highlights = t('about.highlights', { returnObjects: true }) as string[];
  const highlightTitle = t('about.highlightTitle');

  return (
    <section id="about" className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">{t('about.title')}</h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-slate-600">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          {highlights.length > 0 && (
            <aside className="h-full rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">{highlightTitle}</h3>
              <ul className="mt-4 space-y-3 text-left text-sm font-medium text-slate-600">
                {highlights.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 rounded-xl bg-slate-100 px-4 py-3">
                    <span className="mt-1 inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
