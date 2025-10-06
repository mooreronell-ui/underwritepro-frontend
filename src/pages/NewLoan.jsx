import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loanAPI } from '../lib/api';
import { theme } from '../theme';

const LOAN_TYPES = [
  { value: 'owner_occupied_cre', label: 'Owner-Occupied Commercial Real Estate' },
  { value: 'investment_property', label: 'Investment Property (Non-Owner-Occupied)' },
  { value: 'multi_family_2_4', label: 'Multi-Family (2-4 units)' },
  { value: 'multi_family_5plus', label: 'Multi-Family (5+ units)' },
  { value: 'retail', label: 'Retail Property' },
  { value: 'office', label: 'Office Building' },
  { value: 'industrial', label: 'Industrial/Warehouse' },
  { value: 'self_storage', label: 'Self-Storage' },
  { value: 'hospitality', label: 'Hospitality/Hotel' },
  { value: 'equipment_financing', label: 'Equipment Financing' },
  { value: 'business_acquisition', label: 'Business Acquisition' },
  { value: 'working_capital', label: 'Working Capital/Line of Credit' },
  { value: 'sba_7a', label: 'SBA 7(a) Loan' },
];

const PROPERTY_TYPES = [
  { value: 'office', label: 'Office' },
  { value: 'retail', label: 'Retail' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'multi_family', label: 'Multi-Family' },
  { value: 'mixed_use', label: 'Mixed Use' },
  { value: 'hospitality', label: 'Hospitality' },
  { value: 'self_storage', label: 'Self-Storage' },
  { value: 'special_purpose', label: 'Special Purpose' },
];

const STEPS = [
  { id: 1, title: 'Loan Details', icon: '📋' },
  { id: 2, title: 'Borrower Info', icon: '👤' },
  { id: 3, title: 'Property Details', icon: '🏢' },
  { id: 4, title: 'Financial Info', icon: '💰' },
  { id: 5, title: 'Review & Submit', icon: '✅' },
];

