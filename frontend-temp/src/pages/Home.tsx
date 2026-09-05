import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCards from "../components/FeatureCards";

export default function Home() {
  return (
    <div className="bg-slate-950 text-white min-h-screen">
      <Navbar />
      <Hero />
      <FeatureCards />
    </div>
  );
}