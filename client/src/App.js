import logo from './logo.svg';
import './App.css';
import Test from "../src/pages/test/Test"
import { Login } from './pages/Login/Login';

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Home } from './pages/Home/Home';
import { Profile } from './pages/Profile/Profile';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path='/test' index element={<Test />}></Route>
        <Route path='/login' index element={<Login />}></Route>
        <Route path='/home' index element={<Home />}></Route>
        <Route path='/profile' index element={<Profile />}></Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
