import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useStore } from '../../store/store';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const setDonationModalOpen = useStore((state) => state.setDonationModalOpen);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Causes', path: '/causes' },
    { name: 'About', path: '/about' },
    { name: 'Volunteers', path: '/volunteers' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blog', path: '/blog' },
    { name: 'Events', path: '/events' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="text-2xl font-display font-bold text-light">
          InAmigos<span className="text-accent">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <NavLink 
              key={link.name} 
              to={link.path}
              className={({ isActive }) => 
                `text-sm font-medium transition-colors duration-300 ${
                  isActive ? 'text-accent border-b-2 border-accent' : 'text-light/80 hover:text-accent'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/contact" className="border border-light/30 px-4 py-2 rounded-full text-sm hover:bg-light/10 transition">
            Contact
          </Link>
          <button 
            onClick={() => setDonationModalOpen(true)}
            className="bg-accent text-light px-6 py-2 rounded-full text-sm font-semibold hover:bg-accent/90 transition shadow-[0_0_15px_rgba(255,107,0,0.5)]"
          >
            Donate Now
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-light">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-dark/95 backdrop-blur-lg h-screen flex flex-col items-center pt-10 space-y-6 md:hidden">
          {links.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-display font-medium text-light hover:text-accent transition"
            >
              {link.name}
            </Link>
          ))}
          <Link to="/contact" onClick={() => setIsOpen(false)} className="text-xl border border-light/30 px-8 py-3 rounded-full mt-4">
            Contact
          </Link>
          <button 
            onClick={() => { setIsOpen(false); setDonationModalOpen(true); }}
            className="bg-accent text-light px-8 py-3 rounded-full text-xl font-semibold mt-4"
          >
            Donate Now
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
