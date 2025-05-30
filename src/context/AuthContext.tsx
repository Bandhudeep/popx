import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, AuthState } from '../types/auth';

// Define action types
type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'UPDATE_USER'; payload: Partial<User> };

// Define context type
interface AuthContextType {
  authState: AuthState;
  login: (email: string, password: string) => void;
  register: (userData: User, password: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Reducer function
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'LOGOUT':
      localStorage.removeItem('user');
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'UPDATE_USER':
      const updatedUser = { ...state.user, ...action.payload } as User;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return {
        ...state,
        user: updatedUser,
      };
    default:
      return state;
  }
}

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  // Check if user is already logged in on app load
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const userData = localStorage.getItem('user');
        
        if (userData) {
          const user = JSON.parse(userData);
          dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        } else {
          dispatch({ type: 'LOGOUT' });
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
        dispatch({ type: 'LOGOUT' });
      }
    };

    checkLoggedIn();
  }, []);

  // Auth functions
  const login = (email: string, password: string) => {
    try {
      // In a real app, you would make an API call here
      // This is just a mock implementation for demo purposes
      
      // Mock successful login with hardcoded user
      const user: User = {
        id: '1',
        fullName: 'Marry Doe',
        email: 'Marry@Gmail.Com',
        phoneNumber: '+1234567890',
        isAgency: true,
        companyName: 'Doe Company',
        profilePicture: 'https://randomuser.me/api/portraits/women/44.jpg',
      };
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ 
        type: 'AUTH_ERROR', 
        payload: 'Invalid email or password. Please try again.' 
      });
    }
  };

  const register = (userData: User, password: string) => {
    try {
      // In a real app, you would make an API call here
      // This is just a mock implementation for demo purposes
      
      // Mock successful registration
      const user: User = {
        id: '1',
        ...userData,
        profilePicture: 'https://randomuser.me/api/portraits/women/44.jpg',
      };
      
      dispatch({ type: 'REGISTER_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ 
        type: 'AUTH_ERROR', 
        payload: 'Registration failed. Please try again.' 
      });
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (userData: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
  };

  return (
    <AuthContext.Provider value={{ authState, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};