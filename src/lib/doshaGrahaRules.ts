import type { GrahaId } from './astronomy';
import type { DoshaType } from './doshas';
import i18n from '../i18n/config';

export interface DoshaGrahaRecommendation {
  message: string;
  tone: 'calm' | 'alert' | 'energize' | 'connect';
  keyword: string;
}

const TONES: Record<DoshaType, Record<GrahaId, 'calm' | 'alert' | 'energize' | 'connect'>> = {
  Vata: {
    sun: 'energize', moon: 'calm', mars: 'calm', mercury: 'calm',
    jupiter: 'connect', venus: 'calm', saturn: 'calm',
  },
  Pitta: {
    sun: 'alert', moon: 'connect', mars: 'alert', mercury: 'energize',
    jupiter: 'connect', venus: 'connect', saturn: 'calm',
  },
  Kapha: {
    sun: 'energize', moon: 'connect', mars: 'energize', mercury: 'energize',
    jupiter: 'energize', venus: 'connect', saturn: 'energize',
  },
};

export function getRecommendation(dosha: DoshaType, graha: GrahaId): DoshaGrahaRecommendation {
  return {
    message: i18n.t(`doshaGrahaRules.${dosha}.${graha}.message`),
    tone: TONES[dosha][graha],
    keyword: i18n.t(`doshaGrahaRules.${dosha}.${graha}.keyword`),
  };
}
