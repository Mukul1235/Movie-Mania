import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { CheckerAuth, signInUser } from "../api/auth";
import { useNotification } from "../hooks";

export const AuthContext = createContext();

const defaultAuthInfo = {
  profile: null,
  isLoggedIn: false,
  isPending: false,
  error: "",
};
export const AuthProvider = ({ children }) => {
  const {updateNotification} = useNotification();

  const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo });
  const handleLogin = async (email, password) => {
    setAuthInfo({ ...authInfo, isPending: true });
    const { error, user } = await signInUser({ email, password });
    if (error) {
      setAuthInfo({ ...authInfo, isPending: false, error });
      return updateNotification("error", error);
    }
    setAuthInfo({
      profile: { ...user },
      isPending: false,
      isLoggedIn: true,
      error: "",
    });

    localStorage.setItem("auth-token", user.token);
  };
  const isAuth = async () => {
    const token = localStorage.getItem("auth-token");
    const { user, error } = await CheckerAuth(token);
    // console.log(user);
    setAuthInfo({ ...authInfo, isPending: true });
    if (error) {
      setAuthInfo({ ...authInfo, isPending: false, error });
      return updateNotification("error", error);
    }
    setAuthInfo({
      profile: { ...user },
      isPending: false,
      isLoggedIn: true,
      error: "",
    });
  };
  useEffect(() => {
    isAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    setAuthInfo({ ...defaultAuthInfo });
  };

  return (
    <AuthContext.Provider
      value={{ authInfo, handleLogin, isAuth, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
