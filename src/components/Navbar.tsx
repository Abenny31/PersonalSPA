import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const navigationItems: Array<{ href: string; labelKey: string }> = [
  { href: '#about', labelKey: 'nav.about' },
  { href: '#projects', labelKey: 'nav.projects' },
  { href: '#contact', labelKey: 'nav.contact' }
];

const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center gap-3">
          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-label={t('nav.toggleLabel')}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:hidden"
          >
            <span className="sr-only">{t('nav.toggleLabel')}</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              {isOpen ? (
                <path fillRule="evenodd" d="M18.3 5.7a1 1 0 0 1 0 1.4L13.41 12l4.89 4.9a1 1 0 1 1-1.42 1.4L12 13.41l-4.88 4.89a1 1 0 1 1-1.42-1.42L10.59 12 5.7 7.12A1 1 0 0 1 7.12 5.7L12 10.59l4.88-4.9a1 1 0 0 1 1.42 0z" clipRule="evenodd" />
              ) : (
                <path fillRule="evenodd" d="M3.75 5A.75.75 0 0 1 4.5 4.25h15a.75.75 0 0 1 0 1.5h-15A.75.75 0 0 1 3.75 5zm0 7a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15A.75.75 0 0 1 3.75 12zm0 7a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75z" clipRule="evenodd" />
              )}
            </svg>
          </button>
          <a
            href="#home"
            className="text-base font-semibold text-secondary transition hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-lg"
            onClick={closeMenu}
          >
            {t('nav.brand')}
          </a>
        </div>
        <nav aria-label={t('nav.menuLabel')} className="hidden flex-1 md:flex md:justify-center">
          <ul className="flex items-center gap-6 text-sm font-medium text-slate-600">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-md px-2 py-1 transition hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {t(item.labelKey)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden md:block">
          <LanguageSwitcher />
        </div>
      </div>
      {isOpen && (
        <div className="border-t border-slate-200 bg-white/95 px-4 pb-6 pt-4 shadow-lg md:hidden">
          <nav aria-label={t('nav.menuLabel')}>
            <ul className="flex flex-col gap-3 text-base font-medium text-slate-700">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className="block rounded-md px-3 py-2 transition hover:bg-primary/10 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {t(item.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-4 border-t border-slate-200 pt-4">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
