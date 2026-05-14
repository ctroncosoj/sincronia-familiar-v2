import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { Child } from '../lib/children';
import type { Dosha } from '../lib/children';

const DOSHA_COLORS: Record<Dosha, { color: string; bg: string; border: string }> = {
  Vata:  { color: '#2A5A7A', bg: '#EBF4FA', border: '#7AADCB' },
  Pitta: { color: '#7A3010', bg: '#FFF0E8', border: '#D4844A' },
  Kapha: { color: '#1E4A25', bg: '#EBF5EC', border: '#6BAA72' },
};

interface Props {
  children: Child[];
  selectedChildId: string | null;
  onSelectChild: (id: string | null) => void;
  onAdd: (name: string) => void;
  onRemove: (id: string) => void;
  onUpdateDosha: (id: string, dosha: Child['dosha']) => void;
  onUpdateName: (id: string, name: string) => void;
}

function ChildCard({
  child,
  isSelected,
  onSelect,
  onRemove,
  onUpdateDosha,
  onUpdateName,
}: {
  child: Child;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: (id: string) => void;
  onUpdateDosha: (id: string, dosha: Child['dosha']) => void;
  onUpdateName: (id: string, name: string) => void;
}) {
  const { t } = useTranslation();
  const [editingName, setEditingName] = useState(false);
  const [nameVal, setNameVal] = useState(child.name);
  const inputRef = useRef<HTMLInputElement>(null);

  const DOSHAS_LIST: { value: Dosha; color: string }[] = [
    { value: 'Vata',  color: '#7AADCB' },
    { value: 'Pitta', color: '#D4844A' },
    { value: 'Kapha', color: '#6BAA72' },
  ];

  useEffect(() => {
    if (editingName && inputRef.current) inputRef.current.focus();
  }, [editingName]);

  const commitName = () => {
    setEditingName(false);
    if (nameVal.trim() && nameVal.trim() !== child.name) {
      onUpdateName(child.id, nameVal.trim());
    } else {
      setNameVal(child.name);
    }
  };

  const activeDosha = child.dosha ? DOSHAS_LIST.find((d) => d.value === child.dosha) : null;
  const doshaColors = child.dosha ? DOSHA_COLORS[child.dosha] : null;

  const selectedBg     = doshaColors ? doshaColors.bg     : '#F0EBE0';
  const selectedBorder = doshaColors ? doshaColors.border : '#B87333';
  const selectedText   = doshaColors ? doshaColors.color  : '#5A4A30';

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        border: isSelected ? `2px solid ${selectedBorder}` : '1px solid #DDD5BB',
        backgroundColor: isSelected ? selectedBg : '#FDFAF3',
        boxShadow: isSelected ? `0 2px 12px ${selectedBorder}25` : 'none',
      }}
    >
      <button
        onClick={onSelect}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all duration-200"
        style={{ background: 'none', border: 'none', cursor: 'pointer', outline: 'none' }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm select-none transition-colors duration-300"
          style={{
            backgroundColor: isSelected ? selectedBorder : '#EDE8D5',
            color: isSelected ? '#FFFFFF' : '#B87333',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
          }}
        >
          {child.name.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1 min-w-0">
          <div
            className="text-sm truncate"
            style={{
              color: isSelected ? selectedText : '#5A4A30',
              fontFamily: "'Lora', serif",
              fontWeight: isSelected ? 700 : 600,
            }}
          >
            {child.name}
          </div>

          {child.dosha && activeDosha ? (
            <div className="flex items-center gap-1 mt-0.5">
              <span
                className="w-1.5 h-1.5 rounded-full inline-block"
                style={{ backgroundColor: activeDosha.color }}
              />
              <span
                className="text-xs"
                style={{ color: isSelected ? selectedText : activeDosha.color, fontFamily: "'Lora', serif", opacity: isSelected ? 0.7 : 1 }}
              >
                {child.dosha} &mdash; {t(`familyProfile.doshaDescriptions.${child.dosha}`)}
              </span>
            </div>
          ) : (
            <span className="text-xs" style={{ color: '#B0A07A', fontFamily: "'Lora', serif" }}>
              {t('familyProfile.noDosha')}
            </span>
          )}
        </div>

        {isSelected && (
          <span
            className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs"
            style={{ backgroundColor: selectedBorder, color: '#FFFFFF' }}
          >
            ✓
          </span>
        )}
      </button>

      {isSelected && (
        <div
          className="px-4 pb-4 pt-1"
          style={{ borderTop: `1px solid ${selectedBorder}30` }}
        >
          <div className="flex items-center justify-between mb-2.5">
            <p
              className="text-xs tracking-widest uppercase"
              style={{ color: selectedText, fontFamily: "'Lora', serif", opacity: 0.6 }}
            >
              {t('familyProfile.prakritiOf', { name: child.name })}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); setEditingName(true); }}
                className="text-xs px-2.5 py-1 rounded-lg transition-opacity hover:opacity-70"
                style={{
                  backgroundColor: `${selectedBorder}20`,
                  color: selectedText,
                  fontFamily: "'Lora', serif",
                  border: `1px solid ${selectedBorder}30`,
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                {t('familyProfile.rename')}
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onRemove(child.id); }}
                className="text-xs px-2.5 py-1 rounded-lg transition-opacity hover:opacity-70"
                style={{
                  backgroundColor: '#FFF0E8',
                  color: '#C45A3A',
                  fontFamily: "'Lora', serif",
                  border: '1px solid #D4844A30',
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                {t('familyProfile.remove')}
              </button>
            </div>
          </div>

          {editingName && (
            <div
              className="mb-3 rounded-xl px-3 py-2"
              style={{ border: `1px solid ${selectedBorder}60`, backgroundColor: '#FDFAF3' }}
            >
              <input
                ref={inputRef}
                value={nameVal}
                onChange={(e) => setNameVal(e.target.value)}
                onBlur={commitName}
                onKeyDown={(e) => e.key === 'Enter' && commitName()}
                className="w-full bg-transparent outline-none text-sm"
                style={{ color: '#5A4A30', fontFamily: "'Lora', serif" }}
              />
            </div>
          )}

          <div className="flex gap-2 flex-wrap">
            {DOSHAS_LIST.map((d) => {
              const isActive = child.dosha === d.value;
              return (
                <button
                  key={d.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateDosha(child.id, isActive ? null : d.value);
                  }}
                  className="flex flex-col items-start px-3.5 py-2.5 rounded-xl transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? `${d.color}22` : '#F5F0E5',
                    border: isActive ? `1.5px solid ${d.color}` : '1.5px solid #E0D8C0',
                    cursor: 'pointer',
                    outline: 'none',
                    minWidth: '80px',
                  }}
                >
                  <span
                    className="text-xs font-semibold"
                    style={{ color: isActive ? d.color : '#8A7A60', fontFamily: "'Lora', serif" }}
                  >
                    {d.value}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: isActive ? d.color : '#A09070', fontFamily: "'Lora', serif", fontSize: '10px', opacity: 0.8 }}
                  >
                    {t(`familyProfile.doshaDescriptions.${d.value}`)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function FamilyProfile({
  children,
  selectedChildId,
  onSelectChild,
  onAdd,
  onRemove,
  onUpdateDosha,
  onUpdateName,
}: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    if (!inputVal.trim()) return;
    onAdd(inputVal.trim());
    setInputVal('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAdd();
  };

  const handleSelectChild = (id: string) => {
    onSelectChild(selectedChildId === id ? null : id);
  };

  const selectedChild = children.find((c) => c.id === selectedChildId);
  const selectedDosha = selectedChild?.dosha;
  const doshaColor = selectedDosha ? DOSHA_COLORS[selectedDosha] : null;

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
        <div className="flex items-center gap-2 min-w-0">
          <span style={{ color: '#B87333', fontSize: '13px' }}>✦</span>
          <span
            className="text-sm"
            style={{ color: '#5A4A30', fontFamily: "'Lora', serif", fontWeight: 600 }}
          >
            {t('familyProfile.title')}
          </span>
          {children.length > 0 && (
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: '#D4A05022',
                color: '#B87333',
                border: '1px solid #D4A05040',
                fontFamily: "'Lora', serif",
                fontSize: '10px',
              }}
            >
              {t('familyProfile.childCount', { count: children.length })}
            </span>
          )}
          {selectedChild && doshaColor && (
            <span
              className="text-xs px-2 py-0.5 rounded-full truncate max-w-[120px]"
              style={{
                backgroundColor: doshaColor.bg,
                color: doshaColor.color,
                border: `1px solid ${doshaColor.border}60`,
                fontFamily: "'Lora', serif",
                fontSize: '10px',
              }}
            >
              {selectedChild.name}
            </span>
          )}
        </div>
        <span
          className="text-xs transition-transform duration-300 flex-shrink-0"
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
          style={{ border: '1px solid #DDD5BB', backgroundColor: '#FDFAF3' }}
        >
          <div className="px-5 pt-5 pb-4">
            <p
              className="text-xs tracking-widest uppercase mb-1"
              style={{ color: '#B87333', fontFamily: "'Lora', serif" }}
            >
              {t('familyProfile.yourChildren')}
            </p>
            <p
              className="text-xs leading-relaxed mb-4"
              style={{ color: '#9A8A60', fontFamily: "'Lora', serif" }}
            >
              {t('familyProfile.selectHint')}
            </p>

            <div className="space-y-2 mb-4">
              {children.map((child) => (
                <ChildCard
                  key={child.id}
                  child={child}
                  isSelected={selectedChildId === child.id}
                  onSelect={() => handleSelectChild(child.id)}
                  onRemove={onRemove}
                  onUpdateDosha={onUpdateDosha}
                  onUpdateName={onUpdateName}
                />
              ))}
            </div>

            <div
              className="flex gap-2 items-center rounded-2xl px-4 py-2.5"
              style={{ border: '1.5px solid #DDD5BB', backgroundColor: '#F8F4EB' }}
            >
              <input
                ref={inputRef}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('familyProfile.addPlaceholder')}
                className="flex-1 bg-transparent text-sm outline-none placeholder:opacity-40"
                style={{ color: '#5A4A30', fontFamily: "'Lora', serif" }}
              />
              <button
                onClick={handleAdd}
                disabled={!inputVal.trim()}
                className="px-4 py-1.5 rounded-xl text-xs font-medium transition-all duration-200"
                style={{
                  backgroundColor: inputVal.trim() ? '#B87333' : '#DDD5BB',
                  color: inputVal.trim() ? '#FFFFFF' : '#A09070',
                  fontFamily: "'Lora', serif",
                  border: 'none',
                  cursor: inputVal.trim() ? 'pointer' : 'default',
                  outline: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {t('familyProfile.add')}
              </button>
            </div>
          </div>

          <div
            className="px-5 py-3.5 flex items-start gap-2.5"
            style={{ borderTop: '1px solid #EDE8DC', backgroundColor: '#F5F0E5' }}
          >
            <span style={{ color: '#B87333', fontSize: '13px', marginTop: '1px', flexShrink: 0 }}>✦</span>
            <p
              className="text-xs leading-relaxed"
              style={{ color: '#9A8A60', fontFamily: "'Lora', serif" }}
            >
              {t('familyProfile.footerNote')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
