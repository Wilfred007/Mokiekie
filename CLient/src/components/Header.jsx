import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
    const { currentUser } = useSelector(state => state.user)
  return (
    <header className='bg-slate-200'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-5'>
            <Link to='/'>
        <div>
        {/* <span className='font-bold text-2xl text-slate-700'>Mokiekie</span> */}
        {/* <span className='font-bold text-xl text-slate-500'>Estate</span> */}
        <img 
  src="/mok.jpg" 
  alt="" 
  className="w-25 h-25 object-cover rounded-full" 
/>
        </div>
        </Link> 
        <div>
            <form className='bg-slate-100 p-2 rounded-lg flex items-center'>
            <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none w-14 sm:w-64'/>
            <FaSearch className=' text-gray-500 w-2.5 sm:w-3.5'/>
            </form>
        </div>
        <div>
            <ul className='flex gap-4'>
                <Link to='/'>
                <li className='hidden sm:inline text-slate-800 hover:underline cursor-pointer'>Home</li>
                </Link>
                <Link to='/About'>
                <li className='hidden sm:inline text-slate-800 hover:underline cursor-pointer'>About</li>
                </Link>
                <Link to='/profile'>
                {currentUser ? (
                    <img src={currentUser.avatar} alt='profile'  className='w-10 h-10 rounded-full object-cover'/>
                ): (
                    <li className=' sm:inline text-slate-800 hover:underline cursor-pointer'>
                    {''}
                    Sign In</li>
                )}
                
                </Link>

            </ul>
        </div>
        </div>
    </header>
  )
}

export default Header