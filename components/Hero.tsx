import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Play } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <>
      <section className="pt-32 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
        <div className="space-y-8 z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
              Bespoke Short-Form
            </span>
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Content That Compels
            </span>
            <span className="block mt-2 text-white">
              and Converts.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-xl leading-relaxed"
          >
            Elegant, Memorable, Dominant. Result-driven strategies to establish your brand as an unassailable market leader.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <motion.button 
              whileHover={{ scale: 1.05, y: -2, boxShadow: "0 0 20px rgba(59,130,246,0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3.5 rounded-full font-medium shadow-lg"
            >
              Achieve Viral Status
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 rounded-full font-medium text-white border border-white/10 backdrop-blur-sm bg-white/5 transition-colors"
            >
              Explore Our Solutions
            </motion.button>
          </motion.div>
        </div>

        <div className="relative flex justify-center lg:justify-end z-10">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="bg-[#111928]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 w-full max-w-md relative overflow-hidden group hover:border-blue-500/30 transition-colors duration-500 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
          >
            {/* Glow effect behind card */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500 rounded-full blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity duration-700" />
            
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div>
                <p className="text-gray-400 text-sm">Linear Growth</p>
                <h3 className="text-3xl font-bold text-white mt-1 flex items-center">
                  <TrendingUp className="text-green-400 mr-2 h-8 w-8" />
                  145.2k
                </h3>
              </div>
              <div className="bg-white/10 px-3 py-1 rounded-full text-xs text-blue-200 backdrop-blur-md">
                +24% vs last mo
              </div>
            </div>

            <div className="flex items-end justify-between h-40 gap-2 mt-4 relative z-10">
               {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                {[1,2,3,4].map(i => <div key={i} className="w-full h-px bg-white" />)}
              </div>
              
              {/* Animated Chart Line */}
              <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <motion.path 
                  d="M0,130 Q30,120 60,90 T120,70 T180,40 T240,20 T300,10" 
                  fill="none" 
                  stroke="url(#lineGradient)" 
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
                  style={{ filter: "drop-shadow(0px 4px 8px rgba(59, 130, 246, 0.5))" }}
                />
              </svg>

              {/* Bars */}
              {['30%', '45%', '60%', '75%', '90%'].map((height, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height }}
                  transition={{ duration: 1, delay: 1 + (i * 0.1) }}
                  className={`w-8 rounded-t-lg ${i === 4 ? 'bg-gradient-to-t from-blue-500/20 to-blue-500/50 border-t border-blue-400/50 shadow-[0_0_20px_rgba(59,130,246,0.4)]' : 'bg-gradient-to-t from-white/5 to-white/10'}`}
                />
              ))}
            </div>
            
            <div className="flex justify-between text-xs text-gray-500 mt-4 px-1">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Reel Section */}
      <section className="max-w-5xl mx-auto px-6 relative mt-12 mb-32">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-full bg-blue-900/10 blur-[100px] -z-10 rounded-full" />
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-white/5 backdrop-blur-lg p-2 rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl group cursor-pointer overflow-hidden"
        >
          <div className="relative aspect-video rounded-xl md:rounded-2xl overflow-hidden bg-gray-900">
            <img 
              src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
              alt="Video Showcase" 
              className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-500 scale-100 group-hover:scale-105"
            />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-[0_0_30px_rgba(59,130,246,0.4)]"
              >
                <Play className="text-white ml-1 w-8 h-8 fill-current" />
              </motion.div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-left pointer-events-none">
              <span className="inline-block px-3 py-1 bg-blue-600/30 backdrop-blur-md border border-blue-500/30 rounded-full text-xs font-medium text-blue-100 mb-2">
                Showreel 2024
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white">Visual Storytelling Redefined</h3>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;