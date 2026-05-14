import { useTranslation } from 'react-i18next';
import { formatTime, formatTrueSolarTime } from '../lib/astronomy';
import type { SunTimes } from '../lib/astronomy';
import { LanguageToggle } from './LanguageToggle';

interface Props {
  sunTimes: SunTimes | null;
  now: Date;
  lng: number;
  onSostenClick: () => void;
}

export function Header({ sunTimes, now, lng, onSostenClick }: Props) {
  const { t } = useTranslation();
  const days: string[] = t('days', { returnObjects: true });
  const months: string[] = t('months', { returnObjects: true });

  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const solarTimeStr = formatTrueSolarTime(now, lng);

  return (
    <header
      className="px-6 pb-6 text-center relative"
      style={{ paddingTop: 'calc(2.5rem + env(safe-area-inset-top))' }}
    >
      {/* Emergency button — top right */}
      <button
        onClick={onSostenClick}
        title={t('header.emergencyButtonTitle')}
        className="absolute right-0 flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all duration-200 hover:opacity-80 active:scale-95"
        style={{
          top: 'calc(2rem + env(safe-area-inset-top))',
          background: 'linear-gradient(135deg, #8B3A10 0%, #C97A3A 100%)',
          border: '1px solid #7A2A08',
          cursor: 'pointer',
          outline: 'none',
          boxShadow: '0 2px 8px rgba(139, 58, 16, 0.3)',
        }}
      >
        <span style={{ color: '#FDF0E0', fontSize: '13px', lineHeight: 1 }}>◈</span>
        <span
          className="text-xs"
          style={{ color: '#FDF0E0', fontFamily: "'Lora', serif", fontSize: '10px', letterSpacing: '0.04em', fontWeight: 600 }}
        >
          {t('header.emergencyButton')}
        </span>
      </button>

      {/* Language toggle — top left */}
      <div className="absolute left-0" style={{ top: 'calc(2rem + env(safe-area-inset-top))' }}>
        <LanguageToggle />
      </div>

      <p
        className="text-xs tracking-widest uppercase mb-2"
        style={{ color: '#B87333', fontFamily: "'Lora', serif", letterSpacing: '0.2em' }}
      >
        {t('app.tagline')}
      </p>
      <h1
        className="mb-1 leading-none"
        style={{
          fontFamily: "'Playfair Display', serif",
          color: '#4A5D23',
          fontSize: 'clamp(2.2rem, 8vw, 3.2rem)',
          fontWeight: 700,
        }}
      >
        {t('app.title')}
      </h1>

      <p
        className="text-xs mb-4"
        style={{ color: '#9A9070', fontFamily: "'Lora', serif" }}
      >
        {days[now.getDay()]}, {now.getDate()} de {months[now.getMonth()]}
      </p>

      <div className="flex items-stretch justify-center gap-3 flex-wrap">
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-2xl"
          style={{ backgroundColor: '#EDE8D8', border: '1px solid #D8D0B8' }}
        >
          <span style={{ color: '#9A9070', fontSize: '11px', fontFamily: "'Lora', serif" }}>
            {t('header.civilTime')}
          </span>
          <span
            className="tabular-nums font-medium"
            style={{ color: '#4A4030', fontFamily: "'Lora', serif", fontSize: '1rem' }}
          >
            {timeStr}
          </span>
        </div>

        <div
          className="flex items-center gap-2 px-4 py-2 rounded-2xl"
          style={{ backgroundColor: '#F5EDD8', border: '1px solid #C8B888' }}
        >
          <span style={{ color: '#B87333', fontSize: '12px' }}>☀</span>
          <div>
            <span style={{ color: '#8A6030', fontSize: '11px', fontFamily: "'Lora', serif" }}>
              {t('header.solarTime')}&nbsp;
            </span>
            <span
              className="tabular-nums font-medium"
              style={{ color: '#6A4020', fontFamily: "'Lora', serif", fontSize: '1rem' }}
            >
              {solarTimeStr}
            </span>
          </div>
        </div>
      </div>

      {sunTimes && (
        <div className="flex items-center justify-center gap-5 mt-4">
          <div className="flex items-center gap-1.5">
            <span style={{ color: '#D4A050', fontSize: '13px' }}>↑</span>
            <span className="text-xs" style={{ color: '#8B7A5A', fontFamily: "'Lora', serif" }}>
              {formatTime(sunTimes.sunrise)}
            </span>
          </div>
          <div className="w-10 h-px" style={{ background: 'linear-gradient(90deg, #D4A050, #C45A3A)' }} />
          <div className="flex items-center gap-1.5">
            <span style={{ color: '#C45A3A', fontSize: '13px' }}>↓</span>
            <span className="text-xs" style={{ color: '#8B7A5A', fontFamily: "'Lora', serif" }}>
              {formatTime(sunTimes.sunset)}
            </span>
          </div>
          <div className="w-px h-3" style={{ backgroundColor: '#D8D0B8' }} />
          <div className="flex items-center gap-1.5">
            <span style={{ color: '#B87333', fontSize: '11px' }}>⊙</span>
            <span className="text-xs" style={{ color: '#8B7A5A', fontFamily: "'Lora', serif" }}>
              {formatTime(sunTimes.solarNoon)}
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
