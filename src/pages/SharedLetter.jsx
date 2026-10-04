import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaHeart,
  FaClock,
  FaFeatherAlt,
  FaDownload,
  FaCheckCircle,
  FaExclamationTriangle,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import AnimatedBackground from "../components/common/AnimatedBackground";
import EmailShareModal from "../components/common/EmailShareModal";
import pen from "../assets/pen.png";
import "../styles/SharedLetter.css";

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatExpiryDetails(expiresAt) {
  if (!expiresAt) {
    return {
      isExpired: false,
      timeRemaining: "24 hours",
      fullFormatted: "24 hours from creation",
    };
  }

  const expiryDate = new Date(expiresAt);
  if (isNaN(expiryDate.getTime())) {
    return {
      isExpired: false,
      timeRemaining: "24 hours",
      fullFormatted: "24 hours from creation",
    };
  }

  const now = new Date();
  const diffMs = expiryDate.getTime() - now.getTime();

  if (diffMs <= 0) {
    return {
      isExpired: true,
      timeRemaining: "Expired",
      fullFormatted: expiryDate.toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }),
    };
  }

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  const timeRemaining =
    hours > 0 ? `${hours}h ${minutes}m left` : `${Math.max(1, minutes)}m left`;

  const fullFormatted = expiryDate.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return {
    isExpired: false,
    timeRemaining,
    fullFormatted,
  };
}

