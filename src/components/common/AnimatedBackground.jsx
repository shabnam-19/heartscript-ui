function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#F0E0D0]">
      {/* Antique parchment paper warmth gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#F5EBE0] via-[#F0E0D0] to-[#E8D9C9] opacity-95"
      />

      {/* Dark oxblood atmospheric aura */}
      <div
        className="
        absolute
        top-[-120px]
        left-[-80px]
        w-[520px]
        h-[520px]
        rounded-full
        bg-[#4A0B0F]/12
        blur-[130px]
        animate-pulse
        "
        style={{ animationDuration: "8s" }}
      />

      {/* Primary burgundy moody glow */}
      <div
        className="
        absolute
        bottom-[-120px]
        right-[-80px]
        w-[550px]
        h-[550px]
        rounded-full
        bg-[#751015]/12
        blur-[140px]
        animate-pulse
        "
        style={{ animationDuration: "10s" }}
      />

      {/* Subtle dusty rose romantic mist */}
      <div
        className="
        absolute
        top-[35%]
        left-[40%]
        w-[360px]
        h-[360px]
        rounded-full
        bg-[#9E5D64]/10
        blur-[110px]
        "
      />

      {/* Antique champagne-gold candlelight hint */}
      <div
        className="
        absolute
        top-[15%]
        right-[20%]
        w-[300px]
        h-[300px]
        rounded-full
        bg-[#C5A059]/10
        blur-[100px]
        "
      />

      {/* Dark romantic vignette edges */}
      <div
        className="
        absolute
        inset-0
        pointer-events-none
        bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(74,11,15,0.07)_100%)]
        "
      />

      {/* Delicate vintage paper grain texture */}
      <div
        className="
        absolute
        inset-0
        pointer-events-none
        opacity-[0.035]
        bg-[radial-gradient(#4A0B0F_1px,transparent_1px)]
        [background-size:16px_16px]
        "
      />
    </div>
  );
}

export default AnimatedBackground;