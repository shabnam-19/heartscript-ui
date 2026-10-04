import { useState, useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import AnimatedBackground from "../components/common/AnimatedBackground";
import EmailShareModal from "../components/common/EmailShareModal";
import { FaArrowLeft, FaHeart, FaFeatherAlt, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import pen from "../assets/pen.png";
import { getLetterById } from "../services/LetterService";
import "../styles/LetterDetails.css";

const FONT_OPTIONS = [
  { id: "garamond", label: "Literary Garamond", className: "letter-font-garamond" },
  { id: "lora", label: "Book Lora", className: "letter-font-lora" },
  { id: "script", label: "Handwritten Script", className: "letter-font-script" },
];

function LetterDetails() {
  const { state } = useLocation();
  const { id } = useParams();

  const [letter, setLetter] = useState(state?.letter || null);
  const [loading, setLoading] = useState(!state?.letter && !!id);
  const [error, setError] = useState(null);
  const [selectedFont, setSelectedFont] = useState("garamond");
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  useEffect(() => {
    let isCurrent = true;
    if (!letter && id) {
      getLetterById(id)
        .then((data) => {
          if (isCurrent) {
            setLetter(data);
            setError(null);
          }
        })
        .catch((err) => {
          if (isCurrent) {
            console.error("Failed to fetch letter:", err);
            setError("Could not load the requested letter.");
          }
        })
        .finally(() => {
          if (isCurrent) {
            setLoading(false);
          }
        });
    }
    return () => {
      isCurrent = false;
    };
  }, [id, letter]);

  const activeFontClass =
    FONT_OPTIONS.find((f) => f.id === selectedFont)?.className || "letter-font-garamond";

  // Phase 4A: WhatsApp Sharing configuration using existing shareUrl
  const shareUrl = letter?.shareUrl || "";
  const isLocalhost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      shareUrl.includes("localhost") ||
      shareUrl.includes("127.0.0.1"));

  const receiverText = letter?.receiverName ? ` ${letter.receiverName}` : "";
  const titleText = letter?.title ? ` "${letter.title}"` : "";
  const senderSignoff = letter?.senderName ? `\n— Forever yours, ${letter.senderName}` : "";

  const whatsAppMessage = `Dearest${receiverText},\n\nI have penned a private love letter for you on HeartScript${titleText}.\n\nRead your letter here:\n${shareUrl}\n\n⏳ This private keepsake is sealed and available for 24 hours only.${senderSignoff}`;

  const whatsAppShareUrl = shareUrl
    ? `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsAppMessage)}`
    : "";

  if (loading) {
    return (
      <>
        <AnimatedBackground />
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
          <div className="text-6xl animate-bounce mb-6 text-[#751015]">💌</div>
          <p className="font-serif italic text-xl text-[#603820]">
            Retrieving your handwritten keepsake...
          </p>
        </div>
      </>
    );
  }

  if (!letter) {
    return (
      <>
        <AnimatedBackground />
        <div className="min-h-screen flex flex-col justify-center items-center px-6 text-center">
          <div className="p-10 rounded-3xl bg-[#FAF4EE]/90 border border-[#603820]/20 backdrop-blur-xl max-w-md shadow-xl">
            <div className="text-5xl mb-4 text-[#751015]">✦</div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-[#0B0908] mb-3">
              No Letter Found
            </h1>
            <p className="font-serif italic text-[#603820] mb-8 leading-relaxed">
              {error || "Please pen a letter first or verify your archived link."}
            </p>
            <Link
              to="/generate"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#4A0B0F] via-[#751015] to-[#4A0B0F] text-[#F0E0D0] font-display text-xs tracking-widest uppercase font-semibold border border-[#C5A059]/40 shadow-lg shadow-[#4A0B0F]/20 hover:scale-105 transition"
            >
              <FaHeart className="text-xs" /> Pen a Letter
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AnimatedBackground />

      <div className="letter-page py-16 px-4">
        <div className="letter-card max-w-4xl mx-auto">
          <div className="letter-header text-center mb-8">
            <p className="font-display text-[#751015] tracking-[0.32em] uppercase text-xs font-semibold mb-2">
              ✦ HeartScript Keepsake ✦
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-[#0B0908]">
              Penned with Devotion
            </h1>
            <p className="font-serif italic text-lg md:text-xl text-[#603820] mt-2">
              Crafted in vintage editorial luxury, sealed forever.
            </p>
          </div>

          {/* Letter Font Style Switcher Toolbar (Hidden on Print) */}
          <div className="font-selector-bar flex flex-wrap items-center justify-center gap-2.5 mb-8 print:hidden">
            <span className="text-xs font-display uppercase tracking-widest text-[#603820] font-semibold mr-1">
              Letter Font:
            </span>
            {FONT_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedFont(opt.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-display tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  selectedFont === opt.id
                    ? "bg-[#000000] text-[#F0E0D0] shadow-sm font-semibold"
                    : "bg-[#FAF4EE]/85 hover:bg-[#FAF4EE] text-[#000000] border border-[#603820]/25"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Parchment Sheet */}
          <div className="paper relative mx-auto max-w-3xl px-8 sm:px-14 md:px-20 py-14 md:py-18">
            <h2 className="letter-title vintage-title text-center text-3xl md:text-4xl mb-8 px-2 font-display text-[#000000]">
              {letter.title}
            </h2>

            {/* Letter Content: Easy to read, pitch-black vintage ink */}
            <div
              className={`letter-body ${activeFontClass} max-w-[720px] mx-auto text-[22px] md:text-[24px] text-[#000000]`}
            >
              {letter.content}
            </div>

            <div className="signature flex justify-between items-end gap-6 mt-14">
              <div className="wax-seal">
                <FaFeatherAlt className="text-xl text-[#F0E0D0]" />
              </div>
              <div className="text-right">
                <p className="font-serif italic text-sm text-[#000000]/75 mb-1">
                  Inscribed by
                </p>
                <p className="vintage-signature text-3xl md:text-[40px] text-[#000000] leading-none">
                  {letter.senderName}
                </p>
              </div>
            </div>

            <img
              src={pen}
              alt="Vintage Fountain Pen"
              className="pen-image"
            />
          </div>

          <div className="flex flex-col items-center mt-12 action-buttons">
            <div className="flex flex-wrap justify-center items-center gap-4">
              {shareUrl && (
                <button
                  type="button"
                  onClick={() => setIsEmailModalOpen(true)}
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#4A0B0F] via-[#751015] to-[#4A0B0F] text-[#F0E0D0] font-display text-xs md:text-sm tracking-widest uppercase font-semibold border border-[#C5A059]/40 shadow-xl shadow-[#4A0B0F]/25 hover:scale-105 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  aria-label="Send this love letter via email"
                >
                  <FaEnvelope className="text-base text-[#F0E0D0]" /> Send via Email
                </button>
              )}

              {shareUrl && (
                <a
                  href={whatsAppShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#128C7E] to-[#25D366] text-white font-display text-xs md:text-sm tracking-widest uppercase font-semibold border border-[#25D366]/40 shadow-xl shadow-[#128C7E]/25 hover:scale-105 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                  aria-label="Share this love letter on WhatsApp"
                >
                  <FaWhatsapp className="text-lg text-white" /> Share on WhatsApp
                </a>
              )}

              <Link
                to="/generate"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#FAF4EE] hover:bg-[#E8D9C9] text-[#603820] font-display text-xs md:text-sm tracking-widest uppercase font-semibold border border-[#603820]/30 shadow-sm transition"
              >
                <FaArrowLeft /> Inscribe Another
              </Link>
            </div>

            {shareUrl && isLocalhost && (
              <p className="text-center font-serif italic text-xs text-[#603820]/75 mt-3 print:hidden max-w-lg">
                ✦ Testing on localhost: The shared link will open on this machine. In production, your public domain will allow your recipient to open it on any device.
              </p>
            )}
          </div>
        </div>
      </div>

      <EmailShareModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        shareUrl={shareUrl}
      />
    </>
  );
}

export default LetterDetails;