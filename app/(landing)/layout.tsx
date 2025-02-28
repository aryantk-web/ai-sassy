import FAQs from "@/components/FAQs";
import Features from "@/components/features";

import { GlowingEffectDemoSecond } from "@/components/GlowingEffectDemoSecond";
import { Footer } from "@/components/footer";
import { LandingHero } from "@/components/landing-hero";
import { LandingNavbar } from "@/components/landing-navbar";
import Pricing from "@/components/pricing";

const LandingPage = () => {
  // Here wrong setting 
  return (
    <div id="startPage" className="bg-black overflow-x-hidden pt-[72px]">
      {/* Navbar at the top */}
      <LandingNavbar />

        {/* Landing Hero Section */}
        <LandingHero />

        {/* Other Sections */}
        {/* <Features /> */}

        {/* Updated GlowingEffectDemoSecond Container */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <GlowingEffectDemoSecond />
        </div>

        <Pricing />
        <FAQs />

        {/* Footer at the bottom */}
        <Footer />
    </div>
  );
};

export default LandingPage;
