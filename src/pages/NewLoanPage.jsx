import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLoanStore } from '../lib/store';
import toast from 'react-hot-toast';
import { ChevronLeft, ChevronRight, Check, Loader2 } from 'lucide-react';

export default function NewLoanPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const createLoan = useLoanStore((state) => state.createLoan);

  const [formData, setFormData] = useState({
    // Borrower Information
    borrower_name: '',
    borrower_email: '',
    borrower_phone: '',
    company_name: '',
    industry: '',
    
    // Loan Details
    loan_amount: '',
    loan_purpose: '',
    loan_term: '',
    property_type: '',
    property_value: '',
    
    // Financial Information
    annual_revenue: '',
    credit_score: '',
    debt_to_income: '',
    collateral_description: '',
    
    // Additional Notes
    notes: '',
  });

  const steps = [
    {
      title: 'Borrower Information',
      description: 'Basic information about the borrower',
      fields: ['borrower_name', 'borrower_email', 'borrower_phone', 'company_name', 'industry']
    },
    {
      title: 'Loan Details',
      description: 'Information about the loan request',
      fields: ['loan_amount', 'loan_purpose', 'loan_term', 'property_type', 'property_value']
    },
    {
      title: 'Financial Information',
      description: 'Financial details and creditworthiness',
      fields: ['annual_revenue', 'credit_score', 'debt_to_income', 'collateral_description']
    },
    {
      title: 'Review & Submit',
      description: 'Review your application before submission',
      fields: ['notes']
    }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validateStep = () => {
    const currentFields = steps[currentStep].fields;
    for (const field of currentFields) {
      if (field !== 'notes' && field !== 'collateral_description' && !formData[field]) {
        toast.error('Please fill in all required fields');
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(Math.min(currentStep + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep(Math.max(currentStep - 1, 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createLoan(formData);
      toast.success('Loan application submitted successfully!');
      navigate('/loans');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to submit loan application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex-1">
                <div className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full font-semibold
                    ${index < currentStep ? 'bg-green-500 text-white' : 
                      index === currentStep ? 'bg-blue-600 text-white' : 
                      'bg-gray-200 text-gray-600'}
                  `}>
                    {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 ${index < currentStep ? 'bg-green-500' : 'bg-gray-200'}`} />
                  )}
                </div>
                <div className="mt-2">
                  <p className={`text-sm font-medium ${index === currentStep ? 'text-blue-600' : 'text-gray-600'}`}>
                    {step.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">{steps[currentStep].title}</CardTitle>
            <CardDescription>{steps[currentStep].description}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 0: Borrower Information */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="borrower_name">Full Name *</Label>
                      <Input
                        id="borrower_name"
                        name="borrower_name"
                        value={formData.borrower_name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="borrower_email">Email *</Label>
                      <Input
                        id="borrower_email"
                        name="borrower_email"
                        type="email"
                        value={formData.borrower_email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="borrower_phone">Phone *</Label>
                      <Input
                        id="borrower_phone"
                        name="borrower_phone"
                        type="tel"
                        value={formData.borrower_phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company_name">Company Name *</Label>
                      <Input
                        id="company_name"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        placeholder="ABC Corporation"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry *</Label>
                    <Select onValueChange={(value) => handleSelectChange('industry', value)} value={formData.industry}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="real-estate">Real Estate</SelectItem>
                        <SelectItem value="hospitality">Hospitality</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 1: Loan Details */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="loan_amount">Loan Amount *</Label>
                      <Input
                        id="loan_amount"
                        name="loan_amount"
                        type="number"
                        value={formData.loan_amount}
                        onChange={handleChange}
                        placeholder="500000"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="loan_term">Loan Term (months) *</Label>
                      <Input
                        id="loan_term"
                        name="loan_term"
                        type="number"
                        value={formData.loan_term}
                        onChange={handleChange}
                        placeholder="60"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loan_purpose">Loan Purpose *</Label>
                    <Select onValueChange={(value) => handleSelectChange('loan_purpose', value)} value={formData.loan_purpose}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="property-purchase">Property Purchase</SelectItem>
                        <SelectItem value="refinance">Refinance</SelectItem>
                        <SelectItem value="business-expansion">Business Expansion</SelectItem>
                        <SelectItem value="equipment">Equipment Purchase</SelectItem>
                        <SelectItem value="working-capital">Working Capital</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="property_type">Property Type *</Label>
                      <Select onValueChange={(value) => handleSelectChange('property_type', value)} value={formData.property_type}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="office">Office</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                          <SelectItem value="multifamily">Multifamily</SelectItem>
                          <SelectItem value="mixed-use">Mixed Use</SelectItem>
                          <SelectItem value="land">Land</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="property_value">Property Value *</Label>
                      <Input
                        id="property_value"
                        name="property_value"
                        type="number"
                        value={formData.property_value}
                        onChange={handleChange}
                        placeholder="750000"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Financial Information */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="annual_revenue">Annual Revenue *</Label>
                      <Input
                        id="annual_revenue"
                        name="annual_revenue"
                        type="number"
                        value={formData.annual_revenue}
                        onChange={handleChange}
                        placeholder="1000000"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="credit_score">Credit Score *</Label>
                      <Input
                        id="credit_score"
                        name="credit_score"
                        type="number"
                        value={formData.credit_score}
                        onChange={handleChange}
                        placeholder="720"
                        min="300"
                        max="850"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="debt_to_income">Debt-to-Income Ratio (%) *</Label>
                    <Input
                      id="debt_to_income"
                      name="debt_to_income"
                      type="number"
                      value={formData.debt_to_income}
                      onChange={handleChange}
                      placeholder="35"
                      min="0"
                      max="100"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="collateral_description">Collateral Description</Label>
                    <Textarea
                      id="collateral_description"
                      name="collateral_description"
                      value={formData.collateral_description}
                      onChange={handleChange}
                      placeholder="Describe any collateral being offered..."
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Review & Submit */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <h3 className="font-semibold text-lg">Application Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Borrower</p>
                        <p className="font-medium">{formData.borrower_name}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Company</p>
                        <p className="font-medium">{formData.company_name}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Loan Amount</p>
                        <p className="font-medium">${parseInt(formData.loan_amount).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Loan Term</p>
                        <p className="font-medium">{formData.loan_term} months</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Property Value</p>
                        <p className="font-medium">${parseInt(formData.property_value).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Credit Score</p>
                        <p className="font-medium">{formData.credit_score}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Any additional information you'd like to provide..."
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {currentStep < steps.length - 1 ? (
                  <Button type="button" onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700">
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Submit Application
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
