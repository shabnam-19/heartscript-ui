import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaPenFancy, FaArrowRight } from "react-icons/fa";
import AnimatedBackground from "../components/common/AnimatedBackground";
import { getAllLetters } from "../services/LetterService";

function AllLetters() {
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllLetters()
      .then((data) => {
        setLetters(Array.isArray(data) ? data : []);
        setError(null);
      })
      .catch((err) => {
        console.error("Failed to load letters:", err);
        setError("Unable to load letters at this time.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="relative min-h-screen py-20 px-6">
      <AnimatedBackground />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-display text-[#751015] tracking-[0.32em] uppercase text-xs font-semibold mb-3">
            ✦ Your Intimate Archive ✦
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#0B0908] flex items-center justify-center gap-3">
            All Letters <FaHeart className="inline text-[#751015] text-3xl" />
          </h1>
          <p className="font-serif italic text-lg text-[#603820] mt-3.5 max-w-xl mx-auto">
            Browse through your collection of generated letters crafted with deep emotion, memories, and gothic grace.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-5xl animate-bounce mb-4 text-[#751015]">💌</div>
            <p className="font-serif italic text-lg text-[#603820]">
              Opening the letter chest...
            </p>
          </div>
        ) : letters.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {letters.map((letter) => (
              <Link
                key={letter.id}
                to={`/letters/${letter.id}`}
                state={{ letter }}
                className="group relative rounded-3xl p-7 bg-[#FAF4EE]/90 border border-[#603820]/15 backdrop-blur-xl hover:border-[#751015]/40 hover:bg-[#FAF4EE] hover:shadow-[0_20px_45px_rgba(74,11,15,0.1)] transition-all duration-300 flex flex-col justify-between shadow-[0_10px_30px_rgba(74,11,15,0.05)]"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-4">
                    <span className="px-3.5 py-1 rounded-full bg-[#751015]/8 border border-[#751015]/20 font-display text-xs tracking-wider uppercase text-[#751015] font-semibold">
                      {letter.occasion || "Love Letter"}
                    </span>
                    {letter.tone && (
                      <span className="font-serif italic text-sm text-[#603820]">
                        {letter.tone}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#0B0908] group-hover:text-[#751015] transition-colors mb-3 line-clamp-1">
                    {letter.title || "Heartfelt Letter"}
                  </h3>

                  <p className="text-[#603820] text-base line-clamp-3 leading-relaxed mb-6 font-serif italic">
                    {letter.content}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#603820]/15 flex items-center justify-between text-xs">
                  <span className="font-serif text-[#603820] text-sm">
                    To: <strong className="text-[#0B0908] font-semibold">{letter.receiverName || "Someone Special"}</strong>
                  </span>
                  <span className="font-display uppercase tracking-wider text-xs font-semibold text-[#751015] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                    Read Letter <FaArrowRight className="text-[10px]" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 max-w-md mx-auto rounded-3xl bg-[#FAF4EE]/90 border border-[#603820]/20 backdrop-blur-xl p-10 shadow-[0_15px_40px_rgba(74,11,15,0.06)]">
            <div className="text-5xl mb-4 text-[#751015]">💌</div>
            <h2 className="font-display text-2xl font-bold text-[#0B0908] mb-2">
              No Letters Inscribed Yet
            </h2>
            <p className="font-serif italic text-base text-[#603820] mb-8 leading-relaxed">
              {error || "Your archive is currently empty. Pen your first timeless masterpiece of devotion today."}
            </p>
            <Link
              to="/generate"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#4A0B0F] via-[#751015] to-[#4A0B0F] text-[#F0E0D0] font-display text-xs md:text-sm tracking-widest uppercase font-semibold border border-[#C5A059]/40 shadow-lg shadow-[#4A0B0F]/20 hover:scale-105 transition"
            >
              <FaPenFancy /> Pen Your First Letter
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllLetters;