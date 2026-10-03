import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import logo from "../../../public/wsulogo.png";
import heroImage from "../../asset/image/hero.webp";
import { authStyles as s } from "@/styles/auth";

type Props = {
  panelTitle: string;
  panelText: string;
  features?: string[];
  children: ReactNode;
};

export function AuthShell({ panelTitle, panelText, features = [], children }: Props) {
  return (
    <main className={s.shell}>

      {/* IMAGE PANEL */}
      <div className={s.imagePanel}>
        <Image src={heroImage} alt="" fill priority className="object-cover" sizes="50vw" />
        <div className={s.imageOverlay} />
        <div className={s.imageContent}>
          <p className={s.imageTitle}>{panelTitle}</p>
          <p className={s.imageDesc}>{panelText}</p>
          {features.length > 0 && (
            <div className={s.imageFeatures}>
              {features.map((feature) => (
                <span key={feature} className={s.imageFeature}>{feature}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FORM PANEL */}
      <div className={s.formPanel}>
        <Link href="/" className={s.brand}>
          <Image src={logo} alt="logo" width={32} height={32} className="rounded-full" />
          Q Fashion
        </Link>
        <div className={s.formWrapper}>{children}</div>
      </div>

    </main>
  );
}
