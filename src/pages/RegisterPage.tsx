import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from '../components/ui/FormField';
import Button from '../components/ui/Button';
import RadioGroup from '../components/ui/RadioGroup';
import { useAuth } from '../context/AuthContext';
import { User } from '../types/auth';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, authState } = useAuth();
  
  const [formData, setFormData] = useState<Omit<User, 'id'> & { password: string }>({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    companyName: '',
    isAgency: true,
  });
  
  const [errors, setErrors] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    companyName: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    
    // Clear error when user types
    if (errors[id as keyof typeof errors]) {
      setErrors({ ...errors, [id]: '' });
    }
  };
  
  const handleAgencyChange = (value: boolean) => {
    setFormData({ ...formData, isAgency: value });
  };
  
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
    
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
      valid = false;
    }
    
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
      valid = false;
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }
    
    if (formData.isAgency && !formData.companyName) {
      newErrors.companyName = 'Company name is required for agencies';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const { password, ...userData } = formData;
      register(userData, password);
      navigate('/settings');
    }
  };
  
  return (
    <div className="container-auth animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Create your PopX account</h1>
      
      <form onSubmit={handleSubmit} className="animate-slide-up">
        <FormField
          label="Full Name"
          id="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter full name"
          required
          error={errors.fullName}
        />
        
        <FormField
          label="Phone number"
          id="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Enter phone number"
          required
          error={errors.phoneNumber}
        />
        
        <FormField
          label="Email address"
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
          required
          error={errors.email}
        />
        
        <FormField
          label="Password"
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
          error={errors.password}
        />
        
        <FormField
          label="Company name"
          id="companyName"
          type="text"
          value={formData.companyName || ''}
          onChange={handleChange}
          placeholder="Enter company name"
          error={errors.companyName}
        />
        
        <RadioGroup
          label="Are you an Agency?"
          name="isAgency"
          options={[
            { value: true, label: 'Yes' },
            { value: false, label: 'No' },
          ]}
          value={formData.isAgency}
          onChange={handleAgencyChange}
        />
        
        {authState.error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {authState.error}
          </div>
        )}
        
        <div className="mt-6">
          <Button 
            type="submit" 
            variant="primary"
          >
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;