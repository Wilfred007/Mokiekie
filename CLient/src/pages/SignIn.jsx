// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { signInStart, signInSuccess, signInFailure  } from '../redux/user/userSlice'
// import OAuth from '../components/OAuth'

// const SignIn = () => {
//   const [formData, setFormData] = useState({})
//   // const [error, setError] = useState(null);
//   // const [loading, setLoading] = useState(false)
//   const { loading, error } = useSelector((state) => state.user)
//   const navigate = useNavigate()
//   const dispatch = useDispatch();




//   const handleChange=(e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });

//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // setLoading(true);
//       dispatch(signInStart());
//       // setError(null)
//       const res = await fetch('/Api/auth/signin', 
//         {
//           method: 'POST',
//           headers: {
//             'Content-type': 'application/json'
//           },
//           body: JSON.stringify(formData),
//         }
//       );
//       const data = await res.json();
//       console.log(data)
//       if(!res.ok){
//         // setError(data.message || 'Something went wrong');
//         // setLoading(false);
//         // setError(data.message);
//         dispatch(signInFailure(data.message));
//         return;
//       }
//       // setLoading(false)
//       // setError(null)
//       dispatch(signInSuccess(data));
//       navigate('/')
      
//     } catch (error) {
//       // setLoading(false)
//       // setError(error.message)
//       dispatch(signInFailure(error.message));
//     }
   

//   };
//   // console.log(formData)
//   return (
//     <div>
//       <h1 className='text-3xl text-center font-bold text-slate-600 my-7'>Sign In</h1>
//       <form className='flex flex-col gap-4 p-5 max-w-lg mx-auto' onSubmit={handleSubmit}>
//         <input type='email' placeholder='Email' className='border-none bg-white p-3 rounded-lg focus:outline-none' id='email'onChange={handleChange} />
//         <input type='password' placeholder='Password' className='border-none bg-white focus:outline-none p-3 rounded-lg' id='password'onChange={handleChange} />
//         <button disabled={loading}  className='bg-blue-600 text-white p-4 rounded-xl cursor-pointer hover:bg-blue-800 disabled:opacity-85'>{loading ? 'Loading...': 'Sign In'}</button>
//         <OAuth/>
//       </form>
//       <div>
//       <div className='flex gap-2 justify-center'>
//         <h1>Dont have an account?</h1>
//         <Link to={"/sign-up"} className='text-blue-700'>Sign Up</Link>
//       </div>
//       <div className='flex gap-2 justify-center'>
//         {/* <h1>Dont have an accou?</h1> */}
//         <Link to={"/sign-up"} className='text-blue-700'>Forgot Password</Link>
//       </div>
//       </div>
//       {error && <p className='text-red-900 flex justify-center'>{error}</p>}
//     </div>
//   )
// }

// export default SignIn


// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { signInStart, signInSuccess, signInFailure  } from '../redux/user/userSlice'
// import OAuth from '../components/OAuth'
// import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'

// const SignIn = () => {
//   const [formData, setFormData] = useState({})
//   const [showPassword, setShowPassword] = useState(false)
//   // const [error, setError] = useState(null);
//   // const [loading, setLoading] = useState(false)
//   const { loading, error } = useSelector((state) => state.user)
//   const navigate = useNavigate()
//   const dispatch = useDispatch();

//   const handleChange=(e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // setLoading(true);
//       dispatch(signInStart());
//       // setError(null)
//       const res = await fetch('/Api/auth/signin', 
//         {
//           method: 'POST',
//           headers: {
//             'Content-type': 'application/json'
//           },
//           body: JSON.stringify(formData),
//         }
//       );
//       const data = await res.json();
//       console.log(data)
//       if(!res.ok){
//         // setError(data.message || 'Something went wrong');
//         // setLoading(false);
//         // setError(data.message);
//         dispatch(signInFailure(data.message));
//         return;
//       }
//       // setLoading(false)
//       // setError(null)
//       dispatch(signInSuccess(data));
//       navigate('/')
      
//     } catch (error) {
//       // setLoading(false)
//       // setError(error.message)
//       dispatch(signInFailure(error.message));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         {/* Main card */}
//         <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Lock className="w-8 h-8 text-blue-600" />
//             </div>
//             <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h1>
//             <p className="text-slate-600 text-sm">
//               Sign in to your account to continue
//             </p>
//           </div>

//           {/* Error message */}
//           {error && (
//             <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
//               <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
//               <p className="text-red-700 text-sm">{error}</p>
//             </div>
//           )}

//           {/* Form */}
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="w-full px-4 py-3.5 pl-12 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-400"
//                   id="email"
//                   onChange={handleChange}
//                   required
//                 />
//                 <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   className="w-full px-4 py-3.5 pl-12 pr-12 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-400"
//                   id="password"
//                   onChange={handleChange}
//                   required
//                 />
//                 <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
//                 >
//                   {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                 </button>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
//             >
//               {loading ? (
//                 <div className="flex items-center justify-center gap-2">
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   <span>Signing In...</span>
//                 </div>
//               ) : (
//                 'Sign In'
//               )}
//             </button>

