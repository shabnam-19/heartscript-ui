import { motion } from "framer-motion";
import LoadingMessages from "./LoadingMessages";

function HeartLoader({ loading }) {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-[#0B0908]/92 backdrop-blur-md flex flex-col items-center justify-center z-50 px-6">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.85, 1, 0.85],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.8,
          ease: "easeInOut",
        }}
        className="text-6xl md:text-7xl filter drop-shadow-[0_0_25px_rgba(117,16,21,0.7)]"
      >
        ❤️
      </motion.div>

      <LoadingMessages />
    </div>
  );
}

export default HeartLoader;