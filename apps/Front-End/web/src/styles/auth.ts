export const authStyles = {

  // SHARED SHELL
  shell: "min-h-screen bg-cream text-ink lg:grid lg:grid-cols-2",
  imagePanel: "relative hidden overflow-hidden lg:block",
  imageOverlay: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10",
  imageContent: "absolute inset-x-0 bottom-0 p-12 text-white",
  imageTitle: "text-4xl font-semibold leading-tight",
  imageDesc: "mt-4 max-w-md text-white/80",
  imageFeatures: "mt-8 flex flex-wrap gap-2",
  imageFeature: "rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur",
  formPanel: "flex min-h-screen flex-col px-6 py-8 sm:px-12",
  brand: "inline-flex items-center gap-2 text-lg font-semibold tracking-tight",
  formWrapper: "m-auto w-full max-w-sm py-10",

  // HEADER
  header: "mb-8",
  title: "text-3xl font-semibold tracking-tight",
  subtitle: "mt-2 text-stone-500",

  // FORM
  form: "flex flex-col gap-4",
  fieldWrapper: "flex flex-col",
  label: "mb-1.5 text-sm font-medium text-stone-700",
  input: "w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-stone-400 focus:border-stone-500 focus:ring-4 focus:ring-stone-200/60",
  hint: "mt-1.5 text-xs text-stone-400",
  submitBtn: "mt-2 inline-flex w-full items-center justify-center rounded-full bg-ink py-3.5 text-sm font-semibold text-white transition hover:bg-stone-700 disabled:cursor-wait disabled:opacity-70",

  // MESSAGES
  error: "rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200",
  success: "rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 ring-1 ring-emerald-200",

  // FOOTER LINK
  switchText: "mt-8 text-center text-sm text-stone-500",
  switchLink: "font-semibold text-ink hover:underline",
}
