import React from "react";

const CommonPosterUI =
  "flex  justify-center items-center border border-dashed rounded aspect-video dark:border-dark-subtle border-light-subtle cursor-pointer";
const PosterSelector = ({
  name,
  selectedPoster,
  onChange,
  accept,
  className,
  label
}) => {
  return (
    <div>
      <input
        accept={accept}
        id={name}
        name={name}
        onChange={onChange}
        type="file"
        hidden
      />
      <label htmlFor={name}>
        {selectedPoster ? (
          <img
            src={selectedPoster}
            alt=""
            className={CommonPosterUI + "object-cover " + className}
          />
        ) : (
          <PosterUI className={className} label={label} />
        )}
      </label>
    </div>
  );
};

export default PosterSelector; 

const PosterUI = ({ className,label }) => {
  return (
    <div className={CommonPosterUI + " " + className}>
      <span className="dark:text-dark-subtle text-light-subtle ">
       {label}
      </span>
    </div>
  );
};
