export function history(posts: { date: Date; active: boolean }[]) {
  const map = new Map<string, { month: number; year: number; count: number }>();

  for (const p of posts) {
    if (!p.active) continue;

    const d = new Date(p.date);
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    const key = `${year}-${month}`;

    if (!map.has(key)) {
      map.set(key, {
        month,
        year,
        count: 1,
      });
    }
  }

  return Array.from(map.values()).sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return b.month - a.month;
  });
}