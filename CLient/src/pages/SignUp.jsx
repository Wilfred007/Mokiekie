import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div>
      <h1 className='text-3xl text-center font-bold text-slate-600 my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4 p-5 max-w-lg mx-auto'>
        <input type='text' placeholder='Username' className='border-none bg-white p-3 rounded-lg focus:outline-none' id='username' />
        <input type='email' placeholder='Email' className='border-none bg-white p-3 rounded-lg focus:outline-none' id='email' />
        <input type='password' placeholder='Password' className='border-none bg-white focus:outline-none p-3 rounded-lg' id='password' />
        <button  className='bg-blue-600 text-white p-4 rounded-xl cursor-pointer hover:bg-blue-800 disabled:opacity-85'>Sign Up</button>
      </form>
      <div className='flex gap-2 justify-center'>
        <h1>Have an account?</h1>
        <Link to={"/signin"} className='text-blue-700'>Sign in</Link>
      </div>
    </div>
  )
}

export default SignUp