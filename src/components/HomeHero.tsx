import { useTranslation } from 'react-i18next';

const HomeHero = () => {
  const { t } = useTranslation();
  const highlights = t('hero.highlights', { returnObjects: true }) as string[];

  return (
    <section id="home" className="bg-gradient-to-b from-white via-white to-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 py-24 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-8">
        <div className="max-w-2xl text-center lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">{t('hero.badge')}</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-secondary sm:text-5xl">{t('hero.title')}</h1>
          <p className="mt-6 text-lg text-slate-600 sm:text-xl">{t('hero.subtitle')}</p>
          <ul className="mt-6 flex flex-col gap-2 text-left text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:gap-3">
            {highlights.map((item) => (
              <li key={item} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {t('hero.cta')}
            </a>
            <a
              href="https://github.com/abenny31"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-slate-200 px-6 py-3 text-base font-semibold text-secondary shadow-sm transition hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {t('hero.secondaryCta')}
            </a>
          </div>
        </div>
        <div className="relative flex w-full max-w-xs shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100 shadow-xl ring-4 ring-primary/10 sm:max-w-sm lg:max-w-md">
          <img src={`${import.meta.env.BASE_URL}profile-ante.jpeg`} alt={t('hero.imageAlt')} className="h-full w-full object-cover" loading="lazy" />
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
