import logo from './logo.svg';
import './App.css';
import Test from "../src/pages/test/Test"
import { Login } from './pages/Login/Login';

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Home } from './pages/Home/Home';
import { Profile } from './pages/Profile/Profile';
import { Search } from './pages/Search/Search';
import { Post } from './pages/Post/Post';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Navigate replace to='/login' />} />
        <Route path='/test' index element={<Test />}></Route>
        <Route path='/login' index element={<Login />}></Route>
        <Route path='/home' index element={<Home />}></Route>
        <Route path='/profile/:usernameParam?' index element={<Profile />}></Route>
        <Route path='/post' index element={<Post />}></Route>

        
        <Route path='/search' index element={<Search />}></Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
