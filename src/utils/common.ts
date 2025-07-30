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


export const formatISODateToDDMMYYYY = (isoDateString: string) => {
  const date = new Date(isoDateString); // Create a Date object

  const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero if needed.
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad with leading zero if needed.
  const year = date.getFullYear(); // Get the full year.

  return `${day}-${month}-${year}`; // Combine into the desired format.
}