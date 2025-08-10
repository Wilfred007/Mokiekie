import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()




  const handleChange=(e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null)
      const res = await fetch('/Api/auth/signup', 
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      console.log(data)
      if(!res.ok){
        setError(data.message || 'Something went wrong');
        setLoading(false);
        // setError(data.message);
        return;
      }
      setLoading(false)
      setError(null)
      navigate('/sign-in')
      
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
   

  };
  // console.log(formData)
  return (
    <div>
      <h1 className='text-3xl text-center font-bold text-slate-600 my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4 p-5 max-w-lg mx-auto' onSubmit={handleSubmit}>
        <input type='text' placeholder='Username' className='border-none bg-white p-3 rounded-lg focus:outline-none' id='username'onChange={handleChange} />
        <input type='email' placeholder='Email' className='border-none bg-white p-3 rounded-lg focus:outline-none' id='email'onChange={handleChange} />
        <input type='password' placeholder='Password' className='border-none bg-white focus:outline-none p-3 rounded-lg' id='password'onChange={handleChange} />
        <button disabled={loading}  className='bg-blue-600 text-white p-4 rounded-xl cursor-pointer hover:bg-blue-800 disabled:opacity-85'>{loading ? 'Loading...': 'Sign Up'}</button>
      </form>
      <div className='flex gap-2 justify-center'>
        <h1>Have an account?</h1>
        <Link to={"/signin"} className='text-blue-700'>Sign in</Link>
      </div>
      {error && <p className='text-red-900 flex justify-center'>{error}</p>}
    </div>
  )
}

export default SignUp