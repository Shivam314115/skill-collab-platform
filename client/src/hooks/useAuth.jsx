import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

// This is a "named export". 
// It allows other files to import it using curly braces { useAuth }.
export const useAuth = () => {
    return useContext(AuthContext);
};