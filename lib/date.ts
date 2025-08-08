/**
 * Parses a date string in MM-DD-YYYY format
 * @param date - Date string in MM-DD-YYYY format
 * @returns Date object
 */
export const parse = (date: string): Date => {
  const [month, day, year] = date.split("-").map(Number);
  return new Date(year, month - 1, day); // month is 0-indexed in Date constructor
};

/**
 * Parses a date string and formats it as "Month D, YYYY"
 * @param date - Date string in MM-DD-YYYY format
 * @returns Formatted date string (e.g., "January 1, 2024")
 */
export const parseAndFormat = (date: string): string => {
  const parsedDate = parse(date);

  // Use toLocaleDateString with options for consistent formatting
  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
