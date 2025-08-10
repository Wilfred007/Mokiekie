import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart, signInSuccess, signInFailure  } from '../redux/user/userSlice'

const SignIn = () => {
  const [formData, setFormData] = useState({})
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false)
  const { loading, error } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch();




  const handleChange=(e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      dispatch(signInStart());
      // setError(null)
      const res = await fetch('/Api/auth/signin', 
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
        // setError(data.message || 'Something went wrong');
        // setLoading(false);
        // setError(data.message);
        dispatch(signInFailure(data.message));
        return;
      }
      // setLoading(false)
      // setError(null)
      dispatch(signInSuccess(data));
      navigate('/')
      
    } catch (error) {
      // setLoading(false)
      // setError(error.message)
      dispatch(signInFailure(error.message));
    }
   

  };
  // console.log(formData)
  return (
    <div>
      <h1 className='text-3xl text-center font-bold text-slate-600 my-7'>Sign In</h1>
      <form className='flex flex-col gap-4 p-5 max-w-lg mx-auto' onSubmit={handleSubmit}>
        <input type='email' placeholder='Email' className='border-none bg-white p-3 rounded-lg focus:outline-none' id='email'onChange={handleChange} />
        <input type='password' placeholder='Password' className='border-none bg-white focus:outline-none p-3 rounded-lg' id='password'onChange={handleChange} />
        <button disabled={loading}  className='bg-blue-600 text-white p-4 rounded-xl cursor-pointer hover:bg-blue-800 disabled:opacity-85'>{loading ? 'Loading...': 'Sign In'}</button>
      </form>
      <div className='flex gap-2 justify-center'>
        <h1>Dont have an account?</h1>
        <Link to={"/sign-up"} className='text-blue-700'>Sign Up</Link>
      </div>
      {error && <p className='text-red-900 flex justify-center'>{error}</p>}
    </div>
  )
}

export default SignIn