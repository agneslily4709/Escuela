import React , {createContext,useReducer} from 'react';
import {initialState,reducer} from './reducer/UseReduer';
import Navbar from './components/Navbar';
import Contact from './Pages/Contact';
// import Profile from './components/Navbar/Profile/Profile'
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
// import Email from './components/Email/Email';
import 'bootstrap/dist/css/bootstrap.css';
// import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Errorpage from './Pages/Errorpage';
import Logout from './components/Logout';
// import ExcelSheet from './components/Staff/ExcelSheet/ExcelSheet';
// import Staff from './components/Staff/Staff';
// import AllCertificates from './components/Staff/AllCertificates/AllCertificates';
import Input from './Pages/Input';
// import Popup from './components/Staff/ExcelSheet/Popup';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Profile from './components/Profile';
import Email from './Pages/Email';
import Certificates from './Pages/Certificates';
import ExcelSheet from './Pages/ExcelSheet';

export const userContext = createContext();
const Routing = () =>{
  return (
    <div>
  {/* <Router>
  <Navbar/>
  <Switch>
        <Route exact path="/"><Home /></Route>
        <Route exact path="/contact"><Contact /></Route>
        <Route exact path="/profile"><Profile/></Route>
        <Route exact path="/certificate"><Certifi/></Route>
        <Route exact path="/register"><Signup /> </Route>
        <Route exact path="/login"><Login /> </Route>
        <Route exact path="/mail"><Email /></Route>
        <Route exact path="/logout"><Logout /></Route>
        <Route exact path="/sheet"><ExcelSheet/></Route>
        <Route exact path="/staff"><Staff/></Route>
        <Route exact path="/getAllUser"><AllCertificates/></Route>
        <Route exact path="/input"><Input/></Route>
        <Route exact path="/upload"><Popup/></Route>
        <Route >
          <Errorpage /> 
        </Route>
  </Switch>
  </Router> */}
  <BrowserRouter>
<Navbar/>
  <Routes>
  <Route exact path="/"element={<Home />}></Route>
        <Route exact path="/certificate" element={<Certificates />}> </Route>
        <Route exact path="/register" element={<Signup />}> </Route>
        <Route exact path="/login" element={<Login />}> </Route>
        <Route exact path="/logout" element={<Logout />}></Route>
        <Route exact path="/input" element={<Input/>}></Route>
        <Route exact path="/profile" element={<Profile/>}></Route>
        <Route exact path="/contact" element={<Contact/>}></Route>
        <Route exact path="/mail" element={<Email/>}></Route>
        <Route exact path="/sheet" element={<ExcelSheet/>}></Route>
        <Route path="*" element={<Errorpage/>}></Route>
        {/* <Route exact path="/mail"><Email /></Route>
        <Route exact path="/sheet"><ExcelSheet/></Route>
        <Route exact path="/staff"><Staff/></Route>
        <Route exact path="/getAllUser"><AllCertificates/></Route>
        <Route exact path="/input"><Input/></Route>
        <Route exact path="/upload"><Popup/></Route> */}
  </Routes>
  </BrowserRouter>
    </div>
)
}

const  App = () =>{
const [state,dispatch] = useReducer(reducer,initialState);

  return (
    <>
    <userContext.Provider value={{state,dispatch}}>
    <Routing />
    </userContext.Provider>
    </> 
  );
}

export default App;
