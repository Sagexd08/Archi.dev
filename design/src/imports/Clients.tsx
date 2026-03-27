import { imgSectionSocialProofLogos } from "./svg-mp0w2";

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] relative shrink-0 text-[#78737f] text-[14px] text-center tracking-[4.2px] uppercase w-[688.45px]">
        <p className="leading-[20px]">{`Empowering teams at the world's most innovative companies`}</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex h-[32px] items-center pb-px relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Space_Grotesk:Bold',sans-serif] font-bold h-[32px] justify-center leading-[0] relative shrink-0 text-[#f5eefc] text-[24px] w-[124.14px]">
        <p className="leading-[32px]">SYNTHETIX</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex h-[32px] items-center pb-px relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Space_Grotesk:Bold',sans-serif] font-bold h-[32px] justify-center leading-[0] relative shrink-0 text-[#f5eefc] text-[24px] w-[86.84px]">
        <p className="leading-[32px]">AETHER</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex h-[32px] items-center pb-px relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Space_Grotesk:Bold',sans-serif] font-bold h-[32px] justify-center leading-[0] relative shrink-0 text-[#f5eefc] text-[24px] w-[120px]">
        <p className="leading-[32px]">NEURALUX</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex h-[32px] items-center pb-px relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Space_Grotesk:Bold',sans-serif] font-bold h-[32px] justify-center leading-[0] relative shrink-0 text-[#f5eefc] text-[24px] w-[100.14px]">
        <p className="leading-[32px]">VOXELLA</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex h-[32px] items-center pb-px relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Space_Grotesk:Bold',sans-serif] font-bold h-[32px] justify-center leading-[0] relative shrink-0 text-[#f5eefc] text-[24px] w-[114.83px]">
        <p className="leading-[32px]">QUANTUM</p>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="content-stretch flex gap-[80px] items-center justify-center opacity-50 relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute bg-white inset-0 mix-blend-saturation pointer-events-none" />
      <Container2 />
      <Container3 />
      <Container4 />
      <Container5 />
      <Container6 />
    </div>
  );
}

function Container() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col gap-[48px] items-start left-1/2 max-w-[1280px] px-[24px] top-[calc(50%+0.17px)] w-[1280px]" data-name="Container">
      <Container1 />
      <Background />
    </div>
  );
}

function SectionSocialProofLogos() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#0f0f0e] h-[219.67px] left-1/2 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[120px_-138px] mask-size-[1040px_496px] top-[calc(50%-0.17px)] w-[1280px]" data-name="Section - Social Proof / Logos" style={{ maskImage: `url('${imgSectionSocialProofLogos}')` }}>
      <Container />
    </div>
  );
}

export default function Clients() {
  return (
    <div className="relative size-full" data-name="clients">
      <SectionSocialProofLogos />
    </div>
  );
}