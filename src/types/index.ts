export type UserRole = 'admin' | 'agent' | 'vendor';

export type VendorStatus = 'pending' | 'approved' | 'blocked';

export type WorkOrderStatus = 
  | 'draft' 
  | 'published' 
  | 'applications_received' 
  | 'under_review' 
  | 'assigned' 
  | 'in_progress' 
  | 'completed' 
  | 'invoice_submitted' 
  | 'invoice_approved' 
  | 'closed';

export type ServiceCategory = 
  | 'plumbing' 
  | 'electrical' 
  | 'cleaning' 
  | 'painting' 
  | 'security' 
  | 'it_hardware';

export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

export interface Vendor extends User {
  businessName: string;
  serviceCategories: ServiceCategory[];
  serviceAreas: string[];
  capacity: number;
  status: VendorStatus;
  phone: string;
  documents?: string[];
  rating?: number;
  completedOrders?: number;
}

export interface Agent extends User {
  department?: string;
  assignedProperties?: string[];
}

export interface WorkOrder {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  priority: Priority;
  status: WorkOrderStatus;
  propertyId: string;
  propertyAddress: string;
  createdBy: string;
  assignedVendor?: string;
  slaDeadline: Date;
  estimatedCost?: number;
  actualCost?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Proposal {
  id: string;
  workOrderId: string;
  vendorId: string;
  vendorName: string;
  estimatedCost: number;
  availability: string;
  remarks?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
}

export interface Task {
  id: string;
  workOrderId: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
  deadline: Date;
  completedAt?: Date;
  delayReason?: string;
}

export interface Invoice {
  id: string;
  workOrderId: string;
  vendorId: string;
  amount: number;
  documentUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  approvedAt?: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
}
