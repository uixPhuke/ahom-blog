import React from "react";
import { FcGoogle } from "react-icons/fc";
import { app } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import axios from "axios";
import { API_URL } from "../Config";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

const OAuth = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      // Dispatch signInStart before starting the sign-in process
      dispatch(signInStart());

      const resultsFromGoogle = await signInWithPopup(auth, provider);

      // Prepare user data for backend
      const userData = {
        name: resultsFromGoogle.user.displayName,
        email: resultsFromGoogle.user.email,
        googlePhotoUrl: resultsFromGoogle.user.photoURL,
      };

      // Send data to backend (if necessary)
      const response = await axios.post(
        `${API_URL}/api/user/google`,
        userData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data); // Log the response to see what's returned

      // Dispatch signInSuccess to update currentUser state
      dispatch(signInSuccess(response.data));

      // Navigate after successful login
      navigate("/");
    } catch (error) {
      // Dispatch signInFailure in case of an error
      dispatch(signInFailure(error.message));
      console.error("Error during Google sign-in:", error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      className="w-full bg-black text-white py-3 rounded-md transition duration-300 hover:bg-slate-400 flex items-center justify-center"
    >
      <FcGoogle size={24} className="mr-2" />
      Continue with Google
    </button>
  );
};

export default OAuth;
