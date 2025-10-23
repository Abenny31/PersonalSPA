import { useTranslation } from 'react-i18next';
import { FALLBACK_LANGUAGE, SUPPORTED_LANGUAGES } from '../i18n';

type LanguageOption = {
  code: (typeof SUPPORTED_LANGUAGES)[number];
  label: string;
};

const LANGUAGES: LanguageOption[] = SUPPORTED_LANGUAGES.map((code) => ({
  code,
  label: code.toUpperCase()
}));

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const currentLanguage = (i18n.resolvedLanguage ?? FALLBACK_LANGUAGE).split('-')[0] as (typeof SUPPORTED_LANGUAGES)[number];

  const handleChange = (lang: LanguageOption['code']) => {
    if (lang === currentLanguage) {
      return;
    }

    void i18n.changeLanguage(lang);
  };

  return (
    <div className="flex items-center gap-2" aria-label={t('nav.language')}>
      {LANGUAGES.map((lang) => {
        const isActive = lang.code === currentLanguage;

        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => handleChange(lang.code)}
            className={`rounded-md px-3 py-1 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              isActive
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate-500 hover:bg-slate-100'
            }`}
            aria-pressed={isActive}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
