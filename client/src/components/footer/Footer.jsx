import React from "react";
import {
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaReddit,
} from "react-icons/fa";

const Footer = () => {
  const login = () => {
    localStorage.removeItem("firstLogin");

    window.location.href = "/sign-in";
  };
  return (
    <footer className="bg-white bg-opacity-80 px-4 py-8 mt-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Signup Section */}
          <div className="col-span-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-center p-4 md:p-8 rounded-lg flex items-center justify-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">JOIN US</h2>
              <button
                onClick={login}
                className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
              >
                SIGN UP FOR FREE
              </button>
            </div>
          </div>

          {/* Footer Links */}
          <div>
            <h3 className="font-bold mb-2">CONTENT</h3>
            <ul className="space-y-2">
              <li>Blog</li>
              <li>About</li>
              <li>Services</li>

              <li>New Arrivals</li>
             
            </ul>
          </div>

         
          <div>
            <h3 className="font-bold mb-2">SUPPORT</h3>
            <ul className="space-y-2">
              <li>Help</li>
              <li>Customer Services</li>
              
        
              <li>Store Finder</li>
              <li>Club</li>
              <li>Club Terms and Conditions</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">COMPANY INFO</h3>
            <ul className="space-y-2">
              <li>About Us</li>
              <li>stories</li>
              <li> Apps</li>
              <li>Entity Details</li>
              <li>Press</li>
              <li>Careers</li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div className="lg:col-span-1">
            <h3 className="font-bold mb-4 text-center lg:text-left">
              FOLLOW US
            </h3>
            <div className="flex justify-center lg:justify-start space-x-4">
              <FaInstagram
                size={30}
                className="text-black hover:text-gray-700 transition-colors"
              />
              <FaTwitter
                size={30}
                className="text-black hover:text-gray-700 transition-colors"
              />
              <FaYoutube
                size={30}
                className="text-black hover:text-gray-700 transition-colors"
              />
              <FaLinkedin
                size={30}
                className="text-black hover:text-gray-700 transition-colors"
              />
              <FaReddit
                size={30}
                className="text-black hover:text-gray-700 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-300 mt-8 pt-4 text-center">
          <ul className="flex justify-center space-x-4 text-sm text-gray-600">
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms and Conditions</a>
            </li>
            <li>
              <a href="#">Cookies</a>
            </li>
          </ul>
          <p className="text-gray-500 text-sm mt-4">
            ©2024 AHOM Pvt. Ltd
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