function SharedLetter() {
  const { token } = useParams();

  const [letter, setLetter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [, setTick] = useState(0);

  // Save letter state & notification
  const [saving, setSaving] = useState(false);
  const [saveNotification, setSaveNotification] = useState(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  // Recalculate expiry remaining time every 60 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let isCurrent = true;

    const fetchLetter = async () => {
      try {
        const baseUrl =
          import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
        const response = await fetch(`${baseUrl}/api/v1/letters/share/${token}`);

        if (!response.ok) {
          if (!isCurrent) return;
          if (response.status === 404) {
            setError(
              "This love letter link has expired or is no longer available."
            );
          } else {
            setError("Unable to load this love letter.");
          }
          return;
        }

        const data = await response.json();
        if (isCurrent) {
          setLetter(data);
        }
      } catch (err) {
        if (isCurrent) {
          console.error("Error loading shared letter:", err);
          setError("Unable to connect to Heartscript. Please try again.");
        }
      } finally {
        if (isCurrent) {
          setLoading(false);
        }
      }
    };

    fetchLetter();

    return () => {
      isCurrent = false;
    };
  }, [token]);

  const expiryInfo = useMemo(() => {
    return formatExpiryDetails(letter?.expiresAt);
  }, [letter]);

  // Clean paragraph parsing to control line/para spacing tightly
  const letterParagraphs = useMemo(() => {
    if (!letter?.content) return [];
    return letter.content
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);
  }, [letter]);

  // Phase 4A: WhatsApp Sharing configuration using existing shareUrl
  const shareUrl =
    letter?.shareUrl ||
    (typeof window !== "undefined" ? window.location.href : "");
  const isLocalhost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      shareUrl.includes("localhost") ||
      shareUrl.includes("127.0.0.1"));

  const receiverText = letter?.receiverName ? ` ${letter.receiverName}` : "";
  const titleText = letter?.title ? ` "${letter.title}"` : "";
  const senderSignoff = letter?.senderName
    ? `\n— Forever yours, ${letter.senderName}`
    : "";

  const whatsAppMessage = `Dearest${receiverText},\n\nI have penned a private love letter for you on HeartScript${titleText}.\n\nRead your letter here:\n${shareUrl}\n\n⏳ This private keepsake is sealed and available for 24 hours only.${senderSignoff}`;

  const whatsAppShareUrl = shareUrl
    ? `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsAppMessage)}`
    : "";

  // Browser-native Save Letter functionality
  const handleSaveLetter = () => {
    if (!letter) return;
    setSaving(true);
    setSaveNotification(null);

    try {
      const savedDate = new Date().toLocaleString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });

      const safeTitle = escapeHtml(letter.title || "Love Letter");
      const safeSender = escapeHtml(letter.senderName || "Secret Admirer");
      const safeReceiver = escapeHtml(letter.receiverName || "My Love");

      const paragraphsHtml = (letter.content || "")
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter((p) => p.length > 0)
        .map(
          (p) =>
            `<p style="margin-bottom: 1.1em; line-height: 1.75; white-space: pre-line;">${escapeHtml(
              p
            )}</p>`
        )
        .join("\n");

      const keepsakeHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeTitle} — HeartScript Keepsake</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400;1,600&family=EB+Garamond:ital,wght@0,500;0,600;1,400&family=Marck+Script&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #F0E0D0;
      color: #0B0908;
      font-family: "Cormorant Garamond", Georgia, serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 16px;
      -webkit-font-smoothing: antialiased;
    }
    .keepsake-wrapper { width: 100%; max-width: 800px; margin: 0 auto; }
    .keepsake-header { text-align: center; margin-bottom: 24px; }
    .keepsake-brand-tag {
      font-family: "Cinzel", Georgia, serif;
      color: #751015;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .keepsake-saved-meta {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-style: italic;
      color: #603820;
      font-size: 15px;
    }
    .parchment {
      position: relative;
      background: linear-gradient(180deg, #FDF8F2 0%, #F7ECE0 35%, #EFE2D3 75%, #E6D4C2 100%);
      border: 1px solid rgba(96, 56, 32, 0.35);
      border-radius: 12px;
      padding: 60px 50px 50px;
      box-shadow: 0 20px 50px -10px rgba(74, 11, 15, 0.25), 0 5px 20px rgba(11, 9, 8, 0.1);
      overflow: hidden;
    }
    .title-block { text-align: center; margin-bottom: 30px; }
    .letter-title {
      font-family: "Cinzel", Georgia, serif;
      font-size: 32px;
      font-weight: 700;
      color: #0B0908;
      letter-spacing: 0.02em;
      line-height: 1.25;
    }
    .ornament { color: #C5A059; font-size: 14px; margin-top: 10px; letter-spacing: 0.2em; }
    .salutation {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-style: italic;
      font-size: 24px;
      color: #0B0908;
      margin-bottom: 24px;
    }
    .letter-body {
      font-family: "EB Garamond", Georgia, serif;
      font-size: 21px;
      line-height: 1.7;
      color: #0B0908;
      margin-bottom: 40px;
      word-break: break-word;
    }
    .signature-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-top: 1px solid rgba(96, 56, 32, 0.2);
      padding-top: 24px;
      margin-top: 20px;
    }
    .seal-wrap { display: flex; align-items: center; gap: 14px; }
    .wax-seal {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 30%, #8A141A, #4A0B0F 65%, #1E0507 98%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #F0E0D0;
      box-shadow: inset 0 3px 6px rgba(197, 160, 89, 0.45), 0 8px 18px rgba(74, 11, 15, 0.35);
      border: 1px solid rgba(197, 160, 89, 0.5);
      font-size: 24px;
    }
    .seal-text-title {
      font-family: "Cinzel", Georgia, serif;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      font-weight: 700;
      color: #751015;
    }
    .seal-text-sub {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-style: italic;
      font-size: 14px;
      color: #603820;
    }
    .signoff { text-align: right; }
    .valediction {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-style: italic;
      font-size: 18px;
      color: #603820;
      margin-bottom: 4px;
    }
    .sender-name {
      font-family: "Marck Script", cursive;
      font-size: 42px;
      color: #0B0908;
      line-height: 1.1;
    }
    .keepsake-footer {
      text-align: center;
      margin-top: 28px;
      border-top: 1px solid rgba(96, 56, 32, 0.15);
      padding-top: 20px;
    }
    .brand-name {
      font-family: "Cinzel", Georgia, serif;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: #751015;
      margin-bottom: 4px;
    }
    .brand-tagline {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-style: italic;
      font-size: 15px;
      color: #603820;
      margin-bottom: 6px;
    }
    .copyright {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 13px;
      color: rgba(96, 56, 32, 0.7);
    }
    @media (max-width: 600px) {
      .parchment { padding: 36px 24px 30px; }
      .letter-title { font-size: 26px; }
      .salutation { font-size: 20px; }
      .letter-body { font-size: 18px; }
      .signature-row { flex-direction: column; align-items: flex-start; gap: 20px; }
      .signoff { text-align: left; width: 100%; }
      .sender-name { font-size: 34px; }
    }
    @media print {
      body { background: #FFFFFF !important; padding: 0 !important; }
      .parchment { box-shadow: none !important; border: 1px solid #603820 !important; max-width: 100% !important; background: #FFFFFF !important; }
      .letter-body { color: #000000 !important; }
    }
  </style>
</head>
<body>
  <div class="keepsake-wrapper">
    <div class="keepsake-header">
      <p class="keepsake-brand-tag">✦ HeartScript Keepsake ✦</p>
      <p class="keepsake-saved-meta">Saved locally on ${escapeHtml(savedDate)}</p>
    </div>

    <article class="parchment">
      <div class="title-block">
        <h1 class="letter-title">${safeTitle}</h1>
        <div class="ornament">✦ ❦ ✦</div>
      </div>

      <div class="salutation">Dearest ${safeReceiver},</div>

      <div class="letter-body">
        ${paragraphsHtml}
      </div>

      <div class="signature-row">
        <div class="seal-wrap">
          <div class="wax-seal">❦</div>
          <div>
            <div class="seal-text-title">HeartScript Sealed</div>
            <div class="seal-text-sub">Penned with devotion</div>
          </div>
        </div>

        <div class="signoff">
          <div class="valediction">Forever yours,</div>
          <div class="sender-name">${safeSender}</div>
        </div>
      </div>
    </article>

    <footer class="keepsake-footer">
      <p class="brand-name">✦ HeartScript ✦</p>
      <p class="brand-tagline">Penned with dark gothic romance &amp; vintage editorial elegance.</p>
      <p class="copyright">© ${new Date().getFullYear()} HeartScript. All rights reserved.</p>
    </footer>
  </div>
</body>
</html>`;

      const blob = new Blob([keepsakeHtml], {
        type: "text/html;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      const sanitizedTitle = (letter.title || "love-letter")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      downloadLink.href = url;
      downloadLink.download = `HeartScript-${sanitizedTitle || "keepsake"}.html`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);

      setSaveNotification({
        type: "success",
        message: "Letter keepsake saved to your device! 💌",
      });
      setTimeout(() => {
        setSaveNotification(null);
      }, 4500);
    } catch (err) {
      console.error("Failed to save letter locally:", err);
      setSaveNotification({
        type: "error",
        message: "Unable to save keepsake file. Please try again.",
      });
      setTimeout(() => {
        setSaveNotification(null);
      }, 5000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <AnimatedBackground />
        <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#FAF4EE]/90 border border-[#603820]/20 backdrop-blur-xl shadow-xl max-w-sm w-full mx-auto">
            <div className="text-5xl animate-bounce mb-5 text-[#751015]">
              💌
            </div>
            <h2 className="font-display text-xl font-bold text-[#0B0908] mb-2 tracking-wide">
              Unfolding Keepsake
            </h2>
            <p className="font-serif italic text-[#603820] text-base leading-relaxed">
              Opening your private love letter...
            </p>
          </div>
        </main>
      </>
    );
  }

  if (error || (letter && expiryInfo.isExpired)) {
    return (
      <>
        <AnimatedBackground />
        <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#FAF4EE]/95 border border-[#603820]/25 backdrop-blur-xl shadow-2xl max-w-md w-full mx-auto">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#4A0B0F]/10 border border-[#751015]/30 flex items-center justify-center text-3xl text-[#751015]">
              ✦
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0B0908] mb-3">
              Letter Unavailable
            </h1>
            <p className="font-serif italic text-base sm:text-lg text-[#603820] mb-8 leading-relaxed">
              {error ||
                "This private love letter was sealed with a 24-hour link and has now faded into memory."}
            </p>
            <Link
              to="/generate"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#4A0B0F] via-[#751015] to-[#4A0B0F] text-[#F0E0D0] font-display text-xs tracking-widest uppercase font-semibold border border-[#C5A059]/40 shadow-lg shadow-[#4A0B0F]/20 hover:scale-105 transition"
            >
              <FaHeart className="text-xs" /> Inscribe a New Letter
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <AnimatedBackground />

      <main className="min-h-screen py-10 sm:py-16 px-4 sm:px-6 flex flex-col items-center justify-center">
        {/* Editorial Subtitle & Context */}
        <header className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 print:hidden">
          {/* Prominent Header Tag */}
          <p className="font-display text-[#751015] tracking-[0.28em] uppercase text-sm sm:text-base md:text-lg font-bold mb-3">
            ✦ Confidential Love Letter ✦
          </p>

          {/* Subtitle with Increased Font Size */}
          <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-[#603820] leading-relaxed">
            An intimate keepsake written specifically for your eyes.
          </p>

          {/* 24-Hour Expiry Indicator Badge with Increased Font Size */}
          <div className="mt-5 flex justify-center">
            <div
              className="inline-flex items-center gap-2.5 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#FAF4EE]/95 border border-[#C5A059]/50 shadow-sm text-sm sm:text-base md:text-lg text-[#4A0B0F] expiry-badge-pulse"
              role="status"
              aria-label="Private letter expiration information"
            >
              <FaClock className="text-[#751015] shrink-0 text-base sm:text-lg" />
              <span className="font-serif font-bold tracking-wide">
                Private 24-Hour Link
              </span>
              <span className="text-[#603820]/50 font-bold">·</span>
              <time
                dateTime={letter.expiresAt}
                className="font-serif italic text-[#603820]"
                title={`Expires at: ${expiryInfo.fullFormatted}`}
              >
                Available until {expiryInfo.fullFormatted} ({expiryInfo.timeRemaining})
              </time>
            </div>
          </div>
        </header>

        {/* Centered Parchment Letter Card */}
        <article
          className="shared-parchment-sheet p-6 sm:p-10 md:p-14 lg:p-18"
          aria-label={`Love letter titled ${letter.title} from ${letter.senderName} to ${letter.receiverName}`}
        >
          {/* Subtle Vintage Fountain Pen Accent - Shifted to Top-Right to Avoid Signature Overlap */}
          <img
            src={pen}
            alt="Vintage Fountain Pen"
            className="shared-pen-image"
            aria-hidden="true"
          />

          {/* Top Vintage Letter Title & Flourish */}
          <div className="text-center mb-6 sm:mb-8 pr-12 sm:pr-16 md:pr-0">
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B0908] tracking-tight max-w-xl mx-auto">
              {letter.title}
            </h1>
            <div className="flex items-center justify-center gap-3 mt-3 text-[#C5A059]">
              <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#C5A059]/60 to-[#C5A059]" />
              <span className="text-sm">✦ ❦ ✦</span>
              <span className="h-[1px] w-12 bg-gradient-to-l from-transparent via-[#C5A059]/60 to-[#C5A059]" />
            </div>
          </div>

          {/* Salutation / Dedicated Recipient */}
          <div className="mb-5 sm:mb-6">
            <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#0B0908] tracking-wide">
              Dearest {letter.receiverName},
            </p>
          </div>

          {/* Letter Body - Decreased paragraph spacing, high-contrast crisp vintage ink */}
          <div className="shared-letter-text text-[19px] sm:text-[21px] md:text-[23px] text-[#0B0908] mb-10 sm:mb-12">
            {letterParagraphs.length > 0 ? (
              letterParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
            ) : (
              <p>{letter.content}</p>
            )}
          </div>

          {/* Wax Seal & Handwritten Signature */}
          <footer className="relative flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pt-6 border-t border-[#603820]/15">
            {/* Wax Seal & Inscribed By Note */}
            <div className="flex items-center gap-4">
              <div
                className="shared-wax-seal shrink-0"
                aria-hidden="true"
                title="Sealed with Devotion"
              >
                <FaFeatherAlt className="text-2xl sm:text-3xl text-[#F0E0D0]" />
              </div>
              <div>
                <p className="font-display text-xs sm:text-sm md:text-base uppercase tracking-[0.22em] text-[#751015] font-bold">
                  HeartScript Sealed
                </p>
                <p className="font-serif italic text-sm sm:text-base md:text-lg text-[#603820]">
                  Penned with devotion
                </p>
              </div>
            </div>

            {/* Complimentary Close & Clean Unobstructed Sender Signature */}
            <div className="text-left sm:text-right w-full sm:w-auto">
              <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-[#603820] mb-2">
                Forever yours,
              </p>
              <p className="shared-signature-font text-3xl sm:text-4xl md:text-5xl text-[#0B0908] leading-tight">
                {letter.senderName}
              </p>
            </div>
          </footer>
        </article>

        {/* Subtle Ephemeral Footer Note with Increased Font Size */}
        <p className="mt-6 text-center font-serif italic text-base sm:text-lg md:text-xl text-[#603820]/90 font-semibold print:hidden">
          ✦ For privacy, this digital love letter link will dissolve automatically after 24 hours ✦
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8 print:hidden">
          {/* Clearly Visible Save Letter Button */}
          <button
            type="button"
            onClick={handleSaveLetter}
            disabled={saving}
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-[#4A0B0F] via-[#751015] to-[#4A0B0F] text-[#F0E0D0] border border-[#C5A059]/50 font-display text-xs sm:text-sm tracking-wider uppercase font-semibold shadow-md shadow-[#4A0B0F]/20 hover:scale-105 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C5A059] disabled:opacity-60"
            aria-label="Save love letter keepsake locally on device"
          >
            <FaDownload className="text-sm" />
            {saving ? "Saving Letter..." : "Save Letter"}
          </button>

          {/* Share on WhatsApp Button */}
          {shareUrl && (
            <a
              href={whatsAppShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#128C7E] to-[#25D366] text-white border border-[#25D366]/40 font-display text-xs sm:text-sm tracking-wider uppercase font-semibold shadow-md shadow-[#128C7E]/20 hover:scale-105 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#25D366]"
              aria-label="Share this love letter on WhatsApp"
            >
              <FaWhatsapp className="text-base text-white" />
              Share on WhatsApp
            </a>
          )}

          {/* Send via Email Button */}
          {shareUrl && (
            <button
              type="button"
              onClick={() => setIsEmailModalOpen(true)}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#4A0B0F] via-[#751015] to-[#4A0B0F] text-[#F0E0D0] border border-[#C5A059]/50 font-display text-xs sm:text-sm tracking-wider uppercase font-semibold shadow-md shadow-[#4A0B0F]/20 hover:scale-105 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
              aria-label="Send this love letter via email"
            >
              <FaEnvelope className="text-sm" />
              Send via Email
            </button>
          )}

          <Link
            to="/generate"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FAF4EE] hover:bg-[#E8D9C9] text-[#603820] border border-[#603820]/30 font-display text-xs sm:text-sm tracking-wider uppercase font-semibold shadow-sm transition hover:shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#603820]"
          >
            <FaHeart className="text-xs" />
            Pen Your Own Letter
          </Link>
        </div>

        {shareUrl && isLocalhost && (
          <p className="mt-3 text-center font-serif italic text-xs text-[#603820]/75 print:hidden max-w-lg">
            ✦ Testing on localhost: The shared link will open on this machine. In production, your public domain will allow your recipient to open it on any device.
          </p>
        )}

        {/* Save Status Notification Feedback */}
        {saveNotification && (
          <div
            className={`mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-serif font-medium shadow-md transition-all duration-300 ${
              saveNotification.type === "success"
                ? "bg-[#FAF4EE] border border-[#C5A059]/60 text-[#4A0B0F]"
                : "bg-[#751015]/10 border border-[#751015]/40 text-[#751015]"
            }`}
            role="status"
            aria-live="polite"
          >
            {saveNotification.type === "success" ? (
              <FaCheckCircle className="text-[#C5A059] text-base shrink-0" />
            ) : (
              <FaExclamationTriangle className="text-[#751015] text-base shrink-0" />
            )}
            <span>{saveNotification.message}</span>
          </div>
        )}

        <EmailShareModal
          isOpen={isEmailModalOpen}
          onClose={() => setIsEmailModalOpen(false)}
          shareUrl={shareUrl}
          fallbackToken={token}
        />
      </main>
    </>
  );
}

export default SharedLetter;