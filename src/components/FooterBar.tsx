import React from 'react';
import { Phone, Globe, Youtube, Facebook, Instagram } from 'lucide-react';

export const FooterBar: React.FC = () => {
  return (
    <footer className="w-full bg-[#122e4d] text-white py-3.5 px-6 border-t border-[#1c4169] mt-auto">
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2 text-xs font-medium">
        <a
          href="tel:7310095239"
          className="flex items-center gap-1.5 text-blue-300 hover:text-white transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-mono-num font-semibold">7310095239</span>
        </a>

        <span className="text-slate-600 hidden sm:inline">|</span>

        <a
          href="https://dataclick.in"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[#a3c3e8] hover:text-white transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-emerald-400" />
          <span>Website</span>
        </a>

        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[#a3c3e8] hover:text-white transition-colors"
        >
          <Youtube className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>YouTube</span>
        </a>

        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[#a3c3e8] hover:text-white transition-colors"
        >
          <Youtube className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>YouTube (2)</span>
        </a>

        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[#a3c3e8] hover:text-white transition-colors"
        >
          <Facebook className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
          <span>Facebook</span>
        </a>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[#a3c3e8] hover:text-white transition-colors"
        >
          <Instagram className="w-3.5 h-3.5 text-pink-400" />
          <span>Instagram</span>
        </a>
      </div>
    </footer>
  );
};
