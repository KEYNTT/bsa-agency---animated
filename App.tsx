import React from 'react';
import Navbar from './components/Navbar';
import Background from './components/Background';
import Hero from './components/Hero';
import Services from './components/Services';
import Workflow from './components/Workflow';
import SelectedWork from './components/SelectedWork';
import Stats from './components/Stats';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-white bg-background selection:bg-primary selection:text-white">
      <Background />
      <Navbar />
      
      <main className="relative z-10 space-y-32 pb-20">
        <Hero />
        <Services />
        <Workflow />
        <SelectedWork />
        <Stats />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;