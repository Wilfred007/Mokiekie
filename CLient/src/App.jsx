

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import AdminProfile from './pages/AdminProfile';
// import CreateListing from './pages/CreateListing';
import Listing from './pages/Listing';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Create_Listing from './pages/Create_Listing';
import updateListing from './pages/UpdateListing';
import UpdateListing from './pages/UpdateListing';
import Search from './pages/Search';
import Footer from './components/Footer';
import ForgotPassword from './pages/ForgotPassword';


export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path='/search' element={<Search />} />
        <Route path='/listing/:listingId' element={<Listing />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/Admin-profile' element={<AdminProfile />} />
          <Route path='/create-listing' element={<Create_Listing />} />
          <Route path='/update-listing/:listingId' element={<UpdateListing />} />
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}