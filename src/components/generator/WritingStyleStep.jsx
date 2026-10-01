import WritingStyleCard from "./WritingStyleCard";

const styles = [
  {
    icon: "❤️",
    title: "Romantic",
    subtitle: "Deep, passionate, and bathed in ardent devotion.",
  },
  {
    icon: "✨",
    title: "Poetic",
    subtitle: "Lyrical prose, elegant metaphors, and artistic beauty.",
  },
  {
    icon: "🥹",
    title: "Emotional",
    subtitle: "Heart-stirring, tender, and deeply vulnerable.",
  },
  {
    icon: "💌",
    title: "Sincere",
    subtitle: "Honest, genuine, and penned straight from the soul.",
  },
  {
    icon: "🌿",
    title: "Gentle",
    subtitle: "Soft, soothing, and wrapped in quiet comfort.",
  },
  {
    icon: "😊",
    title: "Playful",
    subtitle: "Witty, affectionate, and brimming with shared smiles.",
  },
];

function WritingStyleStep({ formData, setFormData }) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0B0908] tracking-wide">
          Choose a writing style
        </h2>
        <p className="font-serif italic text-lg text-[#603820] mt-3">
          Determines the cadence, emotional depth, and literary texture of your letter.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {styles.map((style) => (
          <WritingStyleCard
            key={style.title}
            icon={style.icon}
            title={style.title}
            subtitle={style.subtitle}
            selected={formData.tone === style.title}
            onClick={() =>
              setFormData({
                ...formData,
                tone: style.title,
              })
            }
          />
        ))}
      </div>
    </div>
  );
}

export default WritingStyleStep;