import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Clock,
  Building2,
} from 'lucide-react';

const workOrders = [
  { 
    id: 'WO-2024-091', 
    title: 'Kitchen sink leak repair', 
    property: '245 Park Avenue, Apt 12B',
    category: 'Plumbing',
    priority: 'high' as const,
    status: 'in_progress' as const,
    vendor: 'ProFix Plumbing',
    deadline: '2024-01-18',
    created: '2024-01-14',
  },
  { 
    id: 'WO-2024-090', 
    title: 'Electrical outlet replacement', 
    property: '180 Madison Ave, Unit 5A',
    category: 'Electrical',
    priority: 'medium' as const,
    status: 'published' as const,
    vendor: null,
    deadline: '2024-01-20',
    created: '2024-01-13',
  },
  { 
    id: 'WO-2024-089', 
    title: 'HVAC maintenance check', 
    property: '55 Water Street, Floor 8',
    category: 'Electrical',
    priority: 'low' as const,
    status: 'completed' as const,
    vendor: 'CoolAir Systems',
    deadline: '2024-01-15',
    created: '2024-01-10',
  },
  { 
    id: 'WO-2024-088', 
    title: 'Emergency water damage', 
    property: '100 Broadway, Apt 3C',
    category: 'Plumbing',
    priority: 'urgent' as const,
    status: 'in_progress' as const,
    vendor: 'ProFix Plumbing',
    deadline: '2024-01-16',
    created: '2024-01-15',
  },
  { 
    id: 'WO-2024-087', 
    title: 'Deep cleaning service', 
    property: '200 Vesey Street, Unit 10C',
    category: 'Cleaning',
    priority: 'medium' as const,
    status: 'draft' as const,
    vendor: null,
    deadline: '2024-01-22',
    created: '2024-01-12',
  },
];

export default function WorkOrders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredOrders = workOrders.filter(order => {
    const matchesSearch = order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.property.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Work Orders</h1>
            <p className="text-muted-foreground">Manage maintenance requests</p>
          </div>
          <Link to="/agent/work-orders/new">
            <Button variant="gradient" className="gap-2">
              <Plus className="h-4 w-4" />
              Create Work Order
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search work orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Status: {statusFilter === 'all' ? 'All' : statusFilter.replace('_', ' ')}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatusFilter('all')}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('draft')}>Draft</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('published')}>Published</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('in_progress')}>In Progress</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('completed')}>Completed</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('closed')}>Closed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Stats Pills */}
        <div className="flex flex-wrap gap-2">
          {['all', 'draft', 'published', 'in_progress', 'completed'].map((status) => {
            const count = status === 'all' 
              ? workOrders.length 
              : workOrders.filter(o => o.status === status).length;
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  statusFilter === status
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {status === 'all' ? 'All' : status.replace('_', ' ')} ({count})
              </button>
            );
          })}
        </div>

        {/* Table */}
        <div className="glass rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div>
                      <p className="font-mono text-xs text-muted-foreground">{order.id}</p>
                      <p className="font-medium">{order.title}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="text-sm">{order.property}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                      {order.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={order.priority} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={order.status} />
                  </TableCell>
                  <TableCell>
                    {order.vendor || <span className="text-muted-foreground">—</span>}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      {order.deadline}
                    </div>
                  </TableCell>
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
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
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
