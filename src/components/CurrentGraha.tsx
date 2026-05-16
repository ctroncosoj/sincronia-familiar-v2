import { useTranslation } from 'react-i18next';
import { formatCountdown, formatTime } from '../lib/astronomy';
import type { PlanetaryHour } from '../lib/astronomy';
import { GRAHAS, getPersonalizedGraha } from '../lib/grahas';
import type { Child } from '../lib/children';

interface Props {
  currentHour: PlanetaryHour | null;
  nextHour: PlanetaryHour | null;
  msToNextHour: number;
  children: Child[];
}

export function CurrentGraha({ currentHour, nextHour, msToNextHour, children }: Props) {
  const { t } = useTranslation();

  if (!currentHour) {
    return (
      <div className="text-center py-12">
        <p style={{ color: '#9A9A8A', fontFamily: "'Lora', serif" }}>{t('currentGraha.calculating')}</p>
      </div>
    );
  }

  const graha = getPersonalizedGraha(currentHour.graha, children);
  const nextGraha = nextHour ? GRAHAS[nextHour.graha] : null;
  const totalMs = currentHour.end.getTime() - currentHour.start.getTime();
  const elapsed = totalMs - msToNextHour;
  const progress = Math.min(1, Math.max(0, elapsed / totalMs));
  const isNight = currentHour.index > 12;

  return (
    <div className="space-y-3">
      <div
        className="rounded-3xl overflow-hidden transition-colors duration-1000"
        style={{
          backgroundColor: graha.bgColor,
          border: `2px solid ${graha.borderColor}`,
        }}
      >
        <div
          className="px-7 pt-7 pb-5"
          style={{ borderBottom: `1px solid ${graha.borderColor}30` }}
        >
          <div className="flex items-center justify-between mb-1">
            <span
              className="text-xs tracking-widest uppercase font-semibold"
              style={{ color: graha.color, opacity: 0.85, fontFamily: "'Lora', serif" }}
            >
              {t('currentGraha.hourLabel', { index: currentHour.index, period: isNight ? t('currentGraha.night') : t('currentGraha.day') })}
            </span>
            <span
              className="text-xs font-medium"
              style={{ color: graha.color, opacity: 0.75, fontFamily: "'Lora', serif" }}
            >
              {t('currentGraha.until', { time: formatTime(currentHour.end) })}
            </span>
          </div>

          <div className="flex items-end justify-between mt-4 mb-5">
            <div>
              <div className="flex items-baseline gap-4">
                <span
                  className="leading-none select-none"
                  style={{
                    fontSize: '72px',
                    color: graha.borderColor,
                    fontFamily: 'serif',
                    lineHeight: 1,
                    opacity: 0.9,
                  }}
                >
                  {graha.symbol}
                </span>
                <div>
                  <h2
                    className="leading-none mb-1"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: graha.color,
                      fontSize: '2.25rem',
                      fontWeight: 700,
                    }}
                  >
                    {graha.name}
                  </h2>
                  <p
                    className="text-sm font-medium"
                    style={{ color: graha.color, opacity: 0.8, fontFamily: "'Lora', serif", letterSpacing: '0.05em' }}
                  >
                    {graha.sanscrit} &mdash; {graha.planetName}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-right flex-shrink-0 ml-4">
              <p
                className="text-xs mb-1 uppercase tracking-widest font-semibold"
                style={{ color: graha.color, opacity: 0.85, fontFamily: "'Lora', serif" }}
              >
                {t('currentGraha.nextChange')}
              </p>
              <span
                className="tabular-nums font-light"
                style={{
                  color: graha.color,
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '2rem',
                  letterSpacing: '-0.02em',
                }}
              >
                {formatCountdown(msToNextHour)}
              </span>
            </div>
          </div>

          <div
            className="w-full rounded-full overflow-hidden mb-5"
            style={{ height: '3px', backgroundColor: `${graha.borderColor}25` }}
          >
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${progress * 100}%`, backgroundColor: graha.borderColor }}
            />
          </div>

          <p
            className="text-sm italic leading-relaxed"
            style={{ color: graha.color, fontFamily: "'Lora', serif", opacity: 0.8 }}
          >
            &ldquo;{graha.poeticMessage}&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-2 gap-0" style={{ borderBottom: `1px solid ${graha.borderColor}20` }}>
          <div
            className="px-6 py-5"
            style={{ borderRight: `1px solid ${graha.borderColor}20` }}
          >
            <p
              className="text-xs tracking-widest uppercase mb-3 flex items-center gap-1.5"
              style={{ color: graha.color, opacity: 0.85, fontFamily: "'Lora', serif" }}
            >
              <span style={{ fontSize: '14px' }}>✦</span> {t('currentGraha.whatToDo')}
            </p>
            <p
              className="text-xs leading-relaxed font-medium mb-2"
              style={{ color: graha.color, fontFamily: "'Lora', serif", opacity: 0.9 }}
            >
              {graha.parentFocus}
            </p>
            <p
              className="text-xs leading-relaxed"
              style={{ color: graha.color, fontFamily: "'Lora', serif", opacity: 0.65 }}
            >
              {graha.withChildren}
            </p>
          </div>

          <div className="px-6 py-5">
            <p
              className="text-xs tracking-widest uppercase mb-3 flex items-center gap-1.5"
              style={{ color: graha.color, opacity: 0.85, fontFamily: "'Lora', serif" }}
            >
              <span style={{ fontSize: '14px' }}>✗</span> {t('currentGraha.avoid')}
            </p>
            <p
              className="text-xs leading-relaxed"
              style={{ color: graha.color, fontFamily: "'Lora', serif", opacity: 0.65 }}
            >
              {graha.avoid}
            </p>
          </div>
        </div>

        <div className="px-6 py-4 flex items-center gap-2 flex-wrap">
          {graha.keywords.map((kw) => (
            <span
              key={kw}
              className="text-xs px-3 py-1 rounded-full"
              style={{
                backgroundColor: `${graha.borderColor}18`,
                color: graha.color,
                fontFamily: "'Lora', serif",
                border: `1px solid ${graha.borderColor}30`,
              }}
            >
              {kw}
            </span>
          ))}
        </div>
      </div>

      {nextGraha && nextHour && (
        <div
          className="rounded-2xl px-5 py-3.5 flex items-center gap-4 transition-colors duration-700"
          style={{
            backgroundColor: `${nextGraha.bgColor}90`,
            border: `1px solid ${nextGraha.borderColor}40`,
          }}
        >
          <span
            style={{ fontSize: '22px', color: nextGraha.borderColor, fontFamily: 'serif', opacity: 0.7 }}
          >
            {nextGraha.symbol}
          </span>
          <div className="flex-1 min-w-0">
            <p
              className="text-xs tracking-widest uppercase font-semibold mb-0.5"
              style={{ color: nextGraha.color, opacity: 0.85, fontFamily: "'Lora', serif" }}
            >
              {t('currentGraha.comingUp', { time: formatTime(nextHour.start) })}
            </p>
            <p
              className="text-sm"
              style={{ color: nextGraha.color, fontFamily: "'Lora', serif", opacity: 0.8 }}
            >
              {nextGraha.name} &mdash; {nextGraha.parentFocus}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
