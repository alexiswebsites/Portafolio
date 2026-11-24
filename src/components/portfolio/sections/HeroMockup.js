"use client";

import { useState, useSyncExternalStore } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

/* ---------- Preferencia "reducir movimiento" del sistema ---------- */
const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}
const getSnapshot = () => window.matchMedia(QUERY).matches;
const getServerSnapshot = () => false;

/* ---------- Clases reutilizables ---------- */
const range = (n) => Array.from({ length: n }, (_, i) => i);

// Mismo tamaño y giro para la laptop y la capa del botón → siempre alineados
const LAPTOP_BOX = "relative mx-auto w-[96%] max-w-[690px] -rotate-[1.5deg]";
const LAPTOP_FRAME =
  "border border-white/40 bg-gradient-to-br from-[#8e8e93] via-[#5a5a5e] to-[#3a3a3c]";
const PHONE_FRAME =
  "border border-white/70 bg-gradient-to-br from-[#c7c7cc] via-[#9a9a9f] to-[#6e6e73]";
const SCREEN = "relative overflow-hidden bg-[#2c2c2e] [contain:paint]";
const CARD = "border border-white/10 bg-white/[0.06]";
const MEDIA_CARD = "overflow-hidden border border-white/10 bg-[#3a3a3c]";
const IMG =
  "aspect-[16/9] bg-[linear-gradient(135deg,rgba(255,255,255,0.25),rgba(203,213,225,0.1),rgba(58,58,60,1))]";
const CTA_BG =
  "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.14),transparent_60%),#363638]";
const NAV = "flex items-center justify-between border-b border-white/10 bg-[#3a3a3c]";
const DOTS = ["bg-white/80", "bg-white/45", "bg-white/25"];

const OVERLAYS = {
  laptop:
    "bg-[linear-gradient(120deg,rgba(255,255,255,0.12),transparent_28%,transparent_70%,rgba(255,255,255,0.04))] shadow-[inset_0_0_25px_rgba(0,0,0,0.4)]",
  phone:
    "bg-[linear-gradient(120deg,rgba(255,255,255,0.12),transparent_30%,transparent_72%,rgba(255,255,255,0.04))] shadow-[inset_0_0_14px_rgba(0,0,0,0.4)]",
};

