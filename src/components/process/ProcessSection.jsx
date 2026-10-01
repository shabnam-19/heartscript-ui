import ProcessCard from "./ProcessCard";
import { FaPenNib, FaMagic, FaHeart } from "react-icons/fa";

function ProcessSection() {
  return (
    <section className="py-28 px-6">
      <div className="text-center mb-20">
        <p className="font-display text-[#751015] tracking-[0.32em] uppercase text-xs font-semibold mb-3">
          ✦ The Alchemy of HeartScript ✦
        </p>

        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[#0B0908] leading-tight">
          Create Magic
          <br />
          <span className="font-serif italic font-normal text-[#751015]">
            In Three Steps
          </span>
        </h2>

        <p className="font-serif italic text-lg md:text-xl text-[#603820] mt-4 max-w-xl mx-auto">
          Crafting unforgettable, sensual letters imbued with timeless sentiment and editorial grace.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 items-stretch">
        <div className="md:mt-8">
          <ProcessCard
            step="01"
            icon={<FaPenNib className="text-[#751015]" />}
            title="Tell us about them"
            description="Choose your relationship, occasion, cherished memories, and desired emotional nuance."
            accent="bg-[#751015]/10"
            delay={0}
          />
        </div>

        <div>
          <ProcessCard
            step="02"
            icon={<FaMagic className="text-[#603820]" />}
            title="AI writes beautifully"
            description="Our model weaves your personal details into an authentic, deeply emotive handwritten masterpiece."
            accent="bg-[#603820]/10"
            delay={0.2}
          />
        </div>

        <div className="md:mt-16">
          <ProcessCard
            step="03"
            icon={<FaHeart className="text-[#4A0B0F]" />}
            title="Share forever"
            description="Preserve, print onto vintage parchment, or send an indelible keepsake to the one you adore."
            accent="bg-[#4A0B0F]/10"
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
}

export default ProcessSection;