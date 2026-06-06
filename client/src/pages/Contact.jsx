import React, { useRef, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import SceneCanvas from '../components/3d/SceneCanvas';
import ContactScene from '../components/3d/ContactScene';
import PageTransition from '../components/layout/PageTransition';
import SmartImage from '../components/ui/SmartImage';
import { IMAGES } from '../config/images';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const mainRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message.trim()) newErrors.message = 'Message cannot be empty';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    setStatus(null);
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
        setErrors({});
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
    setLoading(false);
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  };

  const selectStyle = {
    ...inputStyle,
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23FF6B00' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 16px center',
    paddingRight: '44px',
    cursor: 'pointer',
  };

  return (
    <PageTransition>
    <div ref={mainRef}>
      <Helmet>
        <title>Contact - InAmigos Foundation</title>
      </Helmet>
      
      {/* 1. Background image layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SmartImage
          src={IMAGES.contact.team}
          alt="Contact background"
          className="absolute inset-0 w-full h-full"
          fallbackSeed="team"
        />
        {/* 2. Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A]/80 via-[#0D1B2A]/60 to-[#0D1B2A]/90" />
      </div>

      <div className="fixed inset-0 z-10 pointer-events-none">
        <SceneCanvas>
          <ContactScene />
        </SceneCanvas>
      </div>

      <section className="relative w-full h-screen min-h-screen flex flex-col justify-center items-center pt-20 z-20 text-center overflow-hidden">
        <div className="px-4 pointer-events-none">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-light drop-shadow-lg leading-tight">
            We're here to <span className="text-accent">help</span>
          </h1>
          <p className="mt-6 text-xl text-light/80 max-w-2xl mx-auto">
            Got questions, ideas, or want to partner with us? Drop us a line.
          </p>
        </div>
      </section>

      <div className="relative z-20 bg-dark">
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 reveal-section">
            
            {/* Left: Info Card */}
            <div 
              className="p-8 md:p-12 rounded-3xl relative overflow-hidden flex flex-col"
              style={{
                background: 'linear-gradient(135deg, #111f3a 0%, #0D1B2A 100%)',
                border: '1px solid rgba(255,107,0,0.15)',
              }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full blur-[100px] opacity-10"></div>
              
              <h2 className="text-3xl font-display font-bold mb-8 relative z-10 text-light">Foundation Details</h2>
              
              <div className="space-y-6 flex-grow z-10">
                <div style={{ display: 'flex', gap: '16px', marginBottom: '28px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: 'rgba(255,107,0,0.12)',
                    border: '1px solid rgba(255,107,0,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    📍
                  </div>
                  <div>
                    <p style={{ color: '#FF6B00', fontWeight: 700, marginBottom: 4 }}>Headquarters</p>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                      Ward No. 5, Gram Post, Sipat<br />
                      Ujjwal Nagar, Bilaspur<br />
                      Chhattisgarh – 495555
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', marginBottom: '28px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: 'rgba(0,200,117,0.1)',
                    border: '1px solid rgba(0,200,117,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    📞
                  </div>
                  <div>
                    <p style={{ color: '#00C875', fontWeight: 700, marginBottom: 4 }}>Phone</p>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>+91 626 730 9902</p>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>Mon–Fri 9am to 6pm IST</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', marginBottom: '36px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: 'rgba(100,150,255,0.1)',
                    border: '1px solid rgba(100,150,255,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    ✉️
                  </div>
                  <div>
                    <p style={{ color: '#6496ff', fontWeight: 700, marginBottom: 4 }}>Email</p>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                      inamigosfoundation@gmail.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(255,107,0,0.2)',
                height: '200px',
                position: 'relative',
                zIndex: 10
              }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.123456789!2d82.12345678901234!3d22.123456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDA3JzI0LjQiTiA4MsKwMDcnMjQuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="InAmigos Foundation Location"
                />
              </div>
              
              <div className="mt-8 flex gap-4 z-10 relative">
                {['Tw', 'In', 'Fb', 'Yt'].map(social => (
                  <button key={social} className="w-10 h-10 rounded-full bg-dark text-light border border-light/20 flex items-center justify-center hover:bg-accent hover:border-accent transition">
                    {social}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Contact Form */}
            <div 
              className="p-8 md:p-12 rounded-3xl relative min-h-[500px]"
              style={{
                background: 'linear-gradient(135deg, #111f3a 0%, #0D1B2A 100%)',
                border: '1px solid rgba(255,107,0,0.15)',
              }}
            >
              
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-dark/50 backdrop-blur-sm rounded-3xl z-20"
                  >
                    <div className="w-24 h-24 bg-green/20 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-12 h-12 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <motion.path 
                          strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" 
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-display font-bold mb-2">Message Sent!</h3>
                    <p className="text-light/70 mb-8 max-w-sm">Thank you for reaching out. A member of our team will get back to you shortly.</p>
                    <button 
                      onClick={() => setStatus(null)}
                      className="text-accent font-bold hover:text-accent/80 transition"
                    >
                      Send another message →
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h2 style={{
                      color: '#ffffff',
                      fontSize: '1.8rem',
                      fontWeight: 800,
                      marginBottom: '8px',
                      fontFamily: 'var(--font-display)'
                    }}>
                      Send us a message
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: '32px', fontSize: '0.9rem' }}>
                      We usually respond within 24-48 hours.
                    </p>
                    
                    {status === 'error' && (
                      <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-sm">
                        Something went wrong. Please try again later or email us directly.
                      </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                        <div>
                          <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', marginBottom: '8px' }}>FULL NAME</label>
                          <input 
                            type="text" 
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={(e) => {
                              setFormData({...formData, name: e.target.value});
                              if(errors.name) setErrors({...errors, name: null});
                            }}
                            style={{ ...inputStyle, borderColor: errors.name ? 'rgba(239, 68, 68, 0.5)' : inputStyle.border }}
                          />
                          {errors.name && <p className="text-red-500 text-xs mt-1 absolute">{errors.name}</p>}
                        </div>
                        <div>
                          <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', marginBottom: '8px' }}>EMAIL ADDRESS</label>
                          <input 
                            type="email" 
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => {
                              setFormData({...formData, email: e.target.value});
                              if(errors.email) setErrors({...errors, email: null});
                            }}
                            style={{ ...inputStyle, borderColor: errors.email ? 'rgba(239, 68, 68, 0.5)' : inputStyle.border }}
                          />
                          {errors.email && <p className="text-red-500 text-xs mt-1 absolute">{errors.email}</p>}
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', marginBottom: '8px' }}>SUBJECT</label>
                        <select 
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          style={selectStyle}
                        >
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Volunteer Inquiry">Volunteer Inquiry</option>
                          <option value="Partnership">Partnership</option>
                          <option value="Donation">Donation</option>
                          <option value="Media">Media</option>
                        </select>
                      </div>
                      
                      <div>
                        <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', marginBottom: '8px' }}>MESSAGE</label>
                        <textarea 
                          rows="4"
                          placeholder="How can we help you?"
                          value={formData.message}
                          onChange={(e) => {
                            setFormData({...formData, message: e.target.value});
                            if(errors.message) setErrors({...errors, message: null});
                          }}
                          style={{
                            ...inputStyle,
                            resize: 'vertical',
                            minHeight: '120px',
                            borderColor: errors.message ? 'rgba(239, 68, 68, 0.5)' : inputStyle.border
                          }}
                        ></textarea>
                        {errors.message && <p className="text-red-500 text-xs mt-1 absolute">{errors.message}</p>}
                      </div>
                      
                      <button 
                        type="submit" 
                        disabled={loading}
                        style={{
                          width: '100%',
                          padding: '16px',
                          background: 'linear-gradient(135deg, #FF6B00, #ff8c38)',
                          color: '#ffffff',
                          fontSize: '1rem',
                          fontWeight: 700,
                          border: 'none',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          letterSpacing: '0.05em',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 24px rgba(255,107,0,0.35)',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                        onMouseEnter={e => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 8px 32px rgba(255,107,0,0.5)';
                        }}
                        onMouseLeave={e => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 4px 24px rgba(255,107,0,0.35)';
                        }}
                      >
                        <span className={`transition-opacity ${loading ? 'opacity-0' : 'opacity-100'} flex items-center justify-center gap-2`}>
                          Send Message ➤
                        </span>
                        {loading && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-light border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto reveal-section text-center">
          <div 
            className="rounded-3xl p-12 shadow-[0_0_50px_rgba(27,42,107,0.5)] relative overflow-hidden border border-light/10"
            style={{ background: 'linear-gradient(135deg, #111f3a 0%, #0D1B2A 100%)' }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full blur-[100px] opacity-10 pointer-events-none"></div>
            
            <h2 className="text-3xl md:text-5xl font-display font-bold text-light mb-4 relative z-10">Join our movement</h2>
            <p className="text-light/60 mb-8 text-lg relative z-10">Get the latest updates on our initiatives and ways to help.</p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto relative z-10">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-grow rounded-xl px-6 py-4 text-light focus:outline-none transition"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              />
              <button 
                type="button" 
                className="px-8 py-4 rounded-xl font-bold text-light transition shadow-lg relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #FF6B00, #ff8c38)',
                }}
              >
                Subscribe ➤
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
