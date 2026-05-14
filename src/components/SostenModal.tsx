import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import type { GrahaData } from '../lib/grahas';
import type { Child } from '../lib/children';
import type { DoshaType } from '../lib/doshas';

interface Props {
  graha: GrahaData | null;
  selectedChild: Child | null;
  onClose: () => void;
}

export function SostenModal({ graha, selectedChild, onClose }: Props) {
  const { t } = useTranslation();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const dosha = selectedChild?.dosha as DoshaType | null;
  const rescueKey = dosha ?? 'generic';

  const childName = selectedChild?.name ?? null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(40, 28, 16, 0.55)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div
        className="w-full max-w-lg mx-auto rounded-3xl overflow-hidden"
        style={{
          backgroundColor: '#FDFAF3',
          border: '1.5px solid #C97A3A60',
          boxShadow: '0 24px 60px rgba(100, 50, 10, 0.22), 0 4px 16px rgba(0,0,0,0.12)',
          animation: 'floatIn 0.38s cubic-bezier(0.22, 0.9, 0.36, 1)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <style>{`
          @keyframes floatIn {
            from { transform: translateY(24px) scale(0.97); opacity: 0; }
            to   { transform: translateY(0) scale(1); opacity: 1; }
          }
        `}</style>

        {/* Header */}
        <div
          className="px-6 pt-6 pb-5"
          style={{ background: 'linear-gradient(135deg, #3D1F0A 0%, #6B2D0F 50%, #8B3A10 100%)' }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span style={{ color: '#F5C28A', fontSize: '18px', lineHeight: 1 }}>◈</span>
                <span
                  className="text-xs tracking-widest uppercase"
                  style={{ color: '#D4905A', fontFamily: "'Lora', serif", letterSpacing: '0.18em' }}
                >
                  {t('sostenModal.kitTitle')}
                </span>
              </div>
              <h2
                className="leading-tight"
                style={{ color: '#FDF0E0', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.1rem, 4vw, 1.35rem)', fontWeight: 700 }}
              >
                {t('sostenModal.heading')}
              </h2>
              {childName && (
                <p className="text-xs mt-1.5" style={{ color: '#C4905A', fontFamily: "'Lora', serif" }}>
                  {t('sostenModal.forChild', { name: childName })}
                  {dosha && (
                    <span style={{ color: '#A07040', marginLeft: '6px' }}>
                      &middot; {t('sostenModal.doshaLabel', { dosha })}
                    </span>
                  )}
                </p>
              )}
              {!childName && (
                <p className="text-xs mt-1.5" style={{ color: '#A07040', fontFamily: "'Lora', serif" }}>
                  {t('sostenModal.pauseTagline')}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-opacity hover:opacity-70 mt-0.5"
              style={{ backgroundColor: 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer' }}
            >
              <span style={{ color: '#FDF0E0', fontSize: '18px', lineHeight: 1 }}>×</span>
            </button>
          </div>

          {graha && (
            <div
              className="mt-4 flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <span style={{ color: '#D4A050', fontSize: '16px' }}>{graha.symbol}</span>
              <span className="text-xs" style={{ color: '#C4905A', fontFamily: "'Lora', serif" }}>
                {t('sostenModal.horaLabel', { name: graha.name, focus: graha.parentFocus })}
              </span>
            </div>
          )}
        </div>

        <div className="px-5 py-5 space-y-3">
          {/* Point 1 — Sensory */}
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #C97A3A40', backgroundColor: '#FFF7F0' }}>
            <div className="px-4 py-2.5 flex items-center gap-2" style={{ backgroundColor: '#C97A3A15', borderBottom: '1px solid #C97A3A20' }}>
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ backgroundColor: '#C97A3A', color: '#FFFFFF', fontFamily: "'Lora', serif" }}>
                1
              </span>
              <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: '#8A4A20', fontFamily: "'Lora', serif" }}>
                {t('sostenModal.point1Title')}
              </span>
            </div>
            <div className="px-4 py-3.5">
              <p className="text-sm leading-relaxed" style={{ color: '#5A3018', fontFamily: "'Lora', serif", lineHeight: '1.7' }}>
                {t(`sostenModal.rescue.${rescueKey}.sensory`)}
              </p>
            </div>
          </div>

          {/* Point 2 — Food */}
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #7A9B3A40', backgroundColor: '#F5FAF0' }}>
            <div className="px-4 py-2.5 flex items-center gap-2" style={{ backgroundColor: '#7A9B3A15', borderBottom: '1px solid #7A9B3A20' }}>
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ backgroundColor: '#5A8020', color: '#FFFFFF', fontFamily: "'Lora', serif" }}>
                2
              </span>
              <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: '#3A5A10', fontFamily: "'Lora', serif" }}>
                {t('sostenModal.point2Title')}
              </span>
            </div>
            <div className="px-4 py-3.5">
              <p className="text-sm leading-relaxed" style={{ color: '#2A4A08', fontFamily: "'Lora', serif", lineHeight: '1.7' }}>
                {t(`sostenModal.rescue.${rescueKey}.food`)}
              </p>
            </div>
          </div>

          {/* Point 3 — Caregiver note */}
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #7AADCB40', backgroundColor: '#EEF6FB' }}>
            <div className="px-4 py-2.5 flex items-center gap-2" style={{ backgroundColor: '#7AADCB18', borderBottom: '1px solid #7AADCB25' }}>
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ backgroundColor: '#4A8AAA', color: '#FFFFFF', fontFamily: "'Lora', serif" }}>
                3
              </span>
              <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: '#2A5A7A', fontFamily: "'Lora', serif" }}>
                {t('sostenModal.point3Title')}
              </span>
            </div>
            <div className="px-4 py-3.5">
              <p className="text-sm leading-relaxed" style={{ color: '#1A3A5A', fontFamily: "'Lora', serif", lineHeight: '1.7' }}>
                {t(`sostenModal.rescue.${rescueKey}.caregiverNote`)}
              </p>
            </div>
          </div>

          {/* Caregiver pause — always present */}
          <div
            className="rounded-2xl px-4 py-4 flex items-start gap-3"
            style={{ backgroundColor: '#F5F0E5', border: '1px solid #DDD5BB' }}
          >
            <span style={{ color: '#B87333', fontSize: '16px', flexShrink: 0, marginTop: '1px' }}>◑</span>
            <div>
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#B87333', fontFamily: "'Lora', serif", opacity: 0.7 }}>
                {t('sostenModal.caregiverTitle')}
              </p>
              <p className="text-xs leading-relaxed italic" style={{ color: '#6A5A40', fontFamily: "'Lora', serif", lineHeight: '1.75' }}>
                {t('sostenModal.caregiverPause')}
              </p>
            </div>
          </div>

          {/* Senda Raiz link */}
          <div className="pt-1">
            <a
              href="https://www.sendaraiz.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl transition-all duration-200 hover:opacity-85"
              style={{ backgroundColor: '#4A5D23', color: '#F5EDD8', fontFamily: "'Lora', serif", fontSize: '13px', letterSpacing: '0.03em', textDecoration: 'none' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F5EDD8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
              </svg>
              {t('sostenModal.exploreLink')}
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#F5EDD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>

        <div className="px-6 py-4 flex items-center justify-center" style={{ borderTop: '1px solid #EDE8DC' }}>
          <button
            onClick={onClose}
            className="px-8 py-2.5 rounded-xl text-sm transition-all duration-200 hover:opacity-80"
            style={{ backgroundColor: 'transparent', color: '#8A7A5A', fontFamily: "'Lora', serif", border: '1px solid #D8D0B8', cursor: 'pointer', outline: 'none' }}
          >
            {t('sostenModal.backButton')}
          </button>
        </div>
      </div>
    </div>
  );
}
