function ProgressBar({ currentStep }) {
  const totalSteps = 7;
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-10">
      <div className="flex justify-between font-display text-xs md:text-sm tracking-widest uppercase mb-2.5">
        <span className="text-[#603820] font-semibold">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-[#751015] font-bold">
          {Math.round(percentage)}%
        </span>
      </div>

      <div className="h-2 rounded-full bg-[#603820]/15 overflow-hidden border border-[#603820]/10">
        <div
          className="h-full bg-gradient-to-r from-[#4A0B0F] via-[#751015] to-[#C5A059] transition-all duration-500 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;