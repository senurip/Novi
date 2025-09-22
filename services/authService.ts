

// services/authService.ts
import { auth } from "@/firebase"; // use named import for 'auth'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from "firebase/auth";

// Register user
export const register = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Login user
export const login = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Logout user
export const logout = async () => {
  return await signOut(auth);
};

// Subscribe to auth state changes
export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
