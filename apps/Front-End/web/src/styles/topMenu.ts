export const topMenuStyles = {

  // NAVBAR
  navbar: "sticky top-0 z-40 border-b border-stone-200/80 bg-cream/85 backdrop-blur-md",
  navRow: "mx-auto flex max-w-screen-2xl items-center gap-3 px-4 py-3 md:gap-6 md:px-8",

  // LOGO
  logoLink: "flex shrink-0 items-center gap-2.5",
  logoImg: "h-9 w-9 rounded-full ring-1 ring-stone-200 md:h-10 md:w-10",
  logoText: "hidden text-xl font-semibold tracking-tight text-ink sm:block md:text-2xl",

  // RIGHT SIDE
  navRight: "ml-auto flex shrink-0 items-center gap-1 md:gap-2",

  // AUTH BUTTONS
  logoutBtn: "inline-flex h-10 items-center gap-1.5 rounded-full px-2.5 text-sm font-medium text-stone-600 transition hover:bg-stone-100 hover:text-ink sm:px-3",
  loginBtn: "inline-flex items-center rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-700",

  // NAV BUTTONS
  navBtn: "relative inline-flex h-10 w-10 items-center justify-center rounded-full text-stone-700 transition hover:bg-stone-100 hover:text-ink",
  navIcon: "h-6 w-6",
  cartBadge: "absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-semibold text-white",

  // SEARCH
  searchWrapper: "relative flex-1 md:max-w-xl md:mx-auto",
  searchInput: "w-full rounded-full border border-stone-200 bg-white py-2.5 pl-11 pr-10 text-sm text-ink placeholder:text-stone-400 shadow-sm outline-none transition focus:border-stone-400 focus:ring-4 focus:ring-stone-200/60",
  searchIcon: "pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400",
  searchClear: "absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-stone-400 transition hover:bg-stone-100 hover:text-stone-700",
}
