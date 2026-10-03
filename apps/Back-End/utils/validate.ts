// Strict input checks for API bodies.
//
// Every value that reaches the store must be a plain string / number / boolean.
// This blocks operator injection such as {"password": {"not": "x"}}, which Prisma
// would otherwise treat as a filter, and keeps junk out of the JSON store.

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export function str(
  value: unknown,
  field: string,
  { min = 1, max = 200, pattern }: { min?: number; max?: number; pattern?: RegExp } = {}
): string {
  if (typeof value !== "string") throw new ValidationError(`${field} must be text`);
  const trimmed = value.trim();
  if (trimmed.length < min) throw new ValidationError(`${field} is required`);
  if (trimmed.length > max) throw new ValidationError(`${field} is too long`);
  if (pattern && !pattern.test(trimmed)) throw new ValidationError(`${field} is invalid`);
  return trimmed;
}

// passwords are not trimmed
export function password(value: unknown, field = "Password"): string {
  if (typeof value !== "string" || value.length === 0) throw new ValidationError(`${field} is required`);
  if (value.length > 200) throw new ValidationError(`${field} is too long`);
  return value;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function email(value: unknown): string {
  return str(value, "Email", { max: 254, pattern: EMAIL });
}

export function num(
  value: unknown,
  field: string,
  { min = 0, max = 1_000_000, integer = false }: { min?: number; max?: number; integer?: boolean } = {}
): number {
  const n = typeof value === "string" && value.trim() !== "" ? Number(value) : value;
  if (typeof n !== "number" || !Number.isFinite(n)) throw new ValidationError(`${field} must be a number`);
  if (integer && !Number.isInteger(n)) throw new ValidationError(`${field} must be a whole number`);
  if (n < min || n > max) throw new ValidationError(`${field} is out of range`);
  return n;
}

export function bool(value: unknown, field: string): boolean {
  if (typeof value !== "boolean") throw new ValidationError(`${field} must be true or false`);
  return value;
}

export function oneOf<T extends string>(value: unknown, field: string, options: readonly T[]): T {
  if (typeof value !== "string" || !options.includes(value as T)) {
    throw new ValidationError(`${field} must be one of: ${options.join(", ")}`);
  }
  return value as T;
}

// only http(s) URLs — blocks javascript:, data: etc. from being stored and rendered
export function httpUrl(value: unknown, field: string): string {
  const raw = str(value, field, { max: 2000 });
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new ValidationError(`${field} must be a valid URL`);
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new ValidationError(`${field} must start with http:// or https://`);
  }
  return url.toString();
}

export function strList(value: unknown, field: string, { maxItems = 30, max = 20 } = {}): string[] {
  if (!Array.isArray(value) || value.length === 0) throw new ValidationError(`${field} must be a non-empty list`);
  if (value.length > maxItems) throw new ValidationError(`${field} has too many items`);
  return [...new Set(value.map((item) => str(item, field, { max })))];
}

// body must be a JSON object
export async function readJson(request: Request): Promise<Record<string, unknown>> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    throw new ValidationError("Invalid JSON body");
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new ValidationError("Invalid JSON body");
  }
  return body as Record<string, unknown>;
}
