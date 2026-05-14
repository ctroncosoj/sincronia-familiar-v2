export type Dosha = 'Vata' | 'Pitta' | 'Kapha';

export interface Child {
  id: string;
  name: string;
  dosha: Dosha | null;
  birthDate: string | null;
  notes: string | null;
  sortOrder: number;
}

const STORAGE_KEY = 'senda_raiz_children';

export function loadChildrenFromStorage(): Child[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Child[];
  } catch {
    return [];
  }
}

export function saveChildrenToStorage(children: Child[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(children));
}

export function createChild(name: string): Child {
  return {
    id: crypto.randomUUID(),
    name: name.trim(),
    dosha: null,
    birthDate: null,
    notes: null,
    sortOrder: Date.now(),
  };
}

export function personalizeText(template: string, children: Child[]): string {
  if (children.length === 0) return template;

  const names = children.map((c) => c.name);
  let result = template;

  result = result.replace(/\bLeonor\b/g, names[0] ?? 'Leonor');
  result = result.replace(/\bJulián\b/g, names[1] ?? 'Julián');

  const placeholder = result.match(/\{children\}/);
  if (placeholder) {
    const joined =
      names.length === 1
        ? names[0]
        : names.slice(0, -1).join(', ') + ' y ' + names[names.length - 1];
    result = result.replace(/\{children\}/g, joined);
  }

  return result;
}

export function childrenLabel(children: Child[]): string {
  if (children.length === 0) return 'tus hijos';
  if (children.length === 1) return children[0].name;
  if (children.length === 2) return `${children[0].name} y ${children[1].name}`;
  const last = children[children.length - 1];
  return children.slice(0, -1).map((c) => c.name).join(', ') + ' y ' + last.name;
}
