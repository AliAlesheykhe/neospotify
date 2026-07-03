// Safe localStorage helpers so SSR doesn't break
export const saveToLocalStorage = (key: string, value: any) => {
  if (typeof window === "undefined") return; 
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key: string) => {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
};
