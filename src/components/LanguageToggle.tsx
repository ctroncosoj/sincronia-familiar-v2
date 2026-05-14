import { useTranslation } from 'react-i18next';

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const current = i18n.language;

  const toggle = () => {
    i18n.changeLanguage(current === 'es' ? 'en' : 'es');
  };

  return (
    <button
      onClick={toggle}
      title={current === 'es' ? 'Switch to English' : 'Cambiar a Español'}
      className="flex items-center rounded-lg transition-all duration-200 hover:opacity-80 active:scale-95"
      style={{
        backgroundColor: '#EDE8D5',
        border: '1px solid #D0C8AE',
        cursor: 'pointer',
        outline: 'none',
        padding: '3px',
        gap: 0,
      }}
    >
      {(['es', 'en'] as const).map((lang) => (
        <span
          key={lang}
          className="px-2 py-0.5 rounded-md text-xs font-medium transition-all duration-200"
          style={{
            fontFamily: "'Lora', serif",
            letterSpacing: '0.06em',
            backgroundColor: current === lang ? '#4A5D23' : 'transparent',
            color: current === lang ? '#F5EDD8' : '#9A8A60',
            fontSize: '10px',
          }}
        >
          {lang.toUpperCase()}
        </span>
      ))}
    </button>
  );
}
