import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  CheckCircle2, 
  XCircle, 
  Eye,
  Star,
  MapPin,
} from 'lucide-react';
import { toast } from 'sonner';

const vendors = [
  { 
    id: '1', 
    name: 'ProFix Plumbing', 
    contact: 'John Smith',
    email: 'john@profix.com',
    phone: '+1 555-0123',
    categories: ['Plumbing'],
    areas: ['Manhattan', 'Brooklyn'],
    status: 'pending' as const,
    rating: null,
    orders: 0,
    appliedAt: '2024-01-15',
  },
  { 
    id: '2', 
    name: 'SparkLine Electric', 
    contact: 'Sarah Johnson',
    email: 'sarah@sparkline.com',
    phone: '+1 555-0124',
    categories: ['Electrical'],
    areas: ['Queens', 'Bronx'],
    status: 'approved' as const,
    rating: 4.8,
    orders: 45,
    appliedAt: '2024-01-10',
  },
  { 
    id: '3', 
    name: 'CleanSpace Co.', 
    contact: 'Mike Williams',
    email: 'mike@cleanspace.com',
    phone: '+1 555-0125',
    categories: ['Cleaning'],
    areas: ['Manhattan', 'Staten Island'],
    status: 'approved' as const,
    rating: 4.5,
    orders: 32,
    appliedAt: '2024-01-08',
  },
  { 
    id: '4', 
    name: 'SecureGuard Services', 
    contact: 'Lisa Brown',
    email: 'lisa@secureguard.com',
    phone: '+1 555-0126',
    categories: ['Security'],
    areas: ['All NYC'],
    status: 'blocked' as const,
    rating: 3.2,
    orders: 12,
    appliedAt: '2024-01-05',
  },
  { 
    id: '5', 
    name: 'TechFix Solutions', 
    contact: 'David Lee',
    email: 'david@techfix.com',
    phone: '+1 555-0127',
    categories: ['IT Hardware'],
    areas: ['Manhattan'],
    status: 'pending' as const,
    rating: null,
    orders: 0,
    appliedAt: '2024-01-14',
  },
];

export default function VendorManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vendor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (vendorId: string) => {
    toast.success('Vendor approved successfully');
  };

  const handleReject = (vendorId: string) => {
    toast.error('Vendor application rejected');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl lg:text-3xl font-bold">Vendor Management</h1>
          <p className="text-muted-foreground">Review and manage service providers</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Status: {statusFilter === 'all' ? 'All' : statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter('all')}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('pending')}>Pending</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('approved')}>Approved</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('blocked')}>Blocked</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="glass rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-warning">{vendors.filter(v => v.status === 'pending').length}</p>
            <p className="text-sm text-muted-foreground">Pending Review</p>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-success">{vendors.filter(v => v.status === 'approved').length}</p>
            <p className="text-sm text-muted-foreground">Approved</p>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-destructive">{vendors.filter(v => v.status === 'blocked').length}</p>
            <p className="text-sm text-muted-foreground">Blocked</p>
          </div>
        </div>

        {/* Table */}
        <div className="glass rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead>Areas</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{vendor.name}</p>
                      <p className="text-sm text-muted-foreground">{vendor.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {vendor.categories.map(cat => (
                        <span key={cat} className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {vendor.areas.join(', ')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={vendor.status} />
                  </TableCell>
                  <TableCell>
                    {vendor.rating ? (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-warning fill-warning" />
                        <span className="font-medium">{vendor.rating}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>{vendor.orders}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        {vendor.status === 'pending' && (
                          <>
                            <DropdownMenuItem onClick={() => handleApprove(vendor.id)}>
                              <CheckCircle2 className="h-4 w-4 mr-2 text-success" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleReject(vendor.id)}>
                              <XCircle className="h-4 w-4 mr-2 text-destructive" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                        {vendor.status === 'approved' && (
                          <DropdownMenuItem onClick={() => handleReject(vendor.id)}>
                            <XCircle className="h-4 w-4 mr-2 text-destructive" />
                            Block Vendor
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
