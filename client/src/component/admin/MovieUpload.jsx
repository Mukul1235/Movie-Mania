import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useNotification } from "../../hooks";
import { uploadTrailer } from "../../api/movies";
import MovieForm from "./MovieForm";

const MovieUpload = () => {
  const { updateNotification } = useNotification();
  const [videoSelector, setvideoSelector] = useState(false);
  const [VideoUploaded, setVideoUploaded] = useState(false);
  const [uploadprogress, setUploadProgress] = useState(0); // this will store the progress of the upload
  const [videoUploadInfo, setvideoUploadInfo] = useState({}); //this will store link of url and public id when video get uploaded
  const [MovieInfo, setmovieInfo] = useState({
    title: "",
    storyline: "",
    status: "",
    type: "",
    languages: "",
    director: {},
    releaseDate: {},
    poster: {},
    trailer: {
      url: "",
      public_id: "",
    },
    genres: [],
    tags: [],
    casts: [],
    writers: [],
    reviews: [],
  });

  const handleVideoUpload = async (data) => {
    const { url, error, public_id } = await uploadTrailer(
      data,
      setUploadProgress
    );
    if (error) return updateNotification("error", error);
    setVideoUploaded(true);

    setvideoUploadInfo({ url, public_id });
  };
  console.log(videoUploadInfo)
  const handleChange = async (file) => {
    const formData = new FormData(); //this api will create formData
    formData.append("video", file); //this will work as same as in backend we use .single('video') instead
    setvideoSelector(true);
    handleVideoUpload(formData);
  };
  const handleTypeError = (error) => {
    updateNotification("error", error);
  };
  const getUploadProgressValue = () => {
    if (!VideoUploaded && uploadprogress >= 100) {
      return "Processing ";
    }
    return `Upload progress ${uploadprogress}% `;
  };
  // useEffect(() => {}, [videoSelector]);
        // <UploadProgress
        //   visible={!VideoUploaded && videoSelector}
        //   message={getUploadProgressValue()}
        //   width={uploadprogress}
        // />
        // <TrailerUpload
        //   handleChange={handleChange}
        //   handleTypeError={handleTypeError}
        //   visible={!videoSelector}
        // />
  return (
    <div className="fixed inset-0 dark:bg-white dark:bg-opacity-50 bg-primary bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="dark:bg-primary bg-white rounded w-[45rem] h-[40rem] overflow-auto p-2">
      <MovieForm/>
      </div>
    </div>
  );
};

const TrailerUpload = ({ visible, handleChange, handleTypeError }) => {
  if (!visible) return null;

  return (
    <div className="flex  h-full justify-center items-center">
      <FileUploader
        types={["mp4", "avi"]}
        onTypeError={handleTypeError}
        handleChange={handleChange}>
        <div
          className="w-48 h-48 border border-dashed
           dark:border-dark-subtle border-light-subtle rounded-full
           flex flex-col items-center justify-center text-secondary dark:text-dark-subtle
            cursor-pointer 
           ">
          <AiOutlineCloudUpload size={80} />
          <p>Drop your file here!</p>
        </div>
      </FileUploader>
    </div>
  );
};

const UploadProgress = ({ message, width, visible }) => {
  if (!visible) return null;
  return (
    <div className="p-2">
      <div
        className="dark:bg-secondary bg-white 
          drop-shadow-lg rounded p-3">
        <div className="h-3 dark:bg-dark-subtle overflow-hidden bg-light-subtle relative">
          <div
            style={{ width: width + "%" }}
            className="h-full dark:bg-white absolute left-0 bg-secondary"></div>
        </div>
        <p className=" mt-1 font-semibold dark:text-dark-subtle text-light-subtle animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
};
export default MovieUpload;
