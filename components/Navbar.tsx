import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform background opacity based on scroll
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.6]);
  const blurValue = useTransform(scrollY, [0, 100], [0, 10]);
  const borderColor = useTransform(scrollY, [0, 100], ["rgba(255,255,255,0)", "rgba(255,255,255,0.05)"]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Work', href: '#work' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav 
      style={{ 
        backgroundColor: `rgba(3, 4, 11, ${isScrolled ? 0.8 : 0})`,
        backdropFilter: `blur(${isScrolled ? 12 : 0}px)`,
        borderBottom: `1px solid ${isScrolled ? 'rgba(255,255,255,0.08)' : 'transparent'}`
      }}
      className="fixed top-0 w-full z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold tracking-widest text-white">BSA</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59,130,246,0.5)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors"
        >
          Book a Call
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;