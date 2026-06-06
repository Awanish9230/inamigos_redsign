import React, { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SceneCanvas from '../components/3d/SceneCanvas';
import CausesScene from '../components/3d/CausesScene';
import PageTransition from '../components/layout/PageTransition';
import SmartImage from '../components/ui/SmartImage';
import { IMAGES } from '../config/images';

gsap.registerPlugin(ScrollTrigger);

const causesData = [
  { id: 'seva', title: 'Project Seva', category: 'Health & Nutrition', desc: 'Providing nutritious meals and essential healthcare access to underprivileged communities.', stat: '5,000+ Meals/Month', color: 'bg-green', image: IMAGES.causes.seva },
  { id: 'bachpanshala', title: 'Bachpanshala', category: 'Education', desc: 'Setting up informal learning centers for street children to integrate them into formal schooling.', stat: '1,200+ Students', color: 'bg-accent', image: IMAGES.causes.bachpanshala },
  { id: 'jeev', title: 'Jeev', category: 'Animal Rescue', desc: 'Rescuing, treating, and rehabilitating stray animals in distress.', stat: '300+ Rescues', color: 'bg-primary', image: IMAGES.causes.jeev },
  { id: 'udaan', title: 'Udaan', category: 'Women Empowerment', desc: 'Vocational training and micro-finance support to help women become financially independent.', stat: '250+ Micro-businesses', color: 'bg-blue-500', image: IMAGES.causes.udaan },
  { id: 'prakriti', title: 'Prakriti', category: 'Sustainability', desc: 'Large-scale tree plantation drives and waste management awareness campaigns.', stat: '10,000+ Trees Planted', color: 'bg-emerald-600', image: IMAGES.causes.prakriti },
  { id: 'vikas', title: 'Vikas', category: 'Skill Development', desc: 'Upskilling youth with digital literacy and employable skills for the modern job market.', stat: '800+ Placements', color: 'bg-orange-500', image: IMAGES.causes.vikas }
];

const Causes = () => {
  const mainRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.utils.toArray('.cause-card').forEach((card, i) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: (i % 3) * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
      });
      
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

  return (
    <PageTransition>
    <div ref={mainRef}>
      <Helmet>
        <title>Causes - InAmigos Foundation</title>
      </Helmet>
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SceneCanvas>
          <CausesScene />
        </SceneCanvas>
      </div>

      <section className="relative w-full h-screen min-h-screen flex flex-col justify-center items-center pt-20 z-10 text-center overflow-hidden">
        <div className="px-4 pointer-events-none">
          <div className="text-accent font-bold tracking-widest uppercase text-sm mb-4 drop-shadow-md">Our Focus</div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-light drop-shadow-lg">
            Initiatives that <span className="text-green">Matter</span>
          </h1>
          <p className="mt-6 text-xl text-light/80 max-w-2xl mx-auto">
            Explore our six core pillars of impact. Click on the orbiting elements or scroll down to discover how we're making a difference.
          </p>
        </div>
      </section>

      <div className="relative z-10 bg-dark">
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {causesData.map((cause, index) => (
              <div 
                key={cause.id} 
                className={`cause-card rounded-3xl overflow-hidden bg-primary/20 border border-light/10 flex flex-col ${index === 0 || index === 3 ? 'md:col-span-2 lg:col-span-2' : ''}`}
              >
                <div className="h-48 md:h-64 bg-dark/50 relative overflow-hidden group">
                  <SmartImage
                    src={cause.image}
                    alt={cause.title}
                    className="absolute inset-0 w-full h-full"
                    fallbackSeed={cause.id}
                  />
                  <div className={`absolute inset-0 opacity-40 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-t from-dark to-transparent`}></div>
                  <div className={`absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 mix-blend-overlay ${cause.color}`}></div>
                </div>
                <div className="p-8 flex-grow flex flex-col relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 ${cause.color} rounded-full blur-[80px] opacity-10`}></div>
                  <div className="inline-block px-3 py-1 bg-light/10 border border-light/20 rounded-full text-xs text-light/80 uppercase tracking-wide w-max mb-4 z-10">
                    {cause.category}
                  </div>
                  <h3 className="text-3xl font-display font-bold text-light mb-4 z-10">{cause.title}</h3>
                  <p className="text-light/70 mb-6 flex-grow z-10">{cause.desc}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-light/10 z-10">
                    <div className="text-sm font-semibold text-accent">
                      {cause.stat}
                    </div>
                    <button className="text-light text-sm font-medium hover:text-green transition flex items-center gap-1">
                      Support <span className="text-lg leading-none">→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center reveal-section">
          <div className="bg-gradient-to-br from-primary/50 to-dark p-12 rounded-3xl border border-light/10 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent rounded-full blur-[100px] opacity-30"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-green rounded-full blur-[100px] opacity-20"></div>
            
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 relative z-10">Be an Amigo.</h2>
            <p className="text-light/70 mb-8 relative z-10">Subscribe to our newsletter to receive monthly impact reports and updates on our initiatives.</p>
            
            <form className="flex flex-col sm:flex-row gap-4 relative z-10">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-grow bg-dark/50 border border-light/20 rounded-full px-6 py-4 text-light focus:outline-none focus:border-accent transition"
                required
              />
              <button 
                type="submit" 
                className="bg-accent text-light px-8 py-4 rounded-full font-semibold hover:bg-accent/90 transition shadow-[0_0_15px_rgba(255,107,0,0.3)] whitespace-nowrap"
              >
                Join Movement
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
    </PageTransition>
  );
};

export default Causes;
