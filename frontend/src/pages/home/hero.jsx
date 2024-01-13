import React from 'react';

import Image from "/Users/lokeshnagasaidarla/Developer/WebDev/Backend/Unknown/frontend/src/assets/background.png";

const HeroSection = () => {
  return (
    <section className="h-screen flex content-center items-center" style={{ background: `url(${Image})` }}>
      {/* ... rest of your component */}
    </section>
  );
};

export default HeroSection;
