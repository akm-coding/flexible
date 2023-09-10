"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ReactNode, useCallback, useRef } from "react";

export default function Modal({ children }: { children: ReactNode }) {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDimiss = useCallback(() => {
    router.push("/");
  }, [router]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlay.current && onDimiss) {
        onDimiss();
      }
    },
    [onDimiss, overlay]
  );

  return (
    <div ref={overlay} className="modal" onClick={handleClick}>
      <button
        className="absolute top-4 right-8"
        type="button"
        onClick={onDimiss}
      >
        <Image src="/close.svg" width={17} height={17} alt="close" />
      </button>
      <div ref={wrapper} className="modal_wrapper">
        {children}
      </div>
    </div>
  );
}
