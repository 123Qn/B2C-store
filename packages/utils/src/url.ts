export function toUrlPath(path: string) {
  return path
    .toLowerCase()                 // React → react
    .replace(/[^a-z0-9]+/g, "-")   // remove special chars → hyphen
    .replace(/-+/g, "-")           // multiple hyphens → single
    .replace(/^-|-$/g, "");        // trim hyphens at start/end
}