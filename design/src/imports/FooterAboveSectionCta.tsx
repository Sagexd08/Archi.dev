import { useState } from "react";
import svgPaths from "./svg-mxzww96e8a";

function Container2() {
  return (
    <div
      className="h-[23.75px] relative shrink-0 w-[25px]"
      data-name="Container"
    >
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 25 23.75"
      >
        <g id="Container">
          <path
            d={svgPaths.p19837aa0}
            fill="var(--fill-0, #3A64CC)"
            id="Icon"
          />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div
      className="bg-[rgba(0,0,0,0.2)] content-stretch flex items-center justify-center p-px relative rounded-[16px] shrink-0 size-[64px]"
      data-name="Background+Border+Shadow"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[rgba(152,29,200,0.4)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_0px_40px_0px_rgba(223,142,255,0.4)]"
      />
      <Container2 />
    </div>
  );
}

function Container1() {
  return (
    <div
      className="absolute content-stretch flex items-start justify-center left-0 right-0 top-0"
      data-name="Container"
    >
      <BackgroundBorderShadow />
    </div>
  );
}

function Heading() {
  return (
    <div
      className="absolute content-stretch flex flex-col items-center left-0 right-0 top-[104px]"
      data-name="Heading 2"
    >
      <div className="flex flex-col font-['Poppins:Medium',sans-serif] h-[120px] justify-center leading-[0] not-italic relative shrink-0 text-[#f5eefc] text-[60px] text-center tracking-[-1.5px] w-[889.45px]">
        <p className="leading-[60px]">
          Ready to launch something that actually works?
        </p>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div
      className="absolute content-stretch flex items-center justify-center left-[0px] top-[255px]"
      data-name="Text"
    >
      <div className="flex flex-col font-['Poppins:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#aea9b6] text-[20px] text-center w-[764px]">
        <p className="leading-[32.5px]">
          Join 50,000+ creators who are building the next
          generation of digital products with NeonArchitect.
          Clean, strategic, and ready to grow.
        </p>
      </div>
    </div>
  );
}

function Button() {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <div
      data-name="Button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseMove={handleMouseMove}
      style={{
        position: "absolute",
        left: "50%",
        top: "369px",
        transform: `translateX(-50%) ${pressed ? "scale(0.965)" : hovered ? "scale(1.03)" : "scale(1)"}`,
        transition:
          "transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 40px",
        borderRadius: "980px",
        cursor: "pointer",
        userSelect: "none",
        // Liquid glass material
        background: `
          radial-gradient(
            ellipse at ${mousePos.x * 100}% ${mousePos.y * 100}%,
            rgba(255,255,255,0.18) 0%,
            rgba(255,255,255,0.04) 55%,
            transparent 100%
          ),
          linear-gradient(
            145deg,
            rgba(255,255,255,0.22) 0%,
            rgba(255,255,255,0.06) 40%,
            rgba(255,255,255,0.02) 60%,
            rgba(255,255,255,0.10) 100%
          ),
          rgba(255,255,255,0.07)
        `,
        backdropFilter:
          "blur(28px) saturate(180%) brightness(1.12)",
        WebkitBackdropFilter:
          "blur(28px) saturate(180%) brightness(1.12)",
        boxShadow: hovered
          ? `
              0 0 0 0.75px rgba(255,255,255,0.38),
              inset 0 1.5px 0 rgba(255,255,255,0.55),
              inset 0 -1px 0 rgba(255,255,255,0.12),
              inset 0 0 24px rgba(255,255,255,0.06),
              0 8px 32px rgba(0,0,0,0.5),
              0 2px 8px rgba(0,0,0,0.35)
            `
          : `
              0 0 0 0.75px rgba(255,255,255,0.22),
              inset 0 1.5px 0 rgba(255,255,255,0.45),
              inset 0 -1px 0 rgba(255,255,255,0.08),
              inset 0 0 16px rgba(255,255,255,0.04),
              0 4px 24px rgba(0,0,0,0.45),
              0 1px 4px rgba(0,0,0,0.3)
            `,
      }}
    >
      {/* Top specular highlight — the signature liquid lens shimmer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "48%",
          borderRadius: "0 0 50% 50%",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.52) 0%, rgba(255,255,255,0.0) 100%)",
          filter: "blur(0.8px)",
          pointerEvents: "none",
          opacity: hovered ? 0.92 : 0.72,
          transition: "opacity 0.2s ease",
          maskImage:
            "linear-gradient(to bottom, black 50%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 50%, transparent 100%)",
        }}
      />

      {/* Bottom inner refraction glow */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "18%",
          right: "18%",
          height: "28%",
          borderRadius: "50% 50% 0 0",
          background:
            "linear-gradient(0deg, rgba(255,255,255,0.16) 0%, transparent 100%)",
          filter: "blur(2px)",
          pointerEvents: "none",
          opacity: hovered ? 0.65 : 0.35,
          transition: "opacity 0.2s ease",
        }}
      />

      {/* Cursor-reactive refraction orb */}
      <div
        style={{
          position: "absolute",
          width: "55%",
          height: "75%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.13) 0%, transparent 70%)",
          left: `${mousePos.x * 100 - 27.5}%`,
          top: `${mousePos.y * 100 - 37.5}%`,
          pointerEvents: "none",
          filter: "blur(10px)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Label */}
      <span
        style={{
          position: "relative",
          zIndex: 1,
          fontFamily:
            "'SF Pro Display', 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
          fontSize: "18px",
          fontWeight: "590",
          letterSpacing: "-0.01em",
          color: "rgba(255,255,255,0.95)",
          textShadow:
            "0 1px 3px rgba(0,0,0,0.35), 0 0 12px rgba(255,255,255,0.12)",
          lineHeight: "28px",
          whiteSpace: "nowrap",
        }}
      >
        Start Building for Free
      </span>
    </div>
  );
}

function Container() {
  return (
    <div
      className="h-[437px] max-w-[896px] relative shrink-0 w-full"
      data-name="Container"
    >
      <Container1 />
      <Heading />
      <Text />
      <Button />
    </div>
  );
}

export default function FooterAboveSectionCta() {
  return (
    <div
      className="content-stretch flex flex-col items-start px-[192px] py-[128px] relative size-full"
      data-name="Footer-Above Section (CTA)"
      style={{
        backgroundImage:
          "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 1280 693\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(84.75 -2.0946e-14 2.0946e-14 84.75 640 -1.5388e-13)\\'><stop stop-color=\\'rgba(58,100,204,0.15)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(58,100,204,0)\\' offset=\\'0.7\\'/></radialGradient></defs></svg>'), linear-gradient(90deg, rgb(14, 16, 17) 0%, rgb(14, 16, 17) 100%)",
      }}
    >
      <Container />
    </div>
  );
}