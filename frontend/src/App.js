import React, { createContext, useReducer,useEffect } from 'react';
import Navbar from './components/Navbar';
import Contact from './Pages/Contact';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Logout from './components/Logout';

import 'bootstrap/dist/css/bootstrap.css';
import Errorpage from './Pages/Errorpage';
import Profile from './components/Profile';
import Staff from './Pages/Staff';
import AllCertificates from './Pages/AllCertificates';
import Input from './Pages/Input';
import Popup from './Pages/Popup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Notification from './Pages/Notification';
import Certificates from './Pages/Certificates';
import ExcelSheet from './Pages/ExcelSheet';
import { initialState, authReducer } from './reducer/authReducer';
import Cookies from 'js-cookie';

export const userContext = createContext();

const Routing = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/certificate" element={<Certificates />} />
          <Route exact path="/register" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/input" element={<Input />} />

          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/announcements" element={<Notification />} />
          <Route exact path="/sheet" element={<ExcelSheet />} />
          <Route exact path="/staff" element={<Staff />} />
          <Route exact path="/upload" element={<Popup />} />
          <Route exact path="/getAllUser" element={<AllCertificates />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const App = () => {
const [authState, dispatch] = useReducer(authReducer, initialState);

const checkAuthentication = () => {
const token = Cookies.get('jwtoken');
        if (token) {
          dispatch({ type: 'LOGIN', payload: { token } });
        } else {
          dispatch({ type: 'LOGOUT' });
        }
      };
      useEffect(() => {
        checkAuthentication();
}, []);
  return (
    <>
      <userContext.Provider value={{ authState, dispatch }}>
        <Routing />
      </userContext.Provider>
    </>
  );
}

export default App;
