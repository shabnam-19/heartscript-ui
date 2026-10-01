import { motion } from "framer-motion";

function HeroText() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      className="text-center max-w-4xl mx-auto"
    >
      <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#751015]/8 border border-[#751015]/25 mb-8 shadow-sm">
        <span className="text-xs text-[#751015]">✦</span>
        <span className="font-display tracking-[0.28em] uppercase text-xs font-semibold text-[#751015]">
          Vintage Editorial & Gothic Romance
        </span>
        <span className="text-xs text-[#751015]">✦</span>
      </div>

      <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] text-[#0B0908] tracking-tight">
        Write the words
        <br />
        your{" "}
        <span className="font-serif italic font-normal text-[#751015] border-b-2 border-[#C5A059]/60 pb-1">
          heart
        </span>{" "}
        always wanted to say.
      </h1>

      <p className="mt-8 text-xl md:text-2xl text-[#603820] font-serif italic leading-relaxed max-w-2xl mx-auto font-normal">
        HeartScript transforms your cherished memories, unspoken longings, and deepest
        emotions into timeless, evocative love letters penned in literary luxury.
      </p>
    </motion.div>
  );
}

export default HeroText;