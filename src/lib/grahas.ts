import type { GrahaId } from './astronomy';
import { personalizeText, childrenLabel, type Child } from './children';
import i18n from '../i18n/config';

export interface GrahaData {
  id: GrahaId;
  name: string;
  sanscrit: string;
  planetName: string;
  symbol: string;
  color: string;
  bgColor: string;
  borderColor: string;
  parentFocus: string;
  withChildren: string;
  avoid: string;
  poeticMessage: string;
  keywords: string[];
  selfCare: string;
  pauseMessage: string;
}

const GRAHAS_STATIC: Record<GrahaId, Pick<GrahaData, 'id' | 'symbol' | 'color' | 'bgColor' | 'borderColor' | 'sanscrit'>> = {
  sun:     { id: 'sun',     symbol: '☉', color: '#8B5E3C', bgColor: '#FFF8E7', borderColor: '#D4A050', sanscrit: 'सूर्य' },
  moon:    { id: 'moon',    symbol: '☽', color: '#4A5D23', bgColor: '#F0F5E8', borderColor: '#7A9B3A', sanscrit: 'चन्द्र' },
  mars:    { id: 'mars',    symbol: '♂', color: '#8B2500', bgColor: '#FFF0EC', borderColor: '#C45A3A', sanscrit: 'मंगल' },
  mercury: { id: 'mercury', symbol: '☿', color: '#2E6B4F', bgColor: '#EDFAF3', borderColor: '#4A9B70', sanscrit: 'बुध' },
  jupiter: { id: 'jupiter', symbol: '♃', color: '#5A4A1C', bgColor: '#FFFBEC', borderColor: '#B89A3A', sanscrit: 'गुरु' },
  venus:   { id: 'venus',   symbol: '♀', color: '#7A4060', bgColor: '#FFF0F8', borderColor: '#B87090', sanscrit: 'शुक्र' },
  saturn:  { id: 'saturn',  symbol: '♄', color: '#3A3A3A', bgColor: '#F5F5F0', borderColor: '#8A8A7A', sanscrit: 'शनि' },
};

function buildGraha(id: GrahaId): GrahaData {
  const s = GRAHAS_STATIC[id];
  return {
    ...s,
    name: i18n.t(`grahas.${id}.name`),
    planetName: i18n.t(`grahas.${id}.planetName`),
    parentFocus: i18n.t(`grahas.${id}.parentFocus`),
    withChildren: i18n.t(`grahas.${id}.withChildren`),
    avoid: i18n.t(`grahas.${id}.avoid`),
    poeticMessage: i18n.t(`grahas.${id}.poeticMessage`),
    keywords: i18n.t(`grahas.${id}.keywords`, { returnObjects: true }) as unknown as string[],
    selfCare: i18n.t(`grahas.${id}.selfCare`),
    pauseMessage: i18n.t(`grahas.${id}.pauseMessage`),
  };
}

export const GRAHA_ORDER: GrahaId[] = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn'];

// Proxy so consumers always get fresh translated data from current language
export const GRAHAS = new Proxy({} as Record<GrahaId, GrahaData>, {
  get(_t, prop: string) {
    return buildGraha(prop as GrahaId);
  },
});

export function getPersonalizedGraha(id: GrahaId, children: Child[]): GrahaData {
  const base = buildGraha(id);
  if (children.length === 0) {
    return { ...base, withChildren: base.withChildren.replace(/\{children\}/g, 'tus hijos') };
  }
  const label = childrenLabel(children);
  return {
    ...base,
    withChildren: personalizeText(base.withChildren, children).replace(/\{children\}/g, label),
  };
}
