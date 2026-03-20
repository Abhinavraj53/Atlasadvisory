'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useMemo, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowRight, 
  Package, 
  Users, 
  MapPin, 
  Award,
  CheckCircle2,
  TrendingUp,
  Ship,
  Globe,
  Building2,
  Sparkles,
  Shield,
  Zap,
  Phone,
  Star
} from 'lucide-react';

export default function ScrapBusinessPage() {
  const { scrollY } = useScroll();
  const heroRef = useRef(null);
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => {
        const seed = i + 1;
        return {
          id: i,
          left: (seed * 37.7) % 100,
          top: (seed * 53.3) % 100,
          duration: 3 + ((seed * 0.61) % 2),
          delay: (seed * 0.41) % 2,
        };
      }),
    []
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Hero Section - Cinematic */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: 'url(https://images.pexels.com/photos/32399141/pexels-photo-32399141.jpeg)',
                transform: `translateY(${scrollY.get() * 0.5}px)`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-60" />
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-2 h-2 bg-primary/30 rounded-full"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                }}
              />
            ))}
          </div>

          {/* Hero Content */}
          <div className="container mx-auto px-4 relative z-10 text-center pt-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="max-w-5xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <Badge className="mb-6 px-6 py-2 text-sm bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30 transition-colors">
                  <Sparkles className="h-3 w-3 mr-2" />
                  Scrap Business by Atlas Advisory
                </Badge>
              </motion.div>

              <motion.h1 
                className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <span className="text-white block mb-4 drop-shadow-2xl">Scale Your</span>
                <span className="text-white drop-shadow-2xl" style={{ 
                  background: 'linear-gradient(to right, #00C896, #0B3D2E, #3b82f6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Scrap Business
                </span>
              </motion.h1>

              <motion.p 
                className="text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Atlas Advisory's scrap business vertical for verified trading, sourcing, and liquidation.
                <span className="block mt-2 text-lg text-gray-200">
                  Facilitating imports, DRT/NCLT deals, and sustainable recycling solutions.
                </span>
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <Link href="/marketplace">
                  <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-white shadow-2xl shadow-primary/50 hover:shadow-primary/70 transition-all">
                    Explore Marketplace <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/import">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="gap-2 text-lg px-8 py-6 border-2 border-white/50 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                  >
                    <Ship className="h-5 w-5" /> Import Services
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Trust Counters - Animated */}
        <section className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '50,000+', label: 'Tons Recycled', icon: Package, color: 'text-blue-500' },
                { value: '500+', label: 'Happy Clients', icon: Users, color: 'text-green-500' },
                { value: '25+', label: 'Cities Served', icon: MapPin, color: 'text-purple-500' },
                { value: '10+', label: 'Years Experience', icon: Award, color: 'text-orange-500' }
              ].map((stat, idx) => (
                <StatCard key={idx} {...stat} delay={idx * 0.1} />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works - Interactive */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 px-6 py-2">
                <Zap className="h-3 w-3 mr-2" />
                Simple Process
              </Badge>
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                How It <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Works</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Get started in four simple steps and experience seamless trading
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-20" />
              
              {[
                { 
                  step: '01', 
                  title: 'Register', 
                  desc: 'Create your free account in minutes', 
                  icon: Users,
                  gradient: 'from-blue-500 to-cyan-500'
                },
                { 
                  step: '02', 
                  title: 'Post Scrap', 
                  desc: 'List your materials with details', 
                  icon: Package,
                  gradient: 'from-purple-500 to-pink-500'
                },
                { 
                  step: '03', 
                  title: 'Get Best Price', 
                  desc: 'Receive competitive offers instantly', 
                  icon: TrendingUp,
                  gradient: 'from-orange-500 to-red-500'
                },
                { 
                  step: '04', 
                  title: 'Pickup & Pay', 
                  desc: 'Easy collection and secure payment', 
                  icon: CheckCircle2,
                  gradient: 'from-green-500 to-emerald-500'
                }
              ].map((item, idx) => (
                <ProcessStep key={idx} {...item} delay={idx * 0.15} />
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid - Premium */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-6 px-6 py-2">
                <Building2 className="h-3 w-3 mr-2" />
                Our Services
              </Badge>
              <h2 className="text-5xl md:text-6xl font-bold mb-6">Comprehensive Solutions</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need for successful scrap trading
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'B2B Marketplace',
                  desc: 'Connect with verified buyers and sellers across India',
                  icon: Package,
                  link: '/marketplace',
                  image: 'https://images.pexels.com/photos/9784001/pexels-photo-9784001.jpeg',
                  features: ['Live Listings', 'Instant Inquiry', 'Secure Deals']
                },
                {
                  title: 'Import Services',
                  desc: 'Global sourcing of non-ferrous scrap materials',
                  icon: Ship,
                  link: '/import',
                  image: 'https://images.pexels.com/photos/32399138/pexels-photo-32399138.jpeg',
                  features: ['15+ Countries', 'Quality Assured', 'Port Delivery']
                },
                {
                  title: 'DRT/NCLT Assets',
                  desc: 'Exclusive access to liquidation asset deals',
                  icon: Building2,
                  link: '/drt-assets',
                  image: 'https://images.pexels.com/photos/34840277/pexels-photo-34840277.jpeg',
                  features: ['Commercial', 'Industrial', 'Residential']
                }
              ].map((service, idx) => (
                <ServiceCard key={idx} {...service} delay={idx * 0.2} />
              ))}
            </div>
          </div>
        </section>

        {/* Membership CTA - Premium */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center text-white"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ repeat: Infinity, duration: 5 }}
                className="inline-block mb-8"
              >
                <Sparkles className="h-16 w-16" />
              </motion.div>
              
              <h2 className="text-5xl md:text-7xl font-bold mb-6">
                Unlock Premium Features
              </h2>
              <p className="text-xl md:text-2xl mb-12 text-white/90 leading-relaxed">
                Get unlimited marketplace access, priority support, and exclusive deals
                <span className="block mt-4 text-3xl font-bold">
                  Just ₹5,000/year
                </span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/dashboard">
                  <Button size="lg" variant="secondary" className="gap-2 text-lg px-8 py-6 w-full sm:w-auto font-semibold">
                    <Shield className="h-5 w-5" /> Join Premium
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="gap-2 text-lg px-8 py-6 border-2 border-white bg-white/10 text-white hover:bg-white/20 w-full sm:w-auto font-semibold backdrop-blur-sm"
                >
                  Learn More <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-6 px-6 py-2">
                <Star className="h-3 w-3 mr-2" />
                Testimonials
              </Badge>
              <h2 className="text-5xl md:text-6xl font-bold mb-6">Trusted by Industry Leaders</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Rajesh Kumar',
                  company: 'Steel Industries Ltd',
                  text: 'Outstanding platform! We sold 50 tons of steel scrap at the best market rates. The process was transparent and efficient.',
                  rating: 5,
                  avatar: 'RK'
                },
                {
                  name: 'Priya Sharma',
                  company: 'Green Recycling Co',
                  text: 'The import service is exceptional. We sourced quality aluminum scrap from UAE with zero hassle. Highly recommend!',
                  rating: 5,
                  avatar: 'PS'
                },
                {
                  name: 'Mohammed Ali',
                  company: 'Industrial Solutions',
                  text: 'Professional service and transparent pricing. The team is responsive and understands our business needs perfectly.',
                  rating: 5,
                  avatar: 'MA'
                }
              ].map((testimonial, idx) => (
                <TestimonialCard key={idx} {...testimonial} delay={idx * 0.15} />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Floating WhatsApp */}
      <motion.a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <Phone className="h-6 w-6" />
      </motion.a>

      <Footer />
    </div>
  );
}

