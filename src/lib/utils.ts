import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [year, month, day] = dateStr.split("-");

  const formattedDate = `${day} - ${months[parseInt(month) - 1]} - ${year}`;

  return formattedDate;
}

export function getMonthAndYear(year : string, month : string) {
  const monthString = month.toString().padStart(2, '0');
  
  return `${year}-${monthString}`;
}
export function ImageUrlFormating(url : string) {
  return url.slice(1, -1).replace(/"/g, '');
}
