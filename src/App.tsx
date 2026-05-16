import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGeolocation } from './hooks/useGeolocation';
import { usePlanetaryHours } from './hooks/usePlanetaryHours';
import { useChildren } from './hooks/useChildren';
import { LocationPrompt } from './components/LocationPrompt';
import { Header } from './components/Header';
import { CurrentGraha } from './components/CurrentGraha';
import { RahuKaalAlert } from './components/RahuKaalAlert';
import { HoraTimeline } from './components/HoraTimeline';
import { GrahasPanel } from './components/GrahasPanel';
import { FamilyProfile } from './components/FamilyProfile';
import { DoshaConstitution } from './components/DoshaConstitution';
import { DoshaGrahaBanner } from './components/DoshaGrahaBanner';
import { SostenModal } from './components/SostenModal';
import { BrujulaSincroniaDrawer } from './components/BrujulaSincroniaDrawer';
import { GRAHAS } from './lib/grahas';

export default function App() {
  const { t } = useTranslation();
  const { latitude, longitude, loading, usingFallback } = useGeolocation();
  const {
    sunTimes,
    planetaryHours,
    currentHour,
    nextHour,
    rahuKaal,
    rahuKaalActive,
    now,
    msToNextHour,
    msToRahuKaalEnd,
  } = usePlanetaryHours(latitude, longitude);

  const { children, addChild, removeChild, updateChildDosha, updateChildName } = useChildren();
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [sostenOpen, setSostenOpen] = useState(false);
  const [brujulaOpen, setBrujulaOpen] = useState(false);
  const activeGrahaData = currentHour ? GRAHAS[currentHour.graha] : null;

  if (loading || latitude === null || longitude === null) {
    return <LocationPrompt loading={loading} error={null} />;
  }

  const N = t('app.footer.north');
  const S = t('app.footer.south');
  const E = t('app.footer.east');
  const W = t('app.footer.west');

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(170deg, #F9F6EE 0%, #EDE8D5 50%, #E5DCC5 100%)' }}
    >
      <div
        className="w-full mx-auto px-4"
        style={{
          maxWidth: 'min(672px, 100vw)',
          paddingBottom: 'calc(4rem + env(safe-area-inset-bottom))',
        }}
      >
        <Header sunTimes={sunTimes} now={now} lng={longitude} onSostenClick={() => setSostenOpen(true)} onBrujulaClick={() => setBrujulaOpen(true)} />

        <div className="space-y-4">
          {rahuKaal && (
            <RahuKaalAlert
              rahuKaal={rahuKaal}
              active={rahuKaalActive}
              msToEnd={msToRahuKaalEnd}
            />
          )}

          <CurrentGraha
            currentHour={currentHour}
            nextHour={nextHour}
            msToNextHour={msToNextHour}
            children={children}
          />

          <DoshaGrahaBanner
            currentHour={currentHour}
            children={children}
            selectedChildId={selectedChildId}
          />

          <FamilyProfile
            children={children}
            selectedChildId={selectedChildId}
            onSelectChild={setSelectedChildId}
            onAdd={addChild}
            onRemove={removeChild}
            onUpdateDosha={updateChildDosha}
            onUpdateName={updateChildName}
          />

          <DoshaConstitution />

          <GrahasPanel currentGrahaId={currentHour?.graha ?? null} children={children} />

          {planetaryHours.length > 0 && (
            <HoraTimeline planetaryHours={planetaryHours} now={now} currentHour={currentHour} />
          )}
        </div>

        <BrujulaSincroniaDrawer open={brujulaOpen} onClose={() => setBrujulaOpen(false)} />

        {sostenOpen && (
          <SostenModal
            graha={activeGrahaData}
            selectedChild={children.find((c) => c.id === selectedChildId) ?? null}
            onClose={() => setSostenOpen(false)}
          />
        )}

        <footer className="text-center pt-10 pb-2 pb-safe">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ backgroundColor: '#EDE8D8', border: '1px solid #D8D0B8' }}
          >
            <span style={{ color: '#B0A080', fontSize: '12px' }}>⊕</span>
            <p
              className="text-xs"
              style={{ color: '#9A9070', fontFamily: "'Lora', serif" }}
            >
              {usingFallback ? (
                t('app.footer.reference')
              ) : (
                <>
                  {Math.abs(latitude).toFixed(3)}&deg; {latitude >= 0 ? N : S},&nbsp;
                  {Math.abs(longitude).toFixed(3)}&deg; {longitude >= 0 ? E : W}
                </>
              )}
              &nbsp;&middot; {t('app.footer.caldean')}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
