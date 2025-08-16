// import React from 'react'
// import { Route, Routes, BrowserRouter } from 'react-router-dom'
// import Header from './components/Header'
// import Home from './pages/Home'
// import About from './pages/About'
// import SignUp from './pages/SignUp'
// import SignIn from './pages/SignIn'
// import Profile from './pages/Profile'
// import PrivateRoute from './components/PrivateRoute'
// import Create_Listing from './pages/Create_Listing'

// const App = () => {
//   return (
//     <BrowserRouter>
//     <Header/>
//     <Routes>
//     <Route path='/' element = {<Home/>}/>
//     <Route path='/about' element={<About/>}/>
//     <Route path='/sign-up' element={<SignUp/>}/>
//     <Route path='/sign-in' element={<SignIn/>}/>
//     <Route path="/signin" element={<SignIn />} />
//     <Route element={<PrivateRoute />}>
//     <Route path='/profile' element={<Profile/>}/>
//     <Route path='/create-listing' element={<Create_Listing/>}/>
//     </Route>

//     </Routes>
//     </BrowserRouter>
//   )
// }

// export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
// import CreateListing from './pages/CreateListing';
import Listing from './pages/Listing';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Create_Listing from './pages/Create_Listing';
import updateListing from './pages/UpdateListing';
import UpdateListing from './pages/UpdateListing';
import Search from './pages/Search';


export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/search' element={<Search />} />
        <Route path='/listing/:listingId' element={<Listing />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<Create_Listing />} />
          <Route path='/update-listing/:listingId' element={<UpdateListing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}