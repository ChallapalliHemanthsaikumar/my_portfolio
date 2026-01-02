import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Trophy, Timer, Mountain } from 'lucide-react';

interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  velocityY: number;
  onGround: boolean;
}

interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface GameState {
  player: Player;
  platforms: Platform[];
  score: number;
  timeLeft: number;
  gameRunning: boolean;
  gameStarted: boolean;
  gameEnded: boolean;
  cameraY: number;
  highestPlatform: number;
}

const GameSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  const [playerName, setPlayerName] = useState('');
  const [playerEmail, setPlayerEmail] = useState('');
  const [gameState, setGameState] = useState<GameState>({
    player: { x: 480, y: 560, width: 30, height: 30, velocityY: 0, onGround: true },
    platforms: [],
    score: 0,
    timeLeft: 120,
    gameRunning: false,
    gameStarted: false,
    gameEnded: false,
    cameraY: 0,
    highestPlatform: 0
  });

  const keys = useRef<{ [key: string]: boolean }>({});
  const lastKeyPress = useRef<{ [key: string]: number }>({});

  // Game constants
  const CANVAS_WIDTH = 1000; // Increased from 600
  const CANVAS_HEIGHT = 600; // Increased from 400
  const GRAVITY = 0.4;
  const JUMP_FORCE = -12; // Increased jump force
  const MOVE_STEP = 20; // Increased step size for bigger canvas
  const CAMERA_FOLLOW_SPEED = 0.3; // Much faster camera following

  // Create platforms
  const createPlatforms = useCallback((): Platform[] => {
    const platforms: Platform[] = [];
    // Ground platform
    platforms.push({ x: 0, y: CANVAS_HEIGHT - 30, width: CANVAS_WIDTH, height: 30 });
    
    // Initial mountain platforms - bigger and more spaced out
    for (let i = 1; i < 15; i++) {
      platforms.push({
        x: Math.random() * (CANVAS_WIDTH - 150),
        y: CANVAS_HEIGHT - 80 - i * 50,
        width: 120 + Math.random() * 60,
        height: 15
      });
    }
    return platforms;
  }, []);

  // Generate new platforms as player climbs higher
  const generateNewPlatforms = useCallback((currentHighest: number): Platform[] => {
    const newPlatforms: Platform[] = [];
    for (let i = 0; i < 5; i++) {
      newPlatforms.push({
        x: Math.random() * (CANVAS_WIDTH - 150),
        y: currentHighest - 50 - i * 50,
        width: 120 + Math.random() * 60,
        height: 15
      });
    }
    return newPlatforms;
  }, []);

  // Initialize game
  const initGame = useCallback(() => {
    const initialPlatforms = createPlatforms();
    setGameState(prev => ({
      ...prev,
      player: { x: 480, y: 560, width: 30, height: 30, velocityY: 0, onGround: true },
      platforms: initialPlatforms,
      score: 0,
      timeLeft: 120,
      gameRunning: false,
      gameStarted: false,
      gameEnded: false,
      cameraY: 0,
      highestPlatform: Math.min(...initialPlatforms.map(p => p.y))
    }));
  }, [createPlatforms]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default behavior for game keys to stop page scrolling
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'w', 'a', 's', 'd'].includes(e.key)) {
        e.preventDefault();
      }
      
      keys.current[e.key] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      // Prevent default behavior for game keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'w', 'a', 's', 'd'].includes(e.key)) {
        e.preventDefault();
      }
      
      keys.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Game loop
  const gameLoop = useCallback(() => {
    if (!gameState.gameRunning) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setGameState(prev => {
      const newState = { ...prev };
      const player = { ...newState.player };

      // Discrete movement with time-based cooldown
      const currentTime = Date.now();
      const moveCooldown = 150; // milliseconds between moves
      const jumpCooldown = 300; // milliseconds between jumps
      
      // Left movement
      if ((keys.current['ArrowLeft'] || keys.current['a']) && 
          (!lastKeyPress.current['left'] || currentTime - lastKeyPress.current['left'] > moveCooldown)) {
        player.x = Math.max(0, player.x - MOVE_STEP);
        lastKeyPress.current['left'] = currentTime;
        console.log('Moving left to:', player.x);
      }
      
      // Right movement
      if ((keys.current['ArrowRight'] || keys.current['d']) && 
          (!lastKeyPress.current['right'] || currentTime - lastKeyPress.current['right'] > moveCooldown)) {
        player.x = Math.min(CANVAS_WIDTH - player.width, player.x + MOVE_STEP);
        lastKeyPress.current['right'] = currentTime;
        console.log('Moving right to:', player.x);
      }
      
      // Jumping - only when on ground and cooldown passed
      if ((keys.current['ArrowUp'] || keys.current['w'] || keys.current[' ']) && 
          player.onGround && 
          (!lastKeyPress.current['jump'] || currentTime - lastKeyPress.current['jump'] > jumpCooldown)) {
        console.log('Jumping! Player was on ground:', player.onGround, 'VelocityY before:', player.velocityY);
        player.velocityY = JUMP_FORCE;
        player.onGround = false;
        lastKeyPress.current['jump'] = currentTime;
        console.log('VelocityY after jump:', player.velocityY);
      }

      // Apply gravity
      player.velocityY += GRAVITY;
      player.y += player.velocityY;

      // Platform collision detection
      player.onGround = false;
      newState.platforms.forEach(platform => {
        // Check if player is falling onto platform from above
        if (player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height > platform.y &&
            player.y + player.height < platform.y + platform.height + 20 &&
            player.velocityY >= 0) { // Only when falling down
          player.y = platform.y - player.height;
          player.velocityY = 0;
          player.onGround = true;
        }
      });

      // Generate new platforms when player climbs high
      if (player.y < newState.highestPlatform + 200) {
        const newPlatforms = generateNewPlatforms(newState.highestPlatform);
        newState.platforms = [...newState.platforms, ...newPlatforms];
        newState.highestPlatform = Math.min(...newPlatforms.map(p => p.y));
      }

      // Update camera to follow player - more responsive
      const targetCameraY = Math.max(0, player.y - CANVAS_HEIGHT * 0.6);
      
      console.log('Player Y:', player.y, 'Target Camera Y:', targetCameraY, 'Current Camera Y:', newState.cameraY);
      
      // If player is getting too close to top of screen, move camera faster
      if (player.y - newState.cameraY < CANVAS_HEIGHT * 0.3) {
        newState.cameraY = targetCameraY; // Instant camera movement
        console.log('Instant camera movement to:', targetCameraY);
      } else {
        const newCameraY = newState.cameraY + (targetCameraY - newState.cameraY) * CAMERA_FOLLOW_SPEED;
        newState.cameraY = newCameraY;
        console.log('Smooth camera movement to:', newCameraY);
      }

      // Update score based on height climbed
      const heightScore = Math.max(0, Math.floor((CANVAS_HEIGHT - player.y) / 20));
      if (heightScore > newState.score) {
        newState.score = heightScore;
      }

      // Prevent falling through bottom (reset to ground)
      if (player.y > CANVAS_HEIGHT + 100) {
        player.y = CANVAS_HEIGHT - 60;
        player.x = CANVAS_WIDTH / 2;
        player.velocityY = 0;
        player.onGround = true;
        newState.cameraY = 0;
      }

      newState.player = player;
      return newState;
    });

    // Clear canvas
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Save context for camera transform
    ctx.save();
    ctx.translate(0, -gameState.cameraY);

    // Draw mountain background (multiple layers for depth)
    ctx.fillStyle = '#16213e';
    ctx.beginPath();
    ctx.moveTo(0, CANVAS_HEIGHT + gameState.cameraY);
    ctx.lineTo(250, 150 + gameState.cameraY);
    ctx.lineTo(500, 200 + gameState.cameraY);
    ctx.lineTo(750, 120 + gameState.cameraY);
    ctx.lineTo(CANVAS_WIDTH, 180 + gameState.cameraY);
    ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT + gameState.cameraY);
    ctx.closePath();
    ctx.fill();

    // Draw platforms (only visible ones for performance)
    gameState.platforms.forEach(platform => {
      if (platform.y > gameState.cameraY - 50 && platform.y < gameState.cameraY + CANVAS_HEIGHT + 50) {
        // Platform shadow
        ctx.fillStyle = '#2d3748';
        ctx.fillRect(platform.x + 2, platform.y + 2, platform.width, platform.height);
        
        // Main platform
        ctx.fillStyle = '#4a5568';
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        
        // Platform highlight
        ctx.fillStyle = '#68d391';
        ctx.fillRect(platform.x, platform.y, platform.width, 4);
      }
    });

    // Draw player with glow effect
    const playerScreenY = gameState.player.y;
    
    // Make sure player is visible - draw a larger, more visible player
    // Player shadow
    ctx.fillStyle = '#2d1b69';
    ctx.fillRect(gameState.player.x + 2, playerScreenY + 2, gameState.player.width, gameState.player.height);
    
    // Player body - make it bright red and larger
    ctx.fillStyle = '#ff0000'; // Bright red
    ctx.fillRect(gameState.player.x, playerScreenY, gameState.player.width, gameState.player.height);
    
    // Player glow effect
    ctx.shadowColor = '#ff0000';
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#ff4444'; // Lighter red for glow
    ctx.fillRect(gameState.player.x, playerScreenY, gameState.player.width, gameState.player.height);
    ctx.shadowBlur = 0;

    // Debug: Draw player position info
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Arial';
    ctx.fillText(`Player: ${Math.round(gameState.player.x)}, ${Math.round(gameState.player.y)}`, gameState.player.x - 30, playerScreenY - 10);

    // Restore context
    ctx.restore();

    // Draw UI elements (not affected by camera)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(10, 10, 300, 80);
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Arial';
    ctx.fillText(`Height: ${gameState.score}m`, 20, 30);
    ctx.fillText(`Player: ${Math.round(gameState.player.x)}, ${Math.round(gameState.player.y)}`, 20, 50);
    ctx.fillText(`Camera: ${Math.round(gameState.cameraY)}`, 20, 70);
    ctx.fillText(`Target Camera: ${Math.round(Math.max(0, gameState.player.y - CANVAS_HEIGHT * 0.6))}`, 20, 90);

    animationRef.current = requestAnimationFrame(gameLoop);
  }, [gameState.gameRunning, gameState.platforms, gameState.player, gameState.cameraY, gameState.score, generateNewPlatforms, JUMP_FORCE, MOVE_STEP, GRAVITY, CANVAS_WIDTH, CANVAS_HEIGHT, CAMERA_FOLLOW_SPEED]);

  // Start game timer
  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setGameState(prev => {
        if (prev.timeLeft <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          return {
            ...prev,
            timeLeft: 0,
            gameRunning: false,
            gameEnded: true
          };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);
  }, []);

  // Start game
  const startGame = () => {
    if (!playerName.trim() || !playerEmail.trim()) {
      alert('Please enter your name and email!');
      return;
    }

    const initialPlatforms = createPlatforms();
    setGameState(prev => ({
      ...prev,
      platforms: initialPlatforms,
      gameRunning: true,
      gameStarted: true,
      gameEnded: false,
      score: 0,
      timeLeft: 120,
      cameraY: 0,
      highestPlatform: Math.min(...initialPlatforms.map(p => p.y))
    }));

    startTimer();
  };

  // Reset game
  const resetGame = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    initGame();
  };

  // Start game loop when game starts
  useEffect(() => {
    if (gameState.gameRunning) {
      gameLoop();
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameState.gameRunning, gameLoop]);

  // Initialize on mount
  useEffect(() => {
    initGame();
  }, [initGame]);

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="game" className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Mountain className="text-green-400" />
            Mountain Climb Challenge
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Test your climbing skills! Reach as high as possible in 2 minutes. Use arrow keys or WASD to move and jump.
          </p>
        </motion.div>

        <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl">
          {!gameState.gameStarted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-4 max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:border-green-400 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={playerEmail}
                  onChange={(e) => setPlayerEmail(e.target.value)}
                  className="px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:border-green-400 focus:outline-none"
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 mx-auto"
              >
                <Play size={20} />
                Start Climbing!
              </motion.button>
              
              <div className="text-gray-400 text-sm space-y-1">
                <p><strong>Controls:</strong></p>
                <p>• A/D or ← → : Move left/right (tap for each step)</p>
                <p>• W or ↑ or Space : Jump (tap to jump)</p>
                <p>• Climb higher to increase your score!</p>
                <p>• Camera follows you as you climb up</p>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {/* Game Stats */}
              <div className="flex justify-between items-center text-white">
                <div className="flex items-center gap-2">
                  <Timer className="text-yellow-400" />
                  <span className="text-xl font-bold">
                    Time: {formatTime(gameState.timeLeft)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="text-green-400" />
                  <span className="text-xl font-bold">
                    Score: {gameState.score}
                  </span>
                </div>
              </div>

              {/* Game Canvas */}
              <div className="flex justify-center">
                <canvas
                  ref={canvasRef}
                  width={CANVAS_WIDTH}
                  height={CANVAS_HEIGHT}
                  className="border-2 border-gray-600 rounded-lg shadow-lg max-w-full"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>

              {/* Game End Modal */}
              {gameState.gameEnded && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                >
                  <div className="bg-gray-800 p-8 rounded-2xl text-center space-y-4 max-w-md mx-4">
                    <Trophy className="text-yellow-400 mx-auto" size={48} />
                    <h3 className="text-2xl font-bold text-white">Time's Up!</h3>
                    <p className="text-gray-300">
                      Great job, {playerName}! You reached a height of <span className="text-green-400 font-bold">{gameState.score}</span> points!
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={resetGame}
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg flex items-center gap-2 mx-auto"
                    >
                      <RotateCcw size={20} />
                      Play Again
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Reset Button */}
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetGame}
                  className="px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2 mx-auto"
                >
                  <RotateCcw size={18} />
                  Reset Game
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GameSection;