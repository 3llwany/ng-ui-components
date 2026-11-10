let uniqueIdCounter = 0;

export function createUniqueId(prefix = 'uid'): string {
  return `${prefix}_${++uniqueIdCounter}`;
}

export function getDirection(text?: string | number | null): 'rtl' | 'ltr' {
  if (text === null || text === undefined || text === '') return 'ltr';
  const rtlChars = /[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
  return rtlChars.test(String(text)) ? 'rtl' : 'ltr';
}


