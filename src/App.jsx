import React from 'react';
import HeroSection from './components/HeroSection.jsx';
import IntegrationsSection from './components/IntegrationsSection.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] text-slate-900 font-inter">
      <HeroSection />
      <IntegrationsSection />
    </div>
  );
}
