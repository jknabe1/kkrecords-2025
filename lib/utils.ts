import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import imageUrlBuilder from "@sanity/image-url"
import { client } from "@/sanity/client"

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

