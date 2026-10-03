export const searchStyles = {

  // EMPTY
  empty: "absolute left-0 top-full z-50 mt-2 w-full rounded-2xl border border-stone-200 bg-white p-6 text-center text-sm text-stone-500 shadow-xl",

  // POPUP
  popup: "absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl",
  title: "px-4 pt-4 pb-2 text-xs font-semibold uppercase tracking-wider text-stone-400",
  list: "flex max-h-[420px] flex-col overflow-y-auto px-2 pb-2",

  // ITEM
  item: "flex items-center gap-3 rounded-xl p-2 transition hover:bg-stone-50",
  itemImage: "h-14 w-14 shrink-0 rounded-lg bg-stone-100 object-cover",
  itemInfo: "min-w-0 flex-1",
  itemName: "truncate text-sm font-medium text-ink",
  itemMeta: "truncate text-xs text-stone-500",
  itemPrice: "shrink-0 text-sm font-semibold text-ink",

  // FOOTER
  footer: "block border-t border-stone-100 px-4 py-3 text-center text-sm font-medium text-accent transition hover:bg-stone-50",
}
