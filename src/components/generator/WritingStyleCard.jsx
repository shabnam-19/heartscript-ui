import { motion } from "framer-motion";

function WritingStyleCard({ icon, title, subtitle, selected, onClick }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        p-6
        rounded-3xl
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
      <div className="text-3xl mb-3">{icon}</div>

      <h3 className="font-display font-semibold text-lg text-[#0B0908]">
        {title}
      </h3>

      <p className="text-[#603820] font-serif italic text-sm mt-1.5 leading-relaxed">
        {subtitle}
      </p>
    </motion.button>
  );
}

export default WritingStyleCard;