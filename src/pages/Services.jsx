// pages/Services.jsx
import React from 'react';
import { Newsletter } from '../components/shared/Newsletter';
import { Footer } from '../components/layout/Footer';
import { ServicesHero } from '../components/services/ServicesHero';
import { ServicesGrid } from '../components/services/ServicesGrid';
import Navbar from '../components/layout/Navbar';

const Services = () => {
  return (
    <div>
    <ServicesHero>
      <Navbar />
    </ServicesHero>
      <ServicesGrid />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Services;
