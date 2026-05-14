import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { formatTime } from '../lib/astronomy';
import type { PlanetaryHour } from '../lib/astronomy';
import { GRAHAS } from '../lib/grahas';

interface Props {
  planetaryHours: PlanetaryHour[];
  now: Date;
  currentHour: PlanetaryHour | null;
}

export function HoraTimeline({ planetaryHours, now, currentHour }: Props) {
  const { t } = useTranslation();
  const nowMs = now.getTime();
  const currentIsNight = currentHour ? currentHour.index > 12 : false;
  const [showNight, setShowNight] = useState(false);

  const dayHours = planetaryHours.filter((h) => h.index <= 12);
  const nightHours = planetaryHours.filter((h) => h.index > 12);

  const activeTab = showNight || currentIsNight ? 'night' : 'day';
  const displayHours = activeTab === 'night' ? nightHours : dayHours;

  const renderHour = (h: PlanetaryHour) => {
    const graha = GRAHAS[h.graha];
    const isCurrent = currentHour?.index === h.index;
    const isPast = !isCurrent && nowMs >= h.end.getTime();

    return (
      <div
        key={h.index}
        className="flex items-center gap-3 px-4 py-3 transition-all duration-200"
        style={{
          backgroundColor: isCurrent ? `${graha.bgColor}` : 'transparent',
          borderLeft: isCurrent ? `3px solid ${graha.borderColor}` : '3px solid transparent',
          opacity: isPast && !isCurrent ? 0.4 : 1,
        }}
      >
        <span
          className="w-6 text-center flex-shrink-0 text-base"
          style={{ color: isCurrent ? graha.borderColor : graha.color, opacity: isCurrent ? 1 : 0.6 }}
        >
          {graha.symbol}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="text-sm"
              style={{
                color: isCurrent ? graha.color : '#5A5040',
                fontFamily: "'Lora', serif",
                fontWeight: isCurrent ? 600 : 400,
              }}
            >
              {graha.name}
            </span>
            {isCurrent && (
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: graha.borderColor,
                  color: '#FFFFFF',
                  fontFamily: "'Lora', serif",
                  fontSize: '10px',
                }}
              >
                {t('horaTimeline.now')}
              </span>
            )}
          </div>
          {isCurrent && (
            <p
              className="text-xs mt-0.5 truncate"
              style={{ color: graha.color, opacity: 0.6, fontFamily: "'Lora', serif" }}
            >
              {graha.parentFocus}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end flex-shrink-0">
          <span
            className="text-xs tabular-nums"
            style={{ color: '#9A9080', fontFamily: "'Lora', serif" }}
          >
            {formatTime(h.start)}
          </span>
          <span
            className="text-xs tabular-nums"
            style={{ color: '#B8B0A0', fontFamily: "'Lora', serif", fontSize: '10px' }}
          >
            {formatTime(h.end)}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p
          className="text-xs tracking-widest uppercase"
          style={{ color: '#B87333', fontFamily: "'Lora', serif" }}
        >
          {t('horaTimeline.title')}
        </p>
        <div
          className="flex rounded-full overflow-hidden"
          style={{ border: '1px solid #D8D0B8' }}
        >
          {(['day', 'night'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setShowNight(tab === 'night')}
              className="px-4 py-1 text-xs transition-colors duration-200"
              style={{
                fontFamily: "'Lora', serif",
                backgroundColor: activeTab === tab ? '#4A5D23' : 'transparent',
                color: activeTab === tab ? '#FFFFFF' : '#8A7A60',
                cursor: 'pointer',
                border: 'none',
                outline: 'none',
              }}
            >
              {tab === 'day' ? t('horaTimeline.day') : t('horaTimeline.night')}
            </button>
          ))}
        </div>
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: '1px solid #E0D8C0', backgroundColor: '#FDFAF3' }}
      >
        {displayHours.map((h, i) => (
          <div
            key={h.index}
            style={{ borderBottom: i < displayHours.length - 1 ? '1px solid #EDE8DC' : 'none' }}
          >
            {renderHour(h)}
          </div>
        ))}
      </div>
    </div>
  );
}