const NewLoan = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Loan Details
    loan_type: '',
    loan_amount: '',
    loan_purpose: '',
    term_months: '',
    
    // Borrower Info
    borrower_name: '',
    borrower_company: '',
    borrower_email: '',
    borrower_phone: '',
    borrower_credit_score: '',
    years_in_business: '',
    
    // Property Details
    property_type: '',
    property_address: '',
    property_city: '',
    property_state: '',
    property_zip: '',
    property_value: '',
    purchase_price: '',
    
    // Financial Info
    annual_revenue: '',
    net_income: '',
    monthly_debt_service: '',
    down_payment: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.loan_type) newErrors.loan_type = 'Loan type is required';
      if (!formData.loan_amount || formData.loan_amount <= 0) newErrors.loan_amount = 'Valid loan amount is required';
      if (!formData.loan_purpose) newErrors.loan_purpose = 'Loan purpose is required';
      if (!formData.term_months || formData.term_months <= 0) newErrors.term_months = 'Valid term is required';
    }
    
    if (step === 2) {
      if (!formData.borrower_name) newErrors.borrower_name = 'Borrower name is required';
      if (!formData.borrower_email) newErrors.borrower_email = 'Email is required';
      if (!formData.borrower_phone) newErrors.borrower_phone = 'Phone is required';
    }
    
    if (step === 3) {
      if (!formData.property_type) newErrors.property_type = 'Property type is required';
      if (!formData.property_address) newErrors.property_address = 'Address is required';
      if (!formData.property_city) newErrors.property_city = 'City is required';
      if (!formData.property_state) newErrors.property_state = 'State is required';
      if (!formData.property_value || formData.property_value <= 0) newErrors.property_value = 'Valid property value is required';
    }
    
    if (step === 4) {
      if (!formData.annual_revenue || formData.annual_revenue <= 0) newErrors.annual_revenue = 'Valid annual revenue is required';
      if (!formData.net_income) newErrors.net_income = 'Net income is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    
    setLoading(true);
    try {
      const response = await loanAPI.create(formData);
      navigate('/dashboard');
    } catch (error) {
      alert('Failed to create loan application. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: theme.colors.primary[900], marginBottom: '8px' }}>
          New Loan Application
        </h1>
        <p style={{ fontSize: '14px', color: theme.colors.neutral[600] }}>
          Complete all steps to submit your loan application for underwriting
        </p>
      </div>

      {/* Progress Stepper */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
          {/* Progress Line */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '0',
            right: '0',
            height: '2px',
            backgroundColor: theme.colors.neutral[200],
            zIndex: 0,
          }}>
            <div style={{
              height: '100%',
              width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`,
              backgroundColor: theme.colors.primary[600],
              transition: 'width 0.3s ease',
            }} />
          </div>

          {/* Steps */}
          {STEPS.map((step) => (
            <div key={step.id} style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              position: 'relative',
              zIndex: 1,
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: currentStep >= step.id ? theme.colors.primary[600] : 'white',
                border: `2px solid ${currentStep >= step.id ? theme.colors.primary[600] : theme.colors.neutral[300]}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                marginBottom: '8px',
                transition: 'all 0.3s ease',
              }}>
                {step.icon}
              </div>
              <div style={{
                fontSize: '12px',
                fontWeight: currentStep === step.id ? '600' : '400',
                color: currentStep >= step.id ? theme.colors.primary[900] : theme.colors.neutral[500],
                textAlign: 'center',
                maxWidth: '100px',
              }}>
                {step.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: theme.shadows.md,
        padding: '32px',
        marginBottom: '24px',
      }}>
        {currentStep === 1 && <Step1 formData={formData} handleChange={handleChange} errors={errors} />}
        {currentStep === 2 && <Step2 formData={formData} handleChange={handleChange} errors={errors} />}
        {currentStep === 3 && <Step3 formData={formData} handleChange={handleChange} errors={errors} />}
        {currentStep === 4 && <Step4 formData={formData} handleChange={handleChange} errors={errors} />}
        {currentStep === 5 && <Step5 formData={formData} />}
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          style={{
            padding: '12px 24px',
            backgroundColor: currentStep === 1 ? theme.colors.neutral[200] : 'white',
            color: currentStep === 1 ? theme.colors.neutral[400] : theme.colors.primary[600],
            border: `1px solid ${theme.colors.neutral[300]}`,
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
          }}
        >
          ← Previous
        </button>

        {currentStep < STEPS.length ? (
          <button
            onClick={handleNext}
            style={{
              padding: '12px 32px',
              backgroundColor: theme.colors.primary[600],
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              padding: '12px 32px',
              backgroundColor: loading ? theme.colors.neutral[400] : theme.colors.success,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Submitting...' : 'Submit Application ✓'}
          </button>
        )}
      </div>
    </div>
  );
};

// Step Components
const Step1 = ({ formData, handleChange, errors }) => (
  <div>
    <h2 style={{ fontSize: '20px', fontWeight: '600', color: theme.colors.primary[900], marginBottom: '24px' }}>
      Loan Details
    </h2>
    <FormField
      label="Loan Type"
      name="loan_type"
      type="select"
      value={formData.loan_type}
      onChange={handleChange}
      error={errors.loan_type}
      options={LOAN_TYPES}
      required
    />
    <FormField
      label="Loan Amount"
      name="loan_amount"
      type="number"
      value={formData.loan_amount}
      onChange={handleChange}
      error={errors.loan_amount}
      placeholder="500000"
      prefix="$"
      required
    />
    <FormField
      label="Loan Purpose"
      name="loan_purpose"
      type="textarea"
      value={formData.loan_purpose}
      onChange={handleChange}
      error={errors.loan_purpose}
      placeholder="Describe the purpose of this loan..."
      required
    />
    <FormField
      label="Term (months)"
      name="term_months"
      type="number"
      value={formData.term_months}
      onChange={handleChange}
      error={errors.term_months}
      placeholder="60"
      required
    />
  </div>
);

const Step2 = ({ formData, handleChange, errors }) => (
  <div>
    <h2 style={{ fontSize: '20px', fontWeight: '600', color: theme.colors.primary[900], marginBottom: '24px' }}>
      Borrower Information
    </h2>
    <FormField
      label="Borrower Name"
      name="borrower_name"
      value={formData.borrower_name}
      onChange={handleChange}
      error={errors.borrower_name}
      placeholder="John Smith"
      required
    />
    <FormField
      label="Company Name"
      name="borrower_company"
      value={formData.borrower_company}
      onChange={handleChange}
      placeholder="ABC Corporation"
    />
    <FormField
      label="Email"
      name="borrower_email"
      type="email"
      value={formData.borrower_email}
      onChange={handleChange}
      error={errors.borrower_email}
      placeholder="john@example.com"
      required
    />
    <FormField
      label="Phone"
      name="borrower_phone"
      type="tel"
      value={formData.borrower_phone}
      onChange={handleChange}
      error={errors.borrower_phone}
      placeholder="(555) 123-4567"
      required
    />
    <FormField
      label="Credit Score"
      name="borrower_credit_score"
      type="number"
      value={formData.borrower_credit_score}
      onChange={handleChange}
      placeholder="720"
    />
    <FormField
      label="Years in Business"
      name="years_in_business"
      type="number"
      value={formData.years_in_business}
      onChange={handleChange}
      placeholder="5"
    />
  </div>
);

const Step3 = ({ formData, handleChange, errors }) => (
  <div>
    <h2 style={{ fontSize: '20px', fontWeight: '600', color: theme.colors.primary[900], marginBottom: '24px' }}>
      Property Details
    </h2>
    <FormField
      label="Property Type"
      name="property_type"
      type="select"
      value={formData.property_type}
      onChange={handleChange}
      error={errors.property_type}
      options={PROPERTY_TYPES}
      required
    />
    <FormField
      label="Property Address"
      name="property_address"
      value={formData.property_address}
      onChange={handleChange}
      error={errors.property_address}
      placeholder="123 Main Street"
      required
    />
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}>
      <FormField
        label="City"
        name="property_city"
        value={formData.property_city}
        onChange={handleChange}
        error={errors.property_city}
        placeholder="Los Angeles"
        required
      />
      <FormField
        label="State"
        name="property_state"
        value={formData.property_state}
        onChange={handleChange}
        error={errors.property_state}
        placeholder="CA"
        required
      />
      <FormField
        label="ZIP Code"
        name="property_zip"
        value={formData.property_zip}
        onChange={handleChange}
        placeholder="90001"
      />
    </div>
    <FormField
      label="Property Value"
      name="property_value"
      type="number"
      value={formData.property_value}
      onChange={handleChange}
      error={errors.property_value}
      placeholder="750000"
      prefix="$"
      required
    />
    <FormField
      label="Purchase Price"
      name="purchase_price"
      type="number"
      value={formData.purchase_price}
      onChange={handleChange}
      placeholder="700000"
      prefix="$"
    />
  </div>
);

const Step4 = ({ formData, handleChange, errors }) => (
  <div>
    <h2 style={{ fontSize: '20px', fontWeight: '600', color: theme.colors.primary[900], marginBottom: '24px' }}>
      Financial Information
    </h2>
    <FormField
      label="Annual Revenue"
      name="annual_revenue"
      type="number"
      value={formData.annual_revenue}
      onChange={handleChange}
      error={errors.annual_revenue}
      placeholder="1000000"
      prefix="$"
      required
    />
    <FormField
      label="Net Income"
      name="net_income"
      type="number"
      value={formData.net_income}
      onChange={handleChange}
      error={errors.net_income}
      placeholder="150000"
      prefix="$"
      required
    />
    <FormField
      label="Monthly Debt Service"
      name="monthly_debt_service"
      type="number"
      value={formData.monthly_debt_service}
      onChange={handleChange}
      placeholder="5000"
      prefix="$"
    />
    <FormField
      label="Down Payment"
      name="down_payment"
      type="number"
      value={formData.down_payment}
      onChange={handleChange}
      placeholder="100000"
      prefix="$"
    />
  </div>
);

const Step5 = ({ formData }) => (
  <div>
    <h2 style={{ fontSize: '20px', fontWeight: '600', color: theme.colors.primary[900], marginBottom: '24px' }}>
      Review & Submit
    </h2>
    <div style={{ fontSize: '14px', color: theme.colors.neutral[700], lineHeight: '1.8' }}>
      <ReviewSection title="Loan Details">
        <ReviewItem label="Type" value={formData.loan_type?.replace('_', ' ')} />
        <ReviewItem label="Amount" value={`$${Number(formData.loan_amount).toLocaleString()}`} />
        <ReviewItem label="Term" value={`${formData.term_months} months`} />
        <ReviewItem label="Purpose" value={formData.loan_purpose} />
      </ReviewSection>
      
      <ReviewSection title="Borrower">
        <ReviewItem label="Name" value={formData.borrower_name} />
        <ReviewItem label="Company" value={formData.borrower_company} />
        <ReviewItem label="Email" value={formData.borrower_email} />
        <ReviewItem label="Phone" value={formData.borrower_phone} />
      </ReviewSection>
      
      <ReviewSection title="Property">
        <ReviewItem label="Type" value={formData.property_type} />
        <ReviewItem label="Address" value={`${formData.property_address}, ${formData.property_city}, ${formData.property_state} ${formData.property_zip}`} />
        <ReviewItem label="Value" value={`$${Number(formData.property_value).toLocaleString()}`} />
      </ReviewSection>
      
      <ReviewSection title="Financials">
        <ReviewItem label="Annual Revenue" value={`$${Number(formData.annual_revenue).toLocaleString()}`} />
        <ReviewItem label="Net Income" value={`$${Number(formData.net_income).toLocaleString()}`} />
      </ReviewSection>
    </div>
  </div>
);

// Helper Components
const FormField = ({ label, name, type = 'text', value, onChange, error, placeholder, prefix, options, required }) => (
  <div style={{ marginBottom: '20px' }}>
    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: theme.colors.neutral[700], marginBottom: '6px' }}>
      {label} {required && <span style={{ color: theme.colors.danger }}>*</span>}
    </label>
    {type === 'select' ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          padding: '10px 12px',
          border: `1px solid ${error ? theme.colors.danger : theme.colors.neutral[300]}`,
          borderRadius: '6px',
          fontSize: '14px',
          backgroundColor: 'white',
        }}
      >
        <option value="">Select {label}</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    ) : type === 'textarea' ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        style={{
          width: '100%',
          padding: '10px 12px',
          border: `1px solid ${error ? theme.colors.danger : theme.colors.neutral[300]}`,
          borderRadius: '6px',
          fontSize: '14px',
          fontFamily: 'inherit',
          resize: 'vertical',
        }}
      />
    ) : (
      <div style={{ position: 'relative' }}>
        {prefix && (
          <span style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: theme.colors.neutral[500],
            fontSize: '14px',
          }}>
            {prefix}
          </span>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: prefix ? '10px 12px 10px 28px' : '10px 12px',
            border: `1px solid ${error ? theme.colors.danger : theme.colors.neutral[300]}`,
            borderRadius: '6px',
            fontSize: '14px',
          }}
        />
      </div>
    )}
    {error && (
      <div style={{ marginTop: '4px', fontSize: '12px', color: theme.colors.danger }}>
        {error}
      </div>
    )}
  </div>
);

const ReviewSection = ({ title, children }) => (
  <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: `1px solid ${theme.colors.neutral[200]}` }}>
    <h3 style={{ fontSize: '16px', fontWeight: '600', color: theme.colors.primary[900], marginBottom: '12px' }}>
      {title}
    </h3>
    {children}
  </div>
);

const ReviewItem = ({ label, value }) => (
  <div style={{ display: 'flex', marginBottom: '8px' }}>
    <span style={{ minWidth: '140px', color: theme.colors.neutral[600], fontWeight: '500' }}>{label}:</span>
    <span style={{ color: theme.colors.neutral[900] }}>{value || 'N/A'}</span>
  </div>
);

export default NewLoan;
