import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./logo.png";
import { HiOutlineSearch } from "react-icons/hi";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../../redux/user/userSlice"; // Assuming you have a logout action

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // For custom dropdown
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(currentUser)
  //console.log("Profile Image URL:", currentUser.user.profileImage);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignout = () => {
    dispatch(signoutSuccess()); // Dispatch logout action
    navigate("/sign-in");
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header
      className={`fixed text-black w-full z-50 p-4 ${
        isScrolled
          ? "bg-gradient-to-r from-pink-600 to-yellow-700 shadow-md opacity-95"
          : "bg-transparent"
      }`}
    >
      <div className="flex mx-auto items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} className="h-8" alt="logo" />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="search"
              className="bg-gray-100 text-gray-900 pl-4 pr-8 py-2 rounded-full text-sm focus:outline-none transition-all duration-300"
            />
            <HiOutlineSearch className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* User Dropdown or Sign In button */}
        <div className="relative">
          {currentUser ? (
            <div>
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2"
              >
                <img
                  src={currentUser.user.profileImage}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                {/* <span className="text-sm font-medium"></span>*/}
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                  <div className="px-4 py-3">
                    <span className="block text-sm font-medium">
                      @{currentUser.user.username}
                    </span>
                  </div>
                  <Link
                    to="/dashboard?tab=profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Profile
                  </Link>
                  <div className="border-t my-1"></div>
                  <button
                    onClick={handleSignout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/sign-in">
              <button className="bg-black text-white rounded-full p-2 inline-block px-3 py-2 shadow-lg transform transition-transform duration-300 hover:scale-100 hover:bg-white hover:text-black">
                Sign In
              </button>
            </Link>
          )}
        </div>

        {/* Hamburger Menu for Small Screens */}
        <div className="md:hidden z-50">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? (
              <AiOutlineClose size={24} className="text-black" />
            ) : (
              <AiOutlineMenu size={24} />
            )}
          </button>
        </div>

        {/* Sliding Mobile Menu */}
        <div
          className={`fixed inset-y-0 right-0 w-full bg-slate-200 shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
        >
          <nav className="flex flex-col p-6 space-y-6 text-black bg-slate-200">
            <Link to="/" onClick={toggleMenu}>
              Blogs
            </Link>
            <Link to="/about" onClick={toggleMenu}>
              About
            </Link>
            <Link to="/contact" onClick={toggleMenu}>
              Contact
            </Link>
          </nav>

          <div className="p-6 text-sm text-white bg-black">
            <p>
              Become a Member for inspiration and stories{" "}
              <Link to="/learn-more" className="underline" onClick={toggleMenu}>
                Learn more
              </Link>
            </p>
            <div className="flex space-x-4 mt-4">
              <Link
                to="/login"
                className="bg-black text-white px-4 py-2 rounded-full"
                onClick={toggleMenu}
              >
                Join Us
              </Link>
            </div>
          </div>
          <Link to="/">
            <img src={logo} className="" alt="logo" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
