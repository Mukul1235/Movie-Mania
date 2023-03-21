import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { NotificationContext } from "../context/NotificationProvider";
import { ThemeContext } from "../context/ThemeProvider";


export const useTheme = () => useContext(ThemeContext);    //it Will export the context
export const useNotification = () => useContext(NotificationContext);    //it Will export the context
export const useAuth = () => useContext(AuthContext);    //it Will export the context
