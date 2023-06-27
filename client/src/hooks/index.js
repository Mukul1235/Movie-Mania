import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { NotificationContext } from "../context/NotificationProvider";
import { ThemeContext } from "../context/ThemeProvider";
import { SearchContext } from "../context/SearchProvider";
import { MovieContext } from "../context/MoviesProvider";


export const useTheme = () => useContext(ThemeContext);    //it Will export the context
export const useNotification = () => useContext(NotificationContext);    //it Will export the context
export const useAuth = () => useContext(AuthContext);    //it Will export the context
export const useSearch = () => useContext(SearchContext);
export const useMovies = () => useContext(MovieContext);
