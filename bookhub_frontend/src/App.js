import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./components/Navigation";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from './components/UserList';
import ManageUser from "./components/ManageUser";
import Books from './components/BookList';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/manage" element={<ManageUser/>} />
        <Route path="/books" element={<Books/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;