// Stat Card Component
function StatCard({ value, label, icon: Icon, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="text-center group cursor-pointer"
    >
      <div className="relative inline-block mb-4">
        <div className="absolute inset-0 bg-primary/20 blur-2xl group-hover:bg-primary/30 transition-all" />
        <Icon className={`h-12 w-12 ${color} relative z-10 transition-transform group-hover:scale-110`} />
      </div>
      <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
        {value}
      </div>
      <div className="text-sm md:text-base text-muted-foreground">{label}</div>
    </motion.div>
  );
}

// Process Step Component
function ProcessStep({ step, title, desc, icon: Icon, gradient, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -10 }}
      className="relative group"
    >
      <Card className="h-full border-2 hover:border-primary/50 transition-all overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full -mr-16 -mt-16" />
        
        <CardContent className="pt-8 pb-6 relative">
          <div className="relative inline-block mb-6">
            <div className={`absolute inset-0 bg-gradient-to-r ${gradient} blur-xl opacity-50 group-hover:opacity-70 transition-opacity`} />
            <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center transform group-hover:rotate-6 transition-transform`}>
              <Icon className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <div className="text-6xl font-bold text-primary/10 mb-4">{step}</div>
          <h3 className="text-2xl font-bold mb-3">{title}</h3>
          <p className="text-muted-foreground">{desc}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Service Card Component
function ServiceCard({ title, desc, icon: Icon, link, image, features, delay }) {
  return (
    <Link href={link}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6 }}
        whileHover={{ y: -10 }}
        className="group cursor-pointer"
      >
        <Card className="h-full overflow-hidden border-2 hover:border-primary/50 hover:shadow-2xl transition-all">
          <div className="relative h-64 overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            
            <div className="absolute bottom-4 left-4">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-primary blur-xl opacity-50" />
                <div className="relative w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
                  <Icon className="h-7 w-7 text-primary-foreground" />
                </div>
              </div>
            </div>
          </div>
          
          <CardContent className="p-6 flex flex-col" style={{ minHeight: '240px' }}>
            <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-muted-foreground mb-6 flex-grow">{desc}</p>
            
            <div className="space-y-2 mb-6">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-4 transition-all mt-auto">
              Learn More <ArrowRight className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}

// Testimonial Card Component
function TestimonialCard({ name, company, text, rating, avatar, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full border-2 hover:border-primary/50 hover:shadow-xl transition-all">
        <CardContent className="pt-8 pb-6">
          <div className="flex gap-1 mb-6">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          
          <p className="text-muted-foreground mb-6 italic text-lg leading-relaxed">
            "{text}"
          </p>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
              {avatar}
            </div>
            <div>
              <div className="font-semibold text-lg">{name}</div>
              <div className="text-sm text-muted-foreground">{company}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
