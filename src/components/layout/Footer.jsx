function Footer() {
  return (
    <footer className="border-t border-[#603820]/15 py-10 px-6 bg-[#E8D9C9]/40 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-2">
        <p className="font-display tracking-[0.3em] uppercase text-xs font-semibold text-[#751015]">
          ✦ HeartScript ✦
        </p>
        <p className="text-[#603820] font-serif italic text-sm">
          Penned with dark gothic romance & vintage editorial elegance.
        </p>
        <p className="text-[#603820]/70 font-serif text-xs mt-2">
          © {new Date().getFullYear()} HeartScript. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;