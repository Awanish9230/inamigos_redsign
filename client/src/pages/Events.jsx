import React, { useRef, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SceneCanvas from '../components/3d/SceneCanvas';
import EventsScene from '../components/3d/EventsScene';
import PageTransition from '../components/layout/PageTransition';
import { Skeleton } from '../components/ui/Skeleton';
import SmartImage from '../components/ui/SmartImage';
import { IMAGES } from '../config/images';

gsap.registerPlugin(ScrollTrigger);

const Events = () => {
  const mainRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/events`);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (loading) return;
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
  }, [loading]);

  const MOCK_EVENTS = [
    { _id: '1', title: 'World Environment Day Summit', category: 'Environment', description: 'Join us for a massive tree plantation drive and sustainability workshops across 5 major cities.', date: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(), location: 'Multiple Cities', coverImage: IMAGES.events.earthDay },
    { _id: '2', title: 'Volunteer Leadership Training', category: 'Education', description: 'An intensive 2-day workshop designed to equip our core volunteers with leadership and management skills.', date: new Date(new Date().setMonth(new Date().getMonth() + 2)).toISOString(), location: 'New Delhi HQ', coverImage: IMAGES.events.volunteerTraining },
    { _id: '3', title: 'Rural Healthcare Camp', category: 'Health', description: 'Providing free medical checkups, essential medicines, and hygiene kits to over 500 families.', date: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString(), location: 'Chhattisgarh', coverImage: IMAGES.events.happinessDay },
    { _id: '4', title: 'Clean Water Initiative', category: 'Social Well-being', description: 'Installing water purification systems in government schools.', date: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString(), location: 'Rural Maharashtra', coverImage: IMAGES.events.waterDay },
    { _id: '5', title: 'Annual Impact Gala', category: 'General', description: 'Celebrating our milestones and honoring the volunteers who made it possible.', date: new Date(new Date().setMonth(new Date().getMonth() + 4)).toISOString(), location: 'Mumbai', coverImage: IMAGES.events.summit },
  ];

  const displayEvents = events.length > 0 ? events : MOCK_EVENTS;
  const featuredEvents = displayEvents.slice(0, 2);
  const upcomingEvents = displayEvents.slice(2);

  return (
    <PageTransition>
    <div ref={mainRef}>
      <Helmet>
        <title>Events - InAmigos Foundation</title>
      </Helmet>
      
      {/* 1. Background image layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SmartImage
          src={IMAGES.events.summit}
          alt="Events background"
          className="absolute inset-0 w-full h-full"
          fallbackSeed="conference"
        />
        {/* 2. Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A]/80 via-[#0D1B2A]/60 to-[#0D1B2A]/90" />
      </div>

      <div className="fixed inset-0 z-10 pointer-events-none">
        <SceneCanvas>
          <EventsScene />
        </SceneCanvas>
      </div>

      <section className="relative w-full h-screen min-h-screen flex flex-col justify-center items-center pt-20 z-20 text-center overflow-hidden">
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
          
          {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 event-grid mb-24">
                <Skeleton className="h-[500px] w-full" />
                <Skeleton className="h-[500px] w-full" />
             </div>
          ) : featuredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 event-grid mb-24">
              {featuredEvents.map((item, index) => {
                const dateObj = new Date(item.date);
                const month = dateObj.toLocaleString('en-US', { month: 'short' });
                const day = dateObj.getDate();

                return (
                  <div key={item._id} className="event-card bg-primary/20 border border-light/10 rounded-3xl overflow-hidden group hover:shadow-[0_0_30px_rgba(27,42,107,0.4)] transition duration-500 flex flex-col">
                    <div className="h-64 bg-dark/50 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent z-10"></div>
                      <div className="absolute top-4 left-4 z-20 bg-light text-dark rounded-xl px-4 py-2 text-center font-bold shadow-lg">
                        <div className="text-sm text-accent uppercase tracking-widest">{month}</div>
                        <div className="text-2xl font-display">{day}</div>
                      </div>
                      <SmartImage 
                        src={item.coverImage || Object.values(IMAGES.events)[index % 5]}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full group-hover:scale-105 transition duration-700"
                        fallbackSeed={`event${index}`}
                      />
                    </div>
                    <div className="p-8 relative flex-grow flex flex-col">
                      <div className="inline-block px-3 py-1 bg-green/20 text-green rounded-full text-xs font-bold border border-green/30 w-max mb-4">
                        {item.category || 'Event'}
                      </div>
                      <h3 className="text-2xl font-display font-bold text-light mb-3">{item.title}</h3>
                      <p className="text-light/70 mb-6 line-clamp-2 flex-grow">{item.description}</p>
                      
                      <div className="flex flex-col gap-2 mb-8 text-sm text-light/80">
                        <div className="flex items-center gap-2">
                          <span className="text-accent">📍</span> {item.location || 'Online'}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-accent">⏰</span> {dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute:'2-digit' })}
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
                );
              })}
            </div>
          ) : (
             <div className="text-center py-12 text-light/50 border border-dashed border-light/10 rounded-3xl mb-24">
                No featured events at the moment.
             </div>
          )}

          {/* Compact Event List & Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 reveal-section">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-display font-bold mb-8">Upcoming Schedule</h2>
              
              {loading ? (
                 <div className="space-y-4">
                   <Skeleton className="h-24 w-full" />
                   <Skeleton className="h-24 w-full" />
                   <Skeleton className="h-24 w-full" />
                 </div>
              ) : upcomingEvents.length > 0 ? (
                <div className="space-y-4">
                  {upcomingEvents.map((event) => {
                     const dateObj = new Date(event.date);
                     const month = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
                     const day = dateObj.getDate().toString().padStart(2, '0');
                     return (
                        <div key={event._id} className="flex flex-col md:flex-row items-center gap-6 bg-dark/40 border border-light/10 p-6 rounded-2xl hover:bg-primary/20 transition cursor-pointer">
                          <div className="text-center md:text-left flex-shrink-0">
                            <div className="text-sm text-accent font-bold">{month}</div>
                            <div className="text-3xl font-display font-bold">{day}</div>
                          </div>
                          <div className="flex-grow text-center md:text-left">
                            <h4 className="text-xl font-bold text-light mb-1">{event.title}</h4>
                            <div className="text-xs text-light/50 bg-light/10 px-2 py-1 rounded w-max mx-auto md:mx-0">{event.category || 'General'}</div>
                          </div>
                          <button className="text-accent hover:text-light transition flex-shrink-0">
                            Register →
                          </button>
                        </div>
                     )
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-light/50 border border-dashed border-light/10 rounded-2xl">
                  No upcoming events.
                </div>
              )}
            </div>

            {/* Stats Block */}
            <div className="bg-primary border border-light/10 rounded-3xl p-8 flex flex-col justify-center text-center relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-green rounded-full blur-[80px] opacity-20"></div>
              <h3 className="text-5xl font-display font-bold text-green mb-2">{loading ? '-' : displayEvents.length}+</h3>
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
          <div 
            className="rounded-3xl p-12 shadow-[0_0_50px_rgba(27,42,107,0.5)] relative overflow-hidden border border-light/10"
            style={{ background: 'linear-gradient(135deg, #111f3a 0%, #0D1B2A 100%)' }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full blur-[100px] opacity-10"></div>
            
            <h2 className="text-3xl md:text-5xl font-display font-bold text-light mb-4 relative z-10">Don't Miss Out</h2>
            <p className="text-light/60 mb-8 text-lg relative z-10">Get notified about new events and volunteer opportunities.</p>
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

export default Events;
