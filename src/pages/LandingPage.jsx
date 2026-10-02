import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight, Star, Clock, Truck, Utensils } from 'lucide-react';
import Navbar from '../components/Navbar';

const LandingPage = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(textRef.current.children, 
      { y: 40, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
    )
    .fromTo(imageRef.current,
      { scale: 0.8, opacity: 0, rotation: 10 },
      { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: "back.out(1.5)" },
      "-=0.6"
    )
    .fromTo(featuresRef.current.children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.5"
    );
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 text-white overflow-x-hidden selection:bg-orange-500/30">
      <Navbar />
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 blur-[150px] rounded-full -z-10 translate-x-1/4 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-500/10 blur-[150px] rounded-full -z-10 -translate-x-1/4 translate-y-1/4 pointer-events-none" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 min-h-screen flex flex-col justify-center" ref={heroRef}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div ref={textRef} className="space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-800/50 border border-neutral-700/50 text-orange-400 text-sm font-semibold tracking-wide backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              Fast Delivery in 30 Mins
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
              Delicious Food <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                Delivered To You
              </span>
            </h1>
            <p className="text-xl text-neutral-400 max-w-lg leading-relaxed">
              Explore top-rated restaurants, get fresh food delivered to your door step, and enjoy your meal anytime.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/signup" className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-full hover:shadow-[0_0_30px_-5px_rgba(249,115,22,0.5)] transition-all flex items-center gap-2 group transform hover:-translate-y-1">
                Order Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/signin" className="px-8 py-4 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white font-bold rounded-full transition-all transform hover:-translate-y-1">
                Browse Menu
              </Link>
            </div>
          </div>

          <div ref={imageRef} className="relative z-10 flex items-center justify-center lg:h-[600px] mt-10 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="relative group">
              <img 
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Delicious Bowl" 
                className="w-full max-w-[450px] rounded-full shadow-2xl border-8 border-neutral-800/80 object-cover aspect-square transition-transform duration-700 group-hover:scale-[1.02]"
              />
              {/* Floating badges */}
              <div className="absolute top-8 -right-4 md:right-0 bg-neutral-800/80 backdrop-blur-md border border-neutral-700 p-4 rounded-2xl flex items-center gap-3 shadow-xl animate-[bounce_4s_infinite]">
                <div className="bg-orange-500 p-2.5 rounded-xl">
                  <Star className="w-5 h-5 text-white" fill="currentColor" />
                </div>
                <div>
                  <p className="text-base font-bold text-white">4.9/5</p>
                  <p className="text-xs text-neutral-400 font-medium">Top Rated</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref={featuresRef} className="grid sm:grid-cols-3 gap-6 mt-24">
          {[
            { icon: <Clock className="w-7 h-7 text-orange-400" />, title: "Fast Delivery", desc: "Get your food in under 30 minutes" },
            { icon: <Utensils className="w-7 h-7 text-orange-400" />, title: "Best Chefs", desc: "Top-rated chefs from around the city" },
            { icon: <Truck className="w-7 h-7 text-orange-400" />, title: "Free Tracking", desc: "Track your order in real-time" }
          ].map((feat, i) => (
            <div key={i} className="bg-neutral-800/40 backdrop-blur-md border border-neutral-700/50 p-6 rounded-[2rem] hover:bg-neutral-800/80 transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="bg-neutral-700/50 w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-orange-500/20 transition-colors">
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{feat.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
