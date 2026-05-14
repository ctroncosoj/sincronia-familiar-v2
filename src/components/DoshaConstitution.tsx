import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DOSHAS, getAllFoods } from '../lib/doshas';
import type { DoshaType, DoshaData } from '../lib/doshas';

function HeartIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function StormIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      <path d="M11 12 9 17l3-1-2 5" />
    </svg>
  );
}

function LeafIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function AlertCircleIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function ZapIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function SearchIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ChevronDownIcon({ size = 14, open }: { size?: number; open: boolean }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ transition: 'transform 0.3s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function FoodList({ foods, type, color }: { foods: { name: string; note?: string }[]; type: 'nourishing' | 'moderate'; color: string }) {
  const { t } = useTranslation();
  const isNourishing = type === 'nourishing';
  return (
    <div>
      <p
        className="text-xs tracking-widest uppercase mb-2 flex items-center gap-1.5"
        style={{ color: isNourishing ? color : '#9A7A50', fontFamily: "'Lora', serif", opacity: 0.75 }}
      >
        <span style={{ fontSize: '10px' }}>{isNourishing ? '✦' : '◦'}</span>
        {isNourishing ? t('doshaConstitution.nourishingFoods') : t('doshaConstitution.moderateLabel')}
      </p>
      <ul className="space-y-1">
        {foods.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <span style={{ color: isNourishing ? color : '#C4944A', fontSize: '8px', marginTop: '5px', flexShrink: 0 }}>
              {isNourishing ? '●' : '▸'}
            </span>
            <span className="text-xs leading-relaxed" style={{ color: '#5A4A30', fontFamily: "'Lora', serif" }}>
              {f.name}
              {f.note && <span style={{ color: '#9A8A60', fontSize: '10px' }}> — {f.note}</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EmotionalThermometer({ dosha }: { dosha: DoshaData }) {
  const { t } = useTranslation();
  const [active, setActive] = useState<'balance' | 'alert'>('balance');
  const state = active === 'balance' ? dosha.balanced : dosha.dysregulated;

  return (
    <div>
      <p className="text-xs tracking-widest uppercase mb-2.5" style={{ color: dosha.accentColor, fontFamily: "'Lora', serif", opacity: 0.65 }}>
        {t('doshaConstitution.thermometerTitle')}
      </p>
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setActive('balance')}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs transition-all duration-200"
          style={{
            backgroundColor: active === 'balance' ? `${dosha.color}18` : '#F5F0E5',
            border: active === 'balance' ? `1.5px solid ${dosha.borderColor}` : '1.5px solid #E0D8C0',
            color: active === 'balance' ? dosha.color : '#9A8A60',
            fontFamily: "'Lora', serif",
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <span style={{ color: active === 'balance' ? dosha.color : '#9A8A60' }}>
            <HeartIcon size={12} />
          </span>
          {t('doshaConstitution.balanced')}
        </button>
        <button
          onClick={() => setActive('alert')}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs transition-all duration-200"
          style={{
            backgroundColor: active === 'alert' ? '#FDF0E8' : '#F5F0E5',
            border: active === 'alert' ? '1.5px solid #D4844A' : '1.5px solid #E0D8C0',
            color: active === 'alert' ? '#9A4A20' : '#9A8A60',
            fontFamily: "'Lora', serif",
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <span style={{ color: active === 'alert' ? '#C46030' : '#9A8A60' }}>
            <StormIcon size={12} />
          </span>
          {t('doshaConstitution.alert')}
        </button>
      </div>

      <div
        className="rounded-xl px-4 py-3"
        style={{
          backgroundColor: active === 'balance' ? `${dosha.bgColor}` : '#FEF6F0',
          border: `1px solid ${active === 'balance' ? dosha.borderColor + '40' : '#D4844A40'}`,
        }}
      >
        <ul className="space-y-1.5">
          {state.signs.map((sign, i) => (
            <li key={i} className="flex items-start gap-2">
              <span style={{ color: active === 'balance' ? dosha.color : '#D4844A', marginTop: '1px', flexShrink: 0 }}>
                {active === 'balance' ? <HeartIcon size={11} /> : <AlertCircleIcon size={11} />}
              </span>
              <span
                className="text-xs leading-relaxed"
                style={{ color: active === 'balance' ? dosha.accentColor : '#7A3A10', fontFamily: "'Lora', serif" }}
              >
                {sign}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function EmergencyButton({ dosha }: { dosha: DoshaData }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200"
        style={{
          backgroundColor: '#B87333',
          border: '2px solid #9A5A1A',
          cursor: 'pointer',
          outline: 'none',
          boxShadow: expanded ? 'none' : '0 3px 12px rgba(184,115,51,0.35)',
        }}
      >
        <div className="flex items-center gap-2.5">
          <span style={{ color: '#FDFAF3' }}><ZapIcon size={15} /></span>
          <span className="text-sm font-semibold text-left" style={{ color: '#FDFAF3', fontFamily: "'Lora', serif" }}>
            {t('doshaConstitution.emergencyBtn')}
          </span>
        </div>
        <span style={{ color: '#F5EDD8' }}>
          <ChevronDownIcon size={14} open={expanded} />
        </span>
      </button>

      {expanded && (
        <div
          className="mt-2 rounded-2xl px-4 py-4 space-y-3"
          style={{ backgroundColor: '#FDF6EC', border: '1px solid #E8C88A' }}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#4A5D2320', border: '1px solid #4A5D2340' }}
            >
              <span style={{ color: '#4A5D23' }}><LeafIcon size={14} /></span>
            </div>
            <div>
              <p
                className="text-xs tracking-widest uppercase mb-1"
                style={{ color: '#4A5D23', fontFamily: "'Lora', serif", opacity: 0.7 }}
              >
                {t('doshaConstitution.regulationActivity')}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: '#3A3020', fontFamily: "'Lora', serif", lineHeight: '1.7' }}>
                {dosha.emergency.activity}
              </p>
            </div>
          </div>

          <div
            className="rounded-xl px-3.5 py-3 flex items-start gap-3"
            style={{ backgroundColor: '#F5EDD8', border: '1px solid #DDD5BB' }}
          >
            <span style={{ color: '#B87333', fontSize: '16px', lineHeight: 1, marginTop: '1px' }}>✦</span>
            <div>
              <p
                className="text-xs tracking-widest uppercase mb-1"
                style={{ color: '#B87333', fontFamily: "'Lora', serif", opacity: 0.7 }}
              >
                {t('doshaConstitution.rescueFood')}
              </p>
              <p
                className="text-xs leading-relaxed"
                style={{ color: '#5A3A10', fontFamily: "'Lora', serif", lineHeight: '1.7', fontWeight: 500 }}
              >
                {dosha.emergency.food}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DoshaCard({ dosha }: { dosha: DoshaData }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [foodsOpen, setFoodsOpen] = useState<'none' | 'nourishing' | 'moderate'>('none');

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{ border: `1.5px solid ${dosha.borderColor}60`, backgroundColor: '#FDFAF3' }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 transition-colors duration-200"
        style={{ backgroundColor: open ? `${dosha.bgColor}` : '#FDFAF3', border: 'none', cursor: 'pointer', outline: 'none' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${dosha.color}18`, border: `1.5px solid ${dosha.borderColor}60` }}
          >
            <span style={{ color: dosha.color, fontSize: '14px', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
              {dosha.name.charAt(0)}
            </span>
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold" style={{ color: dosha.accentColor, fontFamily: "'Lora', serif" }}>
              {dosha.name}
            </p>
            <p className="text-xs" style={{ color: dosha.color, fontFamily: "'Lora', serif", opacity: 0.75 }}>
              {dosha.element}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-xs px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: `${dosha.color}15`,
              color: dosha.color,
              fontFamily: "'Lora', serif",
              border: `1px solid ${dosha.borderColor}40`,
              fontSize: '10px',
            }}
          >
            {dosha.tagline.split(' · ')[0]}
          </span>
          <span style={{ color: dosha.color }}>
            <ChevronDownIcon size={14} open={open} />
          </span>
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-5" style={{ borderTop: `1px solid ${dosha.borderColor}30` }}>
          <div className="pt-4">
            <p
              className="text-xs tracking-widest uppercase mb-2"
              style={{ color: dosha.accentColor, fontFamily: "'Lora', serif", opacity: 0.65 }}
            >
              {t('doshaConstitution.childProfile')}
            </p>
            <p className="text-xs leading-relaxed" style={{ color: '#5A4A30', fontFamily: "'Lora', serif", lineHeight: '1.75' }}>
              {dosha.profile}
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${dosha.borderColor}30` }}>
            <button
              onClick={() => setFoodsOpen(foodsOpen === 'nourishing' ? 'none' : 'nourishing')}
              className="w-full flex items-center justify-between px-4 py-3 transition-colors duration-200"
              style={{ backgroundColor: foodsOpen === 'nourishing' ? `${dosha.bgColor}` : '#F8F4EB', border: 'none', cursor: 'pointer', outline: 'none' }}
            >
              <span className="text-xs font-medium flex items-center gap-1.5" style={{ color: dosha.color, fontFamily: "'Lora', serif" }}>
                <span style={{ fontSize: '10px' }}>✦</span> {t('doshaConstitution.nourishingFoods')}
              </span>
              <ChevronDownIcon size={12} open={foodsOpen === 'nourishing'} />
            </button>
            {foodsOpen === 'nourishing' && (
              <div className="px-4 py-3" style={{ backgroundColor: `${dosha.bgColor}80` }}>
                <FoodList foods={dosha.nourishingFoods} type="nourishing" color={dosha.color} />
              </div>
            )}

            <div style={{ borderTop: `1px solid ${dosha.borderColor}20` }}>
              <button
                onClick={() => setFoodsOpen(foodsOpen === 'moderate' ? 'none' : 'moderate')}
                className="w-full flex items-center justify-between px-4 py-3 transition-colors duration-200"
                style={{ backgroundColor: foodsOpen === 'moderate' ? '#FDF0E8' : '#F8F4EB', border: 'none', cursor: 'pointer', outline: 'none' }}
              >
                <span className="text-xs font-medium flex items-center gap-1.5" style={{ color: '#9A4A20', fontFamily: "'Lora', serif" }}>
                  <span style={{ fontSize: '10px' }}>◦</span> {t('doshaConstitution.moderateFoods')}
                </span>
                <ChevronDownIcon size={12} open={foodsOpen === 'moderate'} />
              </button>
              {foodsOpen === 'moderate' && (
                <div className="px-4 py-3" style={{ backgroundColor: '#FEF6F080' }}>
                  <FoodList foods={dosha.moderateFoods} type="moderate" color={dosha.color} />
                </div>
              )}
            </div>
          </div>

          <EmotionalThermometer dosha={dosha} />
          <EmergencyButton dosha={dosha} />
        </div>
      )}
    </div>
  );
}

function FoodSearch() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return getAllFoods().filter((f) => {
      const name = f.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const note = (f.note ?? '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return name.includes(q) || note.includes(q);
    });
  }, [query]);

  const DOSHA_COLORS: Record<DoshaType, string> = {
    Vata:  '#4A7A9B',
    Pitta: '#9A4A20',
    Kapha: '#3A6B40',
  };

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #DDD5BB', backgroundColor: '#FDFAF3' }}>
      <div className="px-4 pt-4 pb-3">
        <p
          className="text-xs tracking-widest uppercase mb-3 flex items-center gap-1.5"
          style={{ color: '#B87333', fontFamily: "'Lora', serif", opacity: 0.7 }}
        >
          <span style={{ fontSize: '10px' }}>✦</span> {t('doshaConstitution.searchTitle')}
        </p>
        <div
          className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5"
          style={{ border: '1.5px solid #DDD5BB', backgroundColor: '#F8F4EB' }}
        >
          <span style={{ color: '#B0A07A', flexShrink: 0 }}><SearchIcon size={15} /></span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('doshaConstitution.searchPlaceholder')}
            className="flex-1 bg-transparent text-sm outline-none placeholder:opacity-40"
            style={{ color: '#5A4A30', fontFamily: "'Lora', serif" }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ color: '#B0A07A', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', lineHeight: 1 }}
            >
              ×
            </button>
          )}
        </div>
      </div>

      {query.trim() && (
        <div className="px-4 pb-4" style={{ borderTop: '1px solid #EDE8DC' }}>
          {results.length === 0 ? (
            <p className="text-xs text-center py-4 italic" style={{ color: '#9A8A60', fontFamily: "'Lora', serif" }}>
              {t('doshaConstitution.notFound')}
            </p>
          ) : (
            <div className="pt-3 space-y-2">
              {results.map((f, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between gap-3 px-3.5 py-2.5 rounded-xl"
                  style={{ backgroundColor: '#F5F0E5', border: '1px solid #E0D8C0' }}
                >
                  <div>
                    <p className="text-xs font-medium" style={{ color: '#3A2A10', fontFamily: "'Lora', serif" }}>
                      {f.name}
                    </p>
                    {f.note && (
                      <p className="text-xs" style={{ color: '#9A8A60', fontFamily: "'Lora', serif", fontSize: '10px' }}>
                        {f.note}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${DOSHA_COLORS[f.dosha]}18`,
                        color: DOSHA_COLORS[f.dosha],
                        border: `1px solid ${DOSHA_COLORS[f.dosha]}40`,
                        fontFamily: "'Lora', serif",
                        fontSize: '10px',
                      }}
                    >
                      {f.dosha}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: f.type === 'nourishing' ? '#4A5D2315' : '#9A4A2015',
                        color: f.type === 'nourishing' ? '#4A5D23' : '#9A4A20',
                        border: `1px solid ${f.type === 'nourishing' ? '#4A5D2330' : '#9A4A2030'}`,
                        fontFamily: "'Lora', serif",
                        fontSize: '10px',
                      }}
                    >
                      {f.type === 'nourishing' ? t('doshaConstitution.tagNourishing') : t('doshaConstitution.tagModerate')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function DoshaConstitution() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const doshaTypes: DoshaType[] = ['Vata', 'Pitta', 'Kapha'];

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl transition-colors duration-200"
        style={{ backgroundColor: open ? '#E8E0C8' : '#EDE8D8', border: '1px solid #D8D0B8', cursor: 'pointer', outline: 'none' }}
      >
        <div className="flex items-center gap-2">
          <span style={{ color: '#4A5D23', fontSize: '13px' }}>✦</span>
          <span className="text-sm" style={{ color: '#5A4A30', fontFamily: "'Lora', serif", fontWeight: 600 }}>
            {t('doshaConstitution.title')}
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ backgroundColor: '#4A5D2318', color: '#4A5D23', border: '1px solid #4A5D2330', fontFamily: "'Lora', serif", fontSize: '10px' }}
          >
            {t('doshaConstitution.badge')}
          </span>
        </div>
        <span
          className="text-xs transition-transform duration-300"
          style={{ color: '#9A8A60', display: 'inline-block', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="mt-2 rounded-3xl overflow-hidden" style={{ border: '1px solid #DDD5BB', backgroundColor: '#FDFAF3' }}>
          <div className="px-5 pt-5 pb-4">
            <p
              className="text-xs tracking-widest uppercase mb-1"
              style={{ color: '#4A5D23', fontFamily: "'Lora', serif" }}
            >
              {t('doshaConstitution.sectionTitle')}
            </p>
            <p className="text-xs leading-relaxed mb-5" style={{ color: '#9A8A60', fontFamily: "'Lora', serif" }}>
              {t('doshaConstitution.intro')}
            </p>

            <div className="space-y-3 mb-5">
              {doshaTypes.map((id) => (
                <DoshaCard key={id} dosha={DOSHAS[id]} />
              ))}
            </div>

            <FoodSearch />
          </div>

          <div
            className="px-5 py-3.5 flex items-start gap-2.5"
            style={{ borderTop: '1px solid #EDE8DC', backgroundColor: '#F5F0E5' }}
          >
            <span style={{ color: '#4A5D23', fontSize: '13px', marginTop: '1px', flexShrink: 0 }}>✦</span>
            <p className="text-xs leading-relaxed" style={{ color: '#9A8A60', fontFamily: "'Lora', serif" }}>
              {t('doshaConstitution.disclaimer')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
