
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

type User = {
  id: string;
  name: string;
  email: string;
  university?: string;
  type?: "Student" | "Owner";
  image?: string;
  createdAt: Date;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  completeProfile: (userData: Partial<User>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("uniHomeConnectUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("uniHomeConnectUser");
      }
    }
    setIsLoading(false);
  }, []);

  const register = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock API call - in real app, this would be a backend call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new user with minimal information
      const newUser: User = {
        id: `user_${Math.random().toString(36).substr(2, 9)}`,
        name: email.split('@')[0], // Temporary name from email
        email,
        createdAt: new Date(),
      };
      
      setUser(newUser);
      localStorage.setItem("uniHomeConnectUser", JSON.stringify(newUser));
      toast.success("Registration successful! Please complete your profile.");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock API call - in real app, this would be a backend call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in real app, this would come from backend
      const loggedInUser: User = {
        id: `user_${Math.random().toString(36).substr(2, 9)}`,
        name: "John Doe",
        email,
        university: "University of Washington",
        type: "Student",
        createdAt: new Date(),
        image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
      };
      
      setUser(loggedInUser);
      localStorage.setItem("uniHomeConnectUser", JSON.stringify(loggedInUser));
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("uniHomeConnectUser");
    toast.info("You have been logged out.");
  };

  const completeProfile = async (userData: Partial<User>) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Mock API call - in real app, this would be a backend call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = {
        ...user,
        ...userData,
      };
      
      setUser(updatedUser);
      localStorage.setItem("uniHomeConnectUser", JSON.stringify(updatedUser));
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        register, 
        login, 
        logout,
        completeProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
