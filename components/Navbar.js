'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Package, Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import AuthDialog from './AuthDialog';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchProfile(token);
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchProfile = async (token) => {
    try {
      const res = await fetch('/api/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/';
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/marketplace', label: 'Marketplace' },
    { href: '/import', label: 'Import' },
    { href: '/drt-assets', label: 'DRT/NCLT' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-background/95 backdrop-blur-lg border-b shadow-sm' : 'bg-black/30 backdrop-blur-md'
        }`}
      >
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Package className={`h-8 w-8 transition-transform group-hover:scale-110 ${scrolled ? 'text-primary' : 'text-white'}`} />
              <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/30 transition-all" />
            </div>
            <div>
              <span className={`text-xl font-bold block leading-tight ${scrolled ? 'text-foreground' : 'text-white'}`}>Atlas Advisory</span>
              <span className={`text-xs ${scrolled ? 'text-muted-foreground' : 'text-gray-300'}`}>by Rareus</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium hover:text-primary transition-colors relative group ${scrolled ? '' : 'text-white'}`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link href={user.role === 'admin' ? '/admin' : '/dashboard'}>
                  <Button 
                    size="sm" 
                    className={`gap-2 ${scrolled ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-white text-primary hover:bg-white/90'}`}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span className="font-semibold">Dashboard</span>
                  </Button>
                </Link>
                <Button 
                  size="sm" 
                  onClick={handleLogout} 
                  className={`gap-2 ${scrolled ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : 'bg-red-600 text-white hover:bg-red-700'}`}
                >
                  <LogOut className="h-4 w-4" />
                  <span className="font-semibold">Logout</span>
                </Button>
              </>
            ) : (
              <AuthDialog 
                onSuccess={(userData) => setUser(userData)} 
                trigger={
                  <Button 
                    size="sm" 
                    className={scrolled ? 'bg-primary hover:bg-primary/90' : 'bg-white text-primary hover:bg-white/90'}
                  >
                    <span className="font-semibold">Login / Register</span>
                  </Button>
                }
              />
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${scrolled ? '' : 'text-white hover:text-white hover:bg-white/10'}`}
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {mobileMenu && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 left-0 w-full bg-background/98 backdrop-blur-lg border-b z-40 md:hidden"
        >
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenu(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t space-y-2">
              {user ? (
                <>
                  <Link href={user.role === 'admin' ? '/admin' : '/dashboard'}>
                    <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setMobileMenu(false)}>
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full gap-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 border-0"
                    onClick={() => {
                      handleLogout();
                      setMobileMenu(false);
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <AuthDialog onSuccess={(userData) => {
                  setUser(userData);
                  setMobileMenu(false);
                }} />
              )}
            </div>
          </nav>
        </motion.div>
      )}
    </>
  );
}