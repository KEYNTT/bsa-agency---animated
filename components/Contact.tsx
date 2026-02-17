import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Youtube, AtSign } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 pb-20 scroll-mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-gray-500 text-sm uppercase tracking-widest font-semibold mb-2 block">Contact</span>
          <h2 className="text-4xl font-bold text-white mb-6">Let's Elevate Your Impact</h2>
          <p className="text-gray-400 leading-relaxed mb-8 max-w-sm">
            Expert, Memorable, Dominant. Result driven concepts to establish your brand as an unassailable market leader.
          </p>
          <div className="flex space-x-4">
            {[Facebook, Youtube, AtSign].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-[#111928]/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl"
        >
          <form className="space-y-4">
            <div>
              <input 
                type="text" 
                placeholder="Name" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
            <div>
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
            <div>
              <textarea 
                rows={4} 
                placeholder="Message" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
            <motion.button 
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(59,130,246,0.4)" }}
              whileTap={{ scale: 0.98 }}
              type="button" 
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-4 rounded-xl shadow-lg transition-all"
            >
              Initiate Your Transformation
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;