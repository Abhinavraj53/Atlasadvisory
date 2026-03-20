'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  User, 
  Package, 
  Ship, 
  Shield, 
  Plus,
  Edit,
  Trash2,
  Crown
} from 'lucide-react';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }

    try {
      const res = await fetch('/api/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        router.push('/');
      }
    } catch (error) {
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateListing = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        alert('Listing created successfully!');
        e.target.reset();
      } else {
        const result = await res.json();
        alert(result.error || 'Failed to create listing');
      }
    } catch (error) {
      console.error('Create listing error:', error);
      alert('An error occurred');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        <section className="py-12 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">Welcome, {user?.name}!</h1>
                  <p className="text-muted-foreground">Manage your account and listings</p>
                </div>
                {user?.membershipStatus === 'active' ? (
                  <Badge className="gap-2 px-4 py-2 text-lg">
                    <Crown className="h-4 w-4" />
                    Premium Member
                  </Badge>
                ) : (
                  <Badge variant="outline" className="gap-2 px-4 py-2">
                    Free Account
                  </Badge>
                )}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Account Type</p>
                      <p className="text-2xl font-bold">{user?.role}</p>
                    </div>
                    <User className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Membership</p>
                      <p className="text-2xl font-bold">
                        {user?.membershipStatus === 'active' ? 'Active' : 'Inactive'}
                      </p>
                    </div>
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Company</p>
                      <p className="text-2xl font-bold">{user?.companyName || 'N/A'}</p>
                    </div>
                    <Package className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Membership Upgrade CTA */}
            {user?.membershipStatus !== 'active' && (
              <Card className="mb-8 border-2 border-primary/50 bg-gradient-to-r from-primary/10 to-accent/10">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Upgrade to Premium</h3>
                      <p className="text-muted-foreground mb-4">
                        Get unlimited access to marketplace features for just ₹5,000/year
                      </p>
                      <ul className="space-y-2 text-sm mb-4">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                          Unlimited listings
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                          Priority support
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                          Exclusive deals
                        </li>
                      </ul>
                    </div>
                    <Button size="lg" className="gap-2">
                      <Crown className="h-4 w-4" />
                      Contact Admin
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tabs */}
            <Tabs defaultValue="listings" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 md:w-auto">
                <TabsTrigger value="listings">My Listings</TabsTrigger>
                <TabsTrigger value="create">Create Listing</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>

              {/* My Listings Tab */}
              <TabsContent value="listings">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Scrap Listings</CardTitle>
                    <CardDescription>Manage your posted listings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-4">No listings yet</p>
                      <Button>Create Your First Listing</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Create Listing Tab */}
              <TabsContent value="create">
                <Card>
                  <CardHeader>
                    <CardTitle>Create New Listing</CardTitle>
                    <CardDescription>Post your scrap materials for sale</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCreateListing} className="space-y-6">
                      <div>
                        <Label>Title *</Label>
                        <Input 
                          name="title" 
                          placeholder="e.g., High-Quality Steel Scrap" 
                          required 
                          className="mt-2"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>Category *</Label>
                          <Select name="category" required>
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Ferrous">Ferrous</SelectItem>
                              <SelectItem value="Non-Ferrous">Non-Ferrous</SelectItem>
                              <SelectItem value="Plastic">Plastic</SelectItem>
                              <SelectItem value="Paper">Paper</SelectItem>
                              <SelectItem value="E-Waste">E-Waste</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label>Scrap Type *</Label>
                          <Input 
                            name="scrapType" 
                            placeholder="e.g., MS Scrap" 
                            required 
                            className="mt-2"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Label>Quantity *</Label>
                          <Input 
                            name="quantity" 
                            placeholder="e.g., 100 Tons" 
                            required 
                            className="mt-2"
                          />
                        </div>

                        <div>
                          <Label>Capacity</Label>
                          <Input 
                            name="capacity" 
                            placeholder="e.g., 500 Tons/month" 
                            className="mt-2"
                          />
                        </div>

                        <div>
                          <Label>Price (₹) *</Label>
                          <Input 
                            name="price" 
                            type="number" 
                            placeholder="e.g., 45000" 
                            required 
                            className="mt-2"
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Location *</Label>
                        <Input 
                          name="location" 
                          placeholder="e.g., Mumbai, Maharashtra" 
                          required 
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label>Description *</Label>
                        <Textarea 
                          name="description" 
                          rows={4} 
                          placeholder="Describe your scrap material, quality, specifications, etc."
                          required 
                          className="mt-2"
                        />
                      </div>

                      <Button type="submit" className="w-full" size="lg">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Listing
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Your account details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm text-muted-foreground">Name</Label>
                        <p className="text-lg font-semibold">{user?.name}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Email</Label>
                        <p className="text-lg font-semibold">{user?.email}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Phone</Label>
                        <p className="text-lg font-semibold">{user?.phone || 'N/A'}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Role</Label>
                        <p className="text-lg font-semibold capitalize">{user?.role}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Company</Label>
                        <p className="text-lg font-semibold">{user?.companyName || 'N/A'}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">City</Label>
                        <p className="text-lg font-semibold">{user?.city || 'N/A'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}