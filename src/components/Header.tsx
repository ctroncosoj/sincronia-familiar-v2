import { useTranslation } from 'react-i18next';
import { formatTime, formatTrueSolarTime } from '../lib/astronomy';
import type { SunTimes } from '../lib/astronomy';
import { LanguageToggle } from './LanguageToggle';

interface Props {
  sunTimes: SunTimes | null;
  now: Date;
  lng: number;
  onSostenClick: () => void;
  onBrujulaClick: () => void;
}

function VedicCompassIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.75" className={className}>
      <defs>
        <linearGradient id="vedicTornasol" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="9" stroke="url(#vedicTornasol)" strokeDasharray="2 2" />
      <circle cx="12" cy="12" r="7" stroke="url(#vedicTornasol)" />
      <line x1="12" y1="3" x2="12" y2="21" stroke="url(#vedicTornasol)" strokeWidth="1" />
      <line x1="3" y1="12" x2="21" y2="12" stroke="url(#vedicTornasol)" strokeWidth="1" />
      <path d="M12 9C11 11 10 12 10 13C10 14.1046 10.8954 15 12 15C13.1046 15 14 14.1046 14 13C14 12 13 11 12 9Z" fill="url(#vedicTornasol)" opacity="0.4" />
      <polygon points="12,5 14,10 12,9 10,10" fill="url(#vedicTornasol)" />
    </svg>
  );
}

export function Header({ sunTimes, now, lng, onSostenClick, onBrujulaClick }: Props) {
  const { t } = useTranslation();
  const days: string[] = t('days', { returnObjects: true });
  const months: string[] = t('months', { returnObjects: true });

  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const solarTimeStr = formatTrueSolarTime(now, lng);

  return (
    <header
      className="px-6 pb-6 text-center relative"
      style={{ paddingTop: 'calc(4rem + env(safe-area-inset-top))' }}
    >
      {/* Right-side controls: Brujula + Emergency */}
      <div
        className="absolute right-0 flex items-center gap-2"
        style={{ top: 'calc(2rem + env(safe-area-inset-top))' }}
      >
        <button
          onClick={onBrujulaClick}
          title="Brújula de Sincronía"
          className="flex items-center justify-center transition-all duration-200 hover:opacity-80 active:scale-95"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', outline: 'none', padding: '2px' }}
        >
          <VedicCompassIcon className="w-8 h-8" />
        </button>

        <button
          onClick={onSostenClick}
          title={t('header.emergencyButtonTitle')}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all duration-200 hover:opacity-80 active:scale-95"
          style={{
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
      </div>

      {/* Language toggle — top left */}
      <div className="absolute left-0" style={{ top: 'calc(2rem + env(safe-area-inset-top))' }}>
        <LanguageToggle />
      </div>

      {/* Main title: Sincronía Familiar */}
      <h1
        className="leading-tight mb-1"
        style={{
          fontFamily: "'Playfair Display', serif",
          color: '#4A5D23',
          fontSize: 'clamp(1.9rem, 7vw, 2.6rem)',
          fontWeight: 700,
        }}
      >
        {t('app.tagline')}
      </h1>

      {/* Sub-brand: Senda Raíz */}
      <p
        className="mb-3 font-medium tracking-wider uppercase"
        style={{
          color: '#92400e',
          fontFamily: "'Lora', serif",
          fontSize: '0.72rem',
          letterSpacing: '0.18em',
          opacity: 0.85,
        }}
      >
        {t('app.title')}
      </p>

      <p
        className="text-xs mb-4 font-medium"
        style={{ color: '#44403c', fontFamily: "'Lora', serif" }}
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
            <span className="text-xs font-medium" style={{ color: '#44403c', fontFamily: "'Lora', serif" }}>
              {formatTime(sunTimes.sunrise)}
            </span>
          </div>
          <div className="w-10 h-px" style={{ background: 'linear-gradient(90deg, #D4A050, #C45A3A)' }} />
          <div className="flex items-center gap-1.5">
            <span style={{ color: '#C45A3A', fontSize: '13px' }}>↓</span>
            <span className="text-xs font-medium" style={{ color: '#44403c', fontFamily: "'Lora', serif" }}>
              {formatTime(sunTimes.sunset)}
            </span>
          </div>
          <div className="w-px h-3" style={{ backgroundColor: '#D8D0B8' }} />
          <div className="flex items-center gap-1.5">
            <span style={{ color: '#B87333', fontSize: '11px' }}>⊙</span>
            <span className="text-xs font-medium" style={{ color: '#44403c', fontFamily: "'Lora', serif" }}>
              {formatTime(sunTimes.solarNoon)}
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
