import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";
import { API_URL } from "../Config";

const SignIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [errorVisible, setErrorVisible] = useState(false); // State to manage modal visibility

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    if (!user.email || !user.password || user.password=="") {
      dispatch(signInFailure("Please fill all the fields"));
      setErrorVisible(true);
       return;
    }
    try {
      dispatch(signInStart());
      const response = await axios.post(
        `${API_URL}/api/user/login`,
        { ...user },
        { withCredentials: true }
      );

      if (response.data.success === false) {
        dispatch(signInFailure(response.data.message));
        setErrorVisible(true);
        return;
      }

      localStorage.setItem("firstLogin", "true");
      dispatch(signInSuccess(response.data));
      navigate("/");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred";
      dispatch(signInFailure(errorMessage));
      setErrorVisible(true);
    }
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const closeErrorModal = () => {
    setErrorVisible(false);
  };

  return (
    <div className="mt-16">
      <div className="flex flex-col md:flex-row">
        {/* Left side - Welcome Back */}
        <div className="sm:p-6 md:w-1/2 flex flex-col justify-center items-center text-white p-10">
          <h2 className="text-3xl font-semibold mb-4">Hey There!</h2>
          <p className="mb-8 text-center">
            Don’t have an account? You can create one
          </p>
          <Link
            to="/sign-up"
            className="bg-white text-black font-bold py-2 px-6 rounded-full transition duration-300 hover:bg-slate-400 hover:text-white"
          >
            Sign Up
          </Link>
        </div>

        {/* Right side - Login */}
        <div className="md:w-1/2 flex justify-center items-center p-10">
          <div className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-md p-10 rounded-lg shadow-lg w-full max-w-md ">
            <form onSubmit={loginSubmit}>
              <h2 className="text-3xl font-semibold text-zinc-500 mb-6">
                Login
              </h2>

              <div className="relative mb-4">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@company.com"
                  value={user.email}
                  onChange={onChangeInput}
                  className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="relative mb-6">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Password"
                  value={user.password}
                  onChange={onChangeInput}
                  className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white  py-3 rounded-md transition duration-300 hover:bg-slate-400 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <AiOutlineLoading3Quarters className="mr-2 animate-spin" />{" "}
                    Loading..
                  </>
                ) : (
                  <>
                    <FaLock className="mr-2" /> Sign In
                  </>
                )}
              </button>

              <p className="text-center mt-4 text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/sign-up"
                  className="text-gray-400 font-bold hover:underline hover:text-black"
                >
                  Register
                </Link>
              </p>
            </form>
            <OAuth />
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {errorVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
            <h3 className="text-2xl font-semibold mb-4">{errorMessage}</h3>
            <button
              onClick={closeErrorModal}
              className="bg-red-500 text-white py-2 px-4 rounded-lg mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
