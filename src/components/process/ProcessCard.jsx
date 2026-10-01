import { motion } from "framer-motion";

function ProcessCard({
  icon,
  step,
  title,
  description,
  accent,
  delay,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay,
      }}
      whileHover={{
        y: -10,
        scale: 1.02,
      }}
      className="relative group h-full"
    >
      {/* Subtle atmospheric glow behind card */}
      <div
        className={`
        absolute
        inset-0
        blur-2xl
        opacity-30
        rounded-[32px]
        transition
        duration-500
        group-hover:opacity-60
        ${accent}
      `}
      />

      {/* Parchment Glass Card */}
      <div
        className="
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-[#603820]/15
        bg-[#FAF4EE]/90
        backdrop-blur-xl
        p-8
        min-h-[320px]
        h-full
        flex
        flex-col
        justify-between
        shadow-[0_12px_35px_rgba(74,11,15,0.06)]
        hover:border-[#751015]/40
        hover:shadow-[0_20px_45px_rgba(74,11,15,0.12)]
        transition-all
        duration-500
      "
      >
        {/* Soft corner aura */}
        <div
          className="
          absolute
          -top-20
          -right-20
          h-44
          w-44
          rounded-full
          bg-[#751015]/8
          blur-2xl
          group-hover:scale-125
          transition
          duration-700
        "
        />

        <div>
          {/* Icon */}
          <div className="relative mb-6 text-4xl">
            {icon}
          </div>

          {/* Step */}
          <p className="font-display text-[#751015] uppercase tracking-[0.25em] text-xs font-semibold mb-3">
            Step {step}
          </p>

          {/* Title */}
          <h3 className="font-display text-xl md:text-2xl font-bold text-[#0B0908] mb-3">
            {title}
          </h3>

          {/* Description */}
          <p className="text-[#603820] font-serif text-base leading-relaxed">
            {description}
          </p>
        </div>

        {/* Bottom Link */}
        <div className="mt-8 pt-4 border-t border-[#603820]/10">
          <span className="font-display text-xs tracking-wider uppercase font-semibold text-[#751015] group-hover:text-[#4A0B0F] inline-flex items-center gap-1.5 transition-colors">
            Learn More <span className="group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default ProcessCard;