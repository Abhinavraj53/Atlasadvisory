'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Users, Package, Ship, Settings, LayoutDashboard, LogOut, Key, Cloud, CreditCard, Shield } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
        fetchSettings(token);
      } else {
        router.push('/');
      }
    } catch (error) {
      router.push('/');
    }
  };

  const fetchSettings = async (token) => {
    try {
      const res = await fetch('/api/admin/settings', {
        headers: { 'Authorization': `Bearer ${token || localStorage.getItem('token')}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings || {});
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePayment = async (e) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData(e.target);
    const data = {
      razorpayEnabled: formData.get('razorpayEnabled') === 'on',
      razorpayKeyId: formData.get('razorpayKeyId'),
      razorpayKeySecret: formData.get('razorpayKeySecret'),
      cloudinaryEnabled: settings?.cloudinaryEnabled || false,
      cloudinaryCloudName: settings?.cloudinaryCloudName || '',
      cloudinaryApiKey: settings?.cloudinaryApiKey || '',
      cloudinaryApiSecret: settings?.cloudinaryApiSecret || ''
    };

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        alert('Payment settings saved successfully!');
        fetchSettings();
      } else {
        alert('Failed to save settings');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveCloudinary = async (e) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData(e.target);
    const data = {
      razorpayEnabled: settings?.razorpayEnabled || false,
      razorpayKeyId: settings?.razorpayKeyId || '',
      razorpayKeySecret: settings?.razorpayKeySecret || '',
      cloudinaryEnabled: formData.get('cloudinaryEnabled') === 'on',
      cloudinaryCloudName: formData.get('cloudinaryCloudName'),
      cloudinaryApiKey: formData.get('cloudinaryApiKey'),
      cloudinaryApiSecret: formData.get('cloudinaryApiSecret')
    };

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        alert('Cloudinary settings saved successfully!');
        fetchSettings();
      } else {
        alert('Failed to save settings');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('An error occurred');
    } finally {
      setSaving(false);
    }
  };

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
            <Button variant="ghost" className="w-full justify-start gap-2">
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
            <Button variant="default" className="w-full justify-start gap-2">
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Configure integrations and platform settings</p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          </div>
        ) : (
          <div className="max-w-4xl">
            <Tabs defaultValue="payment" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="payment">Payment</TabsTrigger>
                <TabsTrigger value="cloudinary">Image Upload</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              {/* Payment Settings Tab */}
              <TabsContent value="payment">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <CardTitle>Razorpay Payment Gateway</CardTitle>
                    </div>
                    <CardDescription>Configure Razorpay for membership payments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSavePayment} className="space-y-6">
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          name="razorpayEnabled" 
                          id="razorpayEnabled"
                          defaultChecked={settings?.razorpayEnabled}
                          className="h-4 w-4"
                        />
                        <Label htmlFor="razorpayEnabled" className="text-base">
                          Enable Razorpay Payments
                        </Label>
                      </div>

                      <div>
                        <Label className="text-base">Razorpay Key ID</Label>
                        <Input 
                          name="razorpayKeyId"
                          placeholder="rzp_live_xxxxxxxxxxxxx"
                          defaultValue={settings?.razorpayKeyId}
                          className="mt-2"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Your Razorpay Key ID (starts with rzp_test_ or rzp_live_)
                        </p>
                      </div>

                      <div>
                        <Label className="text-base">Razorpay Key Secret</Label>
                        <Input 
                          name="razorpayKeySecret"
                          type="password"
                          placeholder="Enter your Razorpay Key Secret"
                          className="mt-2"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Leave blank to keep existing secret
                        </p>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold mb-2 text-blue-900">How to get Razorpay API Keys:</h4>
                        <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                          <li>Sign up at <a href="https://dashboard.razorpay.com/signup" target="_blank" className="underline">Razorpay Dashboard</a></li>
                          <li>Go to Settings → API Keys</li>
                          <li>Generate new keys if you don't have them</li>
                          <li>Copy and paste them here</li>
                        </ol>
                      </div>

                      <Button type="submit" className="w-full" disabled={saving}>
                        {saving ? 'Saving...' : 'Save Payment Settings'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Cloudinary Settings Tab */}
              <TabsContent value="cloudinary">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Cloud className="h-5 w-5 text-primary" />
                      <CardTitle>Cloudinary Image Upload</CardTitle>
                    </div>
                    <CardDescription>Configure Cloudinary for image storage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSaveCloudinary} className="space-y-6">
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          name="cloudinaryEnabled" 
                          id="cloudinaryEnabled"
                          defaultChecked={settings?.cloudinaryEnabled}
                          className="h-4 w-4"
                        />
                        <Label htmlFor="cloudinaryEnabled" className="text-base">
                          Enable Cloudinary Image Upload
                        </Label>
                      </div>

                      <div>
                        <Label className="text-base">Cloud Name *</Label>
                        <Input 
                          name="cloudinaryCloudName"
                          placeholder="your-cloud-name"
                          defaultValue={settings?.cloudinaryCloudName}
                          className="mt-2"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Your Cloudinary cloud name
                        </p>
                      </div>

                      <div>
                        <Label className="text-base">API Key *</Label>
                        <Input 
                          name="cloudinaryApiKey"
                          placeholder="123456789012345"
                          defaultValue={settings?.cloudinaryApiKey}
                          className="mt-2"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Your Cloudinary API key
                        </p>
                      </div>

                      <div>
                        <Label className="text-base">API Secret *</Label>
                        <Input 
                          name="cloudinaryApiSecret"
                          type="password"
                          placeholder="Enter your Cloudinary API Secret"
                          className="mt-2"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Leave blank to keep existing secret
                        </p>
                      </div>

                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h4 className="font-semibold mb-2 text-purple-900">How to get Cloudinary credentials:</h4>
                        <ol className="text-sm text-purple-800 space-y-1 list-decimal list-inside">
                          <li>Sign up FREE at <a href="https://cloudinary.com/users/register/free" target="_blank" className="underline">Cloudinary</a></li>
                          <li>After signup, go to Dashboard</li>
                          <li>Find your Cloud Name, API Key, and API Secret</li>
                          <li>Copy and paste them here</li>
                        </ol>
                      </div>

                      <Button type="submit" className="w-full" disabled={saving}>
                        {saving ? 'Saving...' : 'Save Cloudinary Settings'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <CardTitle>Security Status</CardTitle>
                    </div>
                    <CardDescription>Platform security information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div>
                          <h4 className="font-semibold text-green-900">XSS Protection</h4>
                          <p className="text-sm text-green-700">Input sanitization enabled</p>
                        </div>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div>
                          <h4 className="font-semibold text-green-900">SQL Injection Protection</h4>
                          <p className="text-sm text-green-700">Query parameterization enabled</p>
                        </div>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div>
                          <h4 className="font-semibold text-green-900">Authentication</h4>
                          <p className="text-sm text-green-700">JWT with bcrypt password hashing</p>
                        </div>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div>
                          <h4 className="font-semibold text-green-900">Email Validation</h4>
                          <p className="text-sm text-green-700">Format validation enabled</p>
                        </div>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div>
                          <h4 className="font-semibold text-green-900">Password Security</h4>
                          <p className="text-sm text-green-700">Minimum 6 characters, bcrypt hash</p>
                        </div>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div>
                          <h4 className="font-semibold text-green-900">API Authorization</h4>
                          <p className="text-sm text-green-700">Role-based access control</p>
                        </div>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 text-blue-900">Security Features:</h4>
                      <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                        <li>Input sanitization to prevent XSS attacks</li>
                        <li>Password hashing with bcrypt (12 rounds)</li>
                        <li>JWT token-based authentication</li>
                        <li>Role-based authorization (Admin, Buyer, Seller)</li>
                        <li>Email format validation</li>
                        <li>Protected API endpoints</li>
                        <li>Secure password reset with time-limited tokens</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Status Card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Current Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Payment Gateway:</span>
                    <Badge variant={settings?.razorpayEnabled ? 'default' : 'outline'}>
                      {settings?.razorpayEnabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Razorpay Key ID:</span>
                    <Badge variant={settings?.razorpayKeyId ? 'default' : 'outline'}>
                      {settings?.razorpayKeyId ? 'Configured' : 'Not Set'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Image Upload:</span>
                    <Badge variant={settings?.cloudinaryEnabled ? 'default' : 'outline'}>
                      {settings?.cloudinaryEnabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Cloudinary Cloud:</span>
                    <Badge variant={settings?.cloudinaryCloudName ? 'default' : 'outline'}>
                      {settings?.cloudinaryCloudName ? 'Configured' : 'Not Set'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Manual Activation:</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
