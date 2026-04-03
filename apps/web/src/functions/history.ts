export function history(posts: { date: Date; active: boolean }[]) {
  const map: Record<string, number> = {};//stgare

  for (const p of posts) {
    if (!p.active) continue;

    const date = new Date(p.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const key = `${year}-${month}`;

    if (map[key]) {
      map[key]++;
    } else {
      map[key] = 1;
    }
  }

  return Object.entries(map)
    .map(([key, count]) => {
      const [year, month] = key.split("-").map(Number);
      return { year: year ?? 0, month: month ?? 0, count };
    })
    .sort((a, b) => {
      if (a.year === b.year) {
        return b.month - a.month;
      }

      return b.year - a.year;
    });
}