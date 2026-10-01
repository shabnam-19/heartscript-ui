import { motion } from "framer-motion";
import { FaUser, FaHeart } from "react-icons/fa";

function RecipientStep({ formData, setFormData }) {
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
          💌 The Recipient
        </h2>
        <p className="font-serif italic text-lg text-[#603820] mt-3">
          Whom shall this parchment be inscribed to?
        </p>
      </div>

      <div className="space-y-7">
        <InputCard
          icon={<FaUser />}
          title="Recipient's Name"
          placeholder="e.g. Julianna"
          name="recipientName"
          value={formData.recipientName}
          onChange={handleChange}
        />

        <InputCard
          icon={<FaHeart />}
          title="Affectionate Nickname or Pet Name (Optional)"
          placeholder="e.g. My Dark Rose, Beloved, Angel"
          name="recipientNickname"
          value={formData.recipientNickname || ""}
          onChange={handleChange}
        />
      </div>
    </motion.div>
  );
}

function InputCard({
  icon,
  title,
  placeholder,
  name,
  value,
  onChange,
}) {
  return (
    <div>
      <div className="flex items-center gap-2.5 mb-2.5">
        <div className="text-[#751015] text-base">{icon}</div>
        <h3 className="font-display text-sm md:text-base font-semibold tracking-wide text-[#0B0908]">
          {title}
        </h3>
      </div>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          rounded-2xl
          border
          border-[#603820]/25
          bg-[#FAF4EE]
          px-5
          py-4
          text-[#0B0908]
          placeholder:text-[#603820]/45
          font-serif
          text-lg
          outline-none
          focus:border-[#751015]
          focus:ring-1
          focus:ring-[#751015]
          shadow-sm
          transition
        "
      />
    </div>
  );
}

export default RecipientStep;