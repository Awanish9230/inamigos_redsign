import React, { useRef, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SceneCanvas from '../components/3d/SceneCanvas';
import VolunteersScene from '../components/3d/VolunteersScene';
import PageTransition from '../components/layout/PageTransition';
import SmartImage from '../components/ui/SmartImage';
import { IMAGES } from '../config/images';

gsap.registerPlugin(ScrollTrigger);

const Volunteers = () => {
  const mainRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', areaOfInterest: 'Education' });
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.reveal-section', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: mainRef.current,
          start: 'top 80%',
        }
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/volunteers/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', areaOfInterest: 'Education' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
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
        <title>Volunteers - InAmigos Foundation</title>
      </Helmet>
      
      {/* 1. Background image layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SmartImage
          src={IMAGES.volunteers.hero}
          alt="Volunteers background"
          className="absolute inset-0 w-full h-full"
          fallbackSeed="team"
        />
        {/* 2. Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A]/80 via-[#0D1B2A]/60 to-[#0D1B2A]/90" />
      </div>

      <div className="fixed inset-0 z-10 pointer-events-none">
        <SceneCanvas>
          <VolunteersScene />
        </SceneCanvas>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-screen min-h-screen flex flex-col justify-center items-center pt-20 z-20 text-center overflow-hidden">
        <div className="px-4 pointer-events-none">
          <div className="inline-block px-4 py-2 bg-light/10 border border-light/20 rounded-full text-xs font-bold text-accent uppercase tracking-wider mb-6 backdrop-blur-md">
            500+ Active Volunteers
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-light drop-shadow-lg leading-tight max-w-4xl mx-auto">
            Join Our Team of <span className="text-accent">Amigos</span>
          </h1>
          <p className="mt-6 text-xl text-light/80 max-w-2xl mx-auto">
            Our volunteers are the heartbeat of our foundation. They are the changemakers on the ground.
          </p>
        </div>
      </section>

      <div className="relative z-20 bg-dark">
        {/* Visionary Leads */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto reveal-section">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold">Visionary Leads</h2>
            <p className="text-light/70 mt-4">The people driving our core initiatives forward.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group perspective-1000">
                <div className="bg-primary/20 border border-light/10 rounded-3xl p-6 text-center transform transition-all duration-500 hover:rotate-y-6 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="w-32 h-32 mx-auto rounded-full bg-dark/50 border-4 border-accent/20 mb-6 overflow-hidden relative">
                    <SmartImage 
                      src={IMAGES.volunteers[`lead${i}`]}
                      alt={`Lead ${i}`}
                      className="absolute inset-0 w-full h-full"
                      fallbackSeed={`person${i}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-xl font-display font-bold text-light mb-1">Lead Name {i}</h3>
                  <p className="text-sm text-green mb-4">Project Director</p>
                  <button className="text-light/50 hover:text-accent transition">in</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Core Volunteer Network */}
        <section className="py-24 bg-primary/30 border-y border-light/5 reveal-section">
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div>
                <h2 className="text-4xl font-display font-bold mb-2">Core Network</h2>
                <div className="inline-block px-3 py-1 bg-green/20 text-green rounded-full text-xs font-bold border border-green/30">
                  Joining Soon: 12 New Members
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[...Array(11)].map((_, i) => (
                <div key={i} className="bg-dark/50 border border-light/10 rounded-2xl p-4 text-center hover:bg-dark transition">
                  <div className="w-16 h-16 mx-auto rounded-full bg-light/10 mb-3 overflow-hidden">
                    <SmartImage 
                      src={IMAGES.volunteers[`vol${(i % 5) + 1}`]}
                      alt={`Volunteer ${i+1}`}
                      className="w-full h-full"
                      fallbackSeed={`volunteer${i}`}
                    />
                  </div>
                  <div className="text-sm font-bold text-light">Volunteer {i+1}</div>
                  <div className="text-xs text-light/50">Field Ops</div>
                </div>
              ))}
              <div className="bg-accent/10 border border-accent/30 rounded-2xl p-4 text-center flex flex-col items-center justify-center text-accent hover:bg-accent/20 transition cursor-pointer">
                <div className="text-2xl font-display font-bold">40+</div>
                <div className="text-xs">More</div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Volunteer & Form */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto reveal-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Why Volunteer With Us?</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green/20 flex items-center justify-center text-green text-xl border border-green/30">✓</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Flexible Hours</h4>
                    <p className="text-light/70">Contribute your time according to your schedule. Weekend drives and remote tasks available.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xl border border-accent/30">✓</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Skill-based Opportunities</h4>
                    <p className="text-light/70">Use your professional skills (marketing, tech, design) to scale our impact.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xl border border-blue-500/30">✓</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Certificates & Recognition</h4>
                    <p className="text-light/70">Receive official certificates of appreciation and letters of recommendation for your service.</p>
                  </div>
                </div>
              </div>
              
              {/* Direct Contact Info */}
              <div className="mt-12 p-6 rounded-2xl border border-light/10" style={{ background: 'linear-gradient(135deg, rgba(255,107,0,0.05) 0%, rgba(0,0,0,0.2) 100%)' }}>
                <h4 className="text-lg font-bold text-light mb-4 border-b border-light/10 pb-2">Direct Contact</h4>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">📞</div>
                  <div>
                    <div className="text-xs text-light/50 font-bold uppercase tracking-wider">Mobile Number</div>
                    <div className="text-light font-bold">7390083864</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">✉️</div>
                  <div>
                    <div className="text-xs text-light/50 font-bold uppercase tracking-wider">Email Address</div>
                    <div className="text-light font-bold">awanishverma864@gmail.com</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div 
              className="p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col justify-center"
              style={{
                background: 'linear-gradient(135deg, #111f3a 0%, #0D1B2A 100%)',
                border: '1px solid rgba(255,107,0,0.15)',
              }}
            >
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-accent rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
              <h3 className="text-3xl font-display font-bold mb-2 text-light">Quick Application</h3>
              <p className="text-sm text-light/60 mb-8">We usually respond within 48 hours.</p>
              
              {submitStatus === 'success' ? (
                <div className="bg-green/20 border border-green text-green p-6 rounded-xl text-center font-bold">
                  Thank you! Your application has been submitted successfully.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div>
                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', marginBottom: '8px' }}>FULL NAME</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      style={inputStyle}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', marginBottom: '8px' }}>EMAIL ADDRESS</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      style={inputStyle}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', marginBottom: '8px' }}>AREA OF INTEREST</label>
                    <select 
                      value={formData.areaOfInterest}
                      onChange={(e) => setFormData({...formData, areaOfInterest: e.target.value})}
                      style={selectStyle}
                    >
                      <option>Education</option>
                      <option>Health & Nutrition</option>
                      <option>Animal Rescue</option>
                      <option>Women Empowerment</option>
                      <option>Environment & Sustainability</option>
                      <option>Media & Marketing</option>
                    </select>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full py-4 rounded-xl font-bold text-lg text-light relative overflow-hidden mt-6"
                    style={{
                      background: 'linear-gradient(135deg, #FF6B00, #ff8c38)',
                      boxShadow: '0 4px 24px rgba(255,107,0,0.35)',
                      transition: 'all 0.3s ease',
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
                    Submit Application ➤
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
    </PageTransition>
  );
};

export default Volunteers;
