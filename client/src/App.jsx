import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateEntry from './pages/CreateEntry';
import UpdateEntry from './pages/UpdateEntry';
import Entry from './pages/Entry';
import Search from './pages/Search'

export default function App() {
  return (
  <BrowserRouter>
  <Header />
  <Routes>
    <Route path="/" element={<Home />} /> 
    <Route path="/sign-in" element={<SignIn />} /> 
    <Route path="/sign-up" element={<SignUp />} /> 
    <Route path="/about" element={<About />} />
    <Route path='/search' element={<Search />} />
    <Route path="/entry/:entryId" element={<Entry />} /> 


    <Route element={<PrivateRoute />} >
    <Route path="/profile" element={<Profile />} /> 
    <Route path="/create-entry" element={<CreateEntry />} />
    <Route path='/update-entry/:entryId' element={<UpdateEntry />} />
    </Route>
  </Routes>
  </BrowserRouter>
)}
