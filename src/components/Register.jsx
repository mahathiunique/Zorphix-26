import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, db } from "../firebase";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { FaGoogle, FaBuilding } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();

  // 🔁 AUTH STATE LISTENER
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      // 🔍 Check if profile exists
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        navigate("/"); // ✅ Profile exists → Home
      } else {
        navigate("/complete-profile"); // ❌ New user → Profile completion
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // 🔐 GOOGLE SIGN IN
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // Redirect handled automatically by onAuthStateChanged
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Authentication failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#1a2e26,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#1f1a0e,transparent_50%)]"></div>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 w-full max-w-md bg-[#111] border border-[#e33e33]/40 rounded-lg p-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
      >
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#e33e33] to-[#991b1b] rounded-full flex items-center justify-center mb-6 shadow-lg">
          <FaBuilding className="text-black text-3xl" />
        </div>

        <h1 className="text-3xl font-serif tracking-wide mb-2">
          ZORPHIX LOGIN
        </h1>
        <p className="text-[#e33e33] text-xs tracking-[0.25em] uppercase mb-10">
          Official Symposium Portal
        </p>

        <button
          onClick={handleGoogleSignIn}
          className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded flex items-center justify-center gap-3 hover:shadow-[0_10px_20px_rgba(255,255,255,0.2)] transition"
        >
          <FaGoogle /> Continue with Google
        </button>

        <p className="mt-8 text-[10px] text-gray-500 tracking-widest">
          SECURE AUTHENTICATION SYSTEM
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
