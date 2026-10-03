export const historyStyles = {

  // LOADING
  loading: "flex h-[70vh] items-center justify-center bg-cream text-stone-400",

  // PAGE
  page: "min-h-screen bg-cream text-ink",
  inner: "mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-12",
  backLink: "inline-flex items-center gap-1.5 text-sm text-stone-500 transition hover:text-ink",

  // HEADER
  header: "mb-8 mt-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between",
  title: "text-3xl font-semibold tracking-tight sm:text-4xl",
  subtitle: "mt-1 text-sm text-stone-500",
  stats: "text-sm text-stone-500",

  // EMPTY
  empty: "flex flex-col items-center rounded-3xl border border-dashed border-stone-300 bg-white px-6 py-20 text-center",
  emptyIcon: "mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-sand text-stone-600",
  emptyTitle: "mb-2 text-2xl font-semibold",
  emptyDesc: "mb-8 text-stone-500",
  emptyBtn: "rounded-full bg-ink px-8 py-3 text-sm font-semibold text-white transition hover:bg-stone-700",

  // ORDER LIST
  grid: "flex flex-col gap-5",
  orderCard: "overflow-hidden rounded-3xl border border-stone-200 bg-white",

  // ORDER HEADER
  orderHeader: "flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 bg-stone-50/60 px-5 py-4 sm:px-6",
  orderHeaderLeft: "flex flex-wrap items-center gap-x-6 gap-y-1",
  orderId: "font-semibold",
  orderDate: "text-sm text-stone-500",
  orderTotalRight: "flex items-center gap-3",
  orderTotalLabel: "text-xs uppercase tracking-wider text-stone-400",
  orderTotalPrice: "text-lg font-semibold tabular-nums",
  status: "rounded-full px-2.5 py-0.5 text-xs font-medium",

  // ORDER ITEMS
  itemsList: "divide-y divide-stone-100 px-5 sm:px-6",
  itemRow: "flex items-center gap-4 py-4",
  itemImage: "h-16 w-14 shrink-0 rounded-xl bg-stone-100 object-cover",
  itemInfo: "min-w-0 flex-1",
  itemName: "truncate font-medium text-ink hover:text-accent",
  itemMeta: "mt-1 flex gap-3 text-xs text-stone-500",
  itemPrice: "font-semibold tabular-nums",
}

export function statusClass(status?: string) {
  switch ((status ?? "").toUpperCase()) {
    case "PAID":
    case "COMPLETED":
    case "DELIVERED":
      return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
    case "CANCELLED":
    case "FAILED":
      return "bg-red-50 text-red-700 ring-1 ring-red-200";
    case "SHIPPED":
      return "bg-sky-50 text-sky-700 ring-1 ring-sky-200";
    default:
      return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
  }
}
