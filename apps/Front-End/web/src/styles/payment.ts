export const paymentStyles = {

  // LOADING
  loading: "flex h-screen items-center justify-center bg-cream text-stone-400",

  // PAGE
  page: "min-h-screen bg-cream text-ink",
  inner: "mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-12",
  backLink: "inline-flex items-center gap-1.5 text-sm text-stone-500 transition hover:text-ink",
  title: "mt-4 text-3xl font-semibold tracking-tight sm:text-4xl",
  subtitle: "mt-1 text-sm text-stone-500",
  grid: "mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]",

  // CARD
  card: "rounded-3xl border border-stone-200 bg-white p-6 sm:p-8",
  cardHeader: "mb-6 flex items-center justify-between",
  cardTitle: "text-lg font-semibold",
  demoBadge: "rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 ring-1 ring-amber-200",

  // CARD PREVIEW
  preview: "mb-6 flex aspect-[1.7/1] max-w-sm flex-col justify-between rounded-2xl bg-gradient-to-br from-stone-800 to-stone-950 p-5 text-white shadow-lg",
  previewNumber: "font-mono text-lg tracking-widest",
  previewRow: "flex justify-between text-xs uppercase tracking-wider text-white/60",

  // INPUTS
  inputWrapper: "space-y-4",
  label: "mb-1.5 block text-sm font-medium text-stone-700",
  input: "w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none transition placeholder:text-stone-400 focus:border-stone-500 focus:ring-4 focus:ring-stone-200/60",
  inputRow: "grid grid-cols-2 gap-4",

  // SUMMARY
  summary: "h-fit rounded-3xl border border-stone-200 bg-white p-6 lg:sticky lg:top-8",
  summaryTitle: "text-lg font-semibold",
  summaryRow: "mt-3 flex justify-between text-sm text-stone-600",
  orderRef: "font-medium text-ink",
  footer: "mt-4 border-t border-stone-200 pt-4",
  totalRow: "flex items-baseline justify-between",
  totalLabel: "font-semibold",
  totalPrice: "text-2xl font-semibold tabular-nums",

  // BUTTON
  payBtn: "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 text-sm font-semibold text-white transition hover:bg-stone-700 disabled:opacity-70",
  secureNote: "mt-4 flex items-center justify-center gap-1.5 text-xs text-stone-400",
}
