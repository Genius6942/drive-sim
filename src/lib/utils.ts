export const $ = <T = HTMLElement>(query: string) =>
  document.querySelector(query) as T;

export const $$ = <T = HTMLElement>(query: string) => Array.from(document.querySelectorAll(query)) as T[];
