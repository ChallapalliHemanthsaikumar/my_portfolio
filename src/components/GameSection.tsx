import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink, Trophy, Mountain, Gamepad2, X } from 'lucide-react';

const GameSection: React.FC = () => {
  const [showGame, setShowGame] = useState(false);

  const openGameInNewTab = () => {
    window.open('https://game.neuralbuilds.com', '_blank');
  };

  const playGameHere = () => {
    setShowGame(true);
  };

  const closeGame = () => {
    setShowGame(false);
  };

  // Handle ESC key to close game
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showGame) {
        closeGame();
      }
    };

    if (showGame) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when game is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [showGame]);

  return (
    <section id="game" className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Gamepad2 className="text-purple-400" />
            My Games
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Check out the games I've developed! Click to play and experience interactive entertainment.
          </p>
        </motion.div>

        <div className="grid gap-8">
          {/* Mountain Climber Game Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-800 rounded-2xl p-8 shadow-2xl"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Game Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Mountain className="text-green-400" size={32} />
                  <h3 className="text-3xl font-bold text-white">Mountain Climber</h3>
                </div>
                
                <p className="text-gray-300 text-lg leading-relaxed">
                  An exciting 2D platformer where you climb as high as possible! Navigate through challenging platforms, 
                  avoid obstacles, and reach new heights in this thrilling mountain climbing adventure.
                </p>

                <div className="space-y-3">
                  <h4 className="text-xl font-semibold text-white">Game Features:</h4>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-center gap-2">
                      <Trophy className="text-yellow-400" size={16} />
                      Score-based climbing system
                    </li>
                    <li className="flex items-center gap-2">
                      <Mountain className="text-green-400" size={16} />
                      Dynamic platform generation
                    </li>
                    <li className="flex items-center gap-2">
                      <Gamepad2 className="text-purple-400" size={16} />
                      Smooth controls and physics
                    </li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={playGameHere}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                  >
                    <Play size={20} />
                    Play Here
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openGameInNewTab}
                    className="px-6 py-4 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                  >
                    <ExternalLink size={18} />
                    Open in New Tab
                  </motion.button>
                </div>
              </div>

              {/* Game Preview/Screenshot */}
              <div className="relative">
                <div className="bg-gray-700 rounded-lg p-4 aspect-video flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Mountain className="text-green-400 mx-auto" size={64} />
                    <div className="text-white">
                      <h4 className="text-xl font-semibold mb-2">Mountain Climber</h4>
                      <p className="text-gray-400">Play directly here or open in a new tab for the full experience!</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent rounded-lg pointer-events-none" />
              </div>
            </div>

            {/* Technical Details */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Technical Details</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-700 rounded-lg p-3">
                  <h5 className="font-semibold text-green-400 mb-1">Platform</h5>
                  <p className="text-gray-300">Web Browser (Vercel)</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-3">
                  <h5 className="font-semibold text-blue-400 mb-1">Engine</h5>
                  <p className="text-gray-300">Custom JavaScript</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-3">
                  <h5 className="font-semibold text-purple-400 mb-1">Genre</h5>
                  <p className="text-gray-300">2D Platformer</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Future Games Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 rounded-2xl p-8 border-2 border-dashed border-gray-600"
          >
            <div className="text-center space-y-4">
              <Gamepad2 className="text-gray-500 mx-auto" size={48} />
              <h3 className="text-2xl font-bold text-gray-400">More Games Coming Soon!</h3>
              <p className="text-gray-500">
                I'm constantly working on new game projects. Stay tuned for more exciting releases!
              </p>
            </div>
          </motion.div>
        </div>

        {/* Game Modal */}
        {showGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          >
            <div className="relative w-full max-w-6xl">
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeGame}
                className="absolute -top-12 right-0 text-white hover:text-red-400 transition-colors z-10"
              >
                <X size={32} />
              </motion.button>
              
              {/* Game Container */}
              <div className="bg-black rounded-lg overflow-hidden shadow-2xl">
                <iframe
                  src="/game/index.html"
                  width="100%"
                  height="600"
                  frameBorder="0"
                  className="w-full"
                  title="Mountain Climber Game"
                  style={{ minHeight: '600px' }}
                />
              </div>
              
              {/* Game Info */}
              <div className="text-center mt-4 text-white">
                <p className="text-sm opacity-75">
                  Press ESC or click the X to close • Use WASD or Arrow Keys to play
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default GameSection;