import React from 'react';
import Hero from '../components/home/Hero';
import ImpactStats from '../components/home/ImpactStats';
import ProgrammesSection from '../components/home/ProgrammesSection';
import CampaignSection from '../components/home/CampaignSection';

const Home = () => {
  return (
    <>
      <Hero />
      <ImpactStats />
      <ProgrammesSection />
      <CampaignSection />
    </>
  );
};

export default Home;