function Button({ children, onClick, className = "", type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        px-8
        py-3.5
        rounded-full
        bg-gradient-to-r
        from-[#4A0B0F]
        via-[#751015]
        to-[#4A0B0F]
        text-[#F0E0D0]
        font-display
        text-xs
        md:text-sm
        font-semibold
        tracking-[0.16em]
        uppercase
        border
        border-[#C5A059]/40
        shadow-[0_8px_25px_rgba(74,11,15,0.28)]
        hover:shadow-[0_12px_32px_rgba(74,11,15,0.4)]
        hover:scale-105
        active:scale-95
        transition-all
        duration-300
        cursor-pointer
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;