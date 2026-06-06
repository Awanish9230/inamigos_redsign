import React, { useRef, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SceneCanvas from '../components/3d/SceneCanvas';
import GalleryScene from '../components/3d/GalleryScene';
import PageTransition from '../components/layout/PageTransition';
import { useStore } from '../store/store';

gsap.registerPlugin(ScrollTrigger);

const filters = ['All Stories', 'Food Distribution', 'Animal Rescue', 'Tree Plantation', 'Education'];

// Mock data
const initialImages = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  category: filters[Math.floor(Math.random() * (filters.length - 1)) + 1],
  caption: `Impact Story ${i+1}`,
  story: 'Brief snippet about this particular moment in our journey. Volunteering makes a difference.',
  height: Math.floor(Math.random() * 200) + 200, // random height for masonry effect
}));

const Gallery = () => {
  const mainRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('All Stories');
  const [images, setImages] = useState(initialImages);
  const { setDonationModalOpen } = useStore();

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.gallery-item', {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
      });
      
      gsap.from('.reveal-section', {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.reveal-section',
          start: 'top 80%',
        }
      });
    }, mainRef);
    return () => ctx.revert();
  }, [activeFilter, images]);

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    if (filter === 'All Stories') {
      setImages(initialImages);
    } else {
      setImages(initialImages.filter(img => img.category === filter));
    }
  };

  return (
    <PageTransition>
    <div ref={mainRef}>
      <Helmet>
        <title>Gallery - InAmigos Foundation</title>
      </Helmet>
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SceneCanvas>
          <GalleryScene />
        </SceneCanvas>
      </div>

      <section className="relative w-full h-screen min-h-screen flex flex-col justify-center items-center pt-20 z-10 text-center overflow-hidden">
        <div className="px-4 pointer-events-none">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-light drop-shadow-lg leading-tight">
            Our Journey in <span className="text-accent">Frames</span>
          </h1>
          <p className="mt-6 text-xl text-light/80 max-w-2xl mx-auto">
            Witness the smiles, the hard work, and the impact of our collective actions.
          </p>
        </div>
      </section>

      <div className="relative z-10 bg-dark min-h-screen">
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilter(filter)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeFilter === filter 
                    ? 'bg-accent text-light shadow-[0_0_15px_rgba(255,107,0,0.4)] border border-accent' 
                    : 'bg-dark/50 text-light/70 border border-light/20 hover:border-accent hover:text-light'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {/* Become a Storyteller CTA Card */}
            <div className="gallery-item break-inside-avoid bg-primary/40 border border-accent/30 p-8 rounded-2xl flex flex-col items-center justify-center text-center h-64 hover:bg-primary/60 transition cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-accent text-2xl mb-4 border border-accent/40">📷</div>
              <h3 className="text-2xl font-display font-bold text-light mb-2">Become a Storyteller</h3>
              <p className="text-sm text-light/70">Join our media team and document our impact.</p>
            </div>

            {images.map((img) => (
              <div 
                key={img.id} 
                className="gallery-item break-inside-avoid relative group rounded-2xl overflow-hidden bg-dark/50 border border-light/10"
                style={{ height: img.height }}
              >
                {/* Image Placeholder */}
                <div className="absolute inset-0 bg-dark/80 flex items-center justify-center">
                  <span className="text-light/20 font-display">Photo</span>
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-bold border border-accent/30 w-max mb-3">
                    {img.category}
                  </div>
                  <h4 className="text-lg font-bold text-light mb-1">{img.caption}</h4>
                  <p className="text-sm text-light/70 line-clamp-2">{img.story}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button className="bg-transparent border border-light/30 text-light px-10 py-3 rounded-full hover:bg-light/10 transition">
              Load More
            </button>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center reveal-section">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Be Part of the Next Frame</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={() => setDonationModalOpen(true)}
              className="bg-green text-dark px-10 py-4 rounded-full text-lg font-bold hover:bg-green/90 transition shadow-[0_0_20px_rgba(0,200,117,0.4)]"
            >
              Support Now
            </button>
            <button className="bg-transparent border border-light text-light px-10 py-4 rounded-full text-lg font-semibold hover:bg-light/10 transition">
              Get Involved
            </button>
          </div>
        </section>
      </div>
    </div>
    </PageTransition>
  );
};

export default Gallery;
