import React from 'react'
import { Route, Routes } from 'react-router-dom';
import NotFound from '../component/NotFound';
import Dashboard from "../component/admin/Dashboard"
import Movies from "../component/admin/Movies"
import Actors from "../component/admin/Actors";
import AdminNavbar from '../component/admin/Navbar';


const AdminNavigator = () => {
  return (
    <div className="flex">
      <AdminNavbar />
      <div className='flex-1 p-2 max-w-screen-xl'>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/actors" element={<Actors />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      </div>
    </div>
  );
}

export default AdminNavigator
