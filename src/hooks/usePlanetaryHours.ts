import { useState, useEffect, useCallback } from 'react';
import {
  calculatePlanetaryHours,
  calculateSunTimesForDisplay,
  calculateRahuKaal,
  getCurrentPlanetaryHour,
  isRahuKaalActive,
  type PlanetaryHour,
  type RahuKaalPeriod,
  type SunTimes,
} from '../lib/astronomy';

export interface PlanetaryHoursState {
  sunTimes: SunTimes | null;
  planetaryHours: PlanetaryHour[];
  currentHour: PlanetaryHour | null;
  nextHour: PlanetaryHour | null;
  rahuKaal: RahuKaalPeriod | null;
  rahuKaalActive: boolean;
  now: Date;
  msToNextHour: number;
  msToRahuKaalEnd: number;
}

export function usePlanetaryHours(lat: number | null, lng: number | null): PlanetaryHoursState {
  const [now, setNow] = useState<Date>(new Date());
  const [sunTimes, setSunTimes] = useState<SunTimes | null>(null);
  const [planetaryHours, setPlanetaryHours] = useState<PlanetaryHour[]>([]);
  const [rahuKaal, setRahuKaal] = useState<RahuKaalPeriod | null>(null);

  const compute = useCallback(
    (date: Date) => {
      if (lat === null || lng === null) return;
      setSunTimes(calculateSunTimesForDisplay(lat, lng, date));
      setPlanetaryHours(calculatePlanetaryHours(lat, lng, date));
      setRahuKaal(calculateRahuKaal(lat, lng, date));
    },
    [lat, lng]
  );

  useEffect(() => {
    const current = new Date();
    compute(current);
    setNow(current);
  }, [compute]);

  useEffect(() => {
    const interval = setInterval(() => {
      const current = new Date();
      setNow(current);
      compute(current);
    }, 1000);
    return () => clearInterval(interval);
  }, [compute]);

  useEffect(() => {
    if (lat === null || lng === null) return;
    const current = new Date();
    compute(current);
  }, [lat, lng, compute]);

  const currentHour =
    planetaryHours.length > 0 ? getCurrentPlanetaryHour(planetaryHours, now) : null;

  const currentIndex = currentHour?.index ?? 0;
  const nextHour =
    currentHour
      ? (planetaryHours.find((h) => h.index === currentIndex + 1) ?? null)
      : null;

  const rahuKaalActive = rahuKaal ? isRahuKaalActive(rahuKaal, now) : false;
  const msToNextHour = currentHour ? Math.max(0, currentHour.end.getTime() - now.getTime()) : 0;
  const msToRahuKaalEnd =
    rahuKaal && rahuKaalActive ? Math.max(0, rahuKaal.end.getTime() - now.getTime()) : 0;

  return {
    sunTimes,
    planetaryHours,
    currentHour,
    nextHour,
    rahuKaal,
    rahuKaalActive,
    now,
    msToNextHour,
    msToRahuKaalEnd,
  };
}
