'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
  Users, 
  Package, 
  Ship, 
  Settings, 
  TrendingUp,
  Building2,
  LayoutDashboard,
  LogOut,
  UserPlus,
  Plus,
  Activity,
  DollarSign,
  ShoppingCart
} from 'lucide-react';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddUser, setShowAddUser] = useState(false);
  const [addingUser, setAddingUser] = useState(false);
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
        setUser(data.user);
        fetchStats(token);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Auth error:', error);
      router.push('/');
    }
  };

  const fetchStats = async (token) => {
    try {
      const res = await fetch('/api/admin/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Stats error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setAddingUser(true);
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      if (res.ok) {
        alert('User created successfully!');
        setShowAddUser(false);
        e.target.reset();
        fetchStats(localStorage.getItem('token'));
      } else {
        alert(result.error || 'Failed to create user');
      }
    } catch (error) {
      console.error('Create user error:', error);
      alert('An error occurred');
    } finally {
      setAddingUser(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  // Chart data
  const categoryData = [
    { name: 'Ferrous', value: 35, color: '#3b82f6' },
    { name: 'Non-Ferrous', value: 30, color: '#10b981' },
    { name: 'Plastic', value: 15, color: '#f59e0b' },
    { name: 'Paper', value: 12, color: '#8b5cf6' },
    { name: 'E-Waste', value: 8, color: '#ef4444' }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 55000 },
    { month: 'Jun', revenue: 67000 }
  ];

  const activityData = [
    { day: 'Mon', listings: 12, users: 5 },
    { day: 'Tue', listings: 19, users: 8 },
    { day: 'Wed', listings: 15, users: 6 },
    { day: 'Thu', listings: 22, users: 10 },
    { day: 'Fri', listings: 18, users: 7 },
    { day: 'Sat', listings: 10, users: 4 },
    { day: 'Sun', listings: 8, users: 3 }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

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
            <Button variant="default" className="w-full justify-start gap-2">
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
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </Link>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Button variant="outline" className="w-full gap-2" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Dashboard Analytics</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name}</p>
          </div>
          <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <UserPlus className="h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>Create a new user account manually</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <Label>Full Name *</Label>
                  <Input name="name" required className="mt-2" />
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input name="email" type="email" required className="mt-2" />
                </div>
                <div>
                  <Label>Phone *</Label>
                  <Input name="phone" type="tel" required className="mt-2" />
                </div>
                <div>
                  <Label>Password *</Label>
                  <Input name="password" type="password" required className="mt-2" />
                </div>
                <div>
                  <Label>Role *</Label>
                  <Select name="role" defaultValue="buyer">
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buyer">Buyer</SelectItem>
                      <SelectItem value="seller">Seller</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Company Name</Label>
                  <Input name="companyName" className="mt-2" />
                </div>
                <div>
                  <Label>City</Label>
                  <Input name="city" className="mt-2" />
                </div>
                <Button type="submit" className="w-full" disabled={addingUser}>
                  {addingUser ? 'Creating...' : 'Create User'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-500" />
                  </div>
                  <Badge variant="secondary" className="text-lg font-bold">{stats?.totalUsers || 0}</Badge>
                </div>
                <h3 className="font-semibold text-lg mb-1">Total Users</h3>
                <p className="text-sm text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Package className="h-6 w-6 text-green-500" />
                  </div>
                  <Badge variant="secondary" className="text-lg font-bold">{stats?.totalListings || 0}</Badge>
                </div>
                <h3 className="font-semibold text-lg mb-1">Total Listings</h3>
                <p className="text-sm text-muted-foreground">{stats?.activeListings || 0} active</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <Ship className="h-6 w-6 text-orange-500" />
                  </div>
                  <Badge variant="secondary" className="text-lg font-bold">{stats?.totalImportRequests || 0}</Badge>
                </div>
                <h3 className="font-semibold text-lg mb-1">Import Requests</h3>
                <p className="text-sm text-muted-foreground">2 pending</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-purple-500" />
                  </div>
                  <Badge variant="secondary" className="text-lg font-bold">{stats?.memberships || 0}</Badge>
                </div>
                <h3 className="font-semibold text-lg mb-1">Active Members</h3>
                <p className="text-sm text-muted-foreground">₹{(stats?.memberships || 0) * 5000} revenue</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue over last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#0B3D2E" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scrap Categories</CardTitle>
              <CardDescription>Distribution by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
              <CardDescription>New listings and users this week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="listings" fill="#0B3D2E" />
                  <Bar dataKey="users" fill="#00C896" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/admin/users">
                <Button className="w-full justify-start gap-2" variant="outline">
                  <Users className="h-4 w-4" />
                  Manage Users
                </Button>
              </Link>
              <Link href="/admin/listings">
                <Button className="w-full justify-start gap-2" variant="outline">
                  <Package className="h-4 w-4" />
                  Manage Listings
                </Button>
              </Link>
              <Link href="/admin/import-requests">
                <Button className="w-full justify-start gap-2" variant="outline">
                  <Ship className="h-4 w-4" />
                  Import Requests
                </Button>
              </Link>
              <Link href="/admin/settings">
                <Button className="w-full justify-start gap-2" variant="outline">
                  <Settings className="h-4 w-4" />
                  Payment Settings
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest platform updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { icon: Users, color: 'text-green-500', text: 'New user registered: John Doe', time: '5 mins ago' },
                { icon: Package, color: 'text-blue-500', text: 'New listing added: Steel Scrap 500T', time: '12 mins ago' },
                { icon: Ship, color: 'text-orange-500', text: 'Import request submitted for Copper', time: '1 hour ago' },
                { icon: Building2, color: 'text-purple-500', text: 'DRT asset listed: Commercial Complex', time: '2 hours ago' },
                { icon: TrendingUp, color: 'text-green-500', text: 'Membership activated for ABC Corp', time: '3 hours ago' }
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <activity.icon className={`h-5 w-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}