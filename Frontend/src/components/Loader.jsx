import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loader({ full = false }) {
  return (
    <div
      className={
        full
          ? "fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          : "flex items-center justify-center w-full h-screen"
      }
    >
      <AiOutlineLoading3Quarters className="text-5xl animate-spin text-blue-400" />
    </div>
  );
}
