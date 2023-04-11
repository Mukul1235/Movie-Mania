import React, { useEffect, useRef, useState } from "react";
import AdminNavbar from "./Navbar";
import { AiOutlinePlus } from "react-icons/ai";

const Dashboard = () => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div className="flex items-center justify-between relative">
      <input
        type="text"
        className=" border-2 dark:border-dark-subtle border-light-subtle  dark:focus:border-white 
             focus:dark-primary dark:text-white transition bg-transparent rounded text-lg p-1 outline-none "
        placeholder="Search Movies..."
      />
      <button
        onClick={() => setShowOptions(true)}
        className="flex items-center space-x-2 border-secondary hover:border-primary text-secondary hover:opacity-80 transition font-semibold border-2 
      rounded text-lg px-3 py-1">
        <span>Create</span>
        <AiOutlinePlus />
      </button>
      <CreateOptions
        visible={showOptions}
        onClose={() => setShowOptions(false)}
      />
    </div>
  );
};

export default Dashboard;

const CreateOptions = ({ visible, onClose }) => {
  const container = useRef();
  const containerID='option-container';
  useEffect(() => {
    const handleClose = (e) => {
      if (!visible) return;
      const { parentElement, id } = e.target;
      if (parentElement.id === containerID || id === containerID) return;    // this is responsible for not removing the slider when we click on Movies or on Actocs

      if (container.current) {
        if (!container.current.classList.contains("animate-scale"))
          //it will remove animate-scale className from container of html
          container.current.classList.add("animate-scale-reverse");
      }
    };
    document.addEventListener("click", handleClose);
    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, [visible]);
  if (!visible) return null;
  return (
    <div
      ref={container}
      id={containerID}
      className=" absolute right-0 top-12 flex flex-col space-y-3 p-5 dark:bg-secondary bg-white drop-shadow-lg animate-scale
      "
      onAnimationEnd={(e) => {
        // console.log("end")
        if (e.target.classList.contains("animate-scale-reverse")) onClose();
        e.target.classList.remove("animate-scale");
      }}>
      <Option>Add Movie</Option>
      <Option>Add Actor</Option>
    </div>
  );
};

const Option = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="dark:text-white text-secondary hover:opacity-80 transition">
      {children}{" "}
    </button>
  );
};