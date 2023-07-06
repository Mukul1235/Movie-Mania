import React, { useEffect, useState } from "react";
import ModalsContainer from "./ModalContainer";
import genres from "../../utils/genres";
import Submit from "../form/Submit";

function GenresModal({ visible, onClose, onSubmit, previousSelection }) {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const handleGenresSelector = (gen) => {
    let newGenres = [];
    if (selectedGenres.includes(gen))
      newGenres = selectedGenres.filter((genre) => genre !== gen);
    else newGenres = [...selectedGenres, gen];

    setSelectedGenres([...newGenres]);
  };
  const handleSubmit = () => {
    onSubmit(selectedGenres);
    onClose();
  };
  const handleClose = () => {
    setSelectedGenres(previousSelection);
    onClose();
  };
  useEffect(() => {
    setSelectedGenres(previousSelection);
  }, []);
  return (
    <ModalsContainer visible={visible} onClose={handleClose}>
      <div className="flex flex-col justify-between h-full">
        <div>
          <h1 className="dark:text-white text-primary text-2xl font-semibold text-center">
            Select Genres
          </h1>

          <div className=" space-y-2">
            {genres.map((genres, index) => {
              return (
                <Genre
                  onClick={() => handleGenresSelector(genres)}
                  key={genres}
                  selected={selectedGenres.includes(genres)}>
                  {genres}
                </Genre>
              );
            })}
          </div>
        </div>
        <div className="w-56 self-end">
          <Submit value="Select" type="button " onClick={handleSubmit}></Submit>
        </div>
      </div>
    </ModalsContainer>
  );
}

export default GenresModal;

const Genre = ({ children, selected, onClick }) => {
  const getSelectedStyle = () => {
    return selected
      ? " dark:bg-white dark:text-primary bg-light-subtle text-white"
      : " text-primary dark:text-white";
  };
  return (
    <button
      onClick={onClick}
      className={
        getSelectedStyle() +
        " border-2 dark:border-dark-subtle border-light-subtle   p-1 rounded mr-3 "
      }>
      {children}
    </button>
  );
};
