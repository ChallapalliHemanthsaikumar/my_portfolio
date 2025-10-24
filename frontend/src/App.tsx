import React from 'react';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import OpenSourceSection from './components/OpenSourceSection';
import YouTubeSection from './components/YouTubeSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="App min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <ProjectsSection />
        <OpenSourceSection />
        <YouTubeSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;
