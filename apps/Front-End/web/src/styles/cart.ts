export const cartStyles = {

  // PAGE
  page: "min-h-screen bg-cream text-ink",
  inner: "mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12",
  loading: "flex h-[60vh] items-center justify-center text-stone-400",

  // HEADER
  header: "mb-8 lg:mb-10",
  backLink: "inline-flex items-center gap-1.5 text-sm text-stone-500 transition hover:text-ink",
  title: "mt-4 text-3xl font-semibold tracking-tight sm:text-4xl",
  count: "mt-1 text-sm text-stone-500",

  // GRID
  grid: "grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]",
  itemsList: "flex flex-col divide-y divide-stone-200 rounded-3xl border border-stone-200 bg-white px-4 sm:px-6",
  itemWrapper: "py-5",

  // CART ITEM CARD
  itemCard: "flex gap-4 sm:gap-5",
  itemImage: "h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-stone-100 sm:h-32 sm:w-28",
  itemImg: "h-full w-full object-cover",
  itemBody: "flex min-w-0 flex-1 flex-col",
  itemTop: "flex items-start justify-between gap-3",
  itemInfo: "min-w-0",
  itemBrand: "text-xs font-medium uppercase tracking-wider text-stone-400",
  itemName: "mt-0.5 font-medium leading-snug text-ink hover:text-accent",
  itemSize: "mt-2 inline-block rounded-md bg-stone-100 px-2 py-0.5 text-xs text-stone-600",
  itemPrice: "mt-1 text-sm text-stone-500",
  itemBottom: "mt-auto flex items-center justify-between gap-3 pt-3",

  // QUANTITY
  quantity: "inline-flex items-center rounded-full border border-stone-200",
  quantityBtn: "inline-flex h-9 w-9 items-center justify-center rounded-full text-stone-600 transition hover:bg-stone-100 hover:text-ink",
  quantityCount: "w-8 text-center text-sm font-medium tabular-nums",

  // TOTAL & REMOVE
  itemTotalPrice: "font-semibold tabular-nums",
  removeBtn: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-stone-400 transition hover:bg-red-50 hover:text-red-600",

  // SUMMARY
  summaryWrapper: "h-fit lg:sticky lg:top-8",
  summaryInner: "",
  summary: "rounded-3xl border border-stone-200 bg-white p-6",
  summaryTitle: "text-lg font-semibold",
  summaryRows: "mt-6 space-y-3 text-sm",
  summaryRow: "flex justify-between text-stone-600",
  summaryFree: "font-medium text-emerald-600",
  summaryDivider: "mt-4 flex items-baseline justify-between border-t border-stone-200 pt-4",
  summaryTotalLabel: "font-semibold",
  summaryTotalPrice: "text-2xl font-semibold tabular-nums",
  checkoutBtn: "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 text-sm font-semibold text-white transition hover:bg-stone-700 disabled:cursor-wait disabled:opacity-70",
  error: "mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700",
  secureNote: "mt-4 flex items-center justify-center gap-1.5 text-xs text-stone-400",

  // EMPTY CART
  empty: "flex flex-col items-center justify-center rounded-3xl border border-dashed border-stone-300 bg-white px-6 py-24 text-center",
  emptyIcon: "mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-sand text-stone-600",
  emptyTitle: "mb-2 text-2xl font-semibold",
  emptyDesc: "mb-8 max-w-md text-stone-500",
  emptyBtn: "rounded-full bg-ink px-8 py-3 text-sm font-semibold text-white transition hover:bg-stone-700",
}
