import { useState, useEffect, useRef } from "react";
import {
  FaTimes,
  FaEnvelope,
  FaSpinner,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import {
  sendLetterByEmail,
  extractShareToken,
} from "../../services/LetterService";

function EmailShareModalContent({ onClose, shareUrl, fallbackToken }) {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null); // null | "success" | "error"
  const [statusMessage, setStatusMessage] = useState("");

  const inputRef = useRef(null);
  const timerRef = useRef(null);

  // Focus input on mount
  useEffect(() => {
    const focusTimer = setTimeout(() => {
      inputRef.current?.focus();
    }, 60);

    return () => {
      clearTimeout(focusTimer);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && !isLoading) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLoading, onClose]);

  const handleClose = () => {
    if (isLoading) return;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    onClose();
  };

  const validateEmail = (email) => {
    const trimmed = email.trim();
    if (!trimmed) {
      setValidationError("Please enter recipient's email address.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setValidationError(
        "Please enter a valid email address (e.g. name@example.com)."
      );
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setStatus(null);
    setStatusMessage("");

    if (!validateEmail(recipientEmail)) {
      return;
    }

    const token = extractShareToken(shareUrl) || fallbackToken;
    if (!token) {
      setStatus("error");
      setStatusMessage("We couldn't send the email right now. Please try again.");
      return;
    }

    setIsLoading(true);

    try {
      await sendLetterByEmail(token, recipientEmail);
      setStatus("success");
      setStatusMessage("Love letter sent successfully! 💌");
      setRecipientEmail("");
      setValidationError("");

      // Automatically close after a short delay (2.5 seconds)
      timerRef.current = setTimeout(() => {
        onClose();
      }, 2500);
    } catch (err) {
      console.error(
        "Failed to send letter email:",
        err?.response?.status || err?.message
      );
      setStatus("error");
      // Do NOT expose backend stack traces or technical details
      setStatusMessage(
        "We couldn't send the email right now. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs print:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="email-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoading) {
          handleClose();
        }
      }}
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-[#FAF4EE] border border-[#C5A059]/40 shadow-2xl p-6 sm:p-8 overflow-hidden text-[#0B0908]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          disabled={isLoading}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-2 text-[#603820]/60 hover:text-[#751015] transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <FaTimes className="text-base" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <p className="font-display text-[#751015] tracking-[0.25em] uppercase text-[11px] font-semibold mb-1">
            ✦ Sealed Keepsake ✦
          </p>
          <h2
            id="email-modal-title"
            className="font-display text-2xl sm:text-3xl font-bold text-[#0B0908]"
          >
            Send this love letter 💌
          </h2>
          <p className="font-serif italic text-sm text-[#603820] mt-1.5">
            Deliver this handwritten keepsake directly to their personal inbox.
          </p>
        </div>

        {status === "success" ? (
          <div className="py-4 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#751015]/10 text-[#751015] mb-4">
              <FaCheckCircle className="text-3xl text-[#C5A059]" />
            </div>
            <p className="font-display text-lg font-bold text-[#0B0908] mb-1">
              Love letter sent successfully! 💌
            </p>
            <p className="font-serif italic text-sm text-[#603820] mb-6">
              Your heartfelt letter is on its way to their inbox.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="px-8 py-2.5 rounded-full bg-gradient-to-r from-[#4A0B0F] via-[#751015] to-[#4A0B0F] text-[#F0E0D0] border border-[#C5A059]/40 font-display text-xs uppercase tracking-wider font-semibold shadow-md hover:scale-105 transition cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label
                htmlFor="recipient-email-input"
                className="block font-display text-xs tracking-wider uppercase font-semibold text-[#603820] mb-2"
              >
                Recipient&apos;s Email
              </label>
              <input
                ref={inputRef}
                id="recipient-email-input"
                type="email"
                value={recipientEmail}
                onChange={(e) => {
                  setRecipientEmail(e.target.value);
                  if (validationError) setValidationError("");
                  if (status === "error") {
                    setStatus(null);
                    setStatusMessage("");
                  }
                }}
                placeholder="Enter recipient's email"
                disabled={isLoading}
                autoComplete="email"
                className={`w-full px-4 py-3 rounded-xl bg-[#F0E0D0]/40 text-[#0B0908] placeholder:text-[#603820]/50 font-serif text-base focus:outline-none transition ${
                  validationError
                    ? "border-2 border-[#751015] focus:ring-1 focus:ring-[#751015]"
                    : "border border-[#603820]/30 focus:border-[#751015] focus:ring-1 focus:ring-[#751015]"
                } disabled:opacity-60 disabled:cursor-not-allowed`}
              />

              {validationError && (
                <p className="mt-2 text-xs font-serif text-[#751015] flex items-center gap-1.5">
                  <FaExclamationTriangle className="shrink-0 text-xs" />
                  <span>{validationError}</span>
                </p>
              )}
            </div>

            {status === "error" && (
              <div
                className="mb-4 p-3 rounded-xl bg-[#751015]/10 border border-[#751015]/30 text-[#751015] text-xs sm:text-sm font-serif flex items-center gap-2"
                role="alert"
              >
                <FaExclamationTriangle className="shrink-0 text-sm" />
                <span>{statusMessage}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={handleClose}
                disabled={isLoading}
                className="px-5 py-2.5 rounded-full bg-[#FAF4EE] hover:bg-[#E8D9C9] text-[#603820] border border-[#603820]/30 font-display text-xs uppercase tracking-wider font-semibold transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#4A0B0F] via-[#751015] to-[#4A0B0F] text-[#F0E0D0] border border-[#C5A059]/40 font-display text-xs uppercase tracking-wider font-semibold shadow-md shadow-[#4A0B0F]/20 hover:scale-105 active:scale-95 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin text-sm" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <FaEnvelope className="text-sm" />
                    <span>Send Email</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Development Notice */}
        <p className="mt-5 text-center font-serif italic text-xs text-[#603820]/75">
          ✦ Email sharing is currently available in development mode.
        </p>
      </div>
    </div>
  );
}

function EmailShareModal({ isOpen, onClose, shareUrl = "", fallbackToken = "" }) {
  if (!isOpen) return null;

  return (
    <EmailShareModalContent
      onClose={onClose}
      shareUrl={shareUrl}
      fallbackToken={fallbackToken}
    />
  );
}

export default EmailShareModal;
