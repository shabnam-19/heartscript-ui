import { motion } from "framer-motion";

function MemoriesStep({ formData, setFormData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="max-w-3xl mx-auto"
    >
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0B0908] tracking-wide">
          ✦ Cherished Memories
        </h2>
        <p className="font-serif italic text-lg text-[#603820] mt-3">
          The secret whispers, shared glances, and quiet moments that belong only to you two.
        </p>
      </div>

      <textarea
        value={formData.memories}
        onChange={(e) =>
          setFormData({
            ...formData,
            memories: e.target.value,
          })
        }
        rows={8}
        placeholder="Recount the moments that linger in your heart — the rainy midnight walks, how they laugh when caught off guard, or the promises whispered in the dark..."
        className="
          w-full
          rounded-3xl
          bg-[#FAF4EE]
          border
          border-[#603820]/25
          p-6
          text-[#0B0908]
          placeholder:text-[#603820]/45
          font-serif
          text-lg
          leading-relaxed
          outline-none
          resize-none
          focus:border-[#751015]
          focus:ring-1
          focus:ring-[#751015]
          shadow-sm
          transition
        "
      />
    </motion.div>
  );
}

export default MemoriesStep;