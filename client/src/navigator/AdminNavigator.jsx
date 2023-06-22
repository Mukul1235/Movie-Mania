import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import NotFound from '../component/NotFound';
import Dashboard from "../component/admin/Dashboard"
import Movies from "../component/admin/Movies"
import Actors from "../component/admin/Actors";
import Header from "../component/admin/Header";
import AdminNavbar from '../component/admin/Navbar';
import MovieUpload from '../component/admin/MovieUpload';
import ActorUpload from '../component/models/ActorUpload';



const AdminNavigator = () => {
  const [showMovieUploadModal, setMovieUploadModal] = useState(false);
  const [showActorUploadModal, setActorUploadModal] = useState(false);
  const hideMovieUploadModal = () => {
    setMovieUploadModal(false);
  }
  const displayMovieUploadModal = () => {
    setMovieUploadModal(true);
  }
  const hideActorUploadModal = () => {
    setActorUploadModal(false);
  }
  const displayActorUploadModal = () => {
    setActorUploadModal(true);
  }

  return (

    <>
    <div className="flex fixed inset-0 dark:bg-primary bg-white ">
    <AdminNavbar />
    <div className="flex-1 p-2 max-w-screen-xl">
    <Header onAddMovieClick={displayMovieUploadModal} onAddActorClick={displayActorUploadModal} />
    <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/movies" element={<Movies />} />
    <Route path="/actors" element={<Actors />} />
    <Route path="/*" element={<NotFound />} />
    </Routes>
    </div>
      </div>
      <MovieUpload visible={showMovieUploadModal} onClose={hideMovieUploadModal} />
      <ActorUpload visible={showActorUploadModal} onClose={hideActorUploadModal} />
    </>
  );
}

export default AdminNavigator
