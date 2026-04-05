import "./src/app/globals.css";
import { vi } from "vitest";

vi.mock("next/link", () => {
  return {
    default: ({ children, href }: any) => {
      return <a href={href}>{children}</a>;
    },
  };
});