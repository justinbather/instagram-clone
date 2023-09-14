import logo from './logo.svg';
import './App.css';
import Test from "../src/pages/test/Test"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path='/test' index element={<Test />}></Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
