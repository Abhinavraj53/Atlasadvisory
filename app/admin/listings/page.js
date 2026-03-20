'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Package, Ship, Settings, LayoutDashboard, LogOut, CheckCircle, XCircle, Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminListingsPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingListing, setEditingListing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
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
        if (data.user.role !== 'admin') {
          router.push('/dashboard');
          return;
        }
        fetchListings();
      } else {
        router.push('/');
      }
    } catch (error) {
      router.push('/');
    }
  };

  const fetchListings = async () => {
    try {
      const res = await fetch('/api/listings');
      if (res.ok) {
        const data = await res.json();
        setListings(data.listings || []);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddListing = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Process images from textarea (one per line)
    const imagesText = data.images || '';
    const images = imagesText
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0);
    
    data.images = images;

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
        setShowAddDialog(false);
        e.target.reset();
        fetchListings();
      } else {
        const result = await res.json();
        alert(result.error || 'Failed to create listing');
      }
    } catch (error) {
      console.error('Create error:', error);
      alert('An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateListing = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Process images from textarea (one per line)
    const imagesText = data.images || '';
    const images = imagesText
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0);
    
    data.images = images;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/listings/${editingListing._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        alert('Listing updated successfully!');
        setShowEditDialog(false);
        setEditingListing(null);
        fetchListings();
      } else {
        alert('Failed to update listing');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteListing = async (listingId) => {
    if (!confirm('Are you sure you want to delete this listing?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/listings/${listingId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        alert('Listing deleted successfully!');
        fetchListings();
      } else {
        alert('Failed to delete listing');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('An error occurred');
    }
  };

  const ListingForm = ({ isEdit = false, listing = null, onSubmit }) => (
    <form onSubmit={onSubmit} className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
      <div>
        <Label>Title *</Label>
        <Input name="title" defaultValue={listing?.title} required className="mt-2" />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Category *</Label>
          <Select name="category" defaultValue={listing?.category || 'Ferrous'}>
            <SelectTrigger className="mt-2">
              <SelectValue />
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
          <Input name="scrapType" defaultValue={listing?.scrapType} required className="mt-2" />
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Quantity *</Label>
          <Input name="quantity" defaultValue={listing?.quantity} required className="mt-2" placeholder="e.g., 500 Tons" />
        </div>
        
        <div>
          <Label>Capacity</Label>
          <Input name="capacity" defaultValue={listing?.capacity} className="mt-2" placeholder="e.g., 2000 Tons/month" />
        </div>
        
        <div>
          <Label>Price (₹) *</Label>
          <Input name="price" type="number" defaultValue={listing?.price} required className="mt-2" />
        </div>
      </div>
      
      <div>
        <Label>Location *</Label>
        <Input name="location" defaultValue={listing?.location} required className="mt-2" placeholder="e.g., Mumbai, Maharashtra" />
      </div>
      
      <div>
        <Label>Description *</Label>
        <Textarea name="description" defaultValue={listing?.description} rows={3} required className="mt-2" />
      </div>

      <div>
        <Label>Image URLs (one per line)</Label>
        <Textarea 
          name="images" 
          defaultValue={listing?.images?.join('\n') || ''} 
          rows={3} 
          className="mt-2" 
          placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Enter image URLs (one per line). Configure Cloudinary in Settings for image upload.
        </p>
      </div>
      
      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? 'Saving...' : isEdit ? 'Update Listing' : 'Create Listing'}
      </Button>
    </form>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-muted/30 border-r p-6 z-50">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <p className="text-sm text-muted-foreground">Atlas Advisory</p>
        </div>

        <nav className="space-y-2">
          <Link href="/admin">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/admin/users">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Users className="h-4 w-4" />
              Users
            </Button>
          </Link>
          <Link href="/admin/listings">
            <Button variant="default" className="w-full justify-start gap-2">
              <Package className="h-4 w-4" />
              Listings
            </Button>
          </Link>
          <Link href="/admin/import-requests">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Ship className="h-4 w-4" />
              Import Requests
            </Button>
          </Link>
          <Link href="/admin/settings">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </Link>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Link href="/">
            <Button variant="outline" className="w-full gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Listings Management</h1>
            <p className="text-muted-foreground">View and manage all marketplace listings</p>
          </div>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Listing
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Create New Listing</DialogTitle>
                <DialogDescription>Add a new scrap listing to the marketplace</DialogDescription>
              </DialogHeader>
              <ListingForm onSubmit={handleAddListing} />
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Listings ({listings.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {listings.map((listing) => (
                      <TableRow key={listing._id}>
                        <TableCell className="font-medium max-w-xs">
                          <div className="truncate">{listing.title}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{listing.category}</Badge>
                        </TableCell>
                        <TableCell className="font-semibold">
                          ₹{listing.price}
                        </TableCell>
                        <TableCell>{listing.location}</TableCell>
                        <TableCell>
                          {listing.status === 'active' ? (
                            <Badge className="gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="gap-1">
                              <XCircle className="h-3 w-3" />
                              Inactive
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {new Date(listing.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setEditingListing(listing);
                                setShowEditDialog(true);
                              }}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDeleteListing(listing._id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Listing</DialogTitle>
              <DialogDescription>Update listing information</DialogDescription>
            </DialogHeader>
            {editingListing && (
              <ListingForm isEdit listing={editingListing} onSubmit={handleUpdateListing} />
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
