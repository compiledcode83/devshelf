import type { Nil } from '../types/types';

export const updateStyles = (
  el: Nil<HTMLElement>,
  styles: Partial<Record<keyof CSSStyleDeclaration, string>>,
) => {
  if (!el) return;
  Object.entries(styles).forEach(([key, val]) => {
    el.style[key as any] = val!;
  });
};
