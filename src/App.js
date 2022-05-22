import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import NoPage from "./pages/NoPage";
import Login from './pages/Login';
import Profile from './pages/Profile';
import { useSelector, useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { actionCreators } from "./state/index"
import Register from './pages/Register';
import * as React from "react"
import { auth } from "./firebase"


import { getAuth, onAuthStateChanged } from "firebase/auth";

const App = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const { setCurrentUser } = bindActionCreators(actionCreators, dispatch)

    return (

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="*" element={<NoPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/update-profile" element={<Profile/>} />
        </Routes>
      </BrowserRouter>
    );


}

export default App

