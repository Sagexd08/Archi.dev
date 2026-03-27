import svgPaths from "./svg-5ch7l41o5v";
import imgRectangle13 from "figma:asset/381794ebe036883d076f0c6c73ab4db10a4509e2.png";
import imgChangeTheFirst2026032423212 from "figma:asset/0affe73efcb4593eae32cee891533708023f0a54.png";
import imgChangeTheFirst2026032423372 from "figma:asset/1489470bce62606fc7c9b86e7ac04ce9331cd551.png";
import { imgVector10, imgChangeTheFirst2026032423211, imgEllipse5, imgChangeTheFirst2026032423371, imgEllipse6 } from "./svg-7625a";
import {useState} from "react";

function Text1() {
  return (
    <div className="relative shrink-0 w-full" data-name="text1">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
          <div className="bg-clip-text flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[48px] text-[transparent] whitespace-nowrap" style={{ backgroundImage: "linear-gradient(90deg, rgba(172, 172, 172, 0.64) 0%, rgba(255, 255, 255, 0.82) 12.981%, rgb(255, 255, 255) 86.538%, rgba(172, 172, 172, 0.64) 100%)" }}>
            <p className="leading-[normal]">Beyond Templates</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex items-center justify-center p-[10px] relative shrink-0" data-name="text2">
      <div className="flex flex-col font-['Poppins:ExtraLight',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[20px] text-center text-white w-[500px]">
        <p className="leading-[normal]">We don’t just create stunning designs , we crafted them for your DNA</p>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[616px]" data-name="text">
      <Text1 />
      <Text2 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[40px] not-italic relative shrink-0 text-[#f5eefc] text-[36px] w-full">
        <p className="mb-0">{`Don't settle for template-`}</p>
        <p>looking pages</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9.45px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Poppins:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#aea9b6] text-[20px] w-full">
        <p className="leading-[32.5px]">{`We design every page from scratch to match your brand, your offer, and your goals. So it doesn't just look good, it works.`}</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 size-[8.75px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.75 8.75">
        <g id="Container">
          <path d={svgPaths.pa49aac0} fill="var(--fill-0, #DF8EFF)" id="Icon" />
        </g>
      </svg>
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
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "13px 33px",
        borderRadius: "16px",
        cursor: "pointer",
        userSelect: "none",
        flexShrink: 0,
        transform: pressed ? "scale(0.965)" : hovered ? "scale(1.04)" : "scale(1)",
        transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease",
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
          rgba(255,255,255,0.05)
        `,
        backdropFilter: "blur(28px) saturate(180%) brightness(1.12)",
        WebkitBackdropFilter: "blur(28px) saturate(180%) brightness(1.12)",
        boxShadow: hovered
          ? `
              0 0 0 1px rgba(0,238,252,0.5),
              inset 0 1.5px 0 rgba(255,255,255,0.55),
              inset 0 -1px 0 rgba(255,255,255,0.12),
              inset 0 0 24px rgba(255,255,255,0.06),
              0 8px 32px rgba(0,0,0,0.5),
              0 2px 8px rgba(0,0,0,0.35),
              0 0 18px rgba(0,238,252,0.12)
            `
          : `
              0 0 0 1px rgba(0,238,252,0.3),
              inset 0 1.5px 0 rgba(255,255,255,0.45),
              inset 0 -1px 0 rgba(255,255,255,0.08),
              inset 0 0 16px rgba(255,255,255,0.04),
              0 4px 24px rgba(0,0,0,0.45),
              0 1px 4px rgba(0,0,0,0.3)
            `,
      }}
    >
      {/* Top specular highlight */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "10%",
        right: "10%",
        height: "48%",
        borderRadius: "0 0 50% 50%",
        background: "linear-gradient(180deg, rgba(255,255,255,0.52) 0%, rgba(255,255,255,0.0) 100%)",
        filter: "blur(0.8px)",
        pointerEvents: "none",
        opacity: hovered ? 0.92 : 0.72,
        transition: "opacity 0.2s ease",
        maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
      }} />

      {/* Bottom refraction glow */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: "18%",
        right: "18%",
        height: "28%",
        borderRadius: "50% 50% 0 0",
        background: "linear-gradient(0deg, rgba(255,255,255,0.16) 0%, transparent 100%)",
        filter: "blur(2px)",
        pointerEvents: "none",
        opacity: hovered ? 0.65 : 0.35,
        transition: "opacity 0.2s ease",
      }} />

      {/* Cursor-reactive orb */}
      <div style={{
        position: "absolute",
        width: "55%",
        height: "75%",
        borderRadius: "50%",
        background: "radial-gradient(circle at center, rgba(255,255,255,0.13) 0%, transparent 70%)",
        left: `${mousePos.x * 100 - 27.5}%`,
        top: `${mousePos.y * 100 - 37.5}%`,
        pointerEvents: "none",
        filter: "blur(10px)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
      }} />

      {/* Label */}
      <div style={{
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "24px",
        width: "77.08px",
        textAlign: "center",
      }}>
        <p style={{
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 700,
          fontSize: "16px",
          lineHeight: "24px",
          color: "rgba(255,255,255,0.95)",
          textShadow: "0 1px 3px rgba(0,0,0,0.35), 0 0 12px rgba(255,255,255,0.12)",
          margin: 0,
        }}>
          Start Now
        </p>
      </div>

      {/* Icon */}
      <Container3 />
    </div>
  );
}

function Block1Text() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[23.3px] items-start justify-self-stretch relative row-1 self-center shrink-0" data-name="Block 1 Text">
      <Heading />
      <Container2 />
      <Button />
    </div>
  );
}

function Gradient() {
  return (
    <div className="absolute contents left-0 top-0" data-name="gradient">
      <div className="absolute flex h-[218px] items-center justify-center left-[0.31px] top-[344.5px] w-[550px]">
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="h-[218px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.307px_-344.501px] mask-size-[548px_568px] relative w-[550px]" style={{ maskImage: `url('${imgVector10}')` }}>
            <div className="absolute inset-[-30.02%_-11.9%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 680.874 348.874">
                <g filter="url(#filter0_f_11_114)" id="Vector 10">
                  <path d={svgPaths.pe907900} fill="var(--fill-0, #2A1590)" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="348.874" id="filter0_f_11_114" width="680.874" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur_11_114" stdDeviation="32.7186" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[220px] items-center justify-center left-[1.31px] top-[425.5px] w-[550px]">
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="h-[220px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.307px_-425.501px] mask-size-[548px_568px] relative w-[550px]" style={{ maskImage: `url('${imgVector10}')` }}>
            <div className="absolute inset-[-29.74%_-11.9%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 680.874 350.874">
                <g filter="url(#filter0_f_11_77)" id="Vector 10">
                  <path d={svgPaths.p2f3ae880} fill="var(--fill-0, #3F2A92)" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="350.874" id="filter0_f_11_77" width="680.874" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur_11_77" stdDeviation="32.7186" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-[188px] left-[9.31px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-9.307px_-423.501px] mask-size-[548px_568px] mix-blend-plus-lighter top-[423.5px] w-[542px]" style={{ maskImage: `url('${imgVector10}')` }}>
        <div className="absolute inset-[-34.81%_-12.07%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 672.874 318.874">
            <g filter="url(#filter0_f_11_93)" id="Vector 11" style={{ mixBlendMode: "plus-lighter" }}>
              <path d={svgPaths.p1d1a3940} fill="var(--fill-0, white)" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="318.874" id="filter0_f_11_93" width="672.874" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_11_93" stdDeviation="32.7186" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute h-[129.544px] left-[42.52px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-42.518px_-24.912px] mask-size-[548px_568px] mix-blend-plus-lighter top-[24.91px] w-[476.547px]" style={{ maskImage: `url('${imgVector10}')` }}>
        <div className="absolute inset-[-50.51%_-13.73%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 607.422 260.418">
            <g filter="url(#filter0_f_11_112)" id="Vector 12" style={{ mixBlendMode: "plus-lighter" }}>
              <path d={svgPaths.p2a02900} fill="var(--fill-0, #2A1590)" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="260.418" id="filter0_f_11_112" width="607.422" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_11_112" stdDeviation="32.7186" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute h-[79.008px] left-[411.59px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-411.59px_-20.642px] mask-size-[548px_568px] mix-blend-plus-lighter top-[20.64px] w-[109.246px]" style={{ maskImage: `url('${imgVector10}')` }}>
        <div className="absolute inset-[-66.26%_-47.92%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 213.945 183.707">
            <g filter="url(#filter0_f_11_110)" id="Vector 13" style={{ mixBlendMode: "plus-lighter" }}>
              <path d={svgPaths.p18336df0} fill="var(--fill-0, white)" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="183.707" id="filter0_f_11_110" width="213.945" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_11_110" stdDeviation="26.1749" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Image() {
  return (
    <div className="absolute contents left-[28px] top-[41px]" data-name="image">
      <div className="absolute left-[-7.75px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-14.25px_-33.5px] mask-size-[562px_538px] size-[543.5px] top-[24.5px]" data-name="change_the_first_202603242321 1" style={{ maskImage: `url('${imgChangeTheFirst2026032423211}')` }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-[108.94%] top-[-4.47%]" src={imgChangeTheFirst2026032423212} />
        </div>
      </div>
    </div>
  );
}

function Border() {
  return (
    <div className="absolute contents left-0 top-0" data-name="border">
      <div className="absolute h-[426.776px] left-[-115.17px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[115.169px_113.29px] mask-size-[550.98px_568px] mix-blend-overlay top-[-113.29px] w-[753.836px]" style={{ maskImage: `url('${imgEllipse5}')` }}>
        <div className="absolute inset-[-12.27%_-6.94%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 858.536 531.475">
            <g filter="url(#filter0_f_11_85)" id="Ellipse 5" style={{ mixBlendMode: "overlay" }}>
              <ellipse cx="429.268" cy="265.738" fill="var(--fill-0, #D9D9D9)" rx="376.918" ry="213.388" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="531.475" id="filter0_f_11_85" width="858.536" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_11_85" stdDeviation="26.1749" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[#1a1f3c] col-2 justify-self-stretch overflow-clip relative rounded-[20.94px] row-1 self-stretch shadow-[5.235px_5.235px_26.175px_0px_rgba(0,0,0,0.25)] shrink-0" data-name="Frame">
      <div className="absolute bg-size-[1340.153076171875px_1340.153076171875px] bg-top-left h-[479px] left-0 mix-blend-overlay opacity-10 top-0 w-[550.981px]" style={{ backgroundImage: `url('${imgRectangle13}')` }} />
      <Gradient />
      <Image />
      <Border />
      <div className="absolute h-[138.727px] left-[51.04px] mix-blend-plus-lighter top-[218.56px] w-[109.934px]">
        <div className="absolute inset-[-113.21%_-142.86%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 424.033 452.825">
            <g filter="url(#filter0_f_11_89)" id="Ellipse 7" style={{ mixBlendMode: "plus-lighter" }}>
              <ellipse cx="212.016" cy="226.413" fill="var(--fill-0, #5A51FF)" rx="54.9672" ry="69.3634" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="452.825" id="filter0_f_11_89" width="424.033" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_11_89" stdDeviation="78.5246" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute h-[134.801px] left-[349.43px] mix-blend-plus-lighter top-[68.05px] w-[106.008px]">
        <div className="absolute inset-[-116.5%_-148.15%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 420.107 448.899">
            <g filter="url(#filter0_f_11_100)" id="Ellipse 7" style={{ mixBlendMode: "plus-lighter" }}>
              <ellipse cx="210.053" cy="224.449" fill="var(--fill-0, #5A51FF)" rx="53.0041" ry="67.4003" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="448.899" id="filter0_f_11_100" width="420.107" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_11_100" stdDeviation="78.5246" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="gap-x-[96px] gap-y-[96px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_568px] relative shrink-0 w-full" data-name="Container">
      <Block1Text />
      <Frame />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[40px] not-italic relative shrink-0 text-[#f5eefc] text-[36px] w-full">
        <p className="mb-0">We think deeply before we</p>
        <p>design</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9.45px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[32.5px] relative shrink-0 text-[#aea9b6] text-[20px] w-full">
        <p className="mb-0">Strategy comes before style. We use user flow thinking,</p>
        <p className="font-['Poppins:Light',sans-serif] not-italic">positioning, and layout psychology to build what performs.</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="relative shrink-0 size-[8.75px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.75 8.75">
        <g id="Container">
          <path d={svgPaths.pa49aac0} fill="var(--fill-0, #00EEFC)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
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
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "13px 33px",
        borderRadius: "16px",
        cursor: "pointer",
        userSelect: "none",
        flexShrink: 0,
        transform: pressed ? "scale(0.965)" : hovered ? "scale(1.04)" : "scale(1)",
        transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease",
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
          rgba(255,255,255,0.05)
        `,
        backdropFilter: "blur(28px) saturate(180%) brightness(1.12)",
        WebkitBackdropFilter: "blur(28px) saturate(180%) brightness(1.12)",
        boxShadow: hovered
          ? `
              0 0 0 1px rgba(0,238,252,0.5),
              inset 0 1.5px 0 rgba(255,255,255,0.55),
              inset 0 -1px 0 rgba(255,255,255,0.12),
              inset 0 0 24px rgba(255,255,255,0.06),
              0 8px 32px rgba(0,0,0,0.5),
              0 2px 8px rgba(0,0,0,0.35),
              0 0 18px rgba(0,238,252,0.12)
            `
          : `
              0 0 0 1px rgba(0,238,252,0.3),
              inset 0 1.5px 0 rgba(255,255,255,0.45),
              inset 0 -1px 0 rgba(255,255,255,0.08),
              inset 0 0 16px rgba(255,255,255,0.04),
              0 4px 24px rgba(0,0,0,0.45),
              0 1px 4px rgba(0,0,0,0.3)
            `,
      }}
    >
      {/* Top specular highlight */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "10%",
        right: "10%",
        height: "48%",
        borderRadius: "0 0 50% 50%",
        background: "linear-gradient(180deg, rgba(255,255,255,0.52) 0%, rgba(255,255,255,0.0) 100%)",
        filter: "blur(0.8px)",
        pointerEvents: "none",
        opacity: hovered ? 0.92 : 0.72,
        transition: "opacity 0.2s ease",
        maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
      }} />

      {/* Bottom refraction glow */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: "18%",
        right: "18%",
        height: "28%",
        borderRadius: "50% 50% 0 0",
        background: "linear-gradient(0deg, rgba(255,255,255,0.16) 0%, transparent 100%)",
        filter: "blur(2px)",
        pointerEvents: "none",
        opacity: hovered ? 0.65 : 0.35,
        transition: "opacity 0.2s ease",
      }} />

      {/* Cursor-reactive orb */}
      <div style={{
        position: "absolute",
        width: "55%",
        height: "75%",
        borderRadius: "50%",
        background: "radial-gradient(circle at center, rgba(255,255,255,0.13) 0%, transparent 70%)",
        left: `${mousePos.x * 100 - 27.5}%`,
        top: `${mousePos.y * 100 - 37.5}%`,
        pointerEvents: "none",
        filter: "blur(10px)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
      }} />

      {/* Label */}
      <div style={{
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "24px",
        width: "77.08px",
        textAlign: "center",
      }}>
        <p style={{
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 700,
          fontSize: "16px",
          lineHeight: "24px",
          color: "rgba(255,255,255,0.95)",
          textShadow: "0 1px 3px rgba(0,0,0,0.35), 0 0 12px rgba(255,255,255,0.12)",
          margin: 0,
        }}>
          Start Now
        </p>
      </div>

      {/* Icon */}
      <Container6 />
    </div>
  );
}

