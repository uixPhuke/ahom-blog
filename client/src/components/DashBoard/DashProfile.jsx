import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from 'axios'
import { API_URL } from "../../Config";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  //console.log(currentUser)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  const uploadImage = async () => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profileImage: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

 const handleSubmit = async (e) => {
   e.preventDefault();
   setUpdateUserError(null);
   setUpdateUserSuccess(null);

   // Check if any changes were made
   if (Object.keys(formData).length === 0) {
     setUpdateUserError("No changes made");
     return;
   }

   // Ensure image is fully uploaded
   if (imageFileUploading) {
     setUpdateUserError("Please wait for image to upload");
     return;
   }

   try {
     dispatch(updateStart());

     // Make the PUT request with axios
     const res = await axios.put(
       `${API_URL}/api/user/update/${currentUser.user._id}`,
       formData,
       {
         headers: {
           "Content-Type": "application/json",
         },
       }
     );

     // Access the response data directly
     const data = res.data;

     // Handle success and failure responses
     if (res.status !== 200) {
       dispatch(updateFailure(data.message || "Update failed"));
       setUpdateUserError(data.message || "Update failed");
     } else {
       dispatch(updateSuccess(data));
       setUpdateUserSuccess("User's profile updated successfully");
     }
   } catch (error) {
     // Catch and handle errors
     dispatch(updateFailure(error.message));
     setUpdateUserError(error.message);
   }
 };


  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  

   const handleSignout = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/user/logout`); // Use axios for the POST request
      if (res.status !== 200) {
        console.log(res.data.msg); // Log the error message if not successful
      } else {
        dispatch(signoutSuccess()); // Dispatch the signout success action
        console.log(res.data.msg); // Optionally log the success message
      }
    } catch (error) {
      console.log(error.message); // Log any errors that occur
    }
  };
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      {currentUser ? (
        <>
          <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={filePickerRef}
              hidden
            />
            <div
              className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
              onClick={() => filePickerRef.current.click()}
            >
              {imageFileUploadProgress && (
                <CircularProgressbar
                  value={imageFileUploadProgress || 0}
                  text={`${imageFileUploadProgress}%`}
                  strokeWidth={5}
                  styles={{
                    root: {
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    },
                    path: {
                      stroke: `rgba(62, 152, 199, ${
                        imageFileUploadProgress / 100
                      })`,
                    },
                  }}
                />
              )}
              <img
                src={imageFileUrl || currentUser.user.profileImage}
                alt="user"
                className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
                  imageFileUploadProgress &&
                  imageFileUploadProgress < 100 &&
                  "opacity-60"
                }`}
              />
            </div>
            {imageFileUploadError && (
              <div className="text-red-500">{imageFileUploadError}</div>
            )}
            <input
              type="text"
              id="username"
              placeholder="username"
              defaultValue={currentUser.user.username}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              id="email"
              placeholder="email"
              defaultValue={currentUser.user.email}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="password"
              id="password"
              placeholder="password"
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            />
            <button
              type="submit"
              disabled={loading || imageFileUploading}
              className={`p-2 bg-purple-500 text-white rounded ${
                loading || imageFileUploading ? "opacity-50" : ""
              }`}
            >
              {loading ? "Loading..." : "Update"}
            </button>
            {currentUser.isAdmin && (
              <Link to={"/create-post"}>
                <button className="w-full p-2 bg-pink-500 text-white rounded">
                  Create a post
                </button>
              </Link>
            )}
          </form>
          <div className="text-red-500 flex justify-between mt-5">
            <span onClick={() => setShowModal(true)} className="cursor-pointer">
              Delete Account
            </span>
            <span onClick={handleSignout} className="cursor-pointer">
              Sign Out
            </span>
          </div>
          {updateUserSuccess && (
            <div className="bg-green-500 text-white p-2 mt-5 rounded">
              {updateUserSuccess}
            </div>
          )}
          {updateUserError && (
            <div className="bg-red-500 text-white p-2 mt-5 rounded">
              {updateUserError}
            </div>
          )}
          {error && (
            <div className="bg-red-500 text-white p-2 mt-5 rounded">
              {error}
            </div>
          )}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-5 rounded">
                <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mb-4 mx-auto" />
                <h3 className="text-center mb-4 text-lg">
                  Are you sure you want to delete your account?
                </h3>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-gray-300 p-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteUser}
                    className="bg-red-500 p-2 rounded text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-lg text-red-500">
            Please log in to access your profile.
          </h2>
          <Link to="/sign-up">
            <button className="mt-4 p-2 bg-blue-500 text-white rounded">
              Go to Login
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
