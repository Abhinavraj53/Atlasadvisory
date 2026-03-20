'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Package, MapPin, Search, Filter, Phone } from 'lucide-react';

export default function MarketplacePage() {
  const [listings, setListings] = useState([]);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, [category]);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const url = category === 'all' 
        ? '/api/listings'
        : `/api/listings?category=${category}`;
      const res = await fetch(url);
      const data = await res.json();
      setListings(data.listings || []);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInquiry = async (listingId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to send inquiries');
      return;
    }

    const message = prompt('Enter your inquiry message:');
    if (!message) return;

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ listingId, message })
      });

      if (res.ok) {
        alert('Inquiry sent successfully!');
      } else {
        alert('Failed to send inquiry');
      }
    } catch (error) {
      console.error('Inquiry error:', error);
    }
  };

  const categories = ['all', 'Ferrous', 'Non-Ferrous', 'Plastic', 'Paper', 'E-Waste'];

  const filteredListings = listings.filter(listing => 
    listing.title.toLowerCase().includes(search.toLowerCase()) ||
    listing.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center"
            >
              <Badge className="mb-4 px-6 py-2">
                <Package className="h-3 w-3 mr-2" />
                Live Marketplace
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                B2B Scrap <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Marketplace</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Browse verified scrap listings from trusted sellers across India
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search listings..."
                  className="pl-12 h-14 text-lg"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b bg-background sticky top-20 z-40">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              <Filter className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={category === cat ? 'default' : 'outline'}
                  onClick={() => setCategory(cat)}
                  size="sm"
                  className="flex-shrink-0"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Listings Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
                <p className="mt-4 text-muted-foreground">Loading listings...</p>
              </div>
            ) : filteredListings.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {filteredListings.map((listing, idx) => (
                  <ListingCard key={listing._id} listing={listing} onInquiry={handleInquiry} delay={idx * 0.05} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Package className="h-20 w-20 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-2xl font-semibold mb-2">No listings found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filters or check back later</p>
                <Link href="/dashboard">
                  <Button>Post Your Listing</Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ListingCard({ listing, onInquiry, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full hover:shadow-xl transition-all border-2 hover:border-primary/50">
        <div className="aspect-video bg-gradient-to-br from-primary/10 via-accent/10 to-blue-500/10 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.3)_100%)]" />
          <Package className="h-20 w-20 text-primary/40 relative z-10" />
        </div>
        <CardHeader>
          <div className="flex justify-between items-start mb-2">
            <Badge variant="secondary">{listing.category}</Badge>
            {listing.capacity && <Badge variant="outline">{listing.capacity}</Badge>}
          </div>
          <CardTitle className="text-xl line-clamp-1">{listing.title}</CardTitle>
          <CardDescription className="line-clamp-2">{listing.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm mb-6">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Quantity:</span>
              <span className="font-semibold">{listing.quantity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Price:</span>
              <span className="font-semibold text-lg text-primary">₹{listing.price}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{listing.location}</span>
            </div>
          </div>
          <Button className="w-full" onClick={() => onInquiry(listing._id)}>
            Send Inquiry
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}