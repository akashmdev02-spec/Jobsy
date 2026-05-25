import React, { useState } from 'react';

export default function Footer() {
  // 1. Fixed missing state definitions
  const [selectedLang, setSelectedLang] = useState('English');

  const handleFeedback = () => {
    // Add your feedback workflow logic here (e.g., opening a modal)
    console.log('Feedback button clicked');
  };

  return (
    <footer className="border-t border-slate-200 bg-white w-full">
     
      {/* 2. Fixed HTML Nesting: Bottom Legal Bar placed as a clean sibling */}
      <div className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          
          {/* Left Side: Solidified Copyright */}
          <p className="font-medium text-slate-600 order-2 lg:order-1">
            © {new Date().getFullYear()} Jobsy Inc.
          </p>
          
          {/* Right Side: Navigation Array & Functional Selectors */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-medium order-1 lg:order-2">
            <a href="/user-agreement" className="hover:text-slate-900 transition-colors">User Agreement</a>
            <a href="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="/community-guidelines" className="hover:text-slate-900 transition-colors">Community Guidelines</a>
            <a href="/cookies" className="hover:text-slate-900 transition-colors">Cookie Policy</a>
            <a href="/copyright-policy" className="hover:text-slate-900 transition-colors">Copyright Policy</a>
            
            {/* Actionable Feedback Trigger */}
            <button 
              type="button"
              onClick={handleFeedback} 
              className="hover:text-slate-900 transition-colors font-medium text-left focus:outline-none"
            >
              Send Feedback
            </button>
            
            {/* Semantic Native Language Dropdown Wrapper */}
            <div className="flex items-center gap-1 text-slate-500 border-l border-slate-300 pl-4 ml-2 sm:ml-0">
              <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Lang:</span>
              <select 
                value={selectedLang} 
                onChange={(e) => setSelectedLang(e.target.value)}
                className="bg-transparent font-medium text-slate-600 hover:text-slate-900 focus:outline-none cursor-pointer pr-1"
              >
                <option value="English">English</option>
                <option value="Spanish">Español</option>
                <option value="French">Français</option>
                <option value="German">Deutsch</option>
              </select>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}