export const leftMenuStyles = {

  // LINK LISTS
  linkList: "flex flex-col gap-0.5",
  link: "block rounded-lg px-3 py-2 text-sm capitalize text-stone-600 transition hover:bg-stone-100 hover:text-ink",
  linkActive: "block rounded-lg px-3 py-2 text-sm font-medium capitalize bg-ink text-white",

  // LEFT MENU
  menuInner: "flex flex-col gap-8",
  menuSection: "flex flex-col gap-6",
  menuTitle: "mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-stone-400",
  desktop: "hidden lg:block sticky top-[67px] self-start max-h-[calc(100vh-67px)] w-64 shrink-0 overflow-y-auto border-r border-stone-200 px-4 py-8",

  // MOBILE MENU
  mobileWrapper: "block border-b border-stone-200 lg:hidden",
  mobileBar: "flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-ink",
  mobileToggle: "inline-flex items-center gap-2",
  mobileContent: "px-2 pb-4",
}
