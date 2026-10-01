import HeroText from "./HeroText";
import HeroButtons from "./HeroButtons";

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">

        <div className="text-center">

          <HeroText />

          <div className="mt-10">
            <HeroButtons />
          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;