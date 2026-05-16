import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
}

type Tab = 'mision' | 'ciencias' | 'guia';

const TABS: { id: Tab; label: string }[] = [
  { id: 'mision', label: 'Nuestra Misión' },
  { id: 'ciencias', label: 'Ciencias de la Vida' },
  { id: 'guia', label: 'Guía de Uso' },
];

function VedicIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.75"
      className={className}
    >
      <defs>
        <linearGradient id="vedicTornasol2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="9" stroke="url(#vedicTornasol2)" strokeDasharray="2 2" />
      <circle cx="12" cy="12" r="7" stroke="url(#vedicTornasol2)" />
      <line x1="12" y1="3" x2="12" y2="21" stroke="url(#vedicTornasol2)" strokeWidth="1" />
      <line x1="3" y1="12" x2="21" y2="12" stroke="url(#vedicTornasol2)" strokeWidth="1" />
      <path
        d="M12 9C11 11 10 12 10 13C10 14.1046 10.8954 15 12 15C13.1046 15 14 14.1046 14 13C14 12 13 11 12 9Z"
        fill="url(#vedicTornasol2)"
        opacity="0.4"
      />
      <polygon points="12,5 14,10 12,9 10,10" fill="url(#vedicTornasol2)" />
    </svg>
  );
}

function MisionTab() {
  return (
    <div className="space-y-5">
      <h3
        className="text-base font-semibold leading-snug"
        style={{ fontFamily: "'Playfair Display', serif", color: '#10B981' }}
      >
        El Faro de la Rítmica Familiar
      </h3>
      <p
        className="text-sm leading-relaxed"
        style={{ color: '#4A4030', fontFamily: "'Lora', serif", lineHeight: '1.75' }}
      >
        Esta herramienta ha sido creada para facilitar la observación de los ritmos naturales en la
        crianza. Al sincronizar las rutinas diarias con los ciclos biológicos y ambientales,
        ayudamos a que el sistema nervioso del niño se desarrolle en un entorno de previsibilidad,
        calma y equilibrio integral, honrando la raíz de cada ser.
      </p>
    </div>
  );
}

