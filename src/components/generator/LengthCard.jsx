import { motion } from "framer-motion";

function LengthCard({
  icon,
  title,
  subtitle,
  previewLines,
  selected,
  onClick,
}) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        w-full
        rounded-3xl
        p-6
        text-left
        transition-all
        duration-300
        backdrop-blur-xl
        border
        cursor-pointer
        ${
          selected
            ? "border-[#751015] bg-[#751015]/10 shadow-[0_8px_25px_rgba(117,16,21,0.18)] ring-2 ring-[#751015]"
            : "border-[#603820]/15 bg-[#FAF4EE]/85 hover:border-[#751015]/40 hover:bg-[#FAF4EE] shadow-[0_8px_20px_rgba(74,11,15,0.04)]"
        }
      `}
    >
      <div className="text-4xl mb-4">{icon}</div>

      <h3 className="font-display text-xl font-semibold text-[#0B0908]">
        {title}
      </h3>

      <p className="text-[#603820] font-serif italic text-sm mt-1.5 mb-5">
        {subtitle}
      </p>

      <div className="space-y-2">
        {Array.from({ length: previewLines }).map((_, index) => (
          <div
            key={index}
            className="h-2 rounded-full bg-[#751015]/25"
            style={{
              width: `${100 - index * 8}%`,
            }}
          />
        ))}
      </div>
    </motion.button>
  );
}

export default LengthCard;