/* ---------- Componente principal ---------- */
export default function HeroMockup() {
  const prefersReduced = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  // null = el usuario aún no elige → se respeta la preferencia del sistema
  const [userPaused, setUserPaused] = useState(null);
  const paused = userPaused ?? prefersReduced;
  const motion = userPaused === null ? "auto" : userPaused ? "paused" : "running";

  return (
    <div
      data-motion={motion}
      className="relative mx-auto flex w-full items-center justify-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[75%] w-[80%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(203,213,225,0.2)_45%,rgba(203,213,225,0.08)_72%,transparent)]"
      />

      {/* Contenedor que flota: mueve dispositivos y botón como una sola pieza */}
      <div className="mockup-float relative mx-auto w-[90%]">
        <div
          role="img"
          aria-label="Vista previa de un sitio web en laptop y celular"
          className="relative"
        >
          {/* Laptop */}
          <div className={LAPTOP_BOX}>
            <div
              className={`relative overflow-hidden rounded-[18px] p-[5px] shadow-[0_10px_24px_rgba(0,0,0,0.12),0_0_28px_rgba(148,163,184,0.10)] sm:rounded-[24px] sm:p-[7px] ${LAPTOP_FRAME}`}
            >
              <div className="absolute left-1/2 top-[3px] z-30 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-white/40 sm:top-[4px]" />

              <div className={`aspect-[16/10] rounded-[13px] sm:rounded-[18px] ${SCREEN}`}>
                <DesktopScreen />
                <ScreenOverlay variant="laptop" />
              </div>
            </div>
          </div>

          {/* Celular (resaltado sobre la laptop) */}
          <div className="absolute bottom-[-3%] right-[1%] z-30 w-[25%] min-w-[92px] max-w-[175px] rotate-[2.5deg] sm:right-[2%]">
            <div
              className={`relative rounded-[22px] p-[4px] shadow-[-10px_12px_24px_rgba(0,0,0,0.35),0_0_0_1px_rgba(0,0,0,0.12)] sm:rounded-[32px] sm:p-[6px] ${PHONE_FRAME}`}
            >
              <div className="absolute -left-[3px] top-[22%] h-[13%] w-[3px] rounded-l bg-[#9a9a9f]" />
              <div className="absolute -left-[3px] top-[38%] h-[9%] w-[3px] rounded-l bg-[#9a9a9f]" />

              <div className={`aspect-[9/19] rounded-[18px] sm:rounded-[26px] ${SCREEN}`}>
                <div className="absolute left-1/2 top-[5px] z-40 h-[10px] w-[38%] -translate-x-1/2 rounded-full bg-[#1d1d1f] sm:top-[7px] sm:h-[14px]" />
                <MobileScreen />
                <ScreenOverlay variant="phone" />
              </div>
            </div>
          </div>
        </div>

        {/* Capa del botón: mismo tamaño y giro que la laptop, fuera del role="img" */}
        <div className="pointer-events-none absolute inset-0">
          <div className={`h-full ${LAPTOP_BOX}`}>
            {/* Montado sobre la esquina: mitad dentro, mitad fuera */}
            <button
              type="button"
              onClick={() => setUserPaused(!paused)}
              aria-pressed={paused}
              aria-label="Pausar animación"
              className="pointer-events-auto absolute -bottom-3 -left-3 z-40 flex h-9 w-9 items-center justify-center rounded-full border border-[#d2d2d7] bg-white text-[#1d1d1f] shadow-[0_4px_12px_rgba(0,0,0,0.18)] transition-colors duration-200 hover:bg-[#f5f5f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0071e3]"
            >
              {paused ? (
                <FaPlay aria-hidden="true" className="ml-0.5 text-[11px]" />
              ) : (
                <FaPause aria-hidden="true" className="text-[11px]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Subcomponentes ---------- */
function ScreenOverlay({ variant }) {
  return <div className={`pointer-events-none absolute inset-0 ${OVERLAYS[variant]}`} />;
}

function DesktopScreen() {
  return (
    <div className="desktop-screen-scroll absolute inset-x-0 top-0">
      {/* Navbar */}
      <div className={`h-10 px-4 sm:h-14 sm:px-6 ${NAV}`}>
        <div className="flex items-center gap-1.5">
          {DOTS.map((color) => (
            <span key={color} className={`h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2 ${color}`} />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-10 rounded-full bg-white/45 sm:h-3 sm:w-16" />
          <span className="h-2 w-6 rounded-full bg-white/15 sm:h-3 sm:w-9" />
        </div>
      </div>

      {/* Hero */}
      <div className="grid min-h-[210px] grid-cols-[1.1fr_0.9fr] items-center gap-4 bg-[radial-gradient(circle_at_25%_30%,rgba(255,255,255,0.12),transparent_42%),#333335] px-5 py-7 sm:min-h-[330px] sm:gap-8 sm:px-9 sm:py-12">
        <div>
          <div className="h-2 w-16 rounded-full bg-white/55 sm:h-3 sm:w-24" />
          <div className="mt-4 h-5 w-[88%] rounded bg-white/90 sm:h-8" />
          <div className="mt-2 h-5 w-[72%] rounded bg-white/45 sm:h-8" />
          <div className="mt-4 h-2 w-[82%] rounded-full bg-white/25 sm:h-3" />
          <div className="mt-2 h-2 w-[66%] rounded-full bg-white/20 sm:h-3" />
          <div className="mt-5 h-6 w-20 rounded-full bg-[#e5e5ea] shadow-[0_8px_20px_rgba(255,255,255,0.12)] sm:h-9 sm:w-28" />
        </div>

        <div className="relative aspect-square rounded-[18px] border border-white/20 bg-gradient-to-br from-white/20 to-white/[0.04] shadow-[inset_0_0_35px_rgba(255,255,255,0.06)] sm:rounded-[28px]">
          <div className="absolute inset-[14%] rounded-[14px] border border-white/10 bg-[#3a3a3c] sm:rounded-[22px]">
            <div className="absolute left-[10%] top-[15%] h-[8%] w-[45%] rounded-full bg-[#e5e5ea]" />
            <div className="absolute left-[10%] top-[34%] h-[5%] w-[70%] rounded-full bg-white/20" />
            <div className="absolute left-[10%] top-[47%] h-[5%] w-[58%] rounded-full bg-white/15" />
            <div className="absolute bottom-[13%] left-[10%] h-[18%] w-[32%] rounded-lg bg-white/25" />
            <div className="absolute bottom-[13%] right-[10%] h-[18%] w-[42%] rounded-lg bg-white/15" />
          </div>
        </div>
      </div>

      {/* Servicios */}
      <div className="bg-[#2f2f31] px-5 py-7 sm:px-9 sm:py-12">
        <div className="mx-auto h-4 w-[38%] rounded-full bg-white/80 sm:h-6" />
        <div className="mt-6 grid grid-cols-3 gap-3 sm:mt-9 sm:gap-5">
          {range(3).map((i) => (
            <div key={i} className={`rounded-xl p-3 sm:rounded-2xl sm:p-5 ${CARD}`}>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 sm:h-10 sm:w-10">
                <div className="h-2.5 w-2.5 rotate-45 rounded-sm border border-white/75 sm:h-4 sm:w-4" />
              </div>
              <div className="mt-3 h-2.5 w-[65%] rounded-full bg-white/60 sm:h-4" />
              <div className="mt-2 h-1.5 w-full rounded-full bg-white/15 sm:h-2.5" />
              <div className="mt-1.5 h-1.5 w-[78%] rounded-full bg-white/10 sm:h-2.5" />
            </div>
          ))}
        </div>
      </div>

      {/* Galería */}
      <div className="bg-[#2c2c2e] px-5 py-8 sm:px-9 sm:py-12">
        <div className="h-4 w-[30%] rounded-full bg-white/80 sm:h-6" />
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5">
          {range(4).map((i) => (
            <div key={i} className={`rounded-xl sm:rounded-2xl ${MEDIA_CARD}`}>
              <div className={IMG} />
              <div className="p-3 sm:p-4">
                <div className="h-2.5 w-[55%] rounded-full bg-white/60 sm:h-3.5" />
                <div className="mt-2 h-1.5 w-[85%] rounded-full bg-white/15 sm:h-2.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className={`flex min-h-[170px] flex-col items-center justify-center px-8 sm:min-h-[260px] ${CTA_BG}`}>
        <div className="h-4 w-[45%] rounded-full bg-white/80 sm:h-7" />
        <div className="mt-3 h-2 w-[62%] rounded-full bg-white/20 sm:h-3" />
        <div className="mt-5 h-7 w-24 rounded-full bg-[#e5e5ea] sm:h-10 sm:w-36" />
      </div>
    </div>
  );
}

function MobileScreen() {
  return (
    <div className="mobile-screen-scroll absolute inset-x-0 top-0">
      {/* Navbar */}
      <div className={`h-8 px-3 sm:h-11 ${NAV}`}>
        <div className="flex flex-col gap-[2px]">
          {range(3).map((i) => (
            <span key={i} className="h-px w-3 bg-white/60 sm:w-4" />
          ))}
        </div>
        <span className="h-1.5 w-7 rounded-full bg-white/55 sm:h-2 sm:w-9" />
      </div>

      {/* Hero */}
      <div className="flex min-h-[170px] flex-col justify-center bg-[radial-gradient(circle_at_50%_25%,rgba(255,255,255,0.14),transparent_50%),#333335] px-3 py-7 sm:min-h-[245px] sm:px-5">
        <div className="h-1.5 w-10 rounded-full bg-white/55 sm:h-2 sm:w-14" />
        <div className="mt-3 h-4 w-[90%] rounded bg-white/85 sm:h-6" />
        <div className="mt-1.5 h-4 w-[68%] rounded bg-white/45 sm:h-6" />
        <div className="mt-3 h-1.5 w-[85%] rounded-full bg-white/20 sm:h-2" />
        <div className="mt-1.5 h-1.5 w-[62%] rounded-full bg-white/15 sm:h-2" />
        <div className="mt-4 h-5 w-14 rounded-full bg-[#e5e5ea] sm:h-7 sm:w-20" />
      </div>

      {/* Servicios */}
      <div className="space-y-2 bg-[#2f2f31] px-3 py-5 sm:space-y-3 sm:px-4 sm:py-7">
        {range(3).map((i) => (
          <div key={i} className={`rounded-lg p-3 sm:rounded-xl sm:p-4 ${CARD}`}>
            <div className="h-5 w-5 rounded-md bg-white/20 sm:h-7 sm:w-7" />
            <div className="mt-2 h-1.5 w-[55%] rounded-full bg-white/60 sm:h-2" />
            <div className="mt-1.5 h-1 w-full rounded-full bg-white/15 sm:h-1.5" />
            <div className="mt-1 h-1 w-[75%] rounded-full bg-white/10 sm:h-1.5" />
          </div>
        ))}
      </div>

      {/* Galería */}
      <div className="space-y-2 bg-[#2c2c2e] px-3 py-5 sm:space-y-3 sm:px-4 sm:py-7">
        {range(3).map((i) => (
          <div key={i} className={`rounded-lg sm:rounded-xl ${MEDIA_CARD}`}>
            <div className={IMG} />
            <div className="p-2.5 sm:p-3">
              <div className="h-1.5 w-[55%] rounded-full bg-white/60 sm:h-2" />
              <div className="mt-1.5 h-1 w-[85%] rounded-full bg-white/15 sm:h-1.5" />
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className={`flex min-h-[120px] flex-col items-center justify-center px-3 sm:min-h-[180px] ${CTA_BG}`}>
        <div className="h-2.5 w-[55%] rounded-full bg-white/75 sm:h-4" />
        <div className="mt-2 h-1.5 w-[75%] rounded-full bg-white/15 sm:h-2" />
        <div className="mt-4 h-5 w-16 rounded-full bg-[#e5e5ea] sm:h-7 sm:w-24" />
      </div>
    </div>
  );
}