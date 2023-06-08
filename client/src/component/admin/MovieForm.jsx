import React, { useEffect, useState } from "react";
import TagsInput from "../TagsInput";
import { commonInputClasses } from "../../utils/CommonTheme";
import LiveSearch from "../LiveSearch";
import Submit from "../form/Submit";
import { useNotification } from "../../hooks";
import ModalsContainer from "../Modals/ModalsContainer";
import WritersModal from "../Modals/WritersModal";
import CastForm from "./CastForm";

export const results = [
  {
    id: "1",
    avatar:
      "https://images.unsplash.com/photo-1643713303351-01f540054fd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "John Doe",
  },
  {
    id: "2",
    avatar:
      "https://images.unsplash.com/photo-1643883135036-98ec2d9e50a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Chandri Anggara",
  },
  {
    id: "3",
    avatar:
      "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Amin RK",
  },
  {
    id: "4",
    avatar:
      "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Edward Howell",
  },
  {
    id: "5",
    avatar:
      "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Amin RK",
  },
  {
    id: "6",
    avatar:
      "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Edward Howell",
  },
];

const defaultMovieInfo = {
  title: "",
  storyline: "",
  tags: [],
  casts: [],
  director: {},
  writers: [],
  releaseDate: "",
  poster: null,
  genres: [],
  type: "",
  languages: "",
  status: "",
};
export const renderItem = (result) => {
  return (
    <div className="flex rounded overflow-hidden">
      <img src={result.avatar} alt="" className="w-16 h-16 object-cover" />
      <p className="dark:text-white font-semibold">{result.name}</p>
    </div>
  );
};
const MovieForm = () => {
  const [movieInfo, setMovieInfo] = useState({ ...defaultMovieInfo });
  const [showWritersModal, setWritersModal] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault(); // This will prevent default functions like if in input we  enter
    // then it will not automatically submit the input
    console.log(movieInfo);
  };
  const { updateNotification } = useNotification();

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setMovieInfo({ ...movieInfo, [name]: value });
  };
  const updateTags = (tags) => {
    setMovieInfo({ ...movieInfo, tags });
  };
  const handleDirector = (director) => {
    setMovieInfo({ ...movieInfo, director });
  };
  const handleCast = (cast) => {
    const { casts } = movieInfo;
    setMovieInfo({ ...movieInfo, casts:[...casts,cast]});
  }

  const handleWriter = (profile) => {
    const { writers } = movieInfo;
    console.log(profile);
    for (let writer of writers) {
      if (profile.id === writer.id) {
        return updateNotification(
          "warning",
          "This profile is already selected!"
        );
      }
    }
    setMovieInfo({ ...movieInfo, writers: [...writers, profile] });
  };
  const handleAssignWriter = (e) => {
    // e.preventDefault();
   setWritersModal(true);
  }
  const handleRemoveWriter = (profileid) => {
    
    const { writers } = movieInfo;
    const newWriter = writers.filter(({ id }) => id !== profileid);
    if (!newWriter.length) setWritersModal(false);
    setMovieInfo({ ...movieInfo ,writers: [...newWriter]})
    
  }
  const { title, storyline, director, writers } = movieInfo;

  return (
    <>
      <form onSubmit={handleSubmit} action="" className="flex  space-x-3">
        <div className="w-[70%] h-5 space-y-5 ">
          <div>
            <Label htmlFor="title">Title</Label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
              className={
                commonInputClasses + " font-semibold border-b-2 text-xl"
              }
              placeholder="Titanic"
            />
          </div>
          <div>
            <Label htmlFor="storyline">Story line</Label>
            <textarea
              name="storyline"
              value={storyline}
              onChange={handleChange}
              id="storyLine"
              className={commonInputClasses + " resize-none h-24 border-b-2"}
              placeholder="Movie story line..."></textarea>
          </div>
          <div>
            <Label htmlFor="storyline">Tags</Label>
            <TagsInput name="tags" onChange={updateTags} />
          </div>
          <div>
            <Label htmlFor="director">Director</Label>
            <LiveSearch
              name="director"
              results={results}
              placeholder="Search profile"
              renderItem={renderItem}
              value={director.name}
              // onSelect={(result) => console.log(result)}
              onSelect={handleDirector}
            />
          </div>
          <div>
            <div className="flex justify-between">
              <LabelwithBadge badge={writers.length} htmlFor="writers">
                Writers
              </LabelwithBadge>

            </div>
            <LiveSearch
              name="writers"
              results={results}
              placeholder="Search profile"
              renderItem={renderItem}
              // onSelect={(result) => console.log(result)}
              onSelect={handleWriter}
            />
          </div>
          <div>
            <LabelwithBadge >Add Cast & Crew </LabelwithBadge>
          <CastForm onSubmit={handleCast}/>
          </div>
          <Submit value="Submit" />
        </div>

        <div className="w-[30%] h-5 bg-violet-500"></div>
        <WritersModal
        onClose={() => setWritersModal(false)}
        visible={showWritersModal}
        profiles={writers}
        onRemoveClick={handleRemoveWriter}></WritersModal>
        </form>
    </>
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
const LabelwithBadge = ({ children, htmlFor, badge=0 }) => {
  const renderBadge = () => {
    return (
      <span className="dark:bg-dark-subtle  translate-x-2 -translate-y-1 text-xs bg-light-subtle rounded-full absolute top-0 right-0 w-5  h-5 justify-center flex items-center text-white">
        {badge >= 9 ? "9+" : badge}
      </span>
    );
  };
  return (
    <div className="relative">
      <Label htmlFor={htmlFor}>{children}</Label>
      {renderBadge()}
    </div>
  );
};

const ViewAll = () => {
  return (
    <button
      className="hover:underline text-primary dark:text-white transition"
      onClick={handleAssignWriter}>
      View All
    </button>
  );
}
export default MovieForm;
