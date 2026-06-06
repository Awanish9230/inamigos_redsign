import React, { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SceneCanvas from '../components/3d/SceneCanvas';
import HomeScene from '../components/3d/HomeScene';
import { useStore } from '../store/store';
import PageTransition from '../components/layout/PageTransition';
import SmartImage from '../components/ui/SmartImage';
import { IMAGES } from '../config/images';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const mainRef = useRef(null);
  const setDonationModalOpen = useStore((state) => state.setDonationModalOpen);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Reveal animations for sections
      gsap.utils.toArray('.reveal-section').forEach((section) => {
        gsap.from(section, {
          y: 50,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        });
      });

      // Number counters
      gsap.utils.toArray('.counter-num').forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        gsap.to(counter, {
          innerHTML: target,
          duration: 2,
          snap: { innerHTML: 1 },
          scrollTrigger: {
            trigger: counter,
            start: 'top 80%'
          }
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const initiatives = [
    { title: 'Project Seva', desc: 'Health & Nutrition', color: 'bg-green', image: IMAGES.causes.seva },
    { title: 'Bachpanshala', desc: 'Education for All', color: 'bg-accent', image: IMAGES.causes.bachpanshala },
    { title: 'Jeev', desc: 'Animal Rescue', color: 'bg-primary', image: IMAGES.causes.jeev },
    { title: 'Udaan', desc: 'Women Empowerment', color: 'bg-blue-500', image: IMAGES.causes.udaan },
    { title: 'Prakriti', desc: 'Sustainability', color: 'bg-emerald-600', image: IMAGES.causes.prakriti },
    { title: 'Vikas', desc: 'Skill Development', color: 'bg-orange-500', image: IMAGES.causes.vikas },
  ];

  return (
    <PageTransition>
    <div ref={mainRef}>
      <Helmet>
        <title>InAmigos Foundation - Home</title>
      </Helmet>
      
      {/* 1. Background image layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SmartImage
          src={IMAGES.home.hero}
          alt="Hero background"
          className="absolute inset-0 w-full h-full"
          fallbackSeed="community"
        />
        {/* 2. Dark gradient overlay so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A]/80 via-[#0D1B2A]/60 to-[#0D1B2A]/90" />
      </div>

      <div className="fixed inset-0 z-10 pointer-events-none">
        <SceneCanvas>
          <HomeScene />
        </SceneCanvas>
      </div>
      
      {/* Hero Section */}
      <section className="relative w-full h-screen min-h-screen flex flex-col justify-center items-center pt-20 z-20 overflow-hidden">
        <div className="text-center px-4 max-w-4xl mx-auto pointer-events-none mb-16">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-light mb-6 drop-shadow-lg leading-tight">
            Transforming Lives through <br/><span className="text-accent relative inline-block mt-2">
              Collective Action
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path d="M0 10 Q 100 20 200 10" fill="transparent" stroke="#00C875" strokeWidth="4"/>
              </svg>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-light/80 mb-10 max-w-2xl mx-auto mt-8">
            Join our mission to create sustainable change across India. Every action counts, every life matters.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 pointer-events-auto">
            <button 
              onClick={() => setDonationModalOpen(true)}
              className="bg-accent text-light px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent/90 transition shadow-[0_0_20px_rgba(255,107,0,0.5)] transform hover:scale-105"
            >
              Donate Now
            </button>
            <Link to="/volunteers" className="bg-transparent border border-light text-light px-8 py-4 rounded-full text-lg font-semibold hover:bg-light hover:text-dark transition transform hover:scale-105">
              Become a Volunteer
            </Link>
          </div>
        </div>

        {/* Stats Ticker */}
        <div className="absolute bottom-0 w-full bg-dark/60 backdrop-blur-md border-t border-light/10 py-6 pointer-events-auto">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-around text-center gap-6">
            {[
              { num: 15000, label: 'Lives Impacted', suffix: '+' },
              { num: 12, label: 'States', suffix: '+' },
              { num: 500, label: 'Volunteers', suffix: '+' },
              { num: 50, label: 'Projects', suffix: '+' }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-display font-bold text-green flex items-center justify-center">
                  <span className="counter-num" data-target={stat.num}>0</span>{stat.suffix}
                </div>
                <div className="text-xs md:text-sm text-light/60 uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="relative z-20 bg-dark">
        {/* Who We Are */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto reveal-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-accent font-bold tracking-widest uppercase text-sm mb-4">Who We Are</div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">A Network of Compassion.</h2>
              <p className="text-light/70 text-lg mb-6 leading-relaxed">
                InAmigos Foundation is a Section 8 registered non-profit organization focused on multi-dimensional societal impact. From hunger relief and education to animal welfare and environmental sustainability, our volunteer-driven initiatives strive to bridge the gap between intent and action.
              </p>
              <Link to="/about" className="text-green font-semibold hover:text-green/80 transition flex items-center gap-2">
                Discover Our Story <span>→</span>
              </Link>
            </div>
            <div className="relative group perspective-1000">
              <div className="w-full h-96 bg-primary/20 rounded-2xl border border-light/10 overflow-hidden transform transition-all duration-500 group-hover:rotate-y-12 group-hover:rotate-x-12 shadow-2xl relative">
                <SmartImage 
                  src={IMAGES.home.whoWeAre} 
                  alt="Who we are" 
                  className="absolute inset-0 w-full h-full"
                  fallbackSeed="children"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent mix-blend-overlay"></div>
                <div className="absolute inset-4 border border-light/20 rounded-xl pointer-events-none"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Initiatives Bento Grid */}
        <section className="py-24 bg-primary/30 border-y border-light/5 reveal-section">
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="text-accent font-bold tracking-widest uppercase text-sm mb-4">Our Focus Areas</div>
              <h2 className="text-4xl md:text-5xl font-display font-bold">Key Initiatives</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {initiatives.map((item, index) => (
                <Link to="/causes" key={index} className="group perspective-1000">
                  <div className={`p-8 rounded-2xl bg-dark/50 border border-light/10 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden h-full flex flex-col justify-end min-h-[250px]`}>
                    <SmartImage 
                      src={item.image} 
                      alt={item.title} 
                      className="absolute inset-0 w-full h-full opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent"></div>
                    <div className={`absolute top-0 right-0 w-32 h-32 ${item.color} rounded-full blur-[80px] opacity-20 group-hover:opacity-50 transition-opacity`}></div>
                    <h3 className="text-2xl font-display font-bold text-light z-10">{item.title}</h3>
                    <p className="text-light/60 mt-2 z-10">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto reveal-section text-center">
          <div className="border border-light/20 p-12 md:p-20 rounded-3xl relative overflow-hidden shadow-[0_0_50px_rgba(27,42,107,0.5)]">
            <SmartImage 
              src={IMAGES.home.ctaBanner} 
              alt="CTA Banner" 
              className="absolute inset-0 w-full h-full opacity-30"
              fallbackSeed="volunteer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-dark/90 to-primary/90"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
            
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 relative z-10 text-light">Ready to make a difference?</h2>
            <p className="text-xl text-light/80 mb-10 max-w-2xl mx-auto relative z-10">
              Whether you want to contribute your time or resources, there's a place for you in our community. Let's build a better tomorrow, together.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
              <button 
                onClick={() => setDonationModalOpen(true)}
                className="bg-accent text-light px-10 py-4 rounded-full text-lg font-semibold hover:bg-accent/90 transition shadow-[0_0_20px_rgba(255,107,0,0.4)] transform hover:scale-105"
              >
                Start Donating
              </button>
              <Link to="/volunteers" className="bg-light text-dark px-10 py-4 rounded-full text-lg font-semibold hover:bg-light/90 transition shadow-[0_0_20px_rgba(245,247,255,0.2)] transform hover:scale-105">
                Apply to Volunteer
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
    </PageTransition>
  );
};

export default Home;
