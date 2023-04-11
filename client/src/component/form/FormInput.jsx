import React from "react";

const FormInput = ({ name, placeholder, label, ...rest }) => {
  return (
    <div>
      <div className="flex flex-col-reverse ">
        <input
          id={name}
          name={name}
          className="bg-transparent rounded
               border-2 dark:border-dark-subtle
             dark:text-white dark:focus:border-white 
             focus:dark-primary
                 p-1  peer transition outline-none border-light-subtle
                 "
          placeholder={placeholder}
          {...rest}></input>
        <label
          className="font-semibold text-light-subtle dark:text-dark-subtle dark:peer-focus:text-white peer-focus:text-primary transition self-start"
          htmlFor="email">
          {label}
        </label>
      </div>
    </div>
  );
};

export default FormInput;
