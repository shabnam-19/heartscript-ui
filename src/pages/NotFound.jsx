import { Link } from "react-router-dom";
import AnimatedBackground from "../components/common/AnimatedBackground";

function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-6 text-center">
      <AnimatedBackground />

      <div className="max-w-md p-10 rounded-3xl bg-[#FAF4EE]/90 border border-[#603820]/20 backdrop-blur-xl shadow-xl">
        <h1 className="font-display text-7xl md:text-8xl font-bold text-[#751015] mb-2">
          404
        </h1>

        <p className="font-serif italic text-2xl text-[#0B0908] mb-3">
          Page Lost to the Shadows
        </p>

        <p className="font-serif text-[#603820] mb-8 text-base leading-relaxed">
          The parchment or verse you seek has slipped through the hourglass of time.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#4A0B0F] via-[#751015] to-[#4A0B0F] text-[#F0E0D0] font-display text-xs tracking-widest uppercase font-semibold border border-[#C5A059]/40 shadow-lg shadow-[#4A0B0F]/20 hover:scale-105 transition"
        >
          Return to Sanctuary
        </Link>
      </div>
    </div>
  );
}

export default NotFound;