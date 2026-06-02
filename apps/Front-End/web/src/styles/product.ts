export const productStyles = {

  // PRODUCT DETAIL
  detailWrapper: "max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12",
  detailGrid: "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12",
  detailImage: "w-full rounded-3xl object-cover shadow-lg max-h-[700px]",
  detailInfo: "flex flex-col justify-center",
  detailCategory: "text-gray-500 text-sm md:text-lg mb-2",
  detailTitle: "text-3xl md:text-5xl font-bold mb-6",
  detailDesc: "text-gray-600 text-base md:text-lg leading-relaxed mb-8",

  // SIZES
  sizeWrapper: "flex flex-wrap items-center gap-3 mb-8",
  sizeActive: "px-4 py-2 border rounded-xl transition bg-black text-white border-black",
  sizeInactive: "px-4 py-2 border rounded-xl transition border-gray-300 text-gray-600 hover:border-black",

  // PRICE
  priceWrapper: "flex flex-wrap items-center gap-4 md:gap-6 mb-8",
  price: "text-3xl md:text-4xl font-bold",
  sold: "text-gray-500",

  // STOCK
  stockWrapper: "flex items-center gap-4 mb-8",
  stockLabel: "text-gray-600",
  stockValue: "font-semibold",

  // BUTTONS
  btnWrapper: "flex flex-col sm:flex-row gap-4",
  addToCartBtn: "w-full sm:w-auto px-8 py-4 bg-black text-white rounded-2xl hover:bg-gray-800 transition",

  // FILTERED PRODUCTS
  filteredWrapper: "p-6",
  filteredTitle: "text-4xl font-bold mb-8 capitalize",

  // PRODUCT LIST
  emptyList: "text-center py-20 text-gray-500 text-xl",
  listGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",

  // PAGINATION
  pagination: "flex justify-center items-center flex-wrap gap-3 mt-12",
  pageActive: "px-4 py-2 rounded-xl border transition bg-black text-white border-black",
  pageInactive: "px-4 py-2 rounded-xl border transition bg-white hover:bg-gray-100",

  // PRODUCT LIST ITEM
  itemCard: "rounded-3xl overflow-hidden bg-white shadow-lg hover:-translate-y-1 hover:shadow-2xl transition duration-300",
  itemImage: "w-full h-80 object-cover hover:scale-105 transition duration-300",
  itemContent: "p-5",
  itemCategory: "text-sm text-gray-500 mb-2",
  itemName: "text-lg font-semibold text-gray-900 hover:text-black transition",
  itemSizes: "flex items-center mt-2 space-x-2",
  itemSize: "px-2 py-1 border border-gray-300 rounded text-sm text-gray-600",
  itemDesc: "text-gray-500 text-sm mt-2 line-clamp-2",
  itemFooter: "flex items-center justify-between mt-5",
  itemPrice: "text-2xl font-bold text-black",
  itemSold: "text-sm text-gray-500",
}