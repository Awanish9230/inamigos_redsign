import React, { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SceneCanvas from '../components/3d/SceneCanvas';
import EventsScene from '../components/3d/EventsScene';
import PageTransition from '../components/layout/PageTransition';

gsap.registerPlugin(ScrollTrigger);

const Events = () => {
  const mainRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.event-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.event-grid',
          start: 'top 85%',
        }
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
        <title>Events - InAmigos Foundation</title>
      </Helmet>
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SceneCanvas>
          <EventsScene />
        </SceneCanvas>
      </div>

      <section className="relative w-full h-screen min-h-screen flex flex-col justify-center items-center pt-20 z-10 text-center overflow-hidden">
        <div className="px-4 pointer-events-none">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-light drop-shadow-lg leading-tight">
            Shape the <span className="text-accent">Future</span>
          </h1>
          <p className="mt-6 text-xl text-light/80 max-w-2xl mx-auto">
            Participate in our upcoming drives, summits, and training sessions to make a direct impact.
          </p>
        </div>
      </section>

      <div className="relative z-10 bg-dark">
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Filter Bar */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {['All Categories', 'Environment', 'Social Well-being', 'Education', 'Health'].map((cat, i) => (
              <button
                key={cat}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  i === 0 
                    ? 'bg-accent text-light shadow-[0_0_15px_rgba(255,107,0,0.4)] border border-accent' 
                    : 'bg-dark/50 text-light/70 border border-light/20 hover:border-accent hover:text-light'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Events */}
          <h2 className="text-3xl font-display font-bold mb-8">Featured Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 event-grid mb-24">
            {[1, 2].map((item) => (
              <div key={item} className="event-card bg-primary/20 border border-light/10 rounded-3xl overflow-hidden group hover:shadow-[0_0_30px_rgba(27,42,107,0.4)] transition duration-500">
                <div className="h-64 bg-dark/50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent z-10"></div>
                  <div className="absolute top-4 left-4 z-20 bg-light text-dark rounded-xl px-4 py-2 text-center font-bold shadow-lg">
                    <div className="text-sm text-accent uppercase tracking-widest">Apr</div>
                    <div className="text-2xl font-display">22</div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center text-light/20 font-display text-xl group-hover:scale-105 transition duration-700">
                    [Event Image]
                  </div>
                </div>
                <div className="p-8 relative">
                  <div className="inline-block px-3 py-1 bg-green/20 text-green rounded-full text-xs font-bold border border-green/30 w-max mb-4">
                    Environment
                  </div>
                  <h3 className="text-2xl font-display font-bold text-light mb-3">Earth Day Mega Plantation Summit</h3>
                  <p className="text-light/70 mb-6 line-clamp-2">Join 500+ volunteers as we aim to plant 10,000 saplings across the city in a single day to combat climate change.</p>
                  
                  <div className="flex flex-col gap-2 mb-8 text-sm text-light/80">
                    <div className="flex items-center gap-2">
                      <span className="text-accent">📍</span> Delhi NCR Region
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-accent">⏰</span> 08:00 AM - 02:00 PM
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="bg-accent text-light px-8 py-3 rounded-full font-semibold hover:bg-accent/90 transition shadow-[0_0_15px_rgba(255,107,0,0.3)] flex-grow">
                      Join Event
                    </button>
                    <button className="bg-transparent border border-light/30 px-6 py-3 rounded-full hover:bg-light/10 transition">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Compact Event List & Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 reveal-section">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-display font-bold mb-8">Upcoming Schedule</h2>
              <div className="space-y-4">
                {[
                  { date: 'MAY 05', title: 'Volunteer Leadership Training', cat: 'Education' },
                  { date: 'JUN 12', title: 'Project Seva: Mega Food Drive', cat: 'Health' },
                  { date: 'JUL 20', title: 'Jeev Animal Rescue Workshop', cat: 'Animal Rescue' },
                ].map((event, i) => (
                  <div key={i} className="flex flex-col md:flex-row items-center gap-6 bg-dark/40 border border-light/10 p-6 rounded-2xl hover:bg-primary/20 transition cursor-pointer">
                    <div className="text-center md:text-left flex-shrink-0">
                      <div className="text-sm text-accent font-bold">{event.date.split(' ')[0]}</div>
                      <div className="text-3xl font-display font-bold">{event.date.split(' ')[1]}</div>
                    </div>
                    <div className="flex-grow text-center md:text-left">
                      <h4 className="text-xl font-bold text-light mb-1">{event.title}</h4>
                      <div className="text-xs text-light/50 bg-light/10 px-2 py-1 rounded w-max mx-auto md:mx-0">{event.cat}</div>
                    </div>
                    <button className="text-accent hover:text-light transition flex-shrink-0">
                      Register →
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Block */}
            <div className="bg-primary border border-light/10 rounded-3xl p-8 flex flex-col justify-center text-center relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-green rounded-full blur-[80px] opacity-20"></div>
              <h3 className="text-5xl font-display font-bold text-green mb-2">12+</h3>
              <div className="text-xl font-bold mb-8">Planned Events in 2025</div>
              <blockquote className="text-light/70 italic relative">
                "Volunteering at the Earth Summit changed my perspective entirely. It's more than an event; it's a movement."
                <footer className="text-sm text-accent mt-4 font-bold">- Rahul S., Volunteer</footer>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Subscribe Banner */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto reveal-section text-center">
          <div className="bg-gradient-to-r from-accent to-orange-500 rounded-3xl p-12 shadow-[0_0_40px_rgba(255,107,0,0.4)]">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-light mb-4">Don't Miss Out</h2>
            <p className="text-light/90 mb-8 text-lg">Get notified about new events and volunteer opportunities.</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-grow bg-light border-none rounded-full px-6 py-4 text-dark focus:outline-none shadow-inner"
              />
              <button 
                type="button" 
                className="bg-dark text-light px-8 py-4 rounded-full font-bold hover:bg-dark/80 transition shadow-lg"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
    </PageTransition>
  );
};

export default Events;
