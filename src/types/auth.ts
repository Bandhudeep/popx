export interface User {
  id?: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  isAgency: boolean;
  companyName?: string;
  profilePicture?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}