import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { StatCard } from '@/components/StatCard';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  UserCheck, 
  ClipboardList, 
  TrendingUp,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

const recentVendors = [
  { id: '1', name: 'ProFix Plumbing', category: 'Plumbing', status: 'pending' as const, date: '2 hours ago' },
  { id: '2', name: 'SparkLine Electric', category: 'Electrical', status: 'approved' as const, date: '1 day ago' },
  { id: '3', name: 'CleanSpace Co.', category: 'Cleaning', status: 'pending' as const, date: '2 days ago' },
  { id: '4', name: 'SecureGuard Services', category: 'Security', status: 'blocked' as const, date: '3 days ago' },
];

const recentActivity = [
  { id: '1', action: 'New vendor application', details: 'ProFix Plumbing submitted application', time: '2 hours ago', type: 'info' },
  { id: '2', action: 'Agent created', details: 'Sarah added new agent James Cooper', time: '5 hours ago', type: 'success' },
  { id: '3', action: 'SLA breach detected', details: 'Work order #WO-2024-089 exceeded deadline', time: '1 day ago', type: 'warning' },
  { id: '4', action: 'Vendor approved', details: 'SparkLine Electric has been verified', time: '1 day ago', type: 'success' },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl lg:text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">System overview and management</p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Vendors"
            value={156}
            change="+12 this month"
            changeType="positive"
            icon={UserCheck}
          />
          <StatCard
            title="Active Agents"
            value={24}
            change="+2 this month"
            changeType="positive"
            icon={Users}
          />
          <StatCard
            title="Open Work Orders"
            value={89}
            change="15 pending approval"
            changeType="neutral"
            icon={ClipboardList}
          />
          <StatCard
            title="SLA Compliance"
            value="94.2%"
            change="+2.1% from last month"
            changeType="positive"
            icon={TrendingUp}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Pending Vendors */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold">Pending Vendors</h2>
                <p className="text-sm text-muted-foreground">Awaiting verification</p>
              </div>
              <Button variant="outline" size="sm">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            <div className="space-y-4">
              {recentVendors.map((vendor) => (
                <div 
                  key={vendor.id} 
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <UserCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{vendor.name}</p>
                      <p className="text-sm text-muted-foreground">{vendor.category} • {vendor.date}</p>
                    </div>
                  </div>
                  <StatusBadge status={vendor.status} />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold">Recent Activity</h2>
                <p className="text-sm text-muted-foreground">System events</p>
              </div>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div 
                  key={activity.id} 
                  className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50"
                >
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                    activity.type === 'success' ? 'bg-success/10' :
                    activity.type === 'warning' ? 'bg-warning/10' :
                    'bg-primary/10'
                  }`}>
                    {activity.type === 'success' ? (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    ) : activity.type === 'warning' ? (
                      <AlertTriangle className="h-4 w-4 text-warning" />
                    ) : (
                      <Clock className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-sm text-muted-foreground truncate">{activity.details}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <UserCheck className="h-6 w-6 text-primary" />
              <span>Review Vendors</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Users className="h-6 w-6 text-primary" />
              <span>Create Agent</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <ClipboardList className="h-6 w-6 text-primary" />
              <span>View Reports</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              <span>SLA Settings</span>
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
