import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { useRef } from 'react'
import { 
  updateUserStart, 
  updateUserSuccess, 
  updateUserFailure,
  updateUserAvatar, 
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess
} from '../redux/user/userSlice'
import listing from '../../../Api/models/listing.model';

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined)
  const [fileUploadProgress, setFileUploadProgress] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [updateError, setUpdateError] = useState(false)
  const [showListingsError, setShowListingsError] = useState(false)
  const [userListings, setUserListings] = useState([])

  console.log(file)
  console.log(fileUploadProgress)
  console.log(formData)

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file])

  const handleLogOut = async() => {
    try {
      dispatch(signOutUserStart())
      const res = await fetch('/Api/auth/signout');
      const data = await res.json();
      if(data.success == false) {
        dispatch(deleteUserFailure(data.message))
        return;
      }

       // Clear Redux user state
    dispatch(signOutUserSuccess());

    // Redirect to login page
    navigate('/login');
    } catch (error) {
      dispatch(deleteUserFailure(data.message))
    }

  }

  const handleDeleteListing = async (listingId) => {
    try {
      const res = await fetch(`/Api/listing/delete/${listingId}`, {
        method: 'DELETE',

      });
      const data = await res.json();
      if(data.success == false) {
        console.log(data.message);
        return
      }
      setUserListings((prev) => prev.filter((listing) => listing._id != listingId))
    } catch (error) {
      
    }
  }


  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
  
      const res = await fetch(`/Api/user/listings/${currentUser._id}`);
      const data = await res.json();
  
      if (data.success === false) {
        setShowListingsError(data.message || 'Failed to fetch listings');
        return;
      }
  
      console.log('User Listings:', data);
      // setListings(data); // example if you want to store it in state
      setUserListings(data)
  
    } catch (error) {
      console.error('Error fetching listings:', error);
      setShowListingsError(true);
    }
  };
    

  const handleDeleteUser = async() => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/Api/user/delete/${currentUser._id}`, {
        method: 'DELETE',

      });


      const data = await res.json();
      if (data.success == false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data))
      
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
      
    }
  }

  const handleFileUpload = async (file) => {
    try {
      setFileUploadError(false)
      setFileUploadProgress(0)
      
      const formDataUpload = new FormData()
      formDataUpload.append('file', file)

      // Create XMLHttpRequest to track upload progress
      const xhr = new XMLHttpRequest()
      
      // Track upload progress
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100)
          setFileUploadProgress(progress)
        }
      })

      // Handle response
      xhr.onload = function() {
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText)
            setFormData(prev => ({ ...prev, avatar: response.url }))
            setFileUploadProgress(100)
            setFileUploadError(false)
            
            // Update Redux store with new avatar immediately
            dispatch(updateUserAvatar(response.url))
            
          } catch (parseError) {
            console.error('Failed to parse response:', parseError)
            setFileUploadError('Failed to parse server response')
            setFileUploadProgress(0)
          }
        } else {
          // Get the actual error message from server
          try {
            const errorResponse = JSON.parse(xhr.responseText)
            const errorMessage = errorResponse.error || `Server error: ${xhr.status}`
            setFileUploadError(errorMessage)
            console.error('Upload failed:', xhr.status, errorResponse)
          } catch (parseError) {
            setFileUploadError(`Upload failed with status: ${xhr.status}`)
            console.error('Upload failed:', xhr.status, xhr.responseText)
          }
          setFileUploadProgress(0)
        }
      }

      xhr.onerror = function() {
        setFileUploadError('Network error - check if server is running')
        setFileUploadProgress(0)
        console.error('Upload request failed - network error')
      }

      // Send request - FIXED: uppercase 'A' to match your backend
      xhr.open('POST', '/Api/upload')
      xhr.send(formDataUpload)

    } catch (error) {
      setFileUploadError(`Upload failed: ${error.message}`)
      setFileUploadProgress(0)
      console.error('Upload error:', error)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // DEBUG: Check what's in currentUser
    console.log('Current User:', currentUser);
    console.log('User Token:', currentUser.token);
    console.log('User ID:', currentUser._id);
    
    try {
      setUpdateSuccess(false)
      setUpdateError(false)
      
      // FIXED: uppercase 'A' to match your backend
      // Temporarily skip token check for testing
      // if (!currentUser.token) {
      //   setUpdateError('Authentication token missing. Please sign in again.');
      //   return;
      // }
      
      const res = await fetch(`/Api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${currentUser.token}` // Disabled for testing
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      
      if (data.success === false) {
        setUpdateError(data.message || 'Update failed')
        console.error('Update failed:', data.message)
        return
      }

      // Update Redux store with new user data
      // dispatch(updateUserSuccess(data.user))
      setUpdateSuccess(true)
      
    } catch (error) {
      setUpdateError('Update failed. Please try again.')
      console.error('Update error:', error)
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-bold text-slate-700 text-center my-10'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input 
          onChange={(e) => setFile(e.target.files[0])} 
          type='file' 
          ref={fileRef} 
          hidden 
          accept='image/*' 
        />
        
        {/* FIXED: Changed h-25 w-25 to h-24 w-24 (valid Tailwind classes) */}
        <img 
          onClick={() => fileRef.current.click()} 
          src={formData.avatar || currentUser.avatar} 
          alt="User" 
          className='rounded-full h-24 w-24 object-cover self-center cursor-pointer mt-2 border-4 border-gray-300 hover:border-gray-400 transition-colors' 
        />
        
        {/* Upload Progress Indicator */}
        {fileUploadProgress > 0 && fileUploadProgress < 100 && (
          <div className='text-center'>
            <div className='w-full bg-gray-200 rounded-full h-2.5 mb-2'>
              <div 
                className='bg-blue-600 h-2.5 rounded-full transition-all duration-300' 
                style={{width: `${fileUploadProgress}%`}}
              ></div>
            </div>
            <span className='text-sm text-gray-600'>{fileUploadProgress}% uploaded</span>
          </div>
        )}
        
        {/* Upload Status Messages */}
        {fileUploadError && (
          <span className='text-red-700 text-sm text-center'>
            {typeof fileUploadError === 'string' ? fileUploadError : 'Image upload failed - please try again'}
          </span>
        )}
        
        {fileUploadProgress === 100 && !fileUploadError && (
          <span className='text-green-700 text-sm text-center'>
            Image uploaded successfully!
          </span>
        )}

        <input 
          type='text' 
          placeholder='Username' 
          defaultValue={currentUser.username}
          id='username' 
          className='border p-3 rounded-lg focus:outline-none focus:border-blue-500 bg-white' 
          onChange={handleChange}
        />
        
        <input 
          type='email' 
          placeholder='Email' 
          defaultValue={currentUser.email}
          id='email' 
          className='border p-3 rounded-lg focus:outline-none focus:border-blue-500 bg-white' 
          onChange={handleChange}
        />
        
        <input 
          type='password' 
          placeholder='Password' 
          id='password' 
          className='border p-3 rounded-lg focus:outline-none focus:border-blue-500 bg-white' 
          onChange={handleChange}
        />
        
        <button 
          type='submit'
          disabled={loading}
          className='bg-blue-600 text-white p-4 rounded-xl cursor-pointer hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
        >
          {loading ? 'loading...' : 'Update'}
        </button>
        
        <Link to={'/create-listing'} 
          type='button'
          className='bg-green-600 text-white p-4 rounded-xl cursor-pointer hover:bg-green-800 text-center disabled:opacity-85 transition-colors'
        >
          Create Listing
        </Link>
      </form>

      {/* Success Message */}
      {updateSuccess && (
        <p className='text-green-700 mt-5 text-center font-medium'>User updated successfully!</p>
      )}

      {/* Error Message */}
      {updateError && (
        <p className='text-red-700 mt-5 text-center font-medium'>{updateError}</p>
      )}

      <button onClick={handleShowListings} className='text-gray-700 text-xl font-semibold p-10'>Show Listings</button>
      <p>{showListingsError ? 'Error SHowing Listing': ''}</p>
      <div>
  {userListings && userListings.length > 0 && (
    <div>
        <h1 className="text-center text-2xl font-bold text-gray-700">Your Listings</h1>
      {userListings.map((listing) => (
        <div
          key={listing._id}
          className="rounded-lg border border-gray-200 p-3 flex justify-between items-center gap-4 my-4"
        >
          <Link to={`/listing/${listing._id}`}>
            <img
              src={listing.imageUrls[0]}
              alt="listing cover"
              className="h-15 w-15 object-contain rounded-lg"
            />
          </Link>
          <Link
            className="text-lg font-semibold text-gray-700 truncate"
            to={`/listing/${listing._id}`}
          >
            <h2>{listing.name}</h2>
          </Link>
          <div className="space-x-3">
            <button onClick={() =>handleDeleteListing(listing._id)} className="text-red-800">Delete</button>
            <Link to={`/update-listing/${listing._id}`}>
            <button className="text-blue-900">Edit</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-800 cursor-pointer hover:text-red-900 transition-colors'>Delete Account</span>
        <span onClick={handleLogOut} className='text-gray-800 font-semibold cursor-pointer hover:text-gray-900 transition-colors'>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile