import React from "react";

const Submit = ({ value }) => {
  return (
    <div>
      <input
        type="submit"
              className="w-full rounded dark:bg-white bg-secondary dark:text-secondary text-white  font-semibold hover:bg-opacity-90 transition text-lg
        curson-pointer p-1"
        value={value}
      />
    </div>
  );
};

export default Submit;
