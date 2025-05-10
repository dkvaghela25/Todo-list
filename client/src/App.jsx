import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import LoginPage from './pages/LoginPage/LoginPage';
import UserDetails from './pages/UserDetails/UserDetails';
import UpdateUserdetails from './pages/UpdateUserdetails/UpdateUserdetails';
import Navbar from './components/Navbar';
import DeleteUser from './pages/DeleteUser/DeleteUser';
import LogoutPage from './pages/LogoutPage/LogoutPage';
import TodoList from './pages/TodoList/TodoList';
import HomePage from './pages/HomePage/HomePage';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/user-details" element={<UserDetails />} />
          <Route path="/update-user" element={<UpdateUserdetails />} />
          <Route path="/delete-user" element={<DeleteUser />} />
          <Route path="/todo-list" element={<TodoList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;