import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Contact = ({listing}) => {
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState('');

    const onChange = (e) => {
        setMessage(e.target.value);
    }

    useEffect(() => {
        const fetchLandLord = async () => {
            try {
                const res = await fetch(`/Api/user/${listing.userRef}`);
                const data  = await res.json();
                setLandlord(data);
            } catch (error) {
                console.log("Error fetching landlord:", error);
                
            }
        }
        fetchLandLord();
    }, [listing.userRef])
  return (
    <>
    {
        landlord && (
            <div className='flex flex-col gap-3'>
                <p>Contact: <span className='font-semibold'>{landlord.username}</span> for <span className='text-gray-600 font-semibold'>{listing.name}</span></p>
                <textarea name="message" id="message" rows="2" value={message} onChange={onChange} placeholder='Enter Your Message Here...' className='w-full p-3 rounded-lg focus:outline-none border border-gray-300 h-30'></textarea>
                <Link to={`mailto:${landlord.mail}?subject=regarding ${listing.name}&body=${message}`} className='bg-blue-700 text-white text-center p-3 rounded-lg hover:opacity-90'>
                Send Message
                </Link>
            </div>
        )
    }
    </>
  )
}

export default Contact