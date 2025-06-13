import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function smoothScrollTo(href: string) {
  const element = document.querySelector(href);
  element!.scrollIntoView({ behavior: "smooth" });
}
