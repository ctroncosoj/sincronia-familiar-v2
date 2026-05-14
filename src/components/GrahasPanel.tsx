import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GRAHAS, GRAHA_ORDER, getPersonalizedGraha } from '../lib/grahas';
import type { GrahaId } from '../lib/astronomy';
import type { Child } from '../lib/children';

interface Props {
  currentGrahaId: GrahaId | null;
  children: Child[];
}

export function GrahasPanel({ currentGrahaId, children }: Props) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<GrahaId | null>(null);
  const [open, setOpen] = useState(false);

  const activeId = selected ?? currentGrahaId ?? 'sun';
  const active = getPersonalizedGraha(activeId, children);

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl transition-colors duration-200"
        style={{
          backgroundColor: open ? '#E8E0C8' : '#EDE8D8',
          border: '1px solid #D8D0B8',
          cursor: 'pointer',
          outline: 'none',
        }}
      >
        <div className="flex items-center gap-2">
          <span style={{ color: '#B87333', fontSize: '13px' }}>✦</span>
          <span
            className="text-sm"
            style={{ color: '#5A4A30', fontFamily: "'Lora', serif", fontWeight: 600 }}
          >
            {t('grahasPanel.title')}
          </span>
        </div>
        <span
          className="text-xs transition-transform duration-300"
          style={{
            color: '#9A8A60',
            display: 'inline-block',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          ▾
        </span>
      </button>

      {open && (
        <div
          className="mt-2 rounded-3xl overflow-hidden"
          style={{ border: `2px solid ${active.borderColor}` }}
        >
          <div
            className="flex overflow-x-auto scrollbar-hide"
            style={{
              borderBottom: `1px solid ${active.borderColor}30`,
              backgroundColor: active.bgColor,
            }}
          >
            {GRAHA_ORDER.map((id) => {
              const g = GRAHAS[id];
              const isSel = id === activeId;
              const isCurrent = id === currentGrahaId;
              return (
                <button
                  key={id}
                  onClick={() => setSelected(id)}
                  className="flex-shrink-0 flex flex-col items-center gap-0.5 px-4 py-3 transition-all duration-200 relative"
                  style={{
                    backgroundColor: isSel ? `${g.borderColor}22` : 'transparent',
                    borderBottom: isSel ? `2px solid ${g.borderColor}` : '2px solid transparent',
                    outline: 'none',
                    cursor: 'pointer',
                    minWidth: '56px',
                  }}
                >
                  <span style={{ fontSize: '18px', color: isSel ? g.borderColor : g.color, opacity: isSel ? 1 : 0.55 }}>
                    {g.symbol}
                  </span>
                  <span
                    className="text-xs"
                    style={{
                      color: isSel ? g.color : '#8A8070',
                      fontFamily: "'Lora', serif",
                      fontWeight: isSel ? 600 : 400,
                      fontSize: '10px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {g.name}
                  </span>
                  {isCurrent && (
                    <span
                      className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: g.borderColor }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div
            className="px-6 py-5 transition-all duration-500"
            style={{ backgroundColor: active.bgColor }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span
                style={{
                  fontSize: '48px',
                  color: active.borderColor,
                  fontFamily: 'serif',
                  lineHeight: 1,
                  opacity: 0.85,
                }}
              >
                {active.symbol}
              </span>
              <div>
                <h3
                  className="leading-none mb-1"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: active.color,
                    fontSize: '1.5rem',
                    fontWeight: 700,
                  }}
                >
                  {active.name}
                </h3>
                <p
                  style={{
                    color: active.color,
                    opacity: 0.5,
                    fontFamily: "'Lora', serif",
                    fontSize: '0.8rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  {active.sanscrit} &mdash; {active.planetName}
                </p>
              </div>
            </div>

            <p
              className="text-sm italic leading-relaxed mb-4"
              style={{ color: active.color, fontFamily: "'Lora', serif", opacity: 0.8 }}
            >
              &ldquo;{active.poeticMessage}&rdquo;
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div
                className="rounded-2xl p-4"
                style={{
                  backgroundColor: `${active.borderColor}12`,
                  border: `1px solid ${active.borderColor}25`,
                }}
              >
                <p
                  className="text-xs tracking-widest uppercase mb-2 flex items-center gap-1"
                  style={{ color: active.color, opacity: 0.5, fontFamily: "'Lora', serif" }}
                >
                  <span>✦</span> {t('grahasPanel.whatToDo')}
                </p>
                <p
                  className="text-xs font-medium leading-relaxed mb-1"
                  style={{ color: active.color, fontFamily: "'Lora', serif" }}
                >
                  {active.parentFocus}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: active.color, opacity: 0.65, fontFamily: "'Lora', serif" }}
                >
                  {active.withChildren}
                </p>
              </div>

              <div
                className="rounded-2xl p-4"
                style={{
                  backgroundColor: '#FFFFFF30',
                  border: `1px solid ${active.borderColor}18`,
                }}
              >
                <p
                  className="text-xs tracking-widest uppercase mb-2 flex items-center gap-1"
                  style={{ color: active.color, opacity: 0.5, fontFamily: "'Lora', serif" }}
                >
                  <span>✗</span> {t('grahasPanel.avoid')}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: active.color, opacity: 0.65, fontFamily: "'Lora', serif" }}
                >
                  {active.avoid}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3">
              {active.keywords.map((kw) => (
                <span
                  key={kw}
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: `${active.borderColor}18`,
                    color: active.color,
                    fontFamily: "'Lora', serif",
                    border: `1px solid ${active.borderColor}30`,
                  }}
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
