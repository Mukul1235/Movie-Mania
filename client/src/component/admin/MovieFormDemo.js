// import React, { useEffect, useState } from "react";
// import TagsInput from "../TagsInput";
// import { commonInputClasses } from "../../utils/CommonTheme";
// import LiveSearch from "../LiveSearch";
// import Submit from "../form/Submit";
// import { useNotification, useSearch } from "../../hooks";
// import ModalsContainer from "../models/modelsContainer";
// import WritersModal from "../models/WritersModal";
// import CastForm from "../form/CastForm";
// import CastsModal from "../models/CastsModal";
// import PosterSelector from "../PosterSelector";
// import GenresSelector from "../GenresSelector";
// import GenresModal from "../models/GenresModal";
// import Selector from "../Selector";
// import { searchActor } from "../../api/actor";

// import {
//   languageOptions,
//   statusOptions,
//   typeOptions,
// } from "../../utils/options";

// export const results = [
//   {
//     id: "1",
//     avatar:
//       "https://images.unsplash.com/photo-1643713303351-01f540054fd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
//     name: "John Doe",
//   },
//   {
//     id: "2",
//     avatar:
//       "https://images.unsplash.com/photo-1643883135036-98ec2d9e50a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
//     name: "Chandri Anggara",
//   },
//   {
//     id: "3",
//     avatar:
//       "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
//     name: "Amin RK",
//   },
//   {
//     id: "4",
//     avatar:
//       "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
//     name: "Edward Howell",
//   },
//   {
//     id: "5",
//     avatar:
//       "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
//     name: "Amin RK",
//   },
//   {
//     id: "6",
//     avatar:
//       "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
//     name: "Edward Howell",
//   },
// ];

// const Label = ({ children, htmlFor }) => {
//   return (
//     <label
//       htmlFor={htmlFor}
//       className="dark:text-dark-subtle text-light-subtle font-semibold">
//       {children}
//     </label>
//   );
// };
// const LabelwithBadge = ({ children, htmlFor, badge = 0 }) => {
//   const renderBadge = () => {
//     if (!badge) return null;
//     return (
//       <span className="dark:bg-dark-subtle  translate-x-2 -translate-y-1 text-xs bg-light-subtle rounded-full absolute top-0 right-0 w-5  h-5 justify-center flex items-center text-white">
//         {badge >= 9 ? "9+" : badge}
//       </span>
//     );
//   };
//   return (
//     <div className="relative">
//       <Label htmlFor={htmlFor}>{children}</Label>
//       {renderBadge()}
//     </div>
//   );
// };

// const ViewAll = ({ children, visible, onClick }) => {
//   if (!visible) return null;
//   return (
//     <button
//       type="button"
//       className="hover:underline text-primary dark:text-white transition "
//       onClick={onClick}>
//       {children}
//     </button>
//   );
// };

// const defaultMovieInfo = {
//   title: "",
//   storyline: "",
//   tags: [],
//   casts: [],
//   director: {},
//   writers: [],
//   releaseDate: "",
//   poster: null,
//   genres: [],
//   type: "",
//   language: "",
//   status: "",
// };
// export const renderItem = (result) => {
//   return (
//     <div className="flex rounded overflow-hidden">
//       <img src={result.avatar} alt="" className="w-16 h-16 object-cover" />
//       <p className="dark:text-white font-semibold">{result.name}</p>
//     </div>
//   );
// };
// const MovieForm = () => {
//   const [movieInfo, setMovieInfo] = useState({ ...defaultMovieInfo });
//   const [showWritersModal, setWritersModal] = useState(false);
//   const [showCastsModal, setCastsModal] = useState(false);
//   const [showGenresModal, setShowGenresModal] = useState(false);
//   const [selectedPosterForUI, setSelectedPosterForUI] = useState("");
//   const [writersProfile, setWritersProfile] = useState([]);
//   const [directorsProfile, setDirectorsProfile] = useState([]);
//   const [writerName, setWriterName] = useState("");
//   const { updateNotification } = useNotification();

//   const { handleSearch, results, resetSearch } = useSearch();
//   // console.log(results);
//   const handleSubmit = (e) => {
//     e.preventDefault(); // This will prevent default functions like if in input we  enter
//     // then it will not automatically submit the input
//     console.log(movieInfo);
//   };
//   const handleProfileChange = ({ target }) => {
//     const { name, value } = target;
//       if (name === "director") {
//         setMovieInfo({ ...movieInfo, director: { name: value } });
//         handleSearch(searchActor, value, setDirectorsProfile);
//       }
//      if (name === "writers") {
//        setWriterName(value);
//        handleSearch(searchActor, value, setWritersProfile);
//      }
//   };

//   const updatePosterForUI = (file) => {
//     const url = URL.createObjectURL(file);
//     setSelectedPosterForUI(url);
//   };
//   const handleChange = ({ target }) => {
//     const { value, name, files } = target;
//     if (name === "poster") {
//       const poster = files[0];
//       updatePosterForUI(poster);
//       return setMovieInfo({ ...movieInfo, poster });
//     }

//     setMovieInfo({ ...movieInfo, [name]: value });
//   };
//   const updateTags = (tags) => {
//     setMovieInfo({ ...movieInfo, tags });
//   };
//   const handleDirector = (director) => {
//     setMovieInfo({ ...movieInfo, director });
//     resetSearch();
//   };
//   const handleCast = (cast) => {
//     const { casts } = movieInfo;
//     setMovieInfo({ ...movieInfo, casts: [...casts, cast] });
//   };
//   const updateGenres = (genres) => {
//     setMovieInfo({ ...movieInfo, genres });
//   };

