import { ulid } from "ulid";

export const prefixes = {
  clothe: "clo",
} as const;

export function createID(prefix: keyof typeof prefixes): string {
  return [prefixes[prefix], ulid()].join("_");
}
