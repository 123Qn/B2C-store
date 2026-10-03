export const productStyles = {

  // PRODUCT DETAIL
  detailWrapper: "mx-auto max-w-6xl",
  backLink: "mb-6 inline-flex items-center gap-1.5 text-sm text-stone-500 transition hover:text-ink",
  detailGrid: "grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14",
  detailImageWrapper: "overflow-hidden rounded-3xl bg-stone-100",
  detailImage: "aspect-[4/5] w-full object-cover",
  detailInfo: "flex flex-col lg:py-6",
  detailMeta: "flex flex-wrap items-center gap-2 text-sm",
  detailBrand: "font-medium uppercase tracking-wider text-stone-500",
  detailCategory: "rounded-full bg-sand px-3 py-1 text-xs font-medium capitalize text-stone-700",
  detailTitle: "mt-3 text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl",
  priceWrapper: "mt-4 flex flex-wrap items-baseline gap-4",
  price: "text-2xl font-semibold text-ink md:text-3xl",
  sold: "text-sm text-stone-500",
  detailDesc: "mt-6 text-base leading-relaxed text-stone-600",
  divider: "my-8 border-t border-stone-200",

  // SIZES
  sizeHeader: "mb-3 flex items-center justify-between text-sm",
  sizeLabel: "font-medium text-ink",
  sizeSelected: "text-stone-500",
  sizeWrapper: "flex flex-wrap items-center gap-2",
  sizeActive: "min-w-12 rounded-xl border border-ink bg-ink px-4 py-2.5 text-sm font-medium text-white transition",
  sizeInactive: "min-w-12 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-700 transition hover:border-ink",

  // STOCK
  stockWrapper: "mt-6 flex items-center gap-2 text-sm",
  stockDotIn: "h-2 w-2 rounded-full bg-emerald-500",
  stockDotLow: "h-2 w-2 rounded-full bg-amber-500",
  stockDotOut: "h-2 w-2 rounded-full bg-red-500",
  stockLabel: "text-stone-600",

  // BUTTONS
  btnWrapper: "mt-8 flex flex-col gap-3",
  addToCartBtn: "inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-semibold text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-300",
  toast: "animate-toast-in flex items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800",
  toastLink: "font-semibold underline underline-offset-2 hover:text-emerald-950",

  // PERKS
  perks: "mt-8 grid grid-cols-1 gap-3 text-sm text-stone-600 sm:grid-cols-3",
  perk: "flex items-center gap-2 rounded-2xl bg-white px-4 py-3 ring-1 ring-stone-200",
  perkIcon: "h-5 w-5 shrink-0 text-stone-500",

  // NOT FOUND
  notFound: "flex flex-col items-center justify-center rounded-3xl border border-dashed border-stone-300 bg-white px-6 py-24 text-center",
  notFoundTitle: "text-2xl font-semibold text-ink",
  notFoundDesc: "mt-2 text-stone-500",
  notFoundBtn: "mt-6 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-700",

  // FILTERED PRODUCTS
  filteredWrapper: "",
  filteredHeader: "mb-8",
  filteredEyebrow: "text-xs font-semibold uppercase tracking-wider text-stone-400",
  filteredTitle: "mt-1 text-3xl font-semibold capitalize tracking-tight text-ink md:text-4xl",
  filteredCount: "mt-1 text-sm text-stone-500",

  // PRODUCT LIST
  emptyList: "flex flex-col items-center justify-center rounded-3xl border border-dashed border-stone-300 bg-white px-6 py-20 text-center",
  emptyListTitle: "text-xl font-semibold text-ink",
  emptyListDesc: "mt-2 text-sm text-stone-500",
  listGrid: "grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3",

  // PAGINATION
  pagination: "mt-14 flex flex-wrap items-center justify-center gap-2",
  pageActive: "h-10 min-w-10 rounded-full bg-ink px-3 text-sm font-medium text-white",
  pageInactive: "h-10 min-w-10 rounded-full px-3 text-sm text-stone-600 transition hover:bg-stone-100 hover:text-ink",
  pageArrow: "inline-flex h-10 items-center gap-1 rounded-full px-3 text-sm text-stone-600 transition hover:bg-stone-100 hover:text-ink disabled:pointer-events-none disabled:opacity-40",

  // PRODUCT LIST ITEM
  itemCard: "group flex flex-col",
  itemImageWrapper: "relative block overflow-hidden rounded-2xl bg-stone-100",
  itemImage: "aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105",
  itemBadge: "absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink backdrop-blur",
  itemBadgeOut: "absolute left-3 top-3 rounded-full bg-ink/90 px-3 py-1 text-xs font-medium text-white backdrop-blur",
  itemContent: "flex flex-1 flex-col pt-4",
  itemCategory: "text-xs font-medium uppercase tracking-wider text-stone-400",
  itemName: "mt-1 line-clamp-1 font-medium text-ink transition hover:text-accent",
  itemDesc: "mt-1 line-clamp-2 text-sm text-stone-500",
  itemSizes: "mt-3 flex flex-wrap items-center gap-1.5",
  itemSize: "rounded-md border border-stone-200 px-2 py-0.5 text-xs text-stone-500",
  itemFooter: "mt-3 flex items-center justify-between",
  itemPrice: "text-lg font-semibold text-ink",
  itemSold: "text-xs text-stone-400",
}
