import { motion } from "framer-motion";
import { FaPen, FaSignature } from "react-icons/fa";
import SignatureChip from "./SignatureChip";

const signatures = [
  "Forever Yours,",
  "With Endless Devotion,",
  "Yours in All Lifetimes,",
  "With All My Heart,",
  "Love Always,",
  "Faithfully Yours,",
  "With Warmest Affection,",
  "Sincerely,",
];

function SenderStep({ formData, setFormData }) {
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0B0908] tracking-wide">
          ✍ The Author
        </h2>
        <p className="font-serif italic text-lg text-[#603820] mt-3">
          How shall your devotion be inscribed upon the closing seal?
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-2.5 mb-2.5">
            <FaPen className="text-[#751015] text-sm" />
            <h3 className="font-display text-sm md:text-base font-semibold tracking-wide text-[#0B0908]">
              Your Name
            </h3>
          </div>

          <input
            name="senderName"
            value={formData.senderName}
            onChange={handleChange}
            placeholder="e.g. Sebastian"
            className="
              w-full
              rounded-2xl
              bg-[#FAF4EE]
              border
              border-[#603820]/25
              px-5
              py-4
              text-[#0B0908]
              placeholder:text-[#603820]/45
              font-serif
              text-lg
              focus:border-[#751015]
              focus:ring-1
              focus:ring-[#751015]
              outline-none
              shadow-sm
              transition
            "
          />
        </div>

        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <FaSignature className="text-[#751015] text-base" />
            <h3 className="font-display text-sm md:text-base font-semibold tracking-wide text-[#0B0908]">
              Valediction / Signature Style
            </h3>
          </div>

          <div className="flex flex-wrap gap-3">
            {signatures.map((signature) => (
              <SignatureChip
                key={signature}
                title={signature}
                selected={formData.signatureStyle === signature}
                onClick={() =>
                  setFormData({
                    ...formData,
                    signatureStyle: signature,
                  })
                }
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SenderStep;