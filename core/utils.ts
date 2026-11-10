export function getDirection(text?: string): 'rtl' | 'ltr' {
  if (!text) return 'ltr';
  const rtlChars = /[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
  return rtlChars.test(text) ? 'rtl' : 'ltr';
}

