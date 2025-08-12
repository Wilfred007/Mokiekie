import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRef } from 'react'
import { 
  updateUserStart, 
  updateUserSuccess, 
  updateUserFailure,
  updateUserAvatar 
} from '../redux/user/userSlice'

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

  console.log(file)
  console.log(fileUploadProgress)
  console.log(formData)

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file])

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
        
        <button 
          type='button'
          className='bg-green-600 text-white p-4 rounded-xl cursor-pointer hover:bg-green-800 disabled:opacity-85 transition-colors'
        >
          Create Listing
        </button>
      </form>

      {/* Success Message */}
      {updateSuccess && (
        <p className='text-green-700 mt-5 text-center font-medium'>User updated successfully!</p>
      )}

      {/* Error Message */}
      {updateError && (
        <p className='text-red-700 mt-5 text-center font-medium'>{updateError}</p>
      )}

      <div className='flex justify-between mt-5'>
        <span className='text-red-800 cursor-pointer hover:text-red-900 transition-colors'>Delete Account</span>
        <span className='text-gray-800 font-semibold cursor-pointer hover:text-gray-900 transition-colors'>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile