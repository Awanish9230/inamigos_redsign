import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary pt-16 pb-8 text-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <Link to="/" className="text-2xl font-display font-bold text-light mb-4 block">
            InAmigos<span className="text-accent">.</span>
          </Link>
          <p className="text-sm text-light/70 mb-4">
            Transforming lives through collective action. A Section 8 non-profit organization.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4 text-accent">Quick Links</h4>
          <ul className="space-y-2 text-sm text-light/70">
            <li><Link to="/about" className="hover:text-light transition">About Us</Link></li>
            <li><Link to="/causes" className="hover:text-light transition">Our Causes</Link></li>
            <li><Link to="/volunteers" className="hover:text-light transition">Volunteer</Link></li>
            <li><Link to="/gallery" className="hover:text-light transition">Gallery</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4 text-accent">Legal</h4>
          <ul className="space-y-2 text-sm text-light/70">
            <li><a href="#" className="hover:text-light transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-light transition">Terms of Service</a></li>
            <li><a href="#" className="hover:text-light transition">80G Tax Exemption</a></li>
            <li><a href="#" className="hover:text-light transition">CSR Documents</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4 text-accent">Contact</h4>
          <ul className="space-y-2 text-sm text-light/70">
            <li>HQ: New Delhi, India</li>
            <li>Phone: +91 98765 43210</li>
            <li>Email: hello@inamigos.org</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-light/10 text-center text-sm text-light/50">
        &copy; {new Date().getFullYear()} InAmigos Foundation. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
