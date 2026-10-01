import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";

const HEARTS_CONFIG = [
  { size: 24, left: 8, duration: 18, delay: 0, opacity: 0.28, color: "#751015" },
  { size: 16, left: 20, duration: 22, delay: 3.5, opacity: 0.22, color: "#9E5D64" },
  { size: 28, left: 34, duration: 16, delay: 6, opacity: 0.25, color: "#4A0B0F" },
  { size: 14, left: 46, duration: 24, delay: 1.5, opacity: 0.2, color: "#603820" },
  { size: 22, left: 58, duration: 19, delay: 5, opacity: 0.26, color: "#751015" },
  { size: 30, left: 70, duration: 17, delay: 2, opacity: 0.24, color: "#C5A059" },
  { size: 18, left: 82, duration: 21, delay: 7.5, opacity: 0.22, color: "#4A0B0F" },
  { size: 26, left: 92, duration: 20, delay: 4, opacity: 0.25, color: "#9E5D64" },
  { size: 20, left: 15, duration: 23, delay: 8, opacity: 0.2, color: "#751015" },
  { size: 24, left: 88, duration: 18, delay: 9, opacity: 0.24, color: "#4A0B0F" },
];

export default function FloatingHearts() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {HEARTS_CONFIG.map((heart, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: `${heart.left}%`,
            bottom: "-10%",
            fontSize: `${heart.size}px`,
            color: heart.color,
            opacity: heart.opacity,
            filter: "drop-shadow(0 2px 6px rgba(74, 11, 15, 0.15))",
          }}
          animate={{
            y: [-20, -900],
            x: [0, -15, 15, -10, 10, 0],
            rotate: [0, -25, 20, -15, 15, 0],
            opacity: [0, heart.opacity, heart.opacity, 0],
            scale: [0.85, 1.15, 1],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
        >
          <FaHeart />
        </motion.div>
      ))}
    </div>
  );
}