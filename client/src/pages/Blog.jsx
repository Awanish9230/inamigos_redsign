import React, { useRef, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SceneCanvas from '../components/3d/SceneCanvas';
import BlogScene from '../components/3d/BlogScene';
import PageTransition from '../components/layout/PageTransition';
import { Skeleton } from '../components/ui/Skeleton';
import SmartImage from '../components/ui/SmartImage';
import { IMAGES } from '../config/images';

gsap.registerPlugin(ScrollTrigger);

const Blog = () => {
  const mainRef = useRef(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/blogs`);
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (loading) return;
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
  }, [loading]);

  const featuredPost = blogs.length > 0 ? blogs[0] : null;
  const regularPosts = blogs.length > 1 ? blogs.slice(1) : [];

  return (
    <PageTransition>
    <div ref={mainRef}>
      <Helmet>
        <title>Blog - InAmigos Foundation</title>
      </Helmet>
      
      {/* 1. Background image layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SmartImage
          src={IMAGES.blog.featured}
          alt="Blog background"
          className="absolute inset-0 w-full h-full"
          fallbackSeed="writing"
        />
        {/* 2. Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A]/80 via-[#0D1B2A]/60 to-[#0D1B2A]/90" />
      </div>

      <div className="fixed inset-0 z-10 pointer-events-none">
        <SceneCanvas>
          <BlogScene />
        </SceneCanvas>
      </div>

      <section className="relative w-full h-screen min-h-screen flex flex-col justify-center items-center pt-20 z-20 text-center overflow-hidden">
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
          {loading ? (
            <Skeleton className="w-full h-96 mb-16 rounded-3xl" />
          ) : featuredPost ? (
            <div className="mb-16 bg-primary/20 border border-light/10 rounded-3xl overflow-hidden flex flex-col md:flex-row group hover:shadow-[0_0_30px_rgba(27,42,107,0.4)] transition duration-500">
              <div className="md:w-1/2 h-64 md:h-auto bg-dark/50 relative overflow-hidden group">
                <SmartImage 
                  src={featuredPost.coverImage || IMAGES.blog.post1} 
                  alt={featuredPost.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  fallbackSeed="blog"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent z-10 md:hidden"></div>
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent rounded-full blur-[80px] opacity-20"></div>
                <div className="inline-block px-3 py-1 bg-green/20 text-green rounded-full text-xs font-bold border border-green/30 w-max mb-6">
                  {featuredPost.category || 'Featured'}
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-light mb-4 group-hover:text-accent transition line-clamp-2">
                  {featuredPost.title}
                </h2>
                <p className="text-light/70 mb-6 text-lg line-clamp-3">
                  {featuredPost.content.substring(0, 150)}...
                </p>
                <div className="flex items-center gap-4 mb-8 z-10 relative">
                  <div className="w-10 h-10 rounded-full bg-light/20 overflow-hidden">
                     <SmartImage 
                       src={IMAGES.blog.authorDefault} 
                       alt={featuredPost.author || 'Author'} 
                       className="w-full h-full"
                       fallbackSeed="face"
                     />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-light">{featuredPost.author || 'InAmigos Team'}</div>
                    <div className="text-xs text-light/50">
                      {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                </div>
                <button className="bg-transparent border border-light/30 text-light px-8 py-3 rounded-full hover:bg-light/10 transition w-max">
                  Read Story →
                </button>
              </div>
            </div>
          ) : null}

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Blog Grid */}
            <div className="lg:w-2/3">
              <h3 className="text-2xl font-display font-bold mb-8 border-b border-light/10 pb-4">Latest Articles</h3>
              
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 blog-grid">
                  {[1, 2, 3, 4].map(i => (
                    <Skeleton key={i} className="h-80 w-full" />
                  ))}
                </div>
              ) : regularPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 blog-grid">
                  {regularPosts.map((post, index) => (
                    <div key={post._id || post.slug} className="blog-card bg-dark/40 border border-light/10 rounded-2xl overflow-hidden hover:-translate-y-2 transition duration-300 group">
                      <div className="h-48 bg-primary/20 relative overflow-hidden group-hover:scale-105 transition duration-500">
                        <SmartImage 
                          src={post.coverImage || IMAGES.blog[`post${(index % 6) + 1}`]} 
                          alt={post.title}
                          className="absolute inset-0 w-full h-full"
                          fallbackSeed={`post${index}`}
                        />
                      </div>
                      <div className="p-6">
                        <div className="inline-block px-3 py-1 bg-light/10 text-light/80 rounded-full text-xs font-semibold mb-4">
                          {post.category || 'Article'}
                        </div>
                        <h4 className="text-xl font-display font-bold text-light mb-3 group-hover:text-accent transition line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-light/60 text-sm mb-6 line-clamp-2">
                          {post.content.substring(0, 100)}...
                        </p>
                        <div className="flex items-center justify-between text-xs text-light/40">
                          <span>{post.author || 'InAmigos Team'}</span>
                          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-light/50 border border-dashed border-light/10 rounded-2xl">
                  No articles found at the moment. Check back soon!
                </div>
              )}
              
              {!loading && regularPosts.length > 0 && (
                <div className="mt-12 text-center">
                  <button className="bg-transparent text-accent font-semibold hover:text-accent/80 transition">
                    Load More Articles ↓
                  </button>
                </div>
              )}
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
