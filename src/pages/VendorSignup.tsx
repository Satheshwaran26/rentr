import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { ArrowLeft, ArrowRight, Loader2, Building2, Wrench, MapPin, CheckCircle2 } from 'lucide-react';

const serviceCategories = [
  { id: 'plumbing', label: 'Plumbing', icon: '🔧' },
  { id: 'electrical', label: 'Electrical', icon: '⚡' },
  { id: 'cleaning', label: 'Cleaning', icon: '🧹' },
  { id: 'painting', label: 'Painting', icon: '🎨' },
  { id: 'security', label: 'Security', icon: '🔒' },
  { id: 'it_hardware', label: 'IT Hardware', icon: '💻' },
];

export default function VendorSignup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    categories: [] as string[],
    serviceAreas: '',
    capacity: '',
    description: '',
    agreeToTerms: false,
  });

  const handleCategoryToggle = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(c => c !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.categories.length === 0) {
      toast.error('Please select at least one service category');
      return;
    }

    if (!formData.agreeToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-6 animate-fade-in">
          <div className="mx-auto w-20 h-20 rounded-full bg-success/10 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-success" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Application Submitted!</h1>
            <p className="text-muted-foreground">
              Your vendor registration has been received. Our team will review your application and get back to you within 2-3 business days.
            </p>
          </div>

          <div className="glass rounded-xl p-6 text-left space-y-4">
            <h3 className="font-semibold">What happens next?</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-medium shrink-0">1</span>
                <span>Our team reviews your business details and documents</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-medium shrink-0">2</span>
                <span>We verify your service capabilities and certifications</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-medium shrink-0">3</span>
                <span>You'll receive an approval email with login credentials</span>
              </li>
            </ul>
          </div>

          <Button onClick={() => navigate('/login')} variant="outline" className="w-full">
            Return to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Progress */}
      <div className="hidden lg:flex lg:w-2/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div className="absolute inset-0 bg-grid-pattern bg-[size:32px_32px] opacity-20" />
        
        <div className="relative z-10 flex flex-col justify-center px-12 lg:px-16">
          <Link to="/login" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>

          <Logo size="lg" className="mb-8" />
          
          <h1 className="text-3xl font-bold mb-4">
            Join our vendor network
          </h1>
          
          <p className="text-muted-foreground mb-12">
            Register as a service provider and start receiving work orders from property managers across the network.
          </p>

          {/* Progress steps */}
          <div className="space-y-6">
            {[
              { step: 1, title: 'Business Details', icon: Building2 },
              { step: 2, title: 'Services & Areas', icon: Wrench },
              { step: 3, title: 'Review & Submit', icon: MapPin },
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-4">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center transition-colors ${
                  step >= item.step ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                }`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className={`font-medium ${step >= item.step ? 'text-foreground' : 'text-muted-foreground'}`}>
                    Step {item.step}
                  </p>
                  <p className="text-sm text-muted-foreground">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-xl animate-fade-in">
          <div className="lg:hidden mb-8">
            <Link to="/login" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" />
              Back to login
            </Link>
            <Logo size="lg" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {step === 1 && (
              <div className="space-y-6 animate-slide-up">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Business Details</h2>
                  <p className="text-muted-foreground">Tell us about your company</p>
                </div>

                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      placeholder="Your company name"
                      value={formData.businessName}
                      onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                      required
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactName">Contact Person</Label>
                    <Input
                      id="contactName"
                      placeholder="Full name"
                      value={formData.contactName}
                      onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                      required
                      className="h-12"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        required
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        required
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        required
                        className="h-12"
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  type="button" 
                  onClick={() => setStep(2)} 
                  className="w-full h-12"
                  variant="gradient"
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-slide-up">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Services & Areas</h2>
                  <p className="text-muted-foreground">Select your service offerings</p>
                </div>

                <div className="space-y-4">
                  <Label>Service Categories</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {serviceCategories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => handleCategoryToggle(category.id)}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          formData.categories.includes(category.id)
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <span className="text-2xl block mb-2">{category.icon}</span>
                        <span className="text-sm font-medium">{category.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="serviceAreas">Service Areas</Label>
                  <Input
                    id="serviceAreas"
                    placeholder="e.g., Manhattan, Brooklyn, Queens"
                    value={formData.serviceAreas}
                    onChange={(e) => setFormData(prev => ({ ...prev, serviceAreas: e.target.value }))}
                    required
                    className="h-12"
                  />
                  <p className="text-xs text-muted-foreground">Separate multiple areas with commas</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacity">Monthly Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    placeholder="Number of orders you can handle per month"
                    value={formData.capacity}
                    onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Business Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell us about your experience and qualifications..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="min-h-[120px]"
                  />
                </div>

                <div className="flex gap-3">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setStep(1)} 
                    className="flex-1 h-12"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button 
                    type="button" 
                    onClick={() => setStep(3)} 
                    className="flex-1 h-12"
                    variant="gradient"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-slide-up">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Review & Submit</h2>
                  <p className="text-muted-foreground">Confirm your registration details</p>
                </div>

                <div className="glass rounded-xl p-6 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Business Name</p>
                      <p className="font-medium">{formData.businessName || '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Contact Person</p>
                      <p className="font-medium">{formData.contactName || '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Email</p>
                      <p className="font-medium">{formData.email || '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Phone</p>
                      <p className="font-medium">{formData.phone || '—'}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Services</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.categories.map(cat => (
                        <span key={cat} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm capitalize">
                          {cat.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Service Areas</p>
                    <p className="font-medium">{formData.serviceAreas || '—'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))
                    }
                  />
                  <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                    I agree to the <Link to="#" className="text-primary hover:underline">Terms of Service</Link> and{' '}
                    <Link to="#" className="text-primary hover:underline">Privacy Policy</Link>. I understand my application will be reviewed before approval.
                  </Label>
                </div>

                <div className="flex gap-3">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setStep(2)} 
                    className="flex-1 h-12"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 h-12"
                    variant="gradient"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
