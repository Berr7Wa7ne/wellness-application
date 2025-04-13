import React from "react";
import {HeroSection} from "../components/about/HeroSection";
import {AboutText} from "../components/about/AboutText";
import {MissionVision} from "../components/about/MissionVision";
import {ProductPreviewSection} from "../components/about/ProductPreviewSection";
import {CTASection} from "../components/about/CTASection";
import {Newsletter} from "../components/about/Newsletter";
import {Footer} from "../components/layout/Footer";

const About = () => {
  return (
    <>
      <HeroSection />
      <AboutText />
      <MissionVision />
      <ProductPreviewSection />
      <CTASection />
      <Newsletter />
      <Footer />
    </>
  );
};

export default About;
