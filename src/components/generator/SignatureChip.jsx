import { motion } from "framer-motion";

function SignatureChip({ title, selected, onClick }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`
        px-5
        py-2.5
        rounded-full
        transition-all
        duration-200
        backdrop-blur-xl
        border
        font-serif
        italic
        text-base
        cursor-pointer
        ${
          selected
            ? "bg-gradient-to-r from-[#4A0B0F] via-[#751015] to-[#4A0B0F] border-[#C5A059]/50 text-[#F0E0D0] shadow-md shadow-[#4A0B0F]/20"
            : "bg-[#FAF4EE] border-[#603820]/20 text-[#603820] hover:border-[#751015]/40 hover:text-[#751015] shadow-sm"
        }
      `}
    >
      {title}
    </motion.button>
  );
}

export default SignatureChip;