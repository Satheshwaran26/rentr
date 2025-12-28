import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  Filter,
  Clock,
  MapPin,
  Building2,
  DollarSign,
  Users,
  Send,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';

const availableOrders = [
  { 
    id: 'WO-2024-092', 
    title: 'Pipe replacement in basement', 
    description: 'Complete pipe replacement needed in the basement storage area. Water damage has affected multiple pipes. Requires professional assessment and repair.',
    property: '300 Park Ave, Basement',
    category: 'Plumbing',
    priority: 'high' as const,
    deadline: '2024-01-19',
    estimatedBudget: '$400-600',
    applications: 3,
    postedAt: '2 hours ago',
  },
  { 
    id: 'WO-2024-093', 
    title: 'Water heater inspection', 
    description: 'Annual water heater inspection and maintenance required. Check for leaks, test pressure relief valve, and flush tank if needed.',
    property: '150 East 42nd St, Unit 8A',
    category: 'Plumbing',
    priority: 'medium' as const,
    deadline: '2024-01-22',
    estimatedBudget: '$150-250',
    applications: 1,
    postedAt: '5 hours ago',
  },
  { 
    id: 'WO-2024-094', 
    title: 'Bathroom faucet repair', 
    description: 'Master bathroom faucet is leaking continuously. Needs assessment and potential replacement of washers or entire fixture.',
    property: '88 Greenwich St, Apt 15C',
    category: 'Plumbing',
    priority: 'low' as const,
    deadline: '2024-01-25',
    estimatedBudget: '$100-200',
    applications: 0,
    postedAt: '1 day ago',
  },
  { 
    id: 'WO-2024-095', 
    title: 'Emergency drain unclogging', 
    description: 'Kitchen sink completely blocked. Tenant unable to use sink. Requires immediate attention.',
    property: '200 Water Street, Unit 3B',
    category: 'Plumbing',
    priority: 'urgent' as const,
    deadline: '2024-01-17',
    estimatedBudget: '$200-350',
    applications: 5,
    postedAt: '30 mins ago',
  },
];

export default function AvailableOrders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<typeof availableOrders[0] | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [proposalData, setProposalData] = useState({
    estimatedCost: '',
    availability: '',
    remarks: '',
  });

  const filteredOrders = availableOrders.filter(order => 
    order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.property.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApply = async () => {
    if (!proposalData.estimatedCost || !proposalData.availability) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsApplying(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success('Proposal submitted successfully!');
    setIsApplying(false);
    setSelectedOrder(null);
    setProposalData({ estimatedCost: '', availability: '', remarks: '' });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Available Orders</h1>
          <p className="text-muted-foreground">Browse and apply for work orders matching your profile</p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Orders Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredOrders.map((order) => (
            <div 
              key={order.id} 
              className="glass rounded-xl p-6 space-y-4 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono text-muted-foreground">{order.id}</span>
                    <StatusBadge status={order.priority} />
                    <span className="text-xs text-muted-foreground">{order.postedAt}</span>
                  </div>
                  <h3 className="font-semibold mt-2">{order.title}</h3>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">{order.estimatedBudget}</p>
                  <span className="text-xs text-muted-foreground">est. budget</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">
                {order.description}
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  {order.property}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Due: {order.deadline}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {order.applications} applications
                </div>
                <Button variant="gradient" onClick={() => setSelectedOrder(order)}>
                  Apply Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Application Dialog */}
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Submit Proposal</DialogTitle>
              <DialogDescription>
                Apply for: {selectedOrder?.title}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="glass rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Order ID</span>
                  <span className="font-mono">{selectedOrder?.id}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Budget Range</span>
                  <span className="font-medium text-primary">{selectedOrder?.estimatedBudget}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Deadline</span>
                  <span>{selectedOrder?.deadline}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cost">Your Estimated Cost *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="cost"
                    type="number"
                    placeholder="0.00"
                    value={proposalData.estimatedCost}
                    onChange={(e) => setProposalData(prev => ({ ...prev, estimatedCost: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Your Availability *</Label>
                <Input
                  id="availability"
                  placeholder="e.g., Available tomorrow after 2 PM"
                  value={proposalData.availability}
                  onChange={(e) => setProposalData(prev => ({ ...prev, availability: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="remarks">Additional Remarks</Label>
                <Textarea
                  id="remarks"
                  placeholder="Any additional information or questions..."
                  value={proposalData.remarks}
                  onChange={(e) => setProposalData(prev => ({ ...prev, remarks: e.target.value }))}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedOrder(null)}>
                Cancel
              </Button>
              <Button variant="gradient" onClick={handleApply} disabled={isApplying}>
                {isApplying ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Proposal
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
