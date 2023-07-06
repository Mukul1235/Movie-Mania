import React from "react";
import ModalsContainer from "./ModalContainer";
import { AiOutlineClose } from "react-icons/ai";

const WritersModal = ({ visible, profiles = [], onClose, onRemoveClick }) => {
  return (
    <ModalsContainer ignoreContainer onClose={onClose} visible={visible}>
      <div className=" space-y-2 dark:bg-primary bg-white rounded max-w-[45rem] max-h-[40rem] overflow-auto custom-scroll-bar p-2">
        {profiles.map(({ id, avatar, name }) => {
          return (
            <div
              key={id}
              className="flex space-x-3 dark:bg-secondary bg-white drop-shadow-md rounded">
              <img
                className="w-16 h-16 rounded object-cover  aspect-square "
                src={avatar}
                alt={name}
              />
              <p className=" font-semibold text-primary dark:text-white w-full">
                {name}
              </p>
              <button
                onClick={() => onRemoveClick(id)}
                className="dark:text-white text-primary  hover:opacity-80 transition  p-2">
                <AiOutlineClose />
              </button>
            </div>
          );
        })}
      </div>
    </ModalsContainer>
  );
};

export default WritersModal;
