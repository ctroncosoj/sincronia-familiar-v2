import { useState, useEffect } from 'react';

export interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
  usingFallback: boolean;
}

const FALLBACK_LAT = -36.8201;
const FALLBACK_LNG = -73.0444;
const FALLBACK_TIMEOUT_MS = 8000;

export function useGeolocation(): GeolocationState {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: true,
    usingFallback: false,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({
        latitude: FALLBACK_LAT,
        longitude: FALLBACK_LNG,
        error: null,
        loading: false,
        usingFallback: true,
      });
      return;
    }

    let resolved = false;

    const fallbackTimer = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        setState({
          latitude: FALLBACK_LAT,
          longitude: FALLBACK_LNG,
          error: null,
          loading: false,
          usingFallback: true,
        });
      }
    }, FALLBACK_TIMEOUT_MS);

    const onSuccess = (pos: GeolocationPosition) => {
      clearTimeout(fallbackTimer);
      if (!resolved) resolved = true;
      setState({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        error: null,
        loading: false,
        usingFallback: false,
      });
    };

    const onError = () => {
      clearTimeout(fallbackTimer);
      if (!resolved) resolved = true;
      setState({
        latitude: FALLBACK_LAT,
        longitude: FALLBACK_LNG,
        error: null,
        loading: false,
        usingFallback: true,
      });
    };

    const opts: PositionOptions = {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 300000,
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError, opts);

    const watchId = navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: false,
      timeout: 30000,
      maximumAge: 600000,
    });

    return () => {
      clearTimeout(fallbackTimer);
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return state;
}
