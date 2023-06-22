import React from "react";
import { ImSpinner3 } from "react-icons/im";

const Submit = ({ value ,busy,type,onClick}) => {
  return (
    <div>
      <button
        type={  type || 'submit' }
        className="w-full rounded dark:bg-white bg-secondary dark:text-secondary text-white  font-semibold hover:bg-opacity-90 transition text-lg
        cursor-pointer h-10 flex items-center justify-center"
      onClick={onClick}>
        {busy ? <ImSpinner3 className="animate-spin" /> : value}
      </button>
    </div>
  );
};

export default Submit;
