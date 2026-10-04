function Footer() {
  return (
    <footer className="border-t border-[#603820]/15 py-10 px-6 bg-[#E8D9C9]/40 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-2.5">
        <p className="font-display tracking-[0.3em] uppercase text-sm sm:text-base md:text-lg font-bold text-[#751015]">
          ✦ HeartScript ✦
        </p>
        <p className="text-[#603820] font-serif italic text-base sm:text-lg md:text-xl">
          Penned with dark gothic romance & vintage editorial elegance.
        </p>
        <p className="text-[#603820]/80 font-serif text-sm sm:text-base mt-2">
          © {new Date().getFullYear()} HeartScript. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;