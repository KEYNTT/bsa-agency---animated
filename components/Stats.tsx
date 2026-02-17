import React from 'react';
import { motion } from 'framer-motion';
import { Check, Eye, TrendingUp, Zap } from 'lucide-react';

const Stats: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-[#111928]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center shadow-2xl"
      >
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Precision Execution</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Conquering algorithms requires an obsessive eye for detail. We leverage data-driven strategies for maximum reach and engagement.
          </p>
          <ul className="space-y-3">
            {[
              "Precision content ideation",
              "Elite precision execution",
              "Editing process evolution",
              "Bi-weekly publishing frequency",
              "Campaign and audience retargeting"
            ].map((item, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                viewport={{ once: true }}
                className="flex items-center text-sm text-gray-300"
              >
                <Check className="text-blue-400 mr-2 w-4 h-4" />
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white mb-6">Campaign Results</h3>
          <div className="grid grid-cols-3 gap-4">
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white/5 rounded-2xl p-4 text-center border border-white/5 hover:border-white/20 transition-colors"
            >
              <div className="w-10 h-10 mx-auto rounded-full bg-blue-900/50 flex items-center justify-center mb-2">
                <Eye className="text-blue-400 w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-white">45s</div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500 mt-1">Retention Rate</div>
            </motion.div>

            <motion.div 
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              className="bg-gradient-to-b from-blue-900/40 to-white/5 rounded-2xl p-4 text-center border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.15)] transform scale-105 z-10"
            >
              <div className="w-10 h-10 mx-auto rounded-full bg-blue-500 flex items-center justify-center mb-2 shadow-lg shadow-blue-500/50">
                <TrendingUp className="text-white w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-white">12%</div>
              <div className="text-[10px] uppercase tracking-wider text-blue-200 mt-1">Click-Through Rate</div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white/5 rounded-2xl p-4 text-center border border-white/5 hover:border-white/20 transition-colors"
            >
              <div className="w-10 h-10 mx-auto rounded-full bg-blue-900/50 flex items-center justify-center mb-2">
                <Zap className="text-blue-400 w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-white">Daily</div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500 mt-1">Publishing Frequency</div>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Stats;