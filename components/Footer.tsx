import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="max-w-6xl mx-auto px-6 pb-8">
      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
        <div className="font-bold text-white text-lg mb-4 md:mb-0">
            BSA <span className="font-normal text-gray-500 text-xs ml-2">Short Content. Global Influence.</span>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-gray-400 transition-colors">Terms</a>
          <a href="#" className="hover:text-gray-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-gray-400 transition-colors">Sitemap</a>
          <span>© 2023 BSA LLC</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;