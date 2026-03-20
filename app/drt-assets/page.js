'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, IndianRupee, FileText } from 'lucide-react';

export default function DRTAssetsPage() {
  const [assets, setAssets] = useState([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssets();
  }, [category]);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const url = category === 'all' 
        ? '/api/drt-assets'
        : `/api/drt-assets?category=${category}`;
      const res = await fetch(url);
      const data = await res.json();
      setAssets(data.assets || []);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', 'Commercial', 'Industrial', 'Residential', 'Machinery'];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://images.pexels.com/photos/34840277/pexels-photo-34840277.jpeg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-background" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center text-white"
            >
              <Badge className="mb-6 px-6 py-2 bg-white/20 text-white border-white/30">
                <Building2 className="h-3 w-3 mr-2" />
                Asset Liquidation
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                DRT/NCLT <span className="block">Asset Deals</span>
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                Exclusive access to commercial, industrial, and residential assets under liquidation
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 border-b bg-background sticky top-20 z-40">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
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

        {/* Assets Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
                <p className="mt-4 text-muted-foreground">Loading assets...</p>
              </div>
            ) : assets.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {assets.map((asset, idx) => (
                  <AssetCard key={asset._id} asset={asset} delay={idx * 0.05} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Building2 className="h-20 w-20 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-2xl font-semibold mb-2">No assets available</h3>
                <p className="text-muted-foreground">Check back later for new listings</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Looking for Specific Assets?</h2>
            <p className="text-xl mb-8 opacity-90">Contact our team for personalized assistance</p>
            <Button size="lg" variant="secondary">
              Contact Us
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function AssetCard({ asset, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full hover:shadow-xl transition-all border-2 hover:border-primary/50">
        <div className="aspect-video bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.3)_100%)]" />
          <Building2 className="h-20 w-20 text-blue-500/40 relative z-10" />
        </div>
        <CardHeader>
          <Badge className="w-fit mb-2" variant="secondary">{asset.category}</Badge>
          <CardTitle className="text-xl line-clamp-1">{asset.title}</CardTitle>
          <CardDescription className="line-clamp-2">{asset.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm mb-6">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type:</span>
              <span className="font-semibold">{asset.assetType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Reserve Price:</span>
              <span className="font-semibold text-lg text-primary">₹{asset.reservePrice}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{asset.location}</span>
            </div>
          </div>
          <Button className="w-full" variant="outline">
            View Details
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}