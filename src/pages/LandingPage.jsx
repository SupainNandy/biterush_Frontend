import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Navbar from '../components/Navbar';
import { 
  ArrowRight, Star, Clock, Truck, Utensils, ShieldCheck, 
  MapPin, ChevronRight, Flame, Heart, ShoppingBag, PhoneCall,
  Sparkles, Award, Users, CheckCircle2, Play, Search, Filter
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const foodCategories = [
  { id: 'all', name: 'All Dishes', icon: '🍲' },
  { id: 'burgers', name: 'Gourmet Burgers', icon: '🍔' },
  { id: 'pizza', name: 'Woodfired Pizza', icon: '🍕' },
  { id: 'asian', name: 'Asian Express', icon: '🍜' },
  { id: 'healthy', name: 'Healthy Bowls', icon: '🥗' },
  { id: 'desserts', name: 'Sweet Delights', icon: '🍰' }
];

const featuredDishes = [
  {
    id: 1,
    category: 'burgers',
    title: 'Truffle Angus Beast Burger',
    price: '$14.99',
    rating: '4.9',
    reviews: 320,
    time: '20 min',
    cal: '650 kcal',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    tag: 'Chef Special'
  },
  {
    id: 2,
    category: 'pizza',
    title: 'Artisan Neapolitan Margherita',
    price: '$16.50',
    rating: '4.8',
    reviews: 410,
    time: '25 min',
    cal: '780 kcal',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80',
    tag: 'Trending'
  },
  {
    id: 3,
    category: 'asian',
    title: 'Authentic Tokyo Tonkotsu Ramen',
    price: '$13.80',
    rating: '4.95',
    reviews: 580,
    time: '18 min',
    cal: '520 kcal',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    tag: 'Popular'
  },
  {
    id: 4,
    category: 'healthy',
    title: 'Avocado & Quinoa Power Bowl',
    price: '$12.00',
    rating: '4.7',
    reviews: 190,
    time: '15 min',
    cal: '380 kcal',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    tag: 'Organic'
  },
  {
    id: 5,
    category: 'desserts',
    title: 'Molten Belgian Lava Cake',
    price: '$8.99',
    rating: '5.0',
    reviews: 640,
    time: '12 min',
    cal: '450 kcal',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    tag: 'Best Seller'
  },
  {
    id: 6,
    category: 'burgers',
    title: 'Smoked Bacon Cheddar Deluxe',
    price: '$15.20',
    rating: '4.85',
    reviews: 280,
    time: '22 min',
    cal: '720 kcal',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    tag: 'Must Try'
  }
];

const testimonials = [
  {
    name: 'Sophia Reynolds',
    role: 'Food Blogger',
    comment: 'BiteRush delivers food astonishingly fast! The ramen was piping hot like I was sitting in the restaurant.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 5
  },
  {
    name: 'Marcus Chen',
    role: 'Software Architect',
    comment: 'The UI is slick, tracking is pin-point accurate, and ordering takes literally 10 seconds. Best food app experience!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5
  },
  {
    name: 'Elena Rostova',
    role: 'Fitness Coach',
    comment: 'Healthy organic options delivered in under 20 minutes right to my studio. Highly recommended!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5
  }
];

const LandingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('dishes');

  // Refs for GSAP Animations
  const heroTextRef = useRef(null);
  const heroVisualRef = useRef(null);
  const statsRef = useRef(null);
  const categoriesRef = useRef(null);
  const dishesGridRef = useRef(null);
  const howItWorksRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const downloadRef = useRef(null);

  // Initialize Lenis Smooth Scroll & GSAP ScrollTriggers
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Hero Entry Animation
    const heroTl = gsap.timeline();
    heroTl.fromTo(
      heroTextRef.current.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out' }
    ).fromTo(
      heroVisualRef.current,
      { scale: 0.8, opacity: 0, rotation: 6 },
      { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: 'back.out(1.4)' },
      '-=0.6'
    );

    // Stats Section Scroll Trigger
    gsap.fromTo(
      statsRef.current.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 85%',
        }
      }
    );

    // Menu Categories Scroll Trigger
    gsap.fromTo(
      categoriesRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: categoriesRef.current,
          start: 'top 80%',
        }
      }
    );

    // Dishes Grid Scroll Trigger
    gsap.fromTo(
      dishesGridRef.current?.children || [],
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: dishesGridRef.current,
          start: 'top 80%',
        }
      }
    );

    // How It Works Steps Trigger
    gsap.fromTo(
      howItWorksRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: howItWorksRef.current,
          start: 'top 75%',
        }
      }
    );

    // Features Cards Trigger
    gsap.fromTo(
      featuresRef.current.children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 75%',
        }
      }
    );

    // Testimonials Cards Trigger
    gsap.fromTo(
      testimonialsRef.current.children,
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: 'top 80%',
        }
      }
    );

    // App Download Section Trigger
    gsap.fromTo(
      downloadRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: downloadRef.current,
          start: 'top 80%',
        }
      }
    );

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
    };
  }, []);

  const filteredDishes = selectedCategory === 'all'
    ? featuredDishes
    : featuredDishes.filter(d => d.category === selectedCategory);

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans overflow-x-hidden selection:bg-orange-500/30">
      <Navbar />

      {/* Global Glow Elements */}
      <div className="fixed top-0 right-0 w-[650px] h-[650px] bg-orange-500/10 blur-[160px] rounded-full pointer-events-none z-0 translate-x-1/3 -translate-y-1/3" />
      <div className="fixed bottom-0 left-0 w-[550px] h-[550px] bg-red-500/10 blur-[160px] rounded-full pointer-events-none z-0 -translate-x-1/3 translate-y-1/3" />

      {/* HERO SECTION */}
      <section id="hero" className="relative pt-32 sm:pt-40 pb-20 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div ref={heroTextRef} className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/80 border border-orange-500/30 text-orange-400 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md shadow-lg shadow-orange-500/10">
              <Sparkles className="w-4 h-4 text-orange-400 animate-spin" />
              <span>Experience Next-Gen Culinary Delivery</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight text-white">
              Craving Freshness? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-amber-300">
                Delivered In 20 Mins.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Order gourmet meals from top Michelin-starred chefs and trending local spots. Track your driver live with second-by-second precision.
            </p>

            {/* Quick Action Search Bar */}
            <div className="pt-2 max-w-md mx-auto lg:mx-0">
              <div className="p-1.5 bg-neutral-900/90 border border-neutral-800 rounded-2xl sm:rounded-full shadow-2xl flex flex-col sm:flex-row items-center gap-2 backdrop-blur-xl">
                <div className="flex items-center gap-3 pl-4 w-full sm:w-auto py-2 sm:py-0">
                  <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Enter your delivery location..." 
                    className="bg-transparent text-sm outline-none text-white placeholder:text-neutral-500 w-full"
                  />
                </div>
                <Link 
                  to="/signup" 
                  className="w-full sm:w-auto px-7 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-xl sm:rounded-full text-sm shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Social Trust Metrics */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {['1534528741775-53994a69daeb', '1507003211169-0a1dd7228f2d', '1494790108377-be9c29b29330'].map((id, idx) => (
                    <img key={idx} className="w-8 h-8 rounded-full border-2 border-neutral-900 object-cover" src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=100&q=80`} alt="User" />
                  ))}
                </div>
                <span className="font-semibold text-white">50k+ Happy Foodies</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-bold text-white">4.9 / 5.0</span>
                <span>(12k+ Reviews)</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Showcase */}
          <div ref={heroVisualRef} className="relative flex justify-center items-center">
            {/* Glowing Backdrop Circle */}
            <div className="absolute w-[350px] sm:w-[480px] h-[350px] sm:h-[480px] bg-gradient-to-tr from-orange-500/30 via-red-500/20 to-amber-500/30 rounded-full blur-3xl animate-pulse" />
            
            {/* Main Featured Plate Dish */}
            <div className="relative group">
              <div className="p-3 bg-neutral-900/60 backdrop-blur-2xl rounded-[3rem] border border-neutral-700/50 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80" 
                  alt="Gourmet Bowl" 
                  className="w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] rounded-[2.5rem] object-cover shadow-2xl transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>

              {/* Floating Live Order Badge */}
              <div className="absolute -bottom-6 -left-6 sm:left-4 bg-neutral-900/90 backdrop-blur-xl border border-neutral-700/80 p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-[bounce_5s_infinite]">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Order On The Way</p>
                  </div>
                  <p className="text-sm font-extrabold text-white">Arriving in 14 Mins</p>
                </div>
              </div>

              {/* Floating Top Rating Badge */}
              <div className="absolute -top-6 -right-4 bg-neutral-900/90 backdrop-blur-xl border border-neutral-700/80 p-3.5 rounded-2xl shadow-2xl flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center border border-amber-500/40">
                  <Flame className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-400">Hot & Fresh</p>
                  <p className="text-sm font-bold text-white">100% Guaranteed</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* STATS COUNTER BANNER */}
      <section className="border-y border-neutral-800/80 bg-neutral-900/40 py-10 relative z-10 backdrop-blur-md">
        <div ref={statsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">500+</h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium">Partner Restaurants</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">18 Mins</h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium">Average Delivery Time</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">100k+</h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium">Orders Delivered</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">99.8%</h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium">Customer Satisfaction</p>
          </div>
        </div>
      </section>

      {/* MENU & DISHES SECTION */}
      <section id="categories" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div ref={categoriesRef} className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-widest">
            <Utensils className="w-3.5 h-3.5" />
            <span>Exquisite Menu</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Explore Handcrafted Delicacies
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            Sourced from top culinary masters and delivered blazing hot right to your doorstep.
          </p>

          {/* Category Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-6">
            {foodCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 scale-105'
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dishes Grid */}
        <div ref={dishesGridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDishes.map(dish => (
            <div 
              key={dish.id} 
              className="bg-neutral-900/80 backdrop-blur-xl border border-neutral-800/80 rounded-3xl overflow-hidden hover:border-neutral-700 transition-all duration-500 group hover:-translate-y-2 shadow-xl"
            >
              {/* Image & Badge Wrapper */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={dish.image} 
                  alt={dish.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
                
                {/* Tag Badge */}
                <div className="absolute top-4 left-4 bg-neutral-900/80 backdrop-blur-md border border-neutral-700 px-3 py-1 rounded-full text-[11px] font-bold text-orange-400 uppercase tracking-wider">
                  {dish.tag}
                </div>

                {/* Favorite Button */}
                <button className="absolute top-4 right-4 p-2.5 rounded-full bg-neutral-900/80 backdrop-blur-md border border-neutral-700 text-neutral-300 hover:text-red-500 hover:bg-neutral-800 transition-colors">
                  <Heart className="w-4 h-4" />
                </button>

                {/* Rating & Delivery Time Bar */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-1 text-amber-400 bg-neutral-900/90 backdrop-blur-md px-3 py-1 rounded-full border border-neutral-800">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{dish.rating} ({dish.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-neutral-300 bg-neutral-900/90 backdrop-blur-md px-3 py-1 rounded-full border border-neutral-800">
                    <Clock className="w-3.5 h-3.5 text-orange-400" />
                    <span>{dish.time}</span>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                    {dish.title}
                  </h3>
                  <span className="text-xs text-neutral-500 bg-neutral-800 px-2 py-0.5 rounded-md font-mono">{dish.cal}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80">
                  <div>
                    <span className="text-xs text-neutral-400 block">Price</span>
                    <span className="text-xl font-black text-white">{dish.price}</span>
                  </div>
                  <Link
                    to="/signin"
                    className="px-4 py-2 bg-neutral-800 hover:bg-orange-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 group/btn"
                  >
                    <span>Order Now</span>
                    <ShoppingBag className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-24 bg-neutral-900/50 border-y border-neutral-800/80 relative z-10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold uppercase tracking-widest">
              <Clock className="w-3.5 h-3.5" />
              <span>Effortless Steps</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">How BiteRush Works</h2>
            <p className="text-neutral-400 text-base">Satisfy your appetite in 3 quick and seamless steps.</p>
          </div>

          <div ref={howItWorksRef} className="grid md:grid-cols-3 gap-8 relative">
            
            {/* Step 1 */}
            <div className="bg-neutral-950/80 border border-neutral-800 p-8 rounded-3xl relative text-center space-y-5 hover:border-orange-500/50 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-tr from-orange-500 to-red-500 rounded-2xl mx-auto flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-orange-500/20">
                01
              </div>
              <h3 className="text-xl font-bold text-white">Select Your Feast</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Browse hundreds of curated menus from top local kitchens, artisan pizzerias, and sushi bars.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-neutral-950/80 border border-neutral-800 p-8 rounded-3xl relative text-center space-y-5 hover:border-orange-500/50 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-tr from-red-500 to-amber-500 rounded-2xl mx-auto flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-red-500/20">
                02
              </div>
              <h3 className="text-xl font-bold text-white">Live GPS Tracking</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Watch your driver navigate the city in real-time. Know exactly when your food will arrive.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-neutral-950/80 border border-neutral-800 p-8 rounded-3xl relative text-center space-y-5 hover:border-orange-500/50 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-tr from-amber-500 to-emerald-500 rounded-2xl mx-auto flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-emerald-500/20">
                03
              </div>
              <h3 className="text-xl font-bold text-white">Enjoy Hot & Fresh</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Receive thermal-insulated meals sealed for ultimate freshness and safety. Relish every bite!
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* WHY CHOOSE US / FEATURES SECTION */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" />
            <span>Why We Excel</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Engineered For Culinary Excellence</h2>
        </div>

        <div ref={featuresRef} className="grid md:grid-cols-3 gap-8">
          
          <div className="bg-neutral-900/60 backdrop-blur-xl border border-neutral-800 p-8 rounded-3xl hover:bg-neutral-900/90 transition-all duration-300 space-y-4 group">
            <div className="w-14 h-14 bg-orange-500/10 border border-orange-500/30 rounded-2xl flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
              <Truck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">Lightning Fast Delivery</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Our AI dispatch algorithm pairs your order with the nearest rider for non-stop speed.
            </p>
          </div>

          <div className="bg-neutral-900/60 backdrop-blur-xl border border-neutral-800 p-8 rounded-3xl hover:bg-neutral-900/90 transition-all duration-300 space-y-4 group">
            <div className="w-14 h-14 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">100% Hygiene Guarantee</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Strict multi-point kitchen audits and tamper-proof safety seals on every order.
            </p>
          </div>

          <div className="bg-neutral-900/60 backdrop-blur-xl border border-neutral-800 p-8 rounded-3xl hover:bg-neutral-900/90 transition-all duration-300 space-y-4 group">
            <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">Exclusive Chef Specials</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Unlock secret off-menu items and daily discounts exclusive only to BiteRush members.
            </p>
          </div>

        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-24 bg-neutral-900/40 border-t border-neutral-800/80 relative z-10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-widest">
              <Users className="w-3.5 h-3.5" />
              <span>Real Reviews</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Loved By Thousands</h2>
          </div>

          <div ref={testimonialsRef} className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-neutral-950/80 border border-neutral-800/90 p-8 rounded-3xl space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-neutral-300 text-sm italic leading-relaxed">
                    "{t.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-neutral-900">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-neutral-700" />
                  <div>
                    <h4 className="text-sm font-bold text-white">{t.name}</h4>
                    <p className="text-xs text-neutral-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* MOBILE APP PROMO BANNER */}
      <section id="download" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={downloadRef} className="bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 rounded-[3rem] p-8 sm:p-14 relative overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center relative z-10">
            <div className="space-y-6 text-center lg:text-left">
              <span className="bg-white/20 text-white text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-md">
                Mobile App Coming Soon
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                Order On The Go <br /> With BiteRush App
              </h2>
              <p className="text-white/80 text-base max-w-md mx-auto lg:mx-0">
                Get real-time delivery notifications, exclusive mobile coupons, and one-tap reordering.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
                <Link to="/signup" className="px-6 py-3.5 bg-neutral-950 text-white font-bold rounded-2xl hover:bg-neutral-900 transition-colors flex items-center gap-3 text-sm shadow-xl">
                  <span>Join Waitlist</span>
                  <ArrowRight className="w-4 h-4 text-orange-400" />
                </Link>
              </div>
            </div>

            <div className="flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80" 
                alt="App Showcase" 
                className="w-full max-w-[320px] rounded-3xl shadow-2xl border-4 border-white/20 transform rotate-3 hover:rotate-0 transition-transform duration-500 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-900 bg-neutral-950 py-12 relative z-10 text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-tr from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                <Utensils className="text-white w-5 h-5" />
              </div>
              <span className="text-white text-lg font-bold">
                Bite<span className="text-orange-500">Rush</span>
              </span>
            </div>

            <div className="flex flex-wrap gap-6 text-neutral-400">
              <a href="#hero" className="hover:text-white transition-colors">Home</a>
              <a href="#categories" className="hover:text-white transition-colors">Menu</a>
              <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#testimonials" className="hover:text-white transition-colors">Reviews</a>
            </div>

            <p>© {new Date().getFullYear()} BiteRush Inc. All rights reserved.</p>

          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
