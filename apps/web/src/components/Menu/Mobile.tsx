"use client";

import { useState }
from "react";

export function MobileMenu({
  children,
}: {
  children: React.ReactNode;
}) {

  const [open, setOpen] =
    useState(false);

  return (

    <div className="block lg:hidden">

      {/* TOP BAR */}
      <div className="flex items-center justify-between bg-[#B89B8A] p-4 border-b border-gray-200">

        <h1 className="text-xl font-bold">
          Menu
        </h1>

        <button
          onClick={() =>
            setOpen(!open)
          }
          className="text-2xl p-2 rounded-lg hover:bg-[#a88878] transition"
        >
          {open ? "✕" : "☰"}
        </button>

      </div>

      {/* MENU */}
      {open && (

        <div className="bg-[#B89B8A] p-4 border-b border-gray-200">

          {children}

        </div>

      )}

    </div>

  );

}