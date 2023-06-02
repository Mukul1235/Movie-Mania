import React from "react";
import TagsInput from "../TagsInput";
import {commonInputClass} from "../../utils/CommonTheme"
import LiveSearch from "../LiveSearch";

const MovieForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();           // This will prevent default functions like if in input we  enter 
                                  // then it will not automatically submit the input
  }
  return (
    <form onSubmit={handleSubmit} action="" className="flex  space-x-3">
      <div className="w-[70%] h-5 space-y-5 ">
        <div>
          <Label htmlFor="title">Title</Label>
          <input
            type="text"
            className={commonInputClass + " font-semibold border-b-2 text-xl"}
            placeholder="Titanic"
          />
        </div>
        <div>
          <Label htmlFor="storyline">Story line</Label>
          <textarea
            id="storyLine"
            className={commonInputClass + " resize-none h-24 border-b-2"}
            placeholder="Movie story line..."></textarea>
        </div>
        <div>
          <Label htmlFor="storyline">Tags</Label>
          <TagsInput name="tags" />
        </div>
        <LiveSearch />
      </div>

      <div className="w-[30%] h-5 bg-violet-500"></div>
    </form>
  );
};

const Label = ({ children, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="dark:text-dark-subtle text-light-subtle font-semibold">
      {children}
    </label>
  );
};
export default MovieForm;
