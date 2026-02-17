import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { id: 1, title: "Strategy", active: true },
  { id: 2, title: "Production", active: false },
  { id: 3, title: "Edit", active: false },
  { id: 4, title: "Scale", active: false },
];

const Workflow: React.FC = () => {
  return (
    <section id="process" className="max-w-4xl mx-auto px-6 py-20 scroll-mt-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-2">The Workflow</h2>
      </div>

      <div className="bg-[#111928]/40 backdrop-blur-xl border border-white/10 rounded-full p-4 md:p-6 relative">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-white/10 -translate-y-1/2 hidden md:block">
            <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "25%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center relative z-10 group cursor-pointer"
            >
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm font-bold mb-3 transition-all duration-300 ${
                  step.active 
                    ? 'bg-blue-500 border-transparent text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
                    : 'bg-gray-800 border-white/20 text-gray-400 group-hover:border-blue-500 group-hover:text-blue-400'
                }`}
              >
                {step.id}
              </motion.div>
              <h4 className={`text-sm font-medium transition-colors ${step.active ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                {step.title}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workflow;