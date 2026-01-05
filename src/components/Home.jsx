import React from 'react';
import Hero from './Hero';
import EventsShowcase from './EventsShowcase';
import Sponsors from './Sponsors';


const Home = () => {
  return (
    <div className="relative">
      {/* WHAT WE OFFER section */}
      <Hero showPosterPresentation={true} />

      {/* Events section */}
      <EventsShowcase />

      {/* Sponsors */}
      <Sponsors />
    </div>
  );
};

export default Home;
