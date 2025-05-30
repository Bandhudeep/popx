import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from '../components/ui/FormField';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, authState } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    
    // Clear error when user types
    if (errors[id as keyof typeof errors]) {
      setErrors({ ...errors, [id]: '' });
    }
  };
  
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
    
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
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      login(formData.email, formData.password);
      navigate('/settings');
    }
  };
  
  return (
    <div className="container-auth animate-fade-in">
      <h1 className="text-2xl font-bold mb-2">Signin to your PopX account</h1>
      <p className="text-gray-500 mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      
      <form onSubmit={handleSubmit} className="animate-slide-up">
        <FormField
          label="Email Address"
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
        
        {authState.error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {authState.error}
          </div>
        )}
        
        <div className="mt-6">
          <Button 
            type="submit" 
            variant="primary"
            disabled={!formData.email || !formData.password}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;