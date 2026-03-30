export function cx(
  ...classes: Array<
    string | Record<string, boolean | null | undefined> | null | undefined
  >
): string {
  // class helper that turns a list of classes into a single string
  // if one of the classes is an object, it will add the key if the value is truthy

  // e.g. cx("foo", "bar") => "foo bar"
  // e.g. cx("foo", { bar: true }) => "foo bar"
  return classes
    .flatMap((item) => {
      if (!item) return [];

      // if string → keep it
      if (typeof item === "string") return [item];

      // if object → pick keys with truthy value
      if (typeof item === "object") {
        return Object.entries(item)
          .filter(([_, value]) => value)
          .map(([key]) => key);
      }

      return [];
    })
    .join(" ");
}

export default cx;
