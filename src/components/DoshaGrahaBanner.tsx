import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { PlanetaryHour } from '../lib/astronomy';
import type { Child } from '../lib/children';
import type { DoshaType } from '../lib/doshas';
import { DOSHAS } from '../lib/doshas';
import { GRAHAS } from '../lib/grahas';
import { getRecommendation } from '../lib/doshaGrahaRules';

interface Props {
  currentHour: PlanetaryHour | null;
  children: Child[];
  selectedChildId: string | null;
}

const TONE_SYMBOLS: Record<string, string> = {
  calm: '◑',
  alert: '◈',
  energize: '✦',
  connect: '◎',
};

const TONE_COLORS: Record<string, { bg: string; border: string; text: string; tag: string }> = {
  calm:     { bg: '#EBF4FA', border: '#7AADCB', text: '#2A5A7A', tag: '#4A7A9B' },
  alert:    { bg: '#FFF0E8', border: '#D4844A', text: '#7A3010', tag: '#C45A3A' },
  energize: { bg: '#EBF5EC', border: '#6BAA72', text: '#1E4A25', tag: '#3A6B40' },
  connect:  { bg: '#FBF0F5', border: '#C890A8', text: '#6A2A45', tag: '#9A5070' },
};

function ChildRecommendation({
  child,
  graha,
  visible,
}: {
  child: Child;
  graha: (typeof GRAHAS)[keyof typeof GRAHAS];
  visible: boolean;
}) {
  const { t } = useTranslation();
  const dosha = child.dosha as DoshaType;
  const rec = getRecommendation(dosha, graha.id);
  const doshaData = DOSHAS[dosha];
  const tc = TONE_COLORS[rec.tone];

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border: `1px solid ${tc.border}`,
        backgroundColor: tc.bg,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}
    >
      <div className="px-4 py-3 flex items-center gap-3" style={{ borderBottom: `1px solid ${tc.border}20` }}>
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${tc.border}25` }}
        >
          <span style={{ color: tc.tag, fontSize: '15px' }}>{TONE_SYMBOLS[rec.tone]}</span>
        </div>

        <div className="flex-1 min-w-0 flex items-center gap-2 flex-wrap">
          <span
            className="text-sm font-semibold"
            style={{ color: tc.text, fontFamily: "'Lora', serif" }}
          >
            {child.name}
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: doshaData.borderColor + '25',
              color: doshaData.color,
              fontFamily: "'Lora', serif",
              border: `1px solid ${doshaData.borderColor}40`,
            }}
          >
            {dosha}
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{
              backgroundColor: `${tc.border}20`,
              color: tc.tag,
              fontFamily: "'Lora', serif",
            }}
          >
            {rec.keyword}
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: `${tc.border}12`,
              color: tc.text,
              fontFamily: "'Lora', serif",
              opacity: 0.7,
            }}
          >
            {t(`doshaGrahaBanner.tones.${rec.tone}`)}
          </span>
        </div>
      </div>

      <div className="px-4 py-3">
        <p
          className="text-xs leading-relaxed"
          style={{ color: tc.text, fontFamily: "'Lora', serif", opacity: 0.88 }}
        >
          {rec.message}
        </p>
      </div>
    </div>
  );
}

export function DoshaGrahaBanner({ currentHour, children, selectedChildId }: Props) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [renderedGrahaId, setRenderedGrahaId] = useState<string | null>(null);

  useEffect(() => {
    if (!currentHour) return;
    if (currentHour.graha !== renderedGrahaId) {
      setVisible(false);
      const timer = setTimeout(() => {
        setRenderedGrahaId(currentHour.graha);
        setVisible(true);
      }, 180);
      return () => clearTimeout(timer);
    } else {
      setVisible(true);
    }
  }, [currentHour?.graha]);

  if (!currentHour) return null;

  const graha = GRAHAS[currentHour.graha];
  const childrenWithDosha = children.filter((c) => c.dosha !== null);
  const displayChildren = selectedChildId
    ? childrenWithDosha.filter((c) => c.id === selectedChildId)
    : childrenWithDosha;

  if (displayChildren.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 px-1">
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: '#B87333', fontFamily: "'Lora', serif" }}
        >
          {t('doshaGrahaBanner.title')}
        </span>
        <div className="flex-1 h-px" style={{ backgroundColor: '#D8D0B830' }} />
        {selectedChildId && (
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: '#EDE8D8',
              color: '#7A6A50',
              fontFamily: "'Lora', serif",
              border: '1px solid #D8D0B8',
            }}
          >
            {displayChildren[0]?.name}
          </span>
        )}
        <span
          className="text-xs px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: graha.bgColor,
            color: graha.color,
            border: `1px solid ${graha.borderColor}50`,
            fontFamily: "'Lora', serif",
          }}
        >
          {graha.symbol} {graha.name}
        </span>
      </div>

      {displayChildren.map((child) => (
        <ChildRecommendation
          key={child.id}
          child={child}
          graha={graha}
          visible={visible}
        />
      ))}
    </div>
  );
}
