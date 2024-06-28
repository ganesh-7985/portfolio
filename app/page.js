'use client';
import React, { useState, useEffect } from 'react';
import WaterDropGrid from './_components/WaterDropGrid';
import ContactForm from './_components/ContactForm';
import Navbar from './_components/Header/Navbar';
import ThisCantBeReached from './_components/ThisCantBeReached';
import Startup from './_components/Header/Startup';

function HomePage() {
  const [showThisCantBeReached, setShowThisCantBeReached] = useState(true);
  const [showStartup, setShowStartup] = useState(false);
  const [finishedLoading, setFinishedLoading] = useState(false);

  useEffect(() => {
    const firstTimeout = setTimeout(() => {
      setShowThisCantBeReached(false);
      setShowStartup(true);
    }, 4000);

    const secondTimeout = setTimeout(() => {
      setShowStartup(false);
      setFinishedLoading(true);
    }, 7000); 
    return () => {
      clearTimeout(firstTimeout);
      clearTimeout(secondTimeout);
    };
  }, []);

  return (
    <div className=' overflow-x-hidden bg-slate-950'>
      {showThisCantBeReached && <ThisCantBeReached />}
      {showStartup && <Startup />}
      {finishedLoading && (
        <>
          <Navbar finishedLoading={finishedLoading} />
          <WaterDropGrid />
          <ContactForm />
        </>
      )}
    </div>
  );
}

export default HomePage;