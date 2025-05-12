import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'admin' | 'association' | 'member';

interface UserContextType {
  role: UserRole | null;
  setRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (newRole: UserRole) => {
    setRole(newRole);
    setIsAuthenticated(true);
    // You might want to store this in localStorage or a more persistent storage
    localStorage.setItem('userRole', newRole);
  };

  const logout = () => {
    setRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem('userRole');
  };

  return (
    <UserContext.Provider value={{ role, setRole, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 