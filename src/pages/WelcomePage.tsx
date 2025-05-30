import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const WelcomePage: React.FC = () => {
  return (
    <div className="container-auth animate-fade-in">
      <div className="min-h-[80vh] flex flex-col justify-between">
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-2xl font-bold mb-2">Welcome to PopX</h1>
          <p className="text-gray-500 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          
          <div className="space-y-4">
            <Link to="/register">
              <Button variant="primary">Create Account</Button>
            </Link>
            
            <Link to="/login">
              <Button variant="secondary">Already Registered? Login</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;