import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft, Save, Send, Calendar, Building2 } from 'lucide-react';

const properties = [
  { id: '1', address: '245 Park Avenue, Apt 12B' },
  { id: '2', address: '180 Madison Ave, Unit 5A' },
  { id: '3', address: '55 Water Street, Floor 8' },
  { id: '4', address: '100 Broadway, Apt 3C' },
  { id: '5', address: '200 Vesey Street, Unit 10C' },
];

const templates = [
  { id: 'plumbing-leak', name: 'Plumbing - Leak Repair', category: 'plumbing' },
  { id: 'electrical-outlet', name: 'Electrical - Outlet Issue', category: 'electrical' },
  { id: 'cleaning-deep', name: 'Deep Cleaning Service', category: 'cleaning' },
  { id: 'hvac-maintenance', name: 'HVAC Maintenance', category: 'electrical' },
  { id: 'painting-touch', name: 'Painting Touch-up', category: 'painting' },
  { id: 'custom', name: 'Custom Work Order', category: 'custom' },
];

export default function CreateWorkOrder() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    template: '',
    property: '',
    category: '',
    priority: '',
    description: '',
    deadline: '',
    estimatedCost: '',
    specialInstructions: '',
  });

  const handleTemplateChange = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template && template.id !== 'custom') {
      setFormData(prev => ({
        ...prev,
        template: templateId,
        title: template.name,
        category: template.category,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        template: templateId,
        title: '',
        category: '',
      }));
    }
  };

  const handleSaveDraft = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Work order saved as draft');
    setIsSubmitting(false);
    navigate('/agent/work-orders');
  };

  const handlePublish = async () => {
    if (!formData.title || !formData.property || !formData.category || !formData.priority) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success('Work order published successfully');
    setIsSubmitting(false);
    navigate('/agent/work-orders');
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Create Work Order</h1>
            <p className="text-muted-foreground">Submit a new maintenance request</p>
          </div>
        </div>

        <div className="glass rounded-xl p-6 space-y-6">
          {/* Template Selection */}
          <div className="space-y-2">
            <Label>Start from Template</Label>
            <Select value={formData.template} onValueChange={handleTemplateChange}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select a template or start custom" />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="border-t border-border pt-6 space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Work Order Title *</Label>
              <Input
                id="title"
                placeholder="Brief description of the work needed"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="h-12"
              />
            </div>

            {/* Property & Category */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Property *</Label>
                <Select 
                  value={formData.property} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, property: value }))}
                >
                  <SelectTrigger className="h-12">
                    <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Select property" />
                  </SelectTrigger>
                  <SelectContent>
                    {properties.map((property) => (
                      <SelectItem key={property.id} value={property.id}>
                        {property.address}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Service Category *</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plumbing">Plumbing</SelectItem>
                    <SelectItem value="electrical">Electrical</SelectItem>
                    <SelectItem value="cleaning">Cleaning</SelectItem>
                    <SelectItem value="painting">Painting</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="it_hardware">IT Hardware</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Priority & Deadline */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Priority Level *</Label>
                <Select 
                  value={formData.priority} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Within 7 days</SelectItem>
                    <SelectItem value="medium">Medium - Within 3 days</SelectItem>
                    <SelectItem value="high">High - Within 24 hours</SelectItem>
                    <SelectItem value="urgent">Urgent - Immediate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deadline">SLA Deadline</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                    className="h-12 pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description</Label>
              <Textarea
                id="description"
                placeholder="Provide detailed information about the issue or work required..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="min-h-[120px]"
              />
            </div>

            {/* Estimated Cost */}
            <div className="space-y-2">
              <Label htmlFor="estimatedCost">Estimated Budget (Optional)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="estimatedCost"
                  type="number"
                  placeholder="0.00"
                  value={formData.estimatedCost}
                  onChange={(e) => setFormData(prev => ({ ...prev, estimatedCost: e.target.value }))}
                  className="h-12 pl-8"
                />
              </div>
            </div>

            {/* Special Instructions */}
            <div className="space-y-2">
              <Label htmlFor="specialInstructions">Special Instructions</Label>
              <Textarea
                id="specialInstructions"
                placeholder="Access codes, preferred timing, tenant contact info, etc."
                value={formData.specialInstructions}
                onChange={(e) => setFormData(prev => ({ ...prev, specialInstructions: e.target.value }))}
                className="min-h-[80px]"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button 
              variant="outline" 
              onClick={handleSaveDraft}
              disabled={isSubmitting}
              className="sm:flex-1"
            >
              <Save className="h-4 w-4 mr-2" />
              Save as Draft
            </Button>
            <Button 
              variant="gradient" 
              onClick={handlePublish}
              disabled={isSubmitting}
              className="sm:flex-1"
            >
              <Send className="h-4 w-4 mr-2" />
              Publish Work Order
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
