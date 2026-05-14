import SunCalc from 'suncalc';

export interface SunTimes {
  sunrise: Date;
  sunset: Date;
  solarNoon: Date;
}

export function calculateSunTimes(lat: number, lng: number, date: Date): SunTimes {
  const times = SunCalc.getTimes(date, lat, lng);
  return {
    sunrise: times.sunrise,
    sunset: times.sunset,
    solarNoon: times.solarNoon,
  };
}

export type GrahaId = 'sun' | 'moon' | 'mars' | 'mercury' | 'jupiter' | 'venus' | 'saturn';

const CHALDEAN: GrahaId[] = ['saturn', 'jupiter', 'mars', 'sun', 'venus', 'mercury', 'moon'];

const DAY_RULERS: GrahaId[] = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn'];

function chaldeanIndex(graha: GrahaId): number {
  return CHALDEAN.indexOf(graha);
}

export interface PlanetaryHour {
  graha: GrahaId;
  start: Date;
  end: Date;
  index: number;
}

export function calculatePlanetaryHours(
  lat: number,
  lng: number,
  now: Date
): PlanetaryHour[] {
  const localYear = now.getFullYear();
  const localMonth = now.getMonth();
  const localDay = now.getDate();
  const localDow = now.getDay();

  const todayNoon = new Date(Date.UTC(localYear, localMonth, localDay, 12, 0, 0));
  const tomorrowNoon = new Date(Date.UTC(localYear, localMonth, localDay + 1, 12, 0, 0));

  const todayTimes = SunCalc.getTimes(todayNoon, lat, lng);
  const tomorrowTimes = SunCalc.getTimes(tomorrowNoon, lat, lng);

  const sunrise = todayTimes.sunrise;
  const sunset = todayTimes.sunset;
  const nextSunrise = tomorrowTimes.sunrise;

  const dayRuler = DAY_RULERS[localDow];
  const startIndex = chaldeanIndex(dayRuler);

  const dayDuration = sunset.getTime() - sunrise.getTime();
  const nightDuration = nextSunrise.getTime() - sunset.getTime();
  const dayHourLen = dayDuration / 12;
  const nightHourLen = nightDuration / 12;

  const hours: PlanetaryHour[] = [];

  for (let i = 0; i < 24; i++) {
    const grahaIndex = (startIndex + i) % 7;
    const graha = CHALDEAN[grahaIndex];
    let start: Date;
    let end: Date;

    if (i < 12) {
      start = new Date(sunrise.getTime() + i * dayHourLen);
      end = new Date(sunrise.getTime() + (i + 1) * dayHourLen);
    } else {
      const ni = i - 12;
      start = new Date(sunset.getTime() + ni * nightHourLen);
      end = new Date(sunset.getTime() + (ni + 1) * nightHourLen);
    }

    hours.push({ graha, start, end, index: i + 1 });
  }

  return hours;
}

export function calculateSunTimesForDisplay(lat: number, lng: number, now: Date): SunTimes {
  const localYear = now.getFullYear();
  const localMonth = now.getMonth();
  const localDay = now.getDate();
  const todayNoon = new Date(Date.UTC(localYear, localMonth, localDay, 12, 0, 0));
  const times = SunCalc.getTimes(todayNoon, lat, lng);
  return {
    sunrise: times.sunrise,
    sunset: times.sunset,
    solarNoon: times.solarNoon,
  };
}

export interface RahuKaalPeriod {
  start: Date;
  end: Date;
}

const RAHU_KAAL_SEGMENT: number[] = [7, 1, 6, 4, 5, 3, 2];

export function calculateRahuKaal(lat: number, lng: number, now: Date): RahuKaalPeriod {
  const localYear = now.getFullYear();
  const localMonth = now.getMonth();
  const localDay = now.getDate();
  const localDow = now.getDay();
  const todayNoon = new Date(Date.UTC(localYear, localMonth, localDay, 12, 0, 0));
  const times = SunCalc.getTimes(todayNoon, lat, lng);
  const sunrise = times.sunrise;
  const sunset = times.sunset;

  const segmentIndex = RAHU_KAAL_SEGMENT[localDow];
  const dayDuration = sunset.getTime() - sunrise.getTime();
  const segmentLen = dayDuration / 8;
  const start = new Date(sunrise.getTime() + (segmentIndex - 1) * segmentLen);
  const end = new Date(start.getTime() + segmentLen);
  return { start, end };
}

export function getCurrentPlanetaryHour(hours: PlanetaryHour[], now: Date): PlanetaryHour | null {
  if (hours.length === 0) return null;
  const t = now.getTime();
  const exact = hours.find((h) => t >= h.start.getTime() && t < h.end.getTime());
  if (exact) return exact;
  let closest = hours[0];
  let minDist = Math.min(
    Math.abs(t - hours[0].start.getTime()),
    Math.abs(t - hours[0].end.getTime())
  );
  for (const h of hours) {
    const distStart = Math.abs(t - h.start.getTime());
    const distEnd = Math.abs(t - h.end.getTime());
    const dist = Math.min(distStart, distEnd);
    if (dist < minDist) {
      minDist = dist;
      closest = h;
    }
  }
  return closest;
}

export function isRahuKaalActive(rahuKaal: RahuKaalPeriod, now: Date): boolean {
  const t = now.getTime();
  return t >= rahuKaal.start.getTime() && t < rahuKaal.end.getTime();
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function formatCountdown(ms: number): string {
  if (ms <= 0) return '00:00';
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function getTrueSolarTime(now: Date, lng: number): Date {
  const startOfYear = new Date(Date.UTC(now.getFullYear(), 0, 1));
  const dayOfYear = (now.getTime() - startOfYear.getTime()) / 86400000 + 1;

  const B = (360 / 365) * (dayOfYear - 81);
  const Brad = (B * Math.PI) / 180;

  const eotMinutes =
    9.87 * Math.sin(2 * Brad) -
    7.53 * Math.cos(Brad) -
    1.5 * Math.sin(Brad);

  const lngCorrectionMinutes = lng * 4;
  const totalOffsetMs = (eotMinutes + lngCorrectionMinutes) * 60 * 1000;
  const utcMs = now.getTime();
  const tstMs = utcMs + totalOffsetMs;

  return new Date(tstMs);
}

export function formatTrueSolarTime(now: Date, lng: number): string {
  const tst = getTrueSolarTime(now, lng);
  const h = tst.getUTCHours();
  const m = tst.getUTCMinutes();
  const s = tst.getUTCSeconds();
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
