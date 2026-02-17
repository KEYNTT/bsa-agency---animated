import React from 'react';
import { motion } from 'framer-motion';
import { AudioWaveform, Wand2, Film, BrainCircuit } from 'lucide-react';

const services = [
  {
    icon: <AudioWaveform className="w-6 h-6 text-blue-300" />,
    title: "Sonic Brand Identity",
    desc: "Meticulous audio agendas crafted to resonate on a subconscious level, establishing instant brand recognition.",
    color: "blue",
    features: []
  },
  {
    icon: <Wand2 className="w-6 h-6 text-cyan-300" />,
    title: "Strategic Content Engineering",
    desc: null,
    color: "cyan",
    features: ["Proprietary Speed-editing", "Systemic Regimens", "Trendless Timelines"]
  },
  {
    icon: <Film className="w-6 h-6 text-purple-300" />,
    title: "Cinematic Social Content",
    desc: null,
    color: "purple",
    features: ["High-converter visuals", "Hyper Realistic Visuals", "Adapted Narrative Systems"]
  },
  {
    icon: <BrainCircuit className="w-6 h-6 text-indigo-300" />,
    title: "Global Authority Consulting",
    desc: null,
    color: "indigo",
    features: ["Market dominance strategy", "Authority Building Ecostages", "Scale Roadmap"]
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
};

const Services: React.FC = () => {
  return (
    <section id="services" className="max-w-6xl mx-auto px-6 scroll-mt-24">
      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-600/30 filter blur-[50px] -z-10 rounded-full" />
        <h2 className="text-4xl font-bold text-white mb-4">Services</h2>
        <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {services.map((service, index) => (
          <motion.div 
            key={index}
            variants={item}
            whileHover={{ y: -5, borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.06)" }}
            className="bg-glass-gradient backdrop-blur-md border border-white/5 p-8 rounded-3xl relative overflow-hidden group transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]"
          >
            {/* Hover Glow Background */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${service.color}-500/10 rounded-full blur-[40px] transition-all duration-500 group-hover:bg-${service.color}-500/20`} />
            
            <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-${service.color}-500/20 transition-colors duration-300`}>
              {service.icon}
            </div>
            
            <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
            
            {service.desc && (
              <p className="text-gray-400 text-sm leading-relaxed mb-6">{service.desc}</p>
            )}
            
            {service.features.length > 0 && (
              <ul className="text-gray-400 text-sm space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className={`w-1.5 h-1.5 bg-${service.color}-400 rounded-full mr-2`} />
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Services;