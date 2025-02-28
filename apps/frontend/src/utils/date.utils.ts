import { formatDistanceToNow } from "date-fns";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function getTimeElapsed(date: string) {
  return formatDistanceToNow(date, { includeSeconds: true, addSuffix: true });
}

export { formatDate, getTimeElapsed };
