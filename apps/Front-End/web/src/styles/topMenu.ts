export const topMenuStyles = {

  // NAVBAR
  navbar: "bg-[#D8C6C0] px-4 md:px-8 py-5",
  navRow: "flex items-center justify-between gap-4 flex-wrap",

  // LOGO
  logoLink: "flex items-center gap-3",
  logoImg: "rounded-full shadow-lg border-2 border-white",
  logoText: "text-2xl md:text-4xl text-[#F7F2EF] font-semibold",

  // RIGHT SIDE
  navRight: "flex items-center gap-3 md:gap-5",

  // AUTH BUTTONS
  logoutBtn: "bg-[#8B6B61] text-white px-3 md:px-4 py-2 rounded-full hover:bg-gray-800 transition",
  loginBtn: "bg-white text-black px-3 md:px-4 py-2 rounded-full hover:bg-gray-200 transition",

  // NAV BUTTONS
  navBtn: "text-white text-2xl md:text-3xl hover:text-gray-300 transition",
  cartBtn: "relative text-white text-2xl md:text-3xl hover:text-gray-300 transition",
  cartBadge: "absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-xs flex items-center justify-center text-white",

  // SEARCH
  searchWrapper: "relative mt-5 w-full lg:max-w-[500px] lg:mx-auto",
  searchInput: "w-full rounded-full bg-[#F7F2EF] px-5 py-3 pl-12 text-black shadow-lg outline-none focus:ring-2 focus:ring-[#d192bd] transition",
  searchIcon: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400",

  // HERO
  hero: "relative w-full h-[200px] md:h-[300px] overflow-hidden",
  heroImg: "object-cover",
  heroOverlay: "absolute inset-0 bg-black/50",
  heroContent: "absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4",
  heroTitle: "text-3xl md:text-5xl font-black uppercase tracking-[0.2em] drop-shadow-xl",
  heroSubtitle: "mt-3 text-xs md:text-base tracking-widest uppercase text-gray-200",
  heroText: "text-[10px] md:text-sm text-gray-300 mt-2",
}