//   const handleWriter = (profile) => {
//     const { writers } = movieInfo;
//     console.log(profile);
//     for (let writer of writers) {
//       if (profile.id === writer.id) {
//         return updateNotification(
//           "warning",
//           "This profile is already selected!"
//         );
//       }
//     }
//     setMovieInfo({ ...movieInfo, writers: [...writers, profile] });
//   };
//   const displayWriterModal = (e) => {
//     // e.preventDefault();
//     setWritersModal(true);
//   };

//   const displayCastModal = (e) => {
//     // e.preventDefault();
//     setCastsModal(true);
//   };
//   const displayGenresModal = () => {
//     setShowGenresModal(true);
//   };

//   const hideGenresModal = () => {
//     setShowGenresModal(false);
//   };

//   const handleRemoveWriter = (profileid) => {
//     const { writers } = movieInfo;
//     const newWriter = writers.filter(({ id }) => id !== profileid);
//     if (!newWriter.length) setWritersModal(false);
//     setMovieInfo({ ...movieInfo, writers: [...newWriter] });
//   };
//   const handleRemoveCasts = (profileid) => {
//     const { casts } = movieInfo;
//     const newCasts = casts.filter(({ profile }) => profile.id !== profileid);
//     if (!newCasts.length) setCastsModal(false);
//     setMovieInfo({ ...movieInfo, casts: [...newCasts] });
//   };
//   const {
//     title,
//     storyline,
//     director,
//     writers,
//     casts,
//     tags,
//     genres,
//     type,
//     language,
//     status,
//   } = movieInfo;

//   return (
//     <>
//       <div action="" className="flex  space-x-3">
//         <div className="w-[70%]  space-y-5 ">
//           <div>
//             <Label htmlFor="title">Title</Label>
//             <input
//               type="text"
//               name="title"
//               value={title}
//               onChange={handleChange}
//               className={
//                 commonInputClasses + " font-semibold border-b-2 text-xl"
//               }
//               placeholder="Titanic"
//             />
//           </div>
//           <div>
//             <Label htmlFor="storyline">Story line</Label>
//             <textarea
//               name="storyline"
//               value={storyline}
//               onChange={handleChange}
//               id="storyLine"
//               className={commonInputClasses + " resize-none h-24 border-b-2"}
//               placeholder="Movie story line..."></textarea>
//           </div>
//           <div>
//             <Label htmlFor="storyline">Tags</Label>
//             <TagsInput value={tags} name="tags" onChange={updateTags} />
//           </div>
//           <div>
//             <Label htmlFor="director">Director</Label>
//             <LiveSearch
//               name="director"
//               results={directorsProfile}
//               placeholder="Search profile"
//               renderItem={renderItem}
//               value={director.name}
//               onChange={handleProfileChange}
//               visible={directorsProfile.length}
//               onSelect={handleDirector}
//             />
//           </div>
//           <div>
//             <div className="flex justify-between">
//               <LabelwithBadge badge={writers.length} htmlFor="writers">
//                 Writers
//               </LabelwithBadge>
//               <ViewAll onClick={displayWriterModal} visible={writers.length}>
//                 View All
//               </ViewAll>
//             </div>
//             <LiveSearch
//               name="writers"
//               results={writersProfile}
//               placeholder="Search profile"
//               renderItem={renderItem}
//               onChange={handleProfileChange}
//               value={writerName}
//               visible={writersProfile.length}
//               // onSelect={(result) => console.log(result)}
//               onSelect={handleWriter}
//             />
//           </div>
//           <div>
//             <div className="flex justify-between">
//               <LabelwithBadge badge={casts.length} htmlFor="casts">
//                 Add Cast & Crew{" "}
//               </LabelwithBadge>
//               <ViewAll visible={casts.length} onClick={displayCastModal}>
//                 View All
//               </ViewAll>
//             </div>
//             <CastForm onSubmit={handleCast} />
//           </div>
//           <input
//             type="date"
//             className={commonInputClasses + "border-2 rounded p-1 w-auto"}
//             onChange={handleChange}
//             name="releaseDate"
//           />
//           <Submit value="Upload" onClick={handleSubmit} type="button" />
//         </div>
//         <div className="w-[30%] space-y-5">
//           <PosterSelector
//             name="poster"
//             onChange={handleChange}
//             selectedPoster={selectedPosterForUI}
//             accept="image/jpg,image/jpeg,image/png"
//             label="Select avatar"
//           />
//           <GenresSelector
//             onClick={displayGenresModal}
//             badge={genres.length}></GenresSelector>
//           <Selector
//             onChange={handleChange}
//             name="type"
//             value={type}
//             options={typeOptions}
//             label="Type"
//           />
//           <Selector
//             name="language"
//             value={language}
//             onChange={handleChange}
//             options={languageOptions}
//             label="Language"
//           />
//           <Selector
//             name="status"
//             value={status}
//             onChange={handleChange}
//             options={statusOptions}
//             label="Status"
//           />
//         </div>
//       </div>
//       <WritersModal
//         onClose={() => setWritersModal(false)}
//         visible={showWritersModal}
//         profiles={writers}
//         onRemoveClick={handleRemoveWriter}></WritersModal>
//       <CastsModal
//         onClose={() => setCastsModal(false)}
//         visible={showCastsModal}
//         casts={casts}
//         onRemoveClick={handleRemoveCasts}></CastsModal>
//       <GenresModal
//         onSubmit={updateGenres}
//         visible={showGenresModal}
//         onClose={hideGenresModal}
//         previousSelection={genres}
//       />
//     </>
//   );
// };

// export default MovieForm;
