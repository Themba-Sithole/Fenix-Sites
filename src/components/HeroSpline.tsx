import Spline from "@splinetool/react-spline";

const SPLINE_SCENE =
  "https://prod.spline.design/LxhntEvU9daSOxfF/scene.splinecode";

export function HeroSpline() {
  return (
    <Spline
      scene={SPLINE_SCENE}
      className="w-full h-full"
    />
  );
}
