import { React, createContext, useState } from "react";
// import  from 'react'

export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  let timeout;
  const [notification, setnotification] = useState("");
  const [classes, setClasses] = useState("");
  const updateNotification = (type, value) => {
    if (timeout) clearTimeout(timeout);
    switch (type) {
      case "error":
        setClasses("bg-red-500");
        break;
      case "success":
        setClasses("bg-green-500");
        break;
      case "warking":
        setClasses("bg-red-500");
        break;
      default:
        setClasses("bg-red-500");
    }
    setnotification(value);
    timeout = setTimeout(() => {
      setnotification("");
    }, 3000);
  };
  return (
    <NotificationContext.Provider value={{ updateNotification }}>
      {children}
      {notification && (
        <div className="fixed left-1/2 -translate-x-1/2 top-24">
          <div
            className={
              " shadow-md shadow-gray-400 rounded gelatine " + classes
            }>
            <p className="text-white px-4 py-2 font-semibold ">
              {notification}
            </p>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
