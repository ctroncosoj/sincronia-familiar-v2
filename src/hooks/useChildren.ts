import { useState, useEffect, useCallback } from 'react';
import {
  type Child,
  loadChildrenFromStorage,
  saveChildrenToStorage,
  createChild,
} from '../lib/children';

export interface UseChildrenReturn {
  children: Child[];
  addChild: (name: string) => void;
  removeChild: (id: string) => void;
  updateChildDosha: (id: string, dosha: Child['dosha']) => void;
  updateChildName: (id: string, name: string) => void;
}

export function useChildren(): UseChildrenReturn {
  const [children, setChildren] = useState<Child[]>([]);

  useEffect(() => {
    setChildren(loadChildrenFromStorage());
  }, []);

  const persist = useCallback((updated: Child[]) => {
    setChildren(updated);
    saveChildrenToStorage(updated);
  }, []);

  const addChild = useCallback(
    (name: string) => {
      const trimmed = name.trim();
      if (!trimmed) return;
      persist([...children, createChild(trimmed)]);
    },
    [children, persist]
  );

  const removeChild = useCallback(
    (id: string) => {
      persist(children.filter((c) => c.id !== id));
    },
    [children, persist]
  );

  const updateChildDosha = useCallback(
    (id: string, dosha: Child['dosha']) => {
      persist(children.map((c) => (c.id === id ? { ...c, dosha } : c)));
    },
    [children, persist]
  );

  const updateChildName = useCallback(
    (id: string, name: string) => {
      const trimmed = name.trim();
      if (!trimmed) return;
      persist(children.map((c) => (c.id === id ? { ...c, name: trimmed } : c)));
    },
    [children, persist]
  );

  return { children, addChild, removeChild, updateChildDosha, updateChildName };
}
