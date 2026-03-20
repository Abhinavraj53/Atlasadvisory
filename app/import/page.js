'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Ship, Globe, CheckCircle2, Truck, Shield, Zap } from 'lucide-react';

export default function ImportPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to submit import requests');
      return;
    }

    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch('/api/import-requests', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        alert('Import request submitted successfully!');
        e.target.reset();
      } else {
        const result = await res.json();
        alert(result.error || 'Failed to submit request');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://images.pexels.com/photos/32399138/pexels-photo-32399138.jpeg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-background" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center text-white"
            >
              <Badge className="mb-6 px-6 py-2 bg-white/20 text-white border-white/30">
                <Globe className="h-3 w-3 mr-2" />
                Global Sourcing
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Import Non-Ferrous Scrap
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                Source high-quality scrap materials from global markets with our import facilitation services
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                { icon: Globe, title: '15+ Countries', desc: 'Global sourcing network' },
                { icon: Shield, title: 'Quality Assured', desc: 'Verified suppliers only' },
                { icon: Truck, title: 'Port Delivery', desc: 'Direct to your port' }
              ].map((feature, idx) => (
                <FeatureCard key={idx} {...feature} delay={idx * 0.1} />
              ))}
            </div>

            {/* Materials */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-8">Materials We Source</h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {[
                  'Aluminum Scrap',
                  'Copper Scrap',
                  'Brass Scrap',
                  'Bronze Scrap',
                  'Stainless Steel',
                  'Zinc Scrap',
                  'Lead Scrap',
                  'Nickel Scrap'
                ].map((material) => (
                  <Badge key={material} variant="secondary" className="text-sm px-4 py-2">
                    <CheckCircle2 className="h-3 w-3 mr-2" />
                    {material}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Request Form */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <Badge className="mb-4 px-6 py-2">
                  <Ship className="h-3 w-3 mr-2" />
                  Submit Request
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Get Started Today
                </h2>
                <p className="text-xl text-muted-foreground">
                  Fill in your requirements and we'll get back to you within 24 hours
                </p>
              </motion.div>

              <Card className="border-2">
                <CardContent className="pt-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label className="text-base">Material Type *</Label>
                      <Input 
                        name="materialType" 
                        placeholder="e.g., Aluminum Scrap" 
                        required 
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-base">Quantity (Tons) *</Label>
                      <Input 
                        name="quantity" 
                        type="number" 
                        placeholder="e.g., 100" 
                        required 
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-base">Preferred Country *</Label>
                      <Input 
                        name="country" 
                        placeholder="e.g., USA, UAE, UK" 
                        required 
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-base">Port of Delivery</Label>
                      <Input 
                        name="port" 
                        placeholder="e.g., Mumbai, Chennai" 
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-base">Additional Details</Label>
                      <Textarea 
                        name="description" 
                        rows={4} 
                        placeholder="Specify quality requirements, delivery timeline, etc."
                        className="mt-2"
                      />
                    </div>
                    
                    <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
                      {loading ? 'Submitting...' : 'Submit Import Request'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
          <div className="container mx-auto px-4 text-center">
            <Zap className="h-12 w-12 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Need Urgent Sourcing?</h2>
            <p className="text-xl mb-8 opacity-90">Contact our team directly for immediate assistance</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Call +91 98765 43210
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Email Us
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -5 }}
    >
      <Card className="text-center h-full hover:shadow-lg transition-all">
        <CardContent className="pt-8 pb-6">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-primary/20 blur-2xl" />
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Icon className="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground">{desc}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}