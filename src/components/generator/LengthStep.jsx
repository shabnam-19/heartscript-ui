import LengthCard from "./LengthCard";

const options = [
  {
    icon: "✨",
    title: "Short",
    subtitle: "A brief, poetic spark of intense emotion.",
    preview: 3,
  },
  {
    icon: "💌",
    title: "Medium",
    subtitle: "Harmoniously balanced with poignant memories and devotion.",
    preview: 6,
  },
  {
    icon: "📜",
    title: "Long",
    subtitle: "An intimate, sprawling parchment epic of devotion.",
    preview: 9,
  },
];

function LengthStep({ formData, setFormData }) {
  return (
    <div className="space-y-10">
      <div className="text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0B0908] tracking-wide">
          How long should your letter be?
        </h2>
        <p className="font-serif italic text-lg text-[#603820] mt-3">
          Select the depth of narrative you desire for this keepsake.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {options.map((option) => (
          <LengthCard
            key={option.title}
            icon={option.icon}
            title={option.title}
            subtitle={option.subtitle}
            previewLines={option.preview}
            selected={formData.length === option.title}
            onClick={() =>
              setFormData({
                ...formData,
                length: option.title,
              })
            }
          />
        ))}
      </div>
    </div>
  );
}

export default LengthStep;