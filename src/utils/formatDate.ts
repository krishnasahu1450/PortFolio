import { format, parseISO, isValid } from "date-fns";

/**
 * Format date safely using date-fns
 *
 * @param date - ISO string | Date | null | undefined
 * @param dateFormat - date-fns format string (default: "MMM yyyy")
 * @returns formatted date or "-"
 */
export const formatDate = (
  date: string | Date | null | undefined,
  dateFormat: string = "MMM yyyy"
): string => {
  if (!date) return "-";

  let parsedDate: Date;

  if (typeof date === "string") {
    parsedDate = parseISO(date);
  } else {
    parsedDate = date;
  }

  if (!isValid(parsedDate)) return "-";

  return format(parsedDate, dateFormat);
};