function CienciasTab() {
  return (
    <div className="space-y-6">
      <h3
        className="text-base font-semibold leading-snug"
        style={{ fontFamily: "'Playfair Display', serif", color: '#10B981' }}
      >
        Sincronía entre el Cosmos y la Biología
      </h3>

      <p className="text-sm leading-relaxed" style={{ color: '#4A4030', fontFamily: "'Lora', serif", lineHeight: '1.75' }}>
        La aplicación se nutre de dos ciencias védicas milenarias orientadas al estudio preciso de
        los ritmos vitales de forma dinámica y natural:
      </p>

      {/* Section 1 */}
      <section className="space-y-3">
        <h4
          className="text-sm font-semibold"
          style={{ fontFamily: "'Playfair Display', serif", color: '#D4AF37' }}
        >
          1. Anatomía Cósmica: Los 9 Grahas
        </h4>
        <p className="text-sm leading-relaxed" style={{ color: '#4A4030', fontFamily: "'Lora', serif", lineHeight: '1.75' }}>
          En el Jyotish, los Grahas no son meras masas rocosas flotantes, sino fuerzas vivas que
          'capturan' e imprimen frecuencias específicas en la fisiología y la conciencia terrestre.
          Cada uno opera como un Karaka (significador) de impulsos biológicos y estados mentales:
        </p>
        <ul className="space-y-2.5">
          {[
            { bullet: 'Surya (El Sol - Atmakaraka)', text: 'El rey del mapa celestial y la fuente de Agni (fuego). Gobierna la fuerza vital primordial (Prana), la identidad esencial y el marcapasos del sistema circadiano.' },
            { bullet: 'Chandra (La Luna - Manaskaraka)', text: 'Regente de Jala (agua). Es el significador de la mente emocional, la percepción de seguridad, los fluidos corporales y los ciclos de nutrición y sueño profundo.' },
            { bullet: 'Mangala (Marte - Bhumiputra)', text: 'Portador de la energía dinámica y la fuerza motriz. Gobierna el tono muscular, la capacidad de respuesta inmediata y la digestión celular.' },
            { bullet: 'Budha (Mercurio - Inteligencia Adaptativa)', text: 'Regente del intelecto relacional (Buddhi). Modula el sistema nervioso periférico, los canales de comunicación, el habla y la destreza psicomotriz fina.' },
            { bullet: 'Guru (Júpiter - El Gran Brihaspati)', text: 'Es el Shubha Graha definitivo (el más benéfico). Regente del Tattva del Espacio (Akasha), representa la sabiduría (Jnana), la expansión armoniosa y el Dharma. En la dinámica familiar, su tránsito activa la alegría interna, el optimismo biológico, la capacidad de asimilar amorosamente las experiencias y la kripa (gracia divina) que protege el crecimiento y el desarrollo del niño.' },
            { bullet: 'Shukra (Venus - El Purificador)', text: 'Significador de la armonía, el refinamiento y la inmunidad sutil (Ojas). Rige la receptividad sensorial, la dulzura en los lazos afectivos y la restauración del equilibrio.' },
            { bullet: 'Shani (Saturno - Kalakaraka)', text: 'El gran ordenador del tiempo y la estructura. Rige el elemento Prithvi (tierra) y los límites biológicos. Trae la necesidad de regularidad, consistencia, resistencia y rutinas firmes que sostienen el sistema nervioso.' },
            { bullet: 'Rahu y Ketu (Los Nodos Lunares)', text: 'Los Grahas sombríos (Chaya Grahas). Rahu rige la amplificación, la sobreestimulación sensorial y las disrupciones imprevistas; Ketu rige la introversión, los impulsos instintivos profundos y las transiciones silenciosas.' },
          ].map(({ bullet, text }) => (
            <li key={bullet} className="flex gap-2.5">
              <span
                className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full"
                style={{ background: 'linear-gradient(135deg, #8B5CF6, #10B981)', marginTop: '6px' }}
              />
              <p className="text-sm leading-relaxed" style={{ color: '#4A4030', fontFamily: "'Lora', serif", lineHeight: '1.75' }}>
                <span className="font-semibold" style={{ color: '#6A4A20' }}>{bullet}:</span>{' '}
                {text}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 2 */}
      <section className="space-y-3">
        <h4
          className="text-sm font-semibold"
          style={{ fontFamily: "'Playfair Display', serif", color: '#D4AF37' }}
        >
          2. Las Horas Muhurta: La División del Día y la Noche
        </h4>
        <p className="text-sm leading-relaxed" style={{ color: '#4A4030', fontFamily: "'Lora', serif", lineHeight: '1.75' }}>
          A diferencia de las horas fijas de 60 minutos del reloj convencional, la cronobiología
          védica divide el tiempo terrestre de forma elástica según la luz real del lugar geográfico
          donde te encuentras. Un día completo (24 horas) se divide exactamente en 24 Horas Muhurtas
          de igual duración interna para cada periodo:
        </p>
        <ul className="space-y-2">
          {[
            { label: 'El Día (12 Horas)', text: 'Se determina como el lapso que ocurre exactamente entre el Amanecer local y el Atardecer.' },
            { label: 'La Noche (12 Horas)', text: 'Se determina como el lapso que ocurre entre el Atardecer y el Amanecer del día siguiente.' },
          ].map(({ label, text }) => (
            <li key={label} className="flex gap-2.5">
              <span className="shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'linear-gradient(135deg, #8B5CF6, #10B981)', marginTop: '6px' }} />
              <p className="text-sm leading-relaxed" style={{ color: '#4A4030', fontFamily: "'Lora', serif", lineHeight: '1.75' }}>
                <span className="font-semibold" style={{ color: '#6A4A20' }}>{label}:</span>{' '}{text}
              </p>
            </li>
          ))}
        </ul>
        <p className="text-sm leading-relaxed" style={{ color: '#4A4030', fontFamily: "'Lora', serif", lineHeight: '1.75' }}>
          De acuerdo con la ubicación y la época del año, la longitud de las horas del día puede
          durar más o menos tiempo que las de la noche (fenómeno más evidente en latitudes alejadas
          del Ecuador donde se dan las estaciones marcadas).
        </p>
      </section>

      {/* Section 3 */}
      <section className="space-y-3">
        <h4
          className="text-sm font-semibold"
          style={{ fontFamily: "'Playfair Display', serif", color: '#D4AF37' }}
        >
          3. La Regencia Planetaria Diaria
        </h4>
        <p className="text-sm leading-relaxed" style={{ color: '#4A4030', fontFamily: "'Lora', serif", lineHeight: '1.75' }}>
          Cada una de las 24 Horas está regida por un astro o planeta regente que la dota de sus
          frecuencias específicas.
        </p>
        <ul className="space-y-2">
          {[
            'La Hora número 1 inicia exactamente en el instante del Amanecer local.',
            'El planeta que rige esta primera hora es siempre el mismo planeta que gobierna ese día de la semana específico. A partir de allí, los regentes se suceden de forma matemática para marcar el pulso del tiempo.',
          ].map((text, i) => (
            <li key={i} className="flex gap-2.5">
              <span className="shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'linear-gradient(135deg, #8B5CF6, #10B981)', marginTop: '6px' }} />
              <p className="text-sm leading-relaxed" style={{ color: '#4A4030', fontFamily: "'Lora', serif", lineHeight: '1.75' }}>{text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 4 */}
      <section className="space-y-3">
        <h4
          className="text-sm font-semibold"
          style={{ fontFamily: "'Playfair Display', serif", color: '#D4AF37' }}
        >
          4. ¿Cómo calcula la App esta Sincronía?
        </h4>
        <p className="text-sm leading-relaxed" style={{ color: '#4A4030', fontFamily: "'Lora', serif", lineHeight: '1.75' }}>
          Para garantizar una precisión rigurosa, el motor interno realiza tres pasos automatizados:
        </p>
        <ol className="space-y-2.5">
          {[
            { label: 'Geolocalización GPS', text: 'Detecta las coordenadas geográficas exactas de tu hogar.' },
            { label: 'Cálculo Astronómico Exterior', text: 'Consulta la hora exacta del Amanecer y Atardecer astronómico local en la fecha actual, adaptándose orgánicamente si los días son más largos en verano o más cortos en invierno.' },
            { label: 'División Dinámica por 12', text: 'Convierte a minutos el tiempo total de luz y lo divide por 12 para calcular la duración exacta de cada Hora diurna; hace lo mismo con el tiempo de oscuridad para las 12 Horas nocturnas. El resultado es un reloj vivo adaptado a tu realidad local.' },
          ].map(({ label, text }, i) => (
            <li key={i} className="flex gap-3">
              <span
                className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #10B981 100%)', color: '#fff', fontSize: '10px', minWidth: '20px' }}
              >
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: '#4A4030', fontFamily: "'Lora', serif", lineHeight: '1.75' }}>
                <span className="font-semibold" style={{ color: '#6A4A20' }}>{label}:</span>{' '}{text}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

function GuiaTab() {
  const steps = [
    {
      num: '1',
      title: 'Sintoniza con el Momento',
      text: 'Abre la aplicación para observar instantáneamente qué Graha y qué hora Muhurta están rigiendo el ambiente en tu ubicación actual aquí y ahora.',
    },
    {
      num: '2',
      title: 'Observa la Influencia Diaria',
      text: 'Revisa cómo las transiciones del día y de la noche impactan de forma directa en los niveles de energía, tolerancia y estado de alerta de la dinámica familiar.',
    },
    {
      num: '3',
      title: 'Sincroniza la Rutina',
      text: 'Implementa de forma práctica las recomendaciones de alimentación, descanso y actividades sugeridas para mantener el sistema biológico de tu hogar en perfecta armonía con su entorno natural.',
    },
  ];

  return (
    <div className="space-y-5">
      <h3
        className="text-base font-semibold leading-snug"
        style={{ fontFamily: "'Playfair Display', serif", color: '#10B981' }}
      >
        Paso a Paso hacia la Sincronía
      </h3>
      <ol className="space-y-5">
        {steps.map(({ num, title, text }) => (
          <li key={num} className="flex gap-4">
            <div
              className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
              style={{
                background: 'linear-gradient(135deg, #8B5CF6 0%, #10B981 50%, #D4AF37 100%)',
                color: '#fff',
                fontFamily: "'Playfair Display', serif",
              }}
            >
              {num}
            </div>
            <div className="space-y-1 pt-0.5">
              <p className="text-sm font-semibold" style={{ color: '#4A5D23', fontFamily: "'Playfair Display', serif" }}>
                {title}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#4A4030', fontFamily: "'Lora', serif", lineHeight: '1.75' }}>
                {text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function BrujulaSincroniaDrawer({ open, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('mision');

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          background: 'rgba(30, 20, 10, 0.45)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
      />

      {/* Drawer panel */}
      <div
        className="fixed top-0 right-0 h-full z-50 flex flex-col"
        style={{
          width: 'min(420px, 100vw)',
          background: 'linear-gradient(180deg, #FDFAF4 0%, #F8F4EA 100%)',
          boxShadow: '-4px 0 32px rgba(30, 20, 10, 0.18)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 shrink-0"
          style={{ borderBottom: '1px solid #E8E0CC' }}
        >
          <div className="flex items-center gap-3">
            <VedicIcon className="w-7 h-7" />
            <h2
              className="text-base font-semibold"
              style={{ fontFamily: "'Playfair Display', serif", color: '#4A5D23' }}
            >
              Brújula de Sincronía
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-150 hover:opacity-70 active:scale-90"
            style={{ background: '#EDE8D8', border: '1px solid #D8D0B8' }}
            aria-label="Cerrar"
          >
            <X size={14} color="#7A6A4A" />
          </button>
        </div>

        {/* Tabs */}
        <div
          className="flex shrink-0 px-5 pt-4 gap-1"
          style={{ borderBottom: '1px solid #E8E0CC', paddingBottom: '0' }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="text-xs font-medium pb-3 px-2 transition-all duration-200 relative"
              style={{
                fontFamily: "'Lora', serif",
                color: activeTab === tab.id ? '#10B981' : '#9A9070',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                outline: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t"
                  style={{ background: 'linear-gradient(90deg, #8B5CF6, #10B981, #D4AF37)' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-6">
          {activeTab === 'mision' && <MisionTab />}
          {activeTab === 'ciencias' && <CienciasTab />}
          {activeTab === 'guia' && <GuiaTab />}
        </div>

        {/* Footer accent */}
        <div
          className="shrink-0 h-1"
          style={{ background: 'linear-gradient(90deg, #8B5CF6 0%, #10B981 50%, #D4AF37 100%)' }}
        />
      </div>
    </>
  );
}
