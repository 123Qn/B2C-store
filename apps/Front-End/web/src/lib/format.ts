const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatPrice(value: number) {
  return priceFormatter.format(Number.isFinite(value) ? value : 0);
}

export function formatDate(value: string | Date) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// size is String[] in the schema, but older rows / forms may hold "S, M, L"
export function getSizes(size: unknown): string[] {
  const raw = Array.isArray(size)
    ? size
    : typeof size === "string"
      ? size.split(",")
      : [];

  return raw.map((s) => String(s).trim()).filter(Boolean);
}

export const FALLBACK_IMAGE = "/wsulogo.png";

export function safeDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
