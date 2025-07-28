// Debounce utility
type Procedure = (...args: any[]) => void;

/**
 * Creates a debounced version of a function that delays execution.
 */
export function debounce<T extends Procedure>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;

  const debounced = (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };

  return debounced;
}