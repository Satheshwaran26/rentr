import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

type StatusType = 
  | 'pending' 
  | 'approved' 
  | 'blocked' 
  | 'draft' 
  | 'published' 
  | 'in_progress' 
  | 'completed' 
  | 'closed'
  | 'rejected'
  | 'delayed'
  | 'urgent'
  | 'high'
  | 'medium'
  | 'low';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; variant: string }> = {
  pending: { label: 'Pending', variant: 'bg-warning/10 text-warning border-warning/20' },
  approved: { label: 'Approved', variant: 'bg-success/10 text-success border-success/20' },
  blocked: { label: 'Blocked', variant: 'bg-destructive/10 text-destructive border-destructive/20' },
  draft: { label: 'Draft', variant: 'bg-muted text-muted-foreground border-border' },
  published: { label: 'Published', variant: 'bg-primary/10 text-primary border-primary/20' },
  in_progress: { label: 'In Progress', variant: 'bg-primary/10 text-primary border-primary/20' },
  completed: { label: 'Completed', variant: 'bg-success/10 text-success border-success/20' },
  closed: { label: 'Closed', variant: 'bg-muted text-muted-foreground border-border' },
  rejected: { label: 'Rejected', variant: 'bg-destructive/10 text-destructive border-destructive/20' },
  delayed: { label: 'Delayed', variant: 'bg-destructive/10 text-destructive border-destructive/20' },
  urgent: { label: 'Urgent', variant: 'bg-destructive/10 text-destructive border-destructive/20' },
  high: { label: 'High', variant: 'bg-warning/10 text-warning border-warning/20' },
  medium: { label: 'Medium', variant: 'bg-primary/10 text-primary border-primary/20' },
  low: { label: 'Low', variant: 'bg-muted text-muted-foreground border-border' },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.pending;

  return (
    <Badge 
      variant="outline" 
      className={cn(
        'font-medium border',
        config.variant,
        className
      )}
    >
      {config.label}
    </Badge>
  );
}
