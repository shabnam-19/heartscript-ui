import OccasionCard from "./OccasionCard";

const occasions = [
  { icon: "🎂", value: "Birthday" },
  { icon: "💍", value: "Anniversary" },
  { icon: "🥺", value: "Apology" },
  { icon: "🙏", value: "Thank You" },
  { icon: "❤️", value: "Just Because" },
  { icon: "🎉", value: "Congratulations" },
  { icon: "🎓", value: "Graduation" },
  { icon: "🌸", value: "Mother's Day" },
  { icon: "👨", value: "Father's Day" },
  { icon: "🎁", value: "Friendship Day" },
  { icon: "🎄", value: "Christmas" },
  { icon: "✨", value: "Valentine's Day" },
];

function OccasionStep({ formData, setFormData }) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0B0908] tracking-wide">
          What's the occasion?
        </h2>
        <p className="font-serif italic text-lg text-[#603820] mt-3">
          Choose the sentiment or milestone that inspires this letter.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
        {occasions.map((occasion) => (
          <OccasionCard
            key={occasion.value}
            icon={occasion.icon}
            title={occasion.value}
            selected={formData.occasion === occasion.value}
            onClick={() =>
              setFormData({
                ...formData,
                occasion: occasion.value,
              })
            }
          />
        ))}
      </div>
    </div>
  );
}

export default OccasionStep;