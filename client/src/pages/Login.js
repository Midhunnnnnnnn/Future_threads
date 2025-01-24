import React, { useState } from "react";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../redux/bazarSlice";
import { useNavigate } from "react-router-dom";
import { githubLogo, googleLogo } from "../assets";
import axios from "axios";

const Login = () => {
  const userInfo = useSelector((state) => state.bazar.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const [isAdmin, setIsAdmin] = useState(false); // Track admin login state
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  // User Login Handlers
  const handleLogin = (provider) => {
    signInWithPopup(auth, provider.setCustomParameters({ prompt: "select_account" }))
      .then((result) => {
        const user = result.user;
        dispatch(
          addUser({
            _id: user.uid,
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          })
        );
        axios
          .post("http://localhost:3000/customers", {
            _id: user.uid,
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          })
          .catch((error) => {
            console.error("Error storing customer data:", error);
          });
        toast.success("Login Successful!");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Login Failed!");
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Log Out Successfully!");
        dispatch(removeUser());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Admin Login Handlers
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (userInfo) {
      toast.error("Please log out of user account to access admin login.");
      return;
    }

    if (adminEmail === "midhunsmanoj771@gmail.com" && adminPassword === "1234567890") {
      setIsAdmin(true);
      toast.success("Admin Login Successful!");
      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 1500);
    } else {
      toast.error("Invalid Admin Credentials!");
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    toast.success("Admin Logged Out Successfully!");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-10 py-20">
      {!userInfo && !isAdmin ? (
        <>
          <div className="w-full flex items-center justify-center gap-10">
            <div
              onClick={() => handleLogin(googleProvider)}
              className="text-base w-60 h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 cursor-pointer duration-300"
            >
              <img className="w-8" src={googleLogo} alt="googleLogo" />
              <span className="text-sm text-gray-900"> Sign in with Google</span>
            </div>
          </div>
          <div className="w-full flex items-center justify-center gap-10">
            <div
              onClick={() => handleLogin(githubProvider)}
              className="text-base w-60 h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 cursor-pointer duration-300"
            >
              <img className="w-8" src={githubLogo} alt="githubLogo" />
              <span className="text-sm text-gray-900"> Sign in with Github</span>
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-4 mt-10">
            <h2 className="text-xl font-semibold">Admin Login</h2>
            <form onSubmit={handleAdminLogin} className="flex flex-col items-center gap-4">
              <input
                type="email"
                placeholder="Admin Email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-60 h-10 px-4 border rounded-md"
              />
              <input
                type="password"
                placeholder="Password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-60 h-10 px-4 border rounded-md"
              />
              <button
                type="submit"
                className="bg-black text-white text-base py-2 px-6 rounded-md hover:bg-gray-800 duration-300"
              >
                Login as Admin
              </button>
            </form>
          </div>
        </>
      ) : userInfo ? (
        <button
          onClick={handleSignOut}
          className="bg-black text-white text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 duration-300"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={handleAdminLogout}
          className="bg-red-600 text-white text-base py-3 px-8 tracking-wide rounded-md hover:bg-red-800 duration-300"
        >
          Logout as Admin
        </button>
      )}
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Login;
