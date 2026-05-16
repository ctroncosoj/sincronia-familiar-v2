import { useTranslation } from 'react-i18next';
import { formatTime } from '../lib/astronomy';
import type { RahuKaalPeriod } from '../lib/astronomy';

interface Props {
  rahuKaal: RahuKaalPeriod;
  active: boolean;
  msToEnd?: number;
}

export function RahuKaalAlert({ rahuKaal, active, msToEnd }: Props) {
  const { t } = useTranslation();
  const minutes = msToEnd ? Math.ceil(msToEnd / 60000) : null;

  if (active) {
    return (
      <div
        className="rounded-3xl overflow-hidden"
        style={{ border: '2px solid #7A3A10' }}
      >
        <div
          className="px-6 py-5"
          style={{ backgroundColor: '#3A1A06' }}
        >
          <div className="flex items-start gap-4">
            <div
              className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#7A3A10' }}
            >
              <span
                className="animate-pulse"
                style={{ fontSize: '18px', color: '#F5C070' }}
              >
                ◈
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="font-semibold mb-1"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: '#F5C070',
                  fontSize: '1.1rem',
                }}
              >
                {t('rahuKaal.active')}
              </p>
              <p
                className="text-xs leading-relaxed mb-3"
                style={{ color: '#D4A060', fontFamily: "'Lora', serif" }}
              >
                {t('rahuKaal.activeDesc')}
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: '#7A3A1088', border: '1px solid #C47030' }}
                >
                  <p
                    className="text-xs"
                    style={{ color: '#F5C070', fontFamily: "'Lora', serif" }}
                  >
                    {t('rahuKaal.endsAt', { time: formatTime(rahuKaal.end) })}
                    {minutes && t('rahuKaal.minutesLeft', { minutes })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="px-6 py-3 flex items-center gap-2"
          style={{ backgroundColor: '#4A2A0E' }}
        >
          <span style={{ color: '#C47030', fontSize: '11px' }}>✦</span>
          <p
            className="text-xs italic"
            style={{ color: '#B08050', fontFamily: "'Lora', serif" }}
          >
            {t('rahuKaal.suggestion')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl px-5 py-4 flex items-center gap-4"
      style={{
        backgroundColor: '#FBF5E8',
        border: '1px solid #DDD0B0',
      }}
    >
      <span style={{ fontSize: '20px', color: '#B87333', opacity: 0.6 }}>◈</span>
      <div className="flex-1 min-w-0">
        <p
          className="text-xs tracking-widest uppercase mb-0.5"
          style={{ color: '#B87333', opacity: 0.7, fontFamily: "'Lora', serif" }}
        >
          {t('rahuKaal.today')}
        </p>
        <p
          className="text-sm"
          style={{ color: '#7A5A30', fontFamily: "'Lora', serif" }}
        >
          {formatTime(rahuKaal.start)} &mdash; {formatTime(rahuKaal.end)}
        </p>
      </div>
      <p
        className="text-xs text-right flex-shrink-0 font-medium"
        style={{ color: '#44403c', fontFamily: "'Lora', serif", maxWidth: '120px' }}
      >
        {t('rahuKaal.avoidDecisions')}
      </p>
    </div>
  );
}
