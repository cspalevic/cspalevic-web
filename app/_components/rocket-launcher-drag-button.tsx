// "use client";

// import { Button } from "@/components/ui/button";
// import { cn } from "cnfast";
// import { Rocket, X } from "lucide-react";
// import dynamic from "next/dynamic";
// import { useCallback, useEffect, useRef, useState } from "react";

// const WebGPUEarth = dynamic(
//   async () => (await import("../../components/web-gpu-earth.js")).default,
//   { ssr: false },
// );

// const LAUNCH_DISTANCE = 140;
// const LAUNCH_AXIS_MIN = 80;

// export function RocketLauncher() {
//   const supported = useWebGPUSupported();
//   const [open, setOpen] = useState(false);
//   const [atBottom, setAtBottom] = useState(false);
//   const [offset, setOffset] = useState({ x: 0, y: 0 });
//   const [launching, setLaunching] = useState(false);
//   const [dragging, setDragging] = useState(false);
//   const startRef = useRef<{ x: number; y: number } | null>(null);

//   const close = useCallback(() => setOpen(false), []);

//   useEffect(() => {
//     if (!supported) return;
//     function check() {
//       const max = document.documentElement.scrollHeight - window.innerHeight;
//       setAtBottom(max <= 4 || window.scrollY >= max - 4);
//     }
//     check();
//     window.addEventListener("scroll", check, { passive: true });
//     window.addEventListener("resize", check);
//     return () => {
//       window.removeEventListener("scroll", check);
//       window.removeEventListener("resize", check);
//     };
//   }, [supported]);

//   useEffect(() => {
//     function onKeyDown(e: KeyboardEvent) {
//       if (e.key === "Escape") setOpen(false);
//     }
//     window.addEventListener("keydown", onKeyDown);
//     return () => window.removeEventListener("keydown", onKeyDown);
//   }, []);

//   if (!supported) return null;

//   const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
//     if (launching) return;
//     e.currentTarget.setPointerCapture(e.pointerId);
//     setDragging(true);
//     startRef.current = { x: e.clientX, y: e.clientY };
//   };

//   const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
//     if (!startRef.current) return;
//     setOffset({
//       x: e.clientX - startRef.current.x,
//       y: e.clientY - startRef.current.y,
//     });
//   };

//   const finishDrag = (e: React.PointerEvent<HTMLButtonElement>) => {
//     if (!startRef.current) return;
//     const dx = e.clientX - startRef.current.x;
//     const dy = e.clientY - startRef.current.y;
//     setDragging(false);
//     startRef.current = null;
//     const launched =
//       dx < -LAUNCH_AXIS_MIN &&
//       dy < -LAUNCH_AXIS_MIN &&
//       Math.hypot(dx, dy) > LAUNCH_DISTANCE;
//     if (launched) {
//       setLaunching(true);
//       window.setTimeout(() => {
//         setOpen(true);
//         setLaunching(false);
//         setOffset({ x: 0, y: 0 });
//       }, 450);
//     } else {
//       setOffset({ x: 0, y: 0 });
//     }
//   };

//   const angleDeg = dragging
//     ? (Math.atan2(offset.y, offset.x) * 180) / Math.PI + 90
//     : 0;
//   const tx = launching ? -window.innerWidth : offset.x;
//   const ty = launching ? -window.innerHeight : offset.y;
//   const rot = launching ? -45 : angleDeg;
//   const visible = atBottom && !open;

//   return (
//     <>
//       <button
//         type="button"
//         aria-label="Launch easter egg"
//         onPointerDown={onPointerDown}
//         onPointerMove={onPointerMove}
//         onPointerUp={finishDrag}
//         onPointerCancel={finishDrag}
//         className={cn(
//           "fixed bottom-4 right-4 z-40 flex h-12 w-12 select-none items-center justify-center rounded-full border bg-background/80 text-foreground shadow-lg backdrop-blur",
//           "touch-none cursor-grab active:cursor-grabbing",
//           visible
//             ? "pointer-events-auto opacity-100"
//             : "pointer-events-none opacity-0",
//           !dragging && !launching && "hover:scale-105",
//         )}
//         style={{
//           transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg)`,
//           transitionProperty: "transform, opacity",
//           transitionDuration: launching ? "500ms" : dragging ? "0ms" : "200ms",
//           transitionTimingFunction: launching ? "ease-in" : "ease-out",
//           opacity: launching ? 0 : visible ? 1 : 0,
//         }}
//       >
//         <Rocket className="h-5 w-5 -rotate-45" />
//       </button>

//       {open && (
//         <div className="fixed inset-0 z-50 bg-black">
//           <WebGPUEarth />
//           <Button
//             variant="ghost"
//             size="icon"
//             className="absolute right-4 top-4 z-10 h-9 w-9 text-white hover:bg-white/10 hover:text-white"
//             onClick={close}
//             aria-label="Close"
//           >
//             <X className="h-5 w-5" />
//           </Button>
//         </div>
//       )}
//     </>
//   );
// }
