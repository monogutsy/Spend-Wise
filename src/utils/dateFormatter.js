import { format, isValid, parseISO } from "date-fns";

export function formatDate(dateInput, dateFormat = "MMM d, yyyy") {
  if (!dateInput) {
    return "";
  }

  const parsedDate =
    typeof dateInput === "string"
      ? parseISO(dateInput)
      : new Date(dateInput);

  if (!isValid(parsedDate)) {
    return "";
  }

  return format(parsedDate, dateFormat);
}
