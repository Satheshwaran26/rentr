import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { StatCard } from '@/components/StatCard';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { 
  ClipboardList, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Plus,
  ArrowRight,
  Building2,
  FileText,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const recentWorkOrders = [
  { 
    id: 'WO-2024-091', 
    title: 'Kitchen sink leak repair', 
    property: '245 Park Avenue, Apt 12B',
    priority: 'high' as const,
    status: 'in_progress' as const,
    vendor: 'ProFix Plumbing',
    deadline: '2024-01-18',
  },
  { 
    id: 'WO-2024-090', 
    title: 'Electrical outlet replacement', 
    property: '180 Madison Ave, Unit 5A',
    priority: 'medium' as const,
    status: 'published' as const,
    vendor: null,
    deadline: '2024-01-20',
  },
  { 
    id: 'WO-2024-089', 
    title: 'HVAC maintenance check', 
    property: '55 Water Street, Floor 8',
    priority: 'low' as const,
    status: 'completed' as const,
    vendor: 'CoolAir Systems',
    deadline: '2024-01-15',
  },
  { 
    id: 'WO-2024-088', 
    title: 'Emergency water damage', 
    property: '100 Broadway, Apt 3C',
    priority: 'urgent' as const,
    status: 'in_progress' as const,
    vendor: 'ProFix Plumbing',
    deadline: '2024-01-16',
  },
];

const pendingProposals = [
  { id: 'P-001', workOrder: 'WO-2024-090', vendor: 'SparkLine Electric', amount: 350, submitted: '2 hours ago' },
  { id: 'P-002', workOrder: 'WO-2024-090', vendor: 'PowerUp Co.', amount: 420, submitted: '4 hours ago' },
  { id: 'P-003', workOrder: 'WO-2024-087', vendor: 'CleanSpace Co.', amount: 180, submitted: '1 day ago' },
];

export default function AgentDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Agent Dashboard</h1>
            <p className="text-muted-foreground">Manage work orders and vendor proposals</p>
          </div>
          <Link to="/agent/work-orders/new">
            <Button variant="gradient" className="gap-2">
              <Plus className="h-4 w-4" />
              Create Work Order
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Active Orders"
            value={12}
            change="3 urgent"
            changeType="neutral"
            icon={ClipboardList}
          />
          <StatCard
            title="Pending Proposals"
            value={8}
            change="Review needed"
            changeType="neutral"
            icon={FileText}
          />
          <StatCard
            title="Completed Today"
            value={5}
            change="+2 from yesterday"
            changeType="positive"
            icon={CheckCircle2}
          />
          <StatCard
            title="SLA Breaches"
            value={1}
            change="Needs attention"
            changeType="negative"
            icon={AlertTriangle}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Work Orders */}
          <div className="lg:col-span-2 glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold">Recent Work Orders</h2>
                <p className="text-sm text-muted-foreground">Latest maintenance requests</p>
              </div>
              <Link to="/agent/work-orders">
                <Button variant="outline" size="sm">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {recentWorkOrders.map((order) => (
                <div 
                  key={order.id} 
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono text-muted-foreground">{order.id}</span>
                        <StatusBadge status={order.priority} />
                      </div>
                      <p className="font-medium mt-1">{order.title}</p>
                      <p className="text-sm text-muted-foreground">{order.property}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                    <StatusBadge status={order.status} />
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {order.deadline}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Proposals */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold">Pending Proposals</h2>
                <p className="text-sm text-muted-foreground">Awaiting review</p>
              </div>
            </div>

            <div className="space-y-4">
              {pendingProposals.map((proposal) => (
                <div 
                  key={proposal.id} 
                  className="p-4 rounded-lg bg-secondary/50 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-muted-foreground">{proposal.workOrder}</span>
                    <span className="text-sm text-muted-foreground">{proposal.submitted}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{proposal.vendor}</p>
                    <p className="text-lg font-bold text-primary">${proposal.amount}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="success" className="flex-1">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
