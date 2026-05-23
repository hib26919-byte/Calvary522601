import React, { createContext, useContext, useEffect, useState } from "react";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { auth, db } from "../lib/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // CHECK AUTH STATE
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {

      // USER LOGGED OUT
      if (!firebaseUser) {
        setUser(null);
        setAdminData(null);
        setLoading(false);
        return;
      }

      try {

        console.log("Logged User UID:", firebaseUser.uid);

        // CHECK ADMIN DOCUMENT
        const adminRef = doc(db, "admins", firebaseUser.uid);

        const adminDoc = await getDoc(adminRef);

        console.log("Admin Exists:", adminDoc.exists());

        // NO ADMIN ACCESS
        if (!adminDoc.exists()) {
          await signOut(auth);

          setUser(null);
          setAdminData(null);
          setError("You do not have admin access.");

          return;
        }

        const data = adminDoc.data();

        console.log("Admin Data:", data);

        // CHECK ROLE
        if (data.role !== "admin") {
          await signOut(auth);

          setUser(null);
          setAdminData(null);
          setError("You are not admin.");

          return;
        }

        // SUCCESS
        setUser(firebaseUser);
        setAdminData(data);

        // UPDATE LAST LOGIN
        await updateDoc(adminRef, {
          lastLogin: serverTimestamp(),
        });

      } catch (err) {
        console.error("Auth Error:", err);

        setUser(null);
        setAdminData(null);
        setError(err.message);

      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();

  }, []);

  // LOGIN FUNCTION
  async function login(email, password) {

    setError(null);

    try {

      // FIREBASE LOGIN
      const cred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = cred.user;

      console.log("Login UID:", user.uid);

      // CHECK ADMIN DOCUMENT
      const adminRef = doc(db, "admins", user.uid);

      const adminDoc = await getDoc(adminRef);

      console.log("Admin Document Exists:", adminDoc.exists());

      // NO ADMIN ACCESS
      if (!adminDoc.exists()) {
        await signOut(auth);

        throw new Error("You do not have admin access.");
      }

      const data = adminDoc.data();

      console.log("Admin Data:", data);

      // CHECK ROLE
      if (data.role !== "admin") {
        await signOut(auth);

        throw new Error("You are not admin.");
      }

      setUser(user);
      setAdminData(data);

      return user;

    } catch (err) {

      console.error(err);

      let msg = err.message;

      if (err.code === "auth/invalid-credential") {
        msg = "Invalid email or password.";
      }

      setError(msg);

      throw new Error(msg);
    }
  }

  // LOGOUT FUNCTION
  async function logout() {
    await signOut(auth);

    setUser(null);
    setAdminData(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        adminData,
        loading,
        error,
        login,
        logout,
        isAdmin: !!adminData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// CUSTOM HOOK
export function useAuth() {
  return useContext(AuthContext);
}