import { motion } from "framer-motion";

function OccasionCard({ icon, title, selected, onClick }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`
        w-full
        rounded-2xl
        p-5
        border
        transition-all
        duration-300
        backdrop-blur-xl
        cursor-pointer
        ${
          selected
            ? "border-[#751015] bg-[#751015]/10 text-[#0B0908] shadow-[0_8px_25px_rgba(117,16,21,0.18)] ring-2 ring-[#751015]"
            : "border-[#603820]/15 bg-[#FAF4EE]/85 hover:border-[#751015]/40 hover:bg-[#FAF4EE] text-[#0B0908] shadow-[0_8px_20px_rgba(74,11,15,0.04)]"
        }
      `}
    >
      <div className="text-3xl md:text-4xl mb-2.5">{icon}</div>
      <h3 className="font-display text-sm md:text-base font-semibold tracking-wide text-[#0B0908]">
        {title}
      </h3>
    </motion.button>
  );
}

export default OccasionCard;