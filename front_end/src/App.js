//import logo from './logo.svg';
import { useState, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import{ Home, Login, SignUp, Landing, NavBar, Question_Page }from './components/Screen';

const App = ()=> {
  const [user, setUser] = useState({});

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("user")); 
    if(item?.email != user?.email) {
      setUser({
        email: item?.email,
        id: item?.id
      });
    }

  }, [user, localStorage]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/nav" element={<NavBar user={user}/>} />
        <Route path="/questions/:id" element={<Question_Page user={user}/>} />
        <Route path="/" element={user?.email ? <Navigate to="/home" /> : <Landing user={user}/>} />
        <Route path="/signup" element={user?.email ? <Navigate to="/home" /> : <SignUp />} />
        <Route path="/login" element={user?.email ? <Navigate to="/home" /> : <Login/>} />
        <Route path="/home" element={user?.email ? <Home user={user} /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
