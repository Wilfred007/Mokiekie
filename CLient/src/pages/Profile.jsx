import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const { currentUser } = useSelector((state) => state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl font-bold text-slate-700 text-center my-10'>Profile</h1>
    <form className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt="User" className='rounded-full h-25 w-25 object-cover self-center cursor-pointer mt-2' />
        <input type='text' placeholder='Username' id='username' className='border-none p-3 rounded-lg focus:outline-none bg-white' />
        <input type='email' placeholder='Email' id='email' className='border-none p-3 rounded-lg focus:outline-none bg-white' />
        <input type='password' placeholder='Password' id='password' className='border-none p-3 rounded-lg focus:outline-none bg-white' />

        <button className='bg-blue-600 text-white p-4 rounded-xl cursor-pointer hover:bg-blue-800 disabled:opacity-85'>Update</button>
        <button className='bg-green-600 text-white p-4 rounded-xl cursor-pointer hover:bg-green-800 disabled:opacity-85'>Create Listing</button>
    </form>
    <div className='flex justify-between mt-5'>
        <span className='text-red-800'>Delete Account</span>
        <span className='text-gray-800 text-semi-bold'>Sign Out</span>

    </div>
    </div>
  )
}

export default Profile