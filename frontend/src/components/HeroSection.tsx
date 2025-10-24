import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Play, MapPin, Mail, Phone, Download } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const HeroSection: React.FC = () => {
  const [videoPlaying, setVideoPlaying] = useState(false);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-gentle"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-gentle" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-20 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-gentle" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-secondary-900 mb-6"
            >
              Hi, I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">
                {personalInfo.name.split(' ')[0]}
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-secondary-600 mb-6"
            >
              {personalInfo.title}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8 text-secondary-600"
            >
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>{personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>{personalInfo.phone}</span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-lg text-secondary-700 mb-8 leading-relaxed"
            >
              {personalInfo.summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={scrollToProjects}
                className="btn-primary"
              >
                View My Work
              </button>
              <a
                href="https://drive.google.com/file/d/1WvCFcCc4A7CbU_eLu84gEGe0boob2gw8/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white text-primary-600 border-2 border-primary-600 hover:bg-primary-50 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                <Download size={18} />
                Download Resume
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column - Video Introduction */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
                {personalInfo.introVideoUrl ? (
                  // If video URL is provided
                  <div className="w-full h-full relative">
                    {!videoPlaying ? (
                      <div className="relative w-full h-full">
                        <img 
                          src="/videos/intro_image.png" 
                          alt="Video Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                          <motion.button
                            onClick={() => setVideoPlaying(true)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg"
                          >
                            <Play size={32} className="text-primary-600 ml-1" />
                          </motion.button>
                        </div>
                      </div>
                    ) : (
                      <video
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                        src={personalInfo.introVideoUrl}
                      />
                    )}
                  </div>
                ) : (
                  // Placeholder for video
                  <div className="w-full h-full bg-gradient-to-br from-primary-100 to-purple-100 flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-4 mx-auto"
                      >
                        <Play size={32} className="text-primary-600 ml-1" />
                      </motion.div>
                      <p className="text-secondary-700 font-medium">Coming Soon!</p>
                      <p className="text-secondary-500 text-sm mt-2">Video introduction</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Floating Elements */}
              {/* <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white p-3 rounded-xl shadow-lg"
              > */}
                
              {/* </motion.div> */}
              
              {/* <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                className="absolute -bottom-4 -left-4 bg-white p-3 rounded-xl shadow-lg"
              >
                
              </motion.div> */}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToProjects}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-secondary-600 hover:text-primary-600 transition-colors duration-200"
          >
            <ChevronDown size={32} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;