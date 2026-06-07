// src/contexts/AuthContext.jsx

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { loginUser, signupUser, getUserProfile } from "../lib/api";

export const AuthContext = createContext(null);

// 2. Create the provider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 3. Check for a logged-in user on app load from localStorage
  const fetchAndSetUser = useCallback(async () => {
    const token = localStorage.getItem('auth_token');
    const userId = localStorage.getItem('user_id');

    if (token && userId) {
      try {
        // Fetch the full user profile to keep state fresh
        const userProfile = await getUserProfile(userId);
        // The Spring backend uses 'id', not '$id'
        setCurrentUser({ ...userProfile, id: Number(userId) });
      } catch (error) {
        console.error("Session restore error, logging out:", error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_id');
        setCurrentUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchAndSetUser();
  }, [fetchAndSetUser]);

  // 4. Implement the login function
  const login = async (email, password) => {
    try {
      const response = await loginUser(email, password);
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user_id', String(response.userId));

      // The login response from the backend contains user details
      // MIGRATION_GUIDE: { token, type, userId, email, fullName, status }
      const user = {
        id: response.userId,
        fullName: response.fullName,
        email: response.email,
      };
      setCurrentUser(user);
      return { success: true, user };
    } catch (error) {
      console.error("Login error:", error);
      throw error; // Re-throw the error so the login page can catch it
    }
  };

  // 5. Implement the signup function
  const signup = async (email, password, name) => {
    try {
      const response = await signupUser(name, email, password);
      // After creating the account, log the user in
      await login(email, password);
      return { success: true, user: response };
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  // 6. Implement the logout function
  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');
    setCurrentUser(null);
  };

  // 7. Provide the context values to children
  const authContextValue = {
    currentUser,
    user: currentUser, // for compatibility
    isLoading,
    login,
    logout,
    signup,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

// 8. Create the custom hook for easy access
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}