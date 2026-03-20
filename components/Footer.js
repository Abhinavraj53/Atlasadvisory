'use client';

import Link from 'next/link';
import { Package, Mail, Phone, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Package className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Atlas Advisory</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              India's premium B2B scrap marketplace by Rareus Private Limited
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@atlasadvisory.com</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Link href="/marketplace" className="block hover:text-primary transition">Marketplace</Link>
              <Link href="/import" className="block hover:text-primary transition">Import Services</Link>
              <Link href="/drt-assets" className="block hover:text-primary transition">DRT/NCLT Assets</Link>
              <Link href="/dashboard" className="block hover:text-primary transition">Dashboard</Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Scrap Trading</p>
              <p>Import Facilitation</p>
              <p>Asset Liquidation</p>
              <p>Premium Membership</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Ferrous Metals</p>
              <p>Non-Ferrous Metals</p>
              <p>Plastic & Paper</p>
              <p>E-Waste</p>
            </div>
          </div>
        </div>
        
        <Separator className="mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 Atlas Advisory - Rareus Private Limited. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}