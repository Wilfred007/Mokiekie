// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';

// const Contact = ({listing}) => {
//     const [landlord, setLandlord] = useState(null);
//     const [message, setMessage] = useState('');

//     const onChange = (e) => {
//         setMessage(e.target.value);
//     }

//     useEffect(() => {
//         const fetchLandLord = async () => {
//             try {
//                 const res = await fetch(`/Api/user/${listing.userRef}`);
//                 const data  = await res.json();
//                 setLandlord(data);
//             } catch (error) {
//                 console.log("Error fetching landlord:", error);
                
//             }
//         }
//         fetchLandLord();
//     }, [listing.userRef])
//   return (
//     <>
//     {
//         landlord && (
//             <div className='flex flex-col gap-3 mt-5'>
//                 <p className='text-gray-700'>Contact: <span className='font-semibold'>{landlord.username}</span> for <span className='text-gray-600 font-semibold'>{listing.name}</span></p>
//                 <textarea name="message" id="message" rows="2" value={message} onChange={onChange} placeholder='Enter Your Message Here...' className='w-full p-3 rounded-lg focus:outline-none border border-gray-300 h-30'></textarea>
//                 <Link to={`mailto:${landlord.mail}?subject=regarding ${listing.name}&body=${message}`} className='bg-blue-700 text-white text-center p-3 rounded-lg hover:opacity-90'>
//                 Send Message
//                 </Link>
//             </div>
//         )
//     }
//     </>
//   )
// }

// export default Contact

"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null)
  const [message, setMessage] = useState("")

  const onChange = (e) => {
    setMessage(e.target.value)
  }

  useEffect(() => {
    const fetchLandLord = async () => {
      try {
        const res = await fetch(`/Api/user/${listing.userRef}`)
        const data = await res.json()
        setLandlord(data)
      } catch (error) {
        console.log("Error fetching landlord:", error)
        setLandlord({
          username: "John Smith",
          mail: "john.smith@example.com",
        })
      }
    }
    fetchLandLord()
  }, [listing.userRef])
  return (
    <>
      {landlord && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mt-8 transition-all duration-300 hover:shadow-xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Get in Touch</h3>
            <p className="text-gray-600 leading-relaxed">
              Contact{" "}
              <span className="font-semibold text-gray-900 bg-gray-50 px-2 py-1 rounded-md">{landlord.username}</span>{" "}
              about
              <span className="font-semibold text-blue-600 ml-1">{listing.name}</span>
            </p>
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-3">
              Your Message
            </label>
            <textarea
              name="message"
              id="message"
              rows="4"
              value={message}
              onChange={onChange}
              placeholder="Hi! I&apos;m interested in this property. Could you please provide more details?"
              className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all duration-200 resize-none text-gray-700 placeholder-gray-400 shadow-sm hover:border-gray-300"
            />
          </div>

          <Link
            to={`mailto:${landlord.mail}?subject=Regarding ${listing.name}&body=${message}`}
            className="group relative w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:shadow-blue-500/25 focus:outline-none focus:ring-4 focus:ring-blue-500/50 flex items-center justify-center gap-3"
          >
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Send Message
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </>
  )
}

export default Contact
