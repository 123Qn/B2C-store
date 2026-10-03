import Image from "next/image";
import heroImage from "../../asset/image/hero.webp";

export function Hero() {
  return (
    <section className="relative mb-10 h-[220px] overflow-hidden rounded-3xl md:h-[320px]">
      <Image src={heroImage} alt="Hero" fill priority className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-center px-6 text-white md:px-12">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/70">New Season</p>
        <h1 className="mt-3 max-w-md text-3xl font-semibold leading-tight md:text-5xl">Timeless Fashion</h1>
        <p className="mt-3 max-w-sm text-sm text-white/80 md:text-base">
          Modern, elegant everyday pieces. Free delivery and returns accepted within 30 days.
        </p>
      </div>
    </section>
  );
}
