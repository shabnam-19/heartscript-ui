const relationships = [
  { icon: "❤️", title: "Partner" },
  { icon: "👩", title: "Mother" },
  { icon: "👨", title: "Father" },
  { icon: "👧", title: "Sister" },
  { icon: "👦", title: "Brother" },
  { icon: "👫", title: "Friend" },
];

function RelationshipStep({ formData, setFormData }) {
  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0B0908] mb-3 tracking-wide">
          Who is this letter for?
        </h2>
        <p className="font-serif italic text-lg text-[#603820]">
          Choose the relationship to begin crafting your letter.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {relationships.map((item) => (
          <button
            type="button"
            key={item.title}
            onClick={() =>
              setFormData({
                ...formData,
                relationship: item.title,
              })
            }
            className={`
              rounded-3xl
              p-6
              backdrop-blur-xl
              transition-all
              duration-300
              cursor-pointer
              ${
                formData.relationship === item.title
                  ? "bg-gradient-to-br from-[#4A0B0F] to-[#751015] text-[#F0E0D0] border border-[#C5A059]/50 shadow-lg shadow-[#4A0B0F]/25 scale-105 ring-1 ring-[#C5A059]/40"
                  : "bg-[#FAF4EE]/85 hover:bg-[#FAF4EE] border border-[#603820]/15 text-[#0B0908] hover:border-[#751015]/40 shadow-[0_8px_20px_rgba(74,11,15,0.04)]"
              }
            `}
          >
            <div className="text-4xl md:text-5xl mb-3">{item.icon}</div>
            <h3 className="font-display text-sm md:text-base font-semibold tracking-wider">
              {item.title}
            </h3>
          </button>
        ))}
      </div>
    </div>
  );
}

export default RelationshipStep;