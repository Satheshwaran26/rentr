import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { StatCard } from '@/components/StatCard';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { 
  ClipboardList, 
  DollarSign, 
  Star,
  TrendingUp,
  ArrowRight,
  Clock,
  MapPin,
  Building2,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const availableOrders = [
  { 
    id: 'WO-2024-092', 
    title: 'Pipe replacement in basement', 
    property: '300 Park Ave, Basement',
    priority: 'high' as const,
    deadline: '2024-01-19',
    estimatedBudget: '$400-600',
    applications: 3,
  },
  { 
    id: 'WO-2024-093', 
    title: 'Water heater inspection', 
    property: '150 East 42nd St, Unit 8A',
    priority: 'medium' as const,
    deadline: '2024-01-22',
    estimatedBudget: '$150-250',
    applications: 1,
  },
];

const myActiveTasks = [
  { 
    id: 'T-001', 
    workOrder: 'WO-2024-091',
    title: 'Kitchen sink leak repair', 
    property: '245 Park Avenue, Apt 12B',
    status: 'in_progress' as const,
    deadline: '2024-01-18',
    progress: 60,
  },
  { 
    id: 'T-002', 
    workOrder: 'WO-2024-088',
    title: 'Emergency water damage', 
    property: '100 Broadway, Apt 3C',
    status: 'in_progress' as const,
    deadline: '2024-01-16',
    progress: 85,
  },
];

export default function VendorDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Vendor Dashboard</h1>
          <p className="text-muted-foreground">Track your orders and performance</p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Available Orders"
            value={8}
            change="In your service area"
            changeType="neutral"
            icon={ClipboardList}
          />
          <StatCard
            title="Active Tasks"
            value={2}
            change="1 due today"
            changeType="neutral"
            icon={Clock}
          />
          <StatCard
            title="Monthly Earnings"
            value="$4,250"
            change="+18% from last month"
            changeType="positive"
            icon={DollarSign}
          />
          <StatCard
            title="Performance Rating"
            value="4.8"
            change="Top 10% vendors"
            changeType="positive"
            icon={Star}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Available Orders */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold">Available Orders</h2>
                <p className="text-sm text-muted-foreground">Matching your profile</p>
              </div>
              <Link to="/vendor/orders">
                <Button variant="outline" size="sm">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {availableOrders.map((order) => (
                <div 
                  key={order.id} 
                  className="p-4 rounded-lg bg-secondary/50 space-y-3 hover:bg-secondary transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-muted-foreground">{order.id}</span>
                        <StatusBadge status={order.priority} />
                      </div>
                      <p className="font-medium mt-1">{order.title}</p>
                    </div>
                    <p className="text-sm font-medium text-primary">{order.estimatedBudget}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Building2 className="h-3 w-3" />
                      {order.property}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Due: {order.deadline}
                    </div>
                    <Button size="sm" variant="gradient">
                      Apply Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Tasks */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold">Active Tasks</h2>
                <p className="text-sm text-muted-foreground">Your current work</p>
              </div>
              <Link to="/vendor/tasks">
                <Button variant="outline" size="sm">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {myActiveTasks.map((task) => (
                <div 
                  key={task.id} 
                  className="p-4 rounded-lg bg-secondary/50 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-mono text-muted-foreground">{task.workOrder}</span>
                      <p className="font-medium mt-1">{task.title}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3" />
                        {task.property}
                      </div>
                    </div>
                    <StatusBadge status={task.status} />
                  </div>
                  
                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{task.progress}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Due: {task.deadline}
                    </div>
                    <Button size="sm" variant="outline">
                      Update Status
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="glass rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Performance Overview</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-secondary/50">
              <p className="text-3xl font-bold text-primary">45</p>
              <p className="text-sm text-muted-foreground mt-1">Orders Completed</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-secondary/50">
              <p className="text-3xl font-bold text-success">98%</p>
              <p className="text-sm text-muted-foreground mt-1">On-Time Delivery</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-secondary/50">
              <p className="text-3xl font-bold text-warning">4.8</p>
              <p className="text-sm text-muted-foreground mt-1">Average Rating</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-secondary/50">
              <p className="text-3xl font-bold gradient-text">$12.4K</p>
              <p className="text-sm text-muted-foreground mt-1">Total Earnings</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
