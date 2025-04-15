import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import LoginPage from './pages/LoginPage/LoginPage';
import UserDetails from './pages/UserDetails/UserDetails';
import UpdateUserdetails from './pages/UpdateUserdetails/UpdateUserdetails';
import Navbar from './components/Navbar';
import DeleteUser from './pages/DeleteUser/DeleteUser';


function App() {
  return (
    <Router>
      <Navbar/>
      <div className="App">
        
        <Routes>
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user-details" element={<UserDetails />} />
          <Route path="/update-user" element={<UpdateUserdetails />} />
          <Route path="/delete-user" element={<DeleteUser />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;