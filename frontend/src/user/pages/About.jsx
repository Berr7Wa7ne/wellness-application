import React from "react";
import {HeroSection} from "../components/about/HeroSection";
import {AboutText} from "../components/about/AboutText";
import {MissionVision} from "../components/about/MissionVision";
import {ProductPreviewSection} from "../components/about/ProductPreviewSection";
import {CTASection} from "../components/about/CTASection";
import {Newsletter} from "../components/shared/Newsletter";
import {Footer} from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

const About = () => {
  return (
    <>
    <HeroSection>
      <Navbar />
    </HeroSection>
      <div className="md:mx-12">
      <AboutText />
      <MissionVision />
      <ProductPreviewSection />
      </div>
      <CTASection />
      <Newsletter />
      <Footer />
    </>
  );
};

export default About;
