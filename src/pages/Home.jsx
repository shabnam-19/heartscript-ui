import AnimatedBackground from "../components/common/AnimatedBackground";
import Hero from "../components/hero/Hero";
import ProcessSection from "../components/process/ProcessSection";

function Home() {
  return (
    <div className="relative overflow-hidden">
      <AnimatedBackground />
      <Hero />
      <ProcessSection />
    </div>
  );
}

export default Home;