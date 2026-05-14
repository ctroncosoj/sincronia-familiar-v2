import { useTranslation } from 'react-i18next';
import { MapPin, Loader } from 'lucide-react';

interface Props {
  loading: boolean;
  error: string | null;
}

export function LocationPrompt({ loading, error }: Props) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: 'linear-gradient(160deg, #F9F6EE 0%, #EEE8D5 100%)' }}>
      <div className="max-w-sm">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: '#E8DFC8' }}>
          {loading ? (
            <Loader size={28} className="animate-spin" style={{ color: '#B87333' }} />
          ) : (
            <MapPin size={28} style={{ color: '#B87333' }} />
          )}
        </div>

        <h1 className="text-3xl mb-2 leading-tight" style={{ fontFamily: "'Lora', serif", color: '#4A5D23' }}>
          {t('app.title')}
        </h1>
        <p className="text-sm tracking-widest uppercase mb-8" style={{ color: '#B87333', fontFamily: "'Lora', serif" }}>
          {t('app.tagline')}
        </p>

        {loading ? (
          <p className="leading-relaxed" style={{ color: '#6B7A5A', fontFamily: "'Lora', serif" }}>
            {t('location.loading')}
          </p>
        ) : error ? (
          <div>
            <p className="leading-relaxed mb-4" style={{ color: '#8B5E3C', fontFamily: "'Lora', serif" }}>
              {error}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#9A9A8A', fontFamily: "'Lora', serif" }}>
              {t('location.reload')}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
