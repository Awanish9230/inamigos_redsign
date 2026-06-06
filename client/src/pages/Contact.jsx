import React, { useRef, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SceneCanvas from '../components/3d/SceneCanvas';
import ContactScene from '../components/3d/ContactScene';
import PageTransition from '../components/layout/PageTransition';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const mainRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.reveal-section', {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.reveal-section',
          start: 'top 85%',
        }
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
    setLoading(false);
  };

  return (
    <PageTransition>
    <div ref={mainRef}>
      <Helmet>
        <title>Contact - InAmigos Foundation</title>
      </Helmet>
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SceneCanvas>
          <ContactScene />
        </SceneCanvas>
      </div>

      <section className="relative w-full h-screen min-h-screen flex flex-col justify-center items-center pt-20 z-10 text-center overflow-hidden">
        <div className="px-4 pointer-events-none">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-light drop-shadow-lg leading-tight">
            We're here to <span className="text-accent">help</span>
          </h1>
          <p className="mt-6 text-xl text-light/80 max-w-2xl mx-auto">
            Got questions, ideas, or want to partner with us? Drop us a line.
          </p>
        </div>
      </section>

      <div className="relative z-10 bg-dark">
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 reveal-section">
            
            {/* Left: Info Card */}
            <div className="bg-primary/20 border border-light/10 p-8 md:p-12 rounded-3xl relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full blur-[100px] opacity-10"></div>
              
              <h2 className="text-3xl font-display font-bold mb-8">Foundation Details</h2>
              
              <div className="space-y-6 flex-grow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-dark/50 flex items-center justify-center text-accent text-xl border border-light/10 flex-shrink-0">📍</div>
                  <div>
                    <h4 className="font-bold text-light mb-1">Headquarters</h4>
                    <p className="text-light/70 text-sm">123 Impact Avenue, Sector 4<br/>New Delhi, India 110001</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-dark/50 flex items-center justify-center text-accent text-xl border border-light/10 flex-shrink-0">📞</div>
                  <div>
                    <h4 className="font-bold text-light mb-1">Phone</h4>
                    <p className="text-light/70 text-sm">+91 98765 43210<br/>Mon-Fri from 9am to 6pm</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-dark/50 flex items-center justify-center text-accent text-xl border border-light/10 flex-shrink-0">✉️</div>
                  <div>
                    <h4 className="font-bold text-light mb-1">Email</h4>
                    <p className="text-light/70 text-sm">hello@inamigos.org</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 h-48 bg-dark/80 rounded-xl border border-light/10 flex items-center justify-center relative overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="text-light/50 font-bold tracking-widest uppercase text-sm z-10">[Google Maps Embed]</span>
              </div>
              
              <div className="mt-8 flex gap-4">
                {['Tw', 'In', 'Fb', 'Yt'].map(social => (
                  <button key={social} className="w-10 h-10 rounded-full bg-dark text-light border border-light/20 flex items-center justify-center hover:bg-accent hover:border-accent transition">
                    {social}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-dark/80 backdrop-blur-md border border-light/20 p-8 md:p-12 rounded-3xl shadow-[0_0_50px_rgba(27,42,107,0.3)]">
              <h3 className="text-3xl font-display font-bold mb-2">Send us a message</h3>
              <p className="text-sm text-light/60 mb-8">We usually respond within 24-48 hours.</p>
              
              {status === 'success' ? (
                <div className="bg-green/20 border border-green text-green p-6 rounded-xl text-center font-bold h-64 flex items-center justify-center">
                  Message sent successfully! We'll get back to you soon.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-light/70 uppercase tracking-wide mb-2">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-dark/50 border border-light/20 rounded-xl px-4 py-3 text-light focus:outline-none focus:border-accent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-light/70 uppercase tracking-wide mb-2">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-dark/50 border border-light/20 rounded-xl px-4 py-3 text-light focus:outline-none focus:border-accent transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-light/70 uppercase tracking-wide mb-2">Subject</label>
                    <select 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full bg-dark/50 border border-light/20 rounded-xl px-4 py-3 text-light focus:outline-none focus:border-accent transition appearance-none"
                    >
                      <option>General Inquiry</option>
                      <option>Volunteer</option>
                      <option>Partnership</option>
                      <option>Donation</option>
                      <option>Media</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-light/70 uppercase tracking-wide mb-2">Message</label>
                    <textarea 
                      required
                      rows="4"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-dark/50 border border-light/20 rounded-xl px-4 py-3 text-light focus:outline-none focus:border-accent transition resize-none"
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-accent text-light py-4 rounded-xl font-bold text-lg hover:bg-accent/90 transition shadow-[0_0_15px_rgba(255,107,0,0.3)] disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? 'Sending...' : 'Send Message ➤'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-blue-900 border-t border-light/20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-display font-bold text-light mb-6">Join our movement</h2>
            <form className="flex flex-col sm:flex-row gap-4 justify-center">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full sm:w-96 bg-dark/50 border border-light/20 rounded-full px-6 py-4 text-light focus:outline-none focus:border-accent transition"
              />
              <button type="button" className="bg-light text-dark px-8 py-4 rounded-full font-bold hover:bg-light/90 transition">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
    </PageTransition>
  );
};

export default Contact;
