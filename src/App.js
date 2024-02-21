import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

import { AuthProvider } from './context/AuthContext';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';
import Search from './pages/Search/Search';
import Post from './pages/Post/Post'
import EditPost from './pages/EditPost/EditPost';

import Navbar from './components/Navbar';
import NotFound from './pages/NotFound/NotFound';

function App() {

  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

  }, [auth]) 

  if(loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className='container'>
            <Routes>
            <Route path="/" element={<Navigate to="/Home" />} />
              <Route path='/home' element={<Home />} />
              <Route path='/search' element={<Search />} />
              <Route path='/posts/:id' element={<Post />} />
              <Route path='/login' element={!user ? <Login /> : <Navigate to="/Home" />} />
              <Route path='/register' element={!user ? <Register /> : <Navigate to="/Home" />} />
              <Route path='/posts/edit/:id' element={user ? <EditPost /> : <Navigate to="/Login" />} />
              <Route path='/posts/create' element={user ? <CreatePost /> : <Navigate to="/Login" />} />
              <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to="/Login" />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;