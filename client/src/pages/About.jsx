import React, { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SceneCanvas from '../components/3d/SceneCanvas';
import AboutScene from '../components/3d/AboutScene';
import PageTransition from '../components/layout/PageTransition';
import SmartImage from '../components/ui/SmartImage';
import { IMAGES } from '../config/images';

gsap.registerPlugin(ScrollTrigger);

const credentials = ['Section 8 NGO', '80G Registered', '12A Certified', 'CSR-1 Approved', 'NITI Aayog Darpan', 'ISO 9001:2015'];

const About = () => {
  const mainRef = useRef(null);

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
      
      // Horizontal scroll
      const strip = document.querySelector('.cred-strip');
      if (strip) {
        gsap.to(strip, {
          xPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: ".cred-container",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      }
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <PageTransition>
    <div ref={mainRef} className="overflow-x-hidden">
      <Helmet>
        <title>About Us - InAmigos Foundation</title>
      </Helmet>
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SceneCanvas>
          <AboutScene />
        </SceneCanvas>
      </div>

      <section className="relative w-full h-screen min-h-screen flex flex-col justify-center items-center pt-20 z-10 text-center overflow-hidden">
        <div className="px-4 pointer-events-none">
          <div className="text-accent font-bold tracking-widest uppercase text-sm mb-4 drop-shadow-md">Our Story</div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-light drop-shadow-lg max-w-4xl mx-auto leading-tight">
            Creating <span className="text-accent">Collective</span> Change
          </h1>
          <p className="mt-6 text-xl text-light/80 max-w-2xl mx-auto">
            We are intertwined by our shared vision of a compassionate, sustainable, and equitable society.
          </p>
        </div>
      </section>

      <div className="relative z-10 bg-dark">
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto reveal-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative group perspective-1000">
              <div className="w-full h-96 bg-primary/30 rounded-3xl border border-light/10 overflow-hidden transform transition-all duration-700 group-hover:rotate-y-6 group-hover:-rotate-x-6 shadow-2xl relative flex items-center justify-center">
                <SmartImage 
                  src={IMAGES.about.team}
                  alt="Our Team"
                  className="absolute inset-0 w-full h-full"
                  fallbackSeed="team"
                />
                <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors duration-500"></div>
                <div className="absolute inset-4 border-2 border-accent/30 rounded-2xl transform transition-transform duration-700 group-hover:translate-z-10 group-hover:scale-105 pointer-events-none"></div>
              </div>
            </div>
            
            <div>
              <div className="text-green font-bold tracking-widest uppercase text-sm mb-4">Our Mission</div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Empowering Communities.</h2>
              <p className="text-light/70 text-lg mb-6 leading-relaxed">
                Founded with the belief that localized efforts lead to global impact, InAmigos Foundation operates as a dynamic network of volunteers. We tackle pressing issues at their roots—whether it's providing a hot meal, rescuing an injured stray, or educating a child.
              </p>
              <div className="space-y-4">
                {['Transparency & Accountability', 'Volunteer-Led Action', 'Sustainable Development'].map((value, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent">✓</div>
                    <span className="text-light/90 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Credentials Scrolling Strip */}
        <section className="py-16 bg-primary/20 border-y border-light/5 overflow-hidden cred-container">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-display font-bold text-light">Recognitions & Certifications</h3>
          </div>
          <div className="w-[200vw] flex cred-strip pl-4">
            {[...credentials, ...credentials, ...credentials].map((cred, i) => (
              <div key={i} className="flex-shrink-0 w-64 mx-4">
                <div className="bg-dark border border-light/10 rounded-xl p-6 text-center hover:border-green hover:shadow-[0_0_20px_rgba(0,200,117,0.2)] transition-all duration-300">
                  <div className="text-lg font-bold text-light/80">{cred}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Join Us CTA */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto reveal-section text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Be part of the Helix.</h2>
          <p className="text-xl text-light/70 mb-10 max-w-2xl mx-auto">
            Our programs are deeply intertwined with the passion of our volunteers and the generosity of our donors. Join us today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-green text-dark px-10 py-4 rounded-full text-lg font-bold hover:bg-green/90 transition shadow-[0_0_20px_rgba(0,200,117,0.4)] transform hover:scale-105">
              Volunteer Today
            </button>
            <button className="bg-accent text-light px-10 py-4 rounded-full text-lg font-semibold hover:bg-accent/90 transition shadow-[0_0_20px_rgba(255,107,0,0.4)] transform hover:scale-105">
              Make a Donation
            </button>
          </div>
        </section>
      </div>
    </div>
    </PageTransition>
  );
};

export default About;
