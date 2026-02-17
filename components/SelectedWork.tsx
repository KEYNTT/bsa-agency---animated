import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const projects = [
  {
    title: "Tech Brand",
    subtitle: "AI Product Launch",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Personal Brand",
    subtitle: "Lifestyle Vlog",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Luxury Retail",
    subtitle: "Collection Debut",
    image: "https://images.unsplash.com/photo-1594967855978-4a39626487e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  }
];

const SelectedWork: React.FC = () => {
  return (
    <section id="work" className="max-w-7xl mx-auto px-6 py-20 scroll-mt-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-white mb-2">Selected Work</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ y: -10 }}
            viewport={{ once: true }}
            className="relative group w-[280px] h-[560px] rounded-[3rem] border-4 border-gray-800 bg-gray-900 shadow-2xl overflow-hidden cursor-pointer"
          >
            {/* Screen Content */}
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
            />
            
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                <Play className="text-white fill-current ml-1" />
              </div>
            </div>

            {/* Text Content */}
            <div className="absolute bottom-8 left-6 right-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h4 className="text-white font-bold text-lg">{project.title}</h4>
              <p className="text-gray-400 text-xs mt-1">{project.subtitle}</p>
            </div>

            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-28 bg-black rounded-b-xl z-20" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SelectedWork;