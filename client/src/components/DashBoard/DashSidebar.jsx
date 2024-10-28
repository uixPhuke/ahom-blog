import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../../redux/user/userSlice";

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full md:w-56 bg-gray-800 text-white h-screen flex flex-col">
      <div className="flex-grow">
        <ul className="space-y-2 p-4">
          {currentUser && (
            <li>
              <Link to="/dashboard?tab=dash">
                <div
                  className={`flex items-center p-2 rounded-lg hover:bg-gray-700 ${
                    tab === "dash" || !tab ? "bg-gray-700" : ""
                  }`}
                >
                  <HiChartPie className="w-6 h-6 mr-3" />
                  <span>Dashboard</span>
                </div>
              </Link>
            </li>
          )}
          <li>
            <Link to="/dashboard?tab=profile">
              <div
                className={`flex items-center p-2 rounded-lg hover:bg-gray-700 ${
                  tab === "profile" ? "bg-gray-700" : ""
                }`}
              >
                <HiUser className="w-6 h-6 mr-3" />
                <span>Profile</span>
              </div>
            </Link>
          </li>
          {currentUser && (
            <>
              <li>
                <Link to="/dashboard?tab=posts">
                  <div
                    className={`flex items-center p-2 rounded-lg hover:bg-gray-700 ${
                      tab === "posts" ? "bg-gray-700" : ""
                    }`}
                  >
                    <HiDocumentText className="w-6 h-6 mr-3" />
                    <span>Posts</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/dashboard?tab=users">
                  <div
                    className={`flex items-center p-2 rounded-lg hover:bg-gray-700 ${
                      tab === "users" ? "bg-gray-700" : ""
                    }`}
                  >
                    <HiOutlineUserGroup className="w-6 h-6 mr-3" />
                    <span>Users</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/dashboard?tab=comments">
                  <div
                    className={`flex items-center p-2 rounded-lg hover:bg-gray-700 ${
                      tab === "comments" ? "bg-gray-700" : ""
                    }`}
                  >
                    <HiAnnotation className="w-6 h-6 mr-3" />
                    <span>Comments</span>
                  </div>
                </Link>
              </li>
              <button
                onClick={handleSignout}
                className="flex items-center w-full p-2 rounded-lg hover:bg-red-600 bg-red-500"
              >
                <HiArrowSmRight className="w-6 h-6 mr-3" />
                <span>Sign Out</span>
              </button>
            </>
          )}
        </ul>
      </div>
     
    </div>
  );
}
