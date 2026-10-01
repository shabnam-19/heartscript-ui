import { Link } from "react-router-dom";
import Button from "../common/Button";

function HeroButtons() {
  return (
    <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
      <Link to="/generate">
        <Button>
          ✒️ Pen Your Letter
        </Button>
      </Link>

      <Link
        to="/letters"
        className="px-8 py-3 rounded-full bg-[#FAF4EE]/80 hover:bg-[#FAF4EE] text-[#4A0B0F] font-display text-sm tracking-widest uppercase font-semibold border border-[#603820]/30 shadow-sm hover:shadow-md hover:border-[#751015]/40 transition-all duration-300"
      >
        Letter Archive →
      </Link>
    </div>
  );
}

export default HeroButtons;