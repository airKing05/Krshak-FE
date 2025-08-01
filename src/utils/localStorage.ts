// src/utils/localStorage.ts

/**
 * Save value to localStorage.
 * Automatically stringifies objects.
 */
export function setToLocalStorage<T>(key: string, value: T): void {
  try {
    const data = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, data);
  } catch (error) {
    console.error(`Error saving to localStorage with key "${key}":`, error);
  }
}

/**
 * Retrieve and parse value from localStorage.
 * If parsing fails, returns raw string or null.
 */
export function getFromLocalStorage<T>(key: string): T | string | null {
  try {
    if (typeof window === 'undefined') return null;
    const item = localStorage.getItem(key);
    if (!item) return null;

    try {
      return JSON.parse(item) as T;
    } catch {
      return item; 
    }
  } catch (error) {
    console.warn(`Error accessing localStorage item "${key}":`, error);
    return null;
  }
}


/**
 * Remove a key from localStorage.
 */
export function removeFromLocalStorage(key: string): void {
  localStorage.removeItem(key);
}

/**
 * Clear all localStorage keys.
 */
export function clearLocalStorage(): void {
  localStorage.clear();
}
