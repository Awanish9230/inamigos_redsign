import React, { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SceneCanvas from '../components/3d/SceneCanvas';
import BlogScene from '../components/3d/BlogScene';
import PageTransition from '../components/layout/PageTransition';

gsap.registerPlugin(ScrollTrigger);

const mockPosts = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  title: `Empowering Communities Through Education: Chapter ${i+1}`,
  excerpt: 'A deep dive into how grassroots volunteering is changing the landscape of education in rural areas, one child at a time.',
  category: i % 2 === 0 ? 'Education' : 'Social Impact',
  author: 'Jane Doe',
  date: 'Oct 12, 2024',
  readTime: '5 min read'
}));

const Blog = () => {
  const mainRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.blog-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.blog-grid',
          start: 'top 85%',
        }
      });
      
      gsap.from('.sidebar-item', {
        x: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.sidebar',
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
        <title>Blog - InAmigos Foundation</title>
      </Helmet>
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SceneCanvas>
          <BlogScene />
        </SceneCanvas>
      </div>

      <section className="relative w-full h-screen min-h-screen flex flex-col justify-center items-center pt-20 z-10 text-center overflow-hidden">
        <div className="px-4 pointer-events-none">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-light drop-shadow-lg leading-tight">
            Stories of <span className="text-accent">Impact</span>
          </h1>
          <p className="mt-6 text-xl text-light/80 max-w-2xl mx-auto">
            Read about our latest projects, volunteer experiences, and insights from the field.
          </p>
        </div>
      </section>

      <div className="relative z-10 bg-dark">
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Featured Post */}
          <div className="mb-16 bg-primary/20 border border-light/10 rounded-3xl overflow-hidden flex flex-col md:flex-row group hover:shadow-[0_0_30px_rgba(27,42,107,0.4)] transition duration-500">
            <div className="md:w-1/2 h-64 md:h-auto bg-dark/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent z-10 md:hidden"></div>
              <div className="absolute inset-0 flex items-center justify-center text-light/20 font-display text-xl group-hover:scale-105 transition duration-700">
                [Featured Image]
              </div>
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent rounded-full blur-[80px] opacity-20"></div>
              <div className="inline-block px-3 py-1 bg-green/20 text-green rounded-full text-xs font-bold border border-green/30 w-max mb-6">
                Featured
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-light mb-4 group-hover:text-accent transition">
                The Ripple Effect of One Hot Meal
              </h2>
              <p className="text-light/70 mb-6 text-lg">
                Discover how Project Seva's recent drive in the slums of Delhi not only provided nutrition but sparked a chain reaction of community support and local employment.
              </p>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-light/20"></div>
                <div>
                  <div className="text-sm font-bold text-light">Awanish Kumar</div>
                  <div className="text-xs text-light/50">Nov 14, 2024 • 8 min read</div>
                </div>
              </div>
              <button className="bg-transparent border border-light/30 text-light px-8 py-3 rounded-full hover:bg-light/10 transition w-max">
                Read Story →
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Blog Grid */}
            <div className="lg:w-2/3">
              <h3 className="text-2xl font-display font-bold mb-8 border-b border-light/10 pb-4">Latest Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 blog-grid">
                {mockPosts.map((post) => (
                  <div key={post.id} className="blog-card bg-dark/40 border border-light/10 rounded-2xl overflow-hidden hover:-translate-y-2 transition duration-300 group">
                    <div className="h-48 bg-primary/20 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-light/20 text-sm group-hover:scale-105 transition duration-500">
                        [Thumbnail]
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="inline-block px-3 py-1 bg-light/10 text-light/80 rounded-full text-xs font-semibold mb-4">
                        {post.category}
                      </div>
                      <h4 className="text-xl font-display font-bold text-light mb-3 group-hover:text-accent transition">
                        {post.title}
                      </h4>
                      <p className="text-light/60 text-sm mb-6 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-light/40">
                        <span>{post.author}</span>
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 text-center">
                <button className="bg-transparent text-accent font-semibold hover:text-accent/80 transition">
                  Load More Articles ↓
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3 sidebar space-y-12">
              <div className="sidebar-item bg-primary/10 border border-light/10 rounded-2xl p-6">
                <h4 className="font-display font-bold mb-6">Popular Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {['Education', 'Environment', 'Fundraising', 'Volunteer Stories', 'Health', 'Community'].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-dark/50 border border-light/10 rounded-full text-xs text-light/70 hover:border-accent hover:text-accent transition cursor-pointer">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="sidebar-item bg-gradient-to-br from-accent/20 to-dark border border-accent/20 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center text-accent text-2xl mb-4">✉</div>
                <h4 className="font-display font-bold mb-2">Subscribe to our Newsletter</h4>
                <p className="text-xs text-light/60 mb-6">Get the latest impact stories directly in your inbox.</p>
                <input type="email" placeholder="Your email address" className="w-full bg-dark/50 border border-light/20 rounded-lg px-4 py-2 text-sm text-light focus:outline-none focus:border-accent mb-3" />
                <button className="w-full bg-accent text-light py-2 rounded-lg text-sm font-bold hover:bg-accent/90 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    </PageTransition>
  );
};

export default Blog;