function Block2Text() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[23.3px] items-start justify-self-stretch relative row-1 self-center shrink-0" data-name="Block 2 Text">
      <Heading1 />
      <Container5 />
      <Button1 />
    </div>
  );
}

function Gradient1() {
  return (
    <div className="absolute contents left-0 top-0" data-name="gradient">
      <div className="absolute h-[218px] left-[1.31px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.307px_-344.501px] mask-size-[548px_568px] top-[344.5px] w-[550px]" style={{ maskImage: `url('${imgVector10}')` }}>
        <div className="absolute inset-[-30.02%_-11.9%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 680.874 348.874">
            <g filter="url(#filter0_f_11_108)" id="Vector 10">
              <path d={svgPaths.pe907900} fill="var(--fill-0, #2A1590)" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="348.874" id="filter0_f_11_108" width="680.874" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_11_108" stdDeviation="32.7186" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute h-[220px] left-[0.31px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.307px_-425.501px] mask-size-[548px_568px] top-[425.5px] w-[550px]" style={{ maskImage: `url('${imgVector10}')` }}>
        <div className="absolute inset-[-29.74%_-11.9%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 680.874 350.874">
            <g filter="url(#filter0_f_11_102)" id="Vector 10">
              <path d={svgPaths.p2f3ae880} fill="var(--fill-0, #3F2A92)" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="350.874" id="filter0_f_11_102" width="680.874" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_11_102" stdDeviation="32.7186" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute flex h-[188px] items-center justify-center left-[0.31px] mix-blend-plus-lighter top-[423.5px] w-[542px]">
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="h-[188px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.307px_-423.501px] mask-size-[548px_568px] relative w-[542px]" style={{ maskImage: `url('${imgVector10}')` }}>
            <div className="absolute inset-[-34.81%_-12.07%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 672.874 318.874">
                <g filter="url(#filter0_f_11_98)" id="Vector 11" style={{ mixBlendMode: "plus-lighter" }}>
                  <path d={svgPaths.p1d1a3940} fill="var(--fill-0, white)" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="318.874" id="filter0_f_11_98" width="672.874" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur_11_98" stdDeviation="32.7186" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[129.544px] items-center justify-center left-[44.29px] mix-blend-plus-lighter top-[24.91px] w-[476.547px]">
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="h-[129.544px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-44.289px_-24.912px] mask-size-[548px_568px] relative w-[476.547px]" style={{ maskImage: `url('${imgVector10}')` }}>
            <div className="absolute inset-[-50.51%_-13.73%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 607.422 260.418">
                <g filter="url(#filter0_f_11_83)" id="Vector 12" style={{ mixBlendMode: "plus-lighter" }}>
                  <path d={svgPaths.p2a02900} fill="var(--fill-0, #2A1590)" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="260.418" id="filter0_f_11_83" width="607.422" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur_11_83" stdDeviation="32.7186" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[79.008px] items-center justify-center left-[42.52px] mix-blend-plus-lighter top-[20.64px] w-[109.246px]">
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="h-[79.008px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-42.518px_-20.642px] mask-size-[548px_568px] relative w-[109.246px]" style={{ maskImage: `url('${imgVector10}')` }}>
            <div className="absolute inset-[-66.26%_-47.92%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 213.945 183.707">
                <g filter="url(#filter0_f_11_87)" id="Vector 13" style={{ mixBlendMode: "plus-lighter" }}>
                  <path d={svgPaths.p18336df0} fill="var(--fill-0, white)" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="183.707" id="filter0_f_11_87" width="213.945" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur_11_87" stdDeviation="26.1749" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Image1() {
  return (
    <div className="absolute contents left-[85px] top-[90px]" data-name="image">
      <div className="absolute left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[45px_6px] mask-size-[435px_489px] size-[487px] top-[44px]" data-name="change_the_first_202603242337 1" style={{ maskImage: `url('${imgChangeTheFirst2026032423371}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgChangeTheFirst2026032423372} />
      </div>
    </div>
  );
}

function Border1() {
  return (
    <div className="absolute contents left-0 top-0" data-name="border">
      <div className="absolute h-[359.904px] left-[-115.17px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[115.169px_95.538px] mask-size-[550.98px_479px] mix-blend-overlay top-[-95.54px] w-[753.836px]" style={{ maskImage: `url('${imgEllipse6}')` }}>
        <div className="absolute inset-[-14.55%_-6.94%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 858.536 464.604">
            <g filter="url(#filter0_f_11_75)" id="Ellipse 5" style={{ mixBlendMode: "overlay" }}>
              <ellipse cx="429.268" cy="232.302" fill="var(--fill-0, #D9D9D9)" rx="376.918" ry="179.952" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="464.604" id="filter0_f_11_75" width="858.536" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_11_75" stdDeviation="26.1749" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[#1a1f3c] col-1 justify-self-stretch overflow-clip relative rounded-[20.94px] row-1 self-stretch shadow-[5.235px_5.235px_26.175px_0px_rgba(0,0,0,0.25)] shrink-0" data-name="Frame">
      <div className="absolute bg-size-[1340.153076171875px_1340.153076171875px] bg-top-left h-[479px] left-0 mix-blend-overlay opacity-10 top-0 w-[550.981px]" style={{ backgroundImage: `url('${imgRectangle13}')` }} />
      <Gradient1 />
      <Image1 />
      <Border1 />
      <div className="absolute h-[138.727px] left-[51.04px] mix-blend-plus-lighter top-[218.56px] w-[109.934px]">
        <div className="absolute inset-[-113.21%_-142.86%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 424.033 452.825">
            <g filter="url(#filter0_f_11_89)" id="Ellipse 7" style={{ mixBlendMode: "plus-lighter" }}>
              <ellipse cx="212.016" cy="226.413" fill="var(--fill-0, #5A51FF)" rx="54.9672" ry="69.3634" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="452.825" id="filter0_f_11_89" width="424.033" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_11_89" stdDeviation="78.5246" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute h-[134.801px] left-[349.43px] mix-blend-plus-lighter top-[68.05px] w-[106.008px]">
        <div className="absolute inset-[-116.5%_-148.15%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 420.107 448.899">
            <g filter="url(#filter0_f_11_100)" id="Ellipse 7" style={{ mixBlendMode: "plus-lighter" }}>
              <ellipse cx="210.053" cy="224.449" fill="var(--fill-0, #5A51FF)" rx="53.0041" ry="67.4003" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="448.899" id="filter0_f_11_100" width="420.107" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_11_100" stdDeviation="78.5246" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="gap-x-[96px] gap-y-[96px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_568px] pt-[48px] relative shrink-0 w-full" data-name="Container">
      <Block2Text />
      <Frame1 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-center justify-center max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Container4 />
    </div>
  );
}

function Templates() {
  return (
    <div className="relative shrink-0 w-full" data-name="Templates">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[40px] items-center justify-center px-[20px] relative w-full">
          <Text />
          <Container />
        </div>
      </div>
    </div>
  );
}

export default function NewFeatureSectionBeyondTemplates() {
  return (
    <div className="bg-[#0e1011] content-stretch flex flex-col items-start px-[24px] py-[128px] relative size-full" data-name="New Feature Section: Beyond Templates">
      <div className="-translate-y-1/2 absolute bg-[#3a64cc] blur-[200px] h-[199px] left-[44px] rounded-[12px] top-[calc(50%+22.5px)] w-[215px]" data-name="Background Accents" />
      <div className="absolute bg-[#3a64cc] blur-[200px] bottom-[81px] h-[330px] right-[2px] rounded-[12px] w-[318px]" data-name="Overlay+Blur" />
      <Templates />
    </div>
  );
}