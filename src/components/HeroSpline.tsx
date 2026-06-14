import Spline from "@splinetool/react-spline";
import { useEffect, useRef } from "react";

const SPLINE_SCENE =
  "https://prod.spline.design/LxhntEvU9daSOxfF/scene.splinecode";

function hideSplineBadge(root: HTMLElement | null) {
  if (!root) return;
  root.querySelectorAll("a").forEach((el) => {
    el.style.setProperty("display", "none", "important");
    el.style.setProperty("visibility", "hidden", "important");
    el.style.setProperty("opacity", "0", "important");
    el.style.setProperty("pointer-events", "none", "important");
  });
}

export function HeroSpline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    hideSplineBadge(root);
    const observer = new MutationObserver(() => hideSplineBadge(root));
    observer.observe(root, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="hero-spline-root w-full h-full">
      <Spline scene={SPLINE_SCENE} className="w-full h-full" />
    </div>
  );
}
