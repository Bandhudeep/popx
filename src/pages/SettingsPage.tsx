import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import ProfilePicture from '../components/ui/ProfilePicture';
import { useAuth } from '../context/AuthContext';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { authState, logout, updateUser } = useAuth();
  const { user } = authState;
  
  if (!user) {
    navigate('/login');
    return null;
  }
  
  const handleProfilePictureChange = (file: File) => {
    // In a real app, you would upload the file to a server
    // and get back a URL to store in the user object
    
    // For demo purposes, we'll create a local URL
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        updateUser({ profilePicture: e.target.result as string });
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <div className="container-auth animate-fade-in">
      <h1 className="text-xl font-medium text-gray-700 mb-6">Account Settings</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 animate-slide-up">
        <div className="flex items-center space-x-4">
          <ProfilePicture
            src={user.profilePicture}
            alt={user.fullName}
            size="lg"
            editable
            onImageChange={handleProfilePictureChange}
          />
          
          <div>
            <h2 className="font-semibold text-lg">{user.fullName}</h2>
            <p className="text-gray-600">{user.email}</p>
            {user.isAgency && user.companyName && (
              <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Agency - {user.companyName}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <p className="text-gray-700 leading-relaxed">
          Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut 
          Labore Et Dolore Magna Aliquyam Erat, Sed Diam
        </p>
      </div>
      
      <div className="mt-8">
        <Button 
          variant="secondary"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;