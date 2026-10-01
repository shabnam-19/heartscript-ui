import { Link, NavLink } from "react-router-dom";
import { FaHeart, FaPenNib } from "react-icons/fa";

function Navbar() {
  const navLinkStyle = ({ isActive }) =>
    `font-display text-xs md:text-sm tracking-widest uppercase transition-all duration-200 ${
      isActive
        ? "text-[#751015] font-bold border-b-2 border-[#751015] pb-1"
        : "text-[#603820] hover:text-[#751015] font-medium"
    }`;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#F0E0D0]/90 border-b border-[#603820]/15 shadow-[0_4px_25px_rgba(74,11,15,0.04)]">
      <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <FaHeart className="text-[#751015] text-xl group-hover:scale-110 group-hover:text-[#4A0B0F] transition-all duration-300" />
          <span className="font-display text-xl md:text-2xl font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-[#0B0908] via-[#751015] to-[#4A0B0F] bg-clip-text text-transparent">
            HeartScript
          </span>
        </Link>

        <nav className="flex items-center gap-7">
          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>
          <NavLink to="/letters" className={navLinkStyle}>
            All Letters
          </NavLink>
          <Link
            to="/generate"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#4A0B0F] via-[#751015] to-[#4A0B0F] text-[#F0E0D0] font-display text-xs md:text-sm font-semibold tracking-wider border border-[#C5A059]/40 shadow-md shadow-[#4A0B0F]/20 hover:shadow-lg hover:shadow-[#4A0B0F]/30 hover:scale-105 transition-all duration-300"
          >
            <FaPenNib className="text-xs text-[#C5A059]" />
            <span>Write Letter</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;