//             {/* OAuth component */}
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-slate-200"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-4 bg-white text-slate-500 font-medium">Or continue with</span>
//               </div>
//             </div>

//             <OAuth />
//           </form>

//           {/* Footer links */}
//           <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
//             <div className="text-center">
//               <p className="text-sm text-slate-600">
//                 Don't have an account?{' '}
//                 <Link 
//                   to="/sign-up" 
//                   className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline"
//                 >
//                   Sign Up
//                 </Link>
//               </p>
//             </div>
//             <div className="text-center">
//               <Link 
//                 to="/forgot-password" 
//                 className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200 hover:underline"
//               >
//                 Forgot Password?
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Security notice */}
//         <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4">
//           <div className="flex items-start gap-3">
//             <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
//               <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
//             </div>
//             <div>
//               <h3 className="font-medium text-blue-900 text-sm mb-1">Secure Sign In</h3>
//               <p className="text-blue-700 text-xs leading-relaxed">
//                 Your connection is encrypted and your data is protected with industry-standard security measures.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SignIn


import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart, signInSuccess, signInFailure  } from '../redux/user/userSlice'
import OAuth from '../components/OAuth'
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'

// API base URL configuration
// const API_BASE_URL = import.meta.env.VITE_API_URL || 
//   (import.meta.env.MODE === 'production' 
//     ? 'https://mokiekie.onrender.com' 

const SignIn = () => {
  const [formData, setFormData] = useState({})
  const [showPassword, setShowPassword] = useState(false)
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
      console.log('🔄 Starting sign in process...');
      dispatch(signInStart());
      
      // TEMPORARY: Force direct URL for testing
      const apiUrl = `https://mokiekie.onrender.com/Api/auth/signin`; // Always use direct URL for testing
      
      console.log('🌐 Making API call to:', apiUrl);
      console.log('🏗️ Environment mode:', import.meta.env.MODE);
      console.log('📦 Form data:', formData);
      
      const res = await fetch(apiUrl, {
        method: 'POST',
        credentials: 'include', // Important for cookies/sessions
        headers: {
          'Content-type': 'application/json',
          // "Authorization": `Bearer ${token}`   // 
        },
        body: JSON.stringify(formData),
      });
      
      console.log('📡 Response status:', res.status);
      console.log('📡 Response ok:', res.ok);
      console.log('📡 Response headers:', res.headers);
      
      // Check if response has content before parsing JSON
      const responseText = await res.text();
      console.log('📄 Raw response:', responseText);
      
      let data;
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (parseError) {
        console.error('❌ JSON parse error:', parseError);
        console.log('📄 Response was not JSON:', responseText);
        
        // If it's a 500 error with HTML response (common with server errors)
        if (res.status === 500 && responseText.includes('<!DOCTYPE html>')) {
          dispatch(signInFailure('Server error. Please check if the backend is running properly.'));
          return;
        }
        
        dispatch(signInFailure(`Server returned invalid response: ${responseText.substring(0, 100)}...`));
        return;
      }
      
      console.log('📄 Parsed response data:', data);
      
      if(!res.ok){
        console.log('❌ Server returned error:', data.message || `HTTP ${res.status}`);
        dispatch(signInFailure(data.message || `Server error (${res.status})`));
        return;
      }

      if(data.token) {
        localStorage.setItem("token", data.token);
        console.log('✅ Token stored in localStorage', data.token);
      }else {
        console.log('❌ No token received in response');
        dispatch(signInFailure('No token received from server'));
      }
      
      console.log('✅ Sign in successful');
      dispatch(signInSuccess(data));
      navigate('/')
      
    } catch (error) {
      console.error('❌ Sign in error:', error);
      dispatch(signInFailure(error.message || 'Network error occurred'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h1>
            <p className="text-slate-600 text-sm">
              Sign in to your account to continue
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3.5 pl-12 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-400"
                  id="email"
                  onChange={handleChange}
                  required
                />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3.5 pl-12 pr-12 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-400"
                  id="password"
                  onChange={handleChange}
                  required
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            {/* OAuth component */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500 font-medium">Or continue with</span>
              </div>
            </div>

            <OAuth />
          </form>

          {/* Footer links */}
          <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
            <div className="text-center">
              <p className="text-sm text-slate-600">
                Don't have an account?{' '}
                <Link 
                  to="/sign-up" 
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
            <div className="text-center">
              <Link 
                to="/forgot-password" 
                className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>

        {/* Security notice */}
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            </div>
            <div>
              <h3 className="font-medium text-blue-900 text-sm mb-1">Secure Sign In</h3>
              <p className="text-blue-700 text-xs leading-relaxed">
                Your connection is encrypted and your data is protected with industry-standard security measures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn