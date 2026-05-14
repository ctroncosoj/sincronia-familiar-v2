import i18n from '../i18n/config';

export type DoshaType = 'Vata' | 'Pitta' | 'Kapha';

export interface DoshaFood {
  name: string;
  note?: string;
}

export interface EmotionalState {
  icon: 'balance' | 'alert';
  label: string;
  signs: string[];
}

export interface EmergencyAction {
  activity: string;
  food: string;
}

export interface DoshaData {
  id: DoshaType;
  name: string;
  element: string;
  tagline: string;
  color: string;
  bgColor: string;
  borderColor: string;
  accentColor: string;
  profile: string;
  nourishingFoods: DoshaFood[];
  moderateFoods: DoshaFood[];
  balanced: EmotionalState;
  dysregulated: EmotionalState;
  emergency: EmergencyAction;
}

const DOSHA_STATIC: Record<DoshaType, Pick<DoshaData, 'id' | 'color' | 'bgColor' | 'borderColor' | 'accentColor'>> = {
  Vata:  { id: 'Vata',  color: '#4A7A9B', bgColor: '#EBF4FA', borderColor: '#7AADCB', accentColor: '#2A5A7A' },
  Pitta: { id: 'Pitta', color: '#9A4A20', bgColor: '#FDF0E8', borderColor: '#D4844A', accentColor: '#7A3010' },
  Kapha: { id: 'Kapha', color: '#3A6B40', bgColor: '#EBF5EC', borderColor: '#6BAA72', accentColor: '#1E4A25' },
};

function buildDosha(id: DoshaType): DoshaData {
  const s = DOSHA_STATIC[id];
  const t = i18n.t.bind(i18n);
  return {
    ...s,
    name: id,
    element: t(`doshas.${id}.element`),
    tagline: t(`doshas.${id}.tagline`),
    profile: t(`doshas.${id}.profile`),
    nourishingFoods: t(`doshas.${id}.nourishingFoods`, { returnObjects: true }) as DoshaFood[],
    moderateFoods: t(`doshas.${id}.moderateFoods`, { returnObjects: true }) as DoshaFood[],
    balanced: {
      icon: 'balance',
      label: t('doshaConstitution.balanced'),
      signs: t(`doshas.${id}.balanced.signs`, { returnObjects: true }) as string[],
    },
    dysregulated: {
      icon: 'alert',
      label: t('doshaConstitution.alert'),
      signs: t(`doshas.${id}.dysregulated.signs`, { returnObjects: true }) as string[],
    },
    emergency: {
      activity: t(`doshas.${id}.emergency.activity`),
      food: t(`doshas.${id}.emergency.food`),
    },
  };
}

export const DOSHAS = new Proxy({} as Record<DoshaType, DoshaData>, {
  get(_t, prop: string) {
    return buildDosha(prop as DoshaType);
  },
});

type FoodEntry = DoshaFood & { dosha: DoshaType; type: 'nourishing' | 'moderate' };

export function getAllFoods(): FoodEntry[] {
  const types: DoshaType[] = ['Vata', 'Pitta', 'Kapha'];
  return types.flatMap((id) => {
    const d = buildDosha(id);
    return [
      ...d.nourishingFoods.map((f) => ({ ...f, dosha: id, type: 'nourishing' as const })),
      ...d.moderateFoods.map((f) => ({ ...f, dosha: id, type: 'moderate' as const })),
    ];
  });
}

