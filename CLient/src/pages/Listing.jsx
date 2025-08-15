// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { 
//   FaMapMarkerAlt, 
//   FaBed, 
//   FaBath, 
//   FaParking, 
//   FaChair, 
//   FaShare,
//   FaArrowLeft,
//   FaArrowRight
// } from 'react-icons/fa';

// const Listing = () => {
//   const params = useParams();
//   const navigate = useNavigate();
//   const { currentUser } = useSelector((state) => state.user);
  
//   const [listing, setListing] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [contact, setContact] = useState(false);
//   const [landlord, setLandlord] = useState(null);
//   const [message, setMessage] = useState('');
//   const [copied, setCopied] = useState(false);

//   useEffect(() => {
//     const fetchListing = async () => {
//       try {
//         setLoading(true);
//         setError(false);
        
//         const res = await fetch(`/Api/listing/${params.listingId}`);
//         const data = await res.json();
        
//         if (data.success === false) {
//           setError(true);
//           setLoading(false);
//           return;
//         }
        
//         setListing(data);
//         setLoading(false);
//       } catch (error) {
//         setError(true);
//         setLoading(false);
//       }
//     };

//     fetchListing();
//   }, [params.listingId]);

//   const handleImageNext = () => {
//     setCurrentImageIndex((prevIndex) => 
//       prevIndex === listing.imageUrls.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const handleImagePrev = () => {
//     setCurrentImageIndex((prevIndex) => 
//       prevIndex === 0 ? listing.imageUrls.length - 1 : prevIndex - 1
//     );
//   };

//   const handleContact = async () => {
//     try {
//       const res = await fetch(`/Api/user/${listing.userRef}`);
//       const data = await res.json();
      
//       if (data.success === false) {
//         console.log(data.message);
//         return;
//       }
      
//       setLandlord(data);
//       setContact(true);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleShare = () => {
//     navigator.clipboard.writeText(window.location.href);
//     setCopied(true);
//     setTimeout(() => {
//       setCopied(false);
//     }, 2000);
//   };

//   const onChange = (e) => {
//     setMessage(e.target.value);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-slate-700"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col justify-center items-center min-h-screen">
//         <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h1>
//         <button 
//           onClick={() => navigate('/')} 
//           className="bg-slate-700 text-white px-6 py-2 rounded-lg hover:opacity-95"
//         >
//           Go Home
//         </button>
//       </div>
//     );
//   }

//   if (!listing) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <h1 className="text-2xl font-bold text-gray-600">Listing not found!</h1>
//       </div>
//     );
//   }

//   return (
//     <main className="max-w-6xl mx-auto p-3">
//       {/* Share Button */}
//       <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
//         <FaShare 
//           className="text-slate-500" 
//           onClick={handleShare}
//         />
//       </div>
      
//       {copied && (
//         <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
//           Link copied!
//         </p>
//       )}

//       {/* Image Gallery */}
//       <div className="relative h-[400px] md:h-[550px] w-full mb-8">
//         {listing.imageUrls && listing.imageUrls.length > 0 && (
//           <>
//             <img
//               src={listing.imageUrls[currentImageIndex]}
//               alt="listing"
//               className="w-full h-full object-cover rounded-lg"
//             />
            
//             {listing.imageUrls.length > 1 && (
//               <>
//                 <button
//                   onClick={handleImagePrev}
//                   className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
//                 >
//                   <FaArrowLeft className="text-slate-700" />
//                 </button>
                
//                 <button
//                   onClick={handleImageNext}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
//                 >
//                   <FaArrowRight className="text-slate-700" />
//                 </button>

//                 {/* Image indicators */}
//                 <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
//                   {listing.imageUrls.map((_, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setCurrentImageIndex(index)}
//                       className={`w-3 h-3 rounded-full transition-all ${
//                         index === currentImageIndex 
//                           ? 'bg-white' 
//                           : 'bg-white bg-opacity-50'
//                       }`}
//                     />
//                   ))}
//                 </div>
//               </>
//             )}
//           </>
//         )}
//       </div>

//       {/* Listing Details */}
//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Main Content */}
//         <div className="flex-1">
//           {/* Title and Location */}
//           <div className="mb-6">
//             <h1 className="text-3xl font-bold text-slate-700 mb-3">
//               {listing.name}
//             </h1>
            
//             <p className="flex items-center gap-2 text-slate-600 text-lg mb-4">
//               <FaMapMarkerAlt className="text-green-700" />
//               {listing.address}
//             </p>

//             <div className="flex gap-4 mb-4">
//               <span className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
//                 {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
//               </span>
              
//               {listing.offer && (
//                 <span className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
//                   ₦{(+listing.regularPrice - +listing.discountedPrice).toLocaleString()} discount
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Price */}
//           <div className="mb-6">
//             <p className="text-2xl font-semibold text-slate-700">
//               ₦
//               {listing.offer 
//                 ? listing.discountedPrice.toLocaleString('en-NG')
//                 : listing.regularPrice.toLocaleString('en-NG')
//               }
//               {listing.type === 'rent' && (
//                 <span className="text-lg text-slate-600"> / month</span>
//               )}
//             </p>
            
//             {listing.offer && (
//               <p className="text-slate-500 line-through">
//                 ₦{listing.regularPrice.toLocaleString('en-NG')}
//               </p>
//             )}
//           </div>

//           {/* Property Features */}
//           <div className="flex gap-6 mb-6 text-slate-700">
//             <div className="flex items-center gap-2">
//               <FaBed className="text-lg" />
//               <span className="font-semibold">
//                 {listing.bedrooms > 1 
//                   ? `${listing.bedrooms} beds` 
//                   : `${listing.bedrooms} bed`
//                 }
//               </span>
//             </div>
            
//             <div className="flex items-center gap-2">
//               <FaBath className="text-lg" />
//               <span className="font-semibold">
//                 {listing.bathrooms > 1 
//                   ? `${listing.bathrooms} baths` 
//                   : `${listing.bathrooms} bath`
//                 }
//               </span>
//             </div>

//             {listing.parking && (
//               <div className="flex items-center gap-2">
//                 <FaParking className="text-lg" />
//                 <span className="font-semibold">Parking</span>
//               </div>
//             )}

//             {listing.furnished && (
//               <div className="flex items-center gap-2">
//                 <FaChair className="text-lg" />
//                 <span className="font-semibold">Furnished</span>
//               </div>
//             )}
//           </div>

//           {/* Description */}
//           <div className="mb-8">
//             <h2 className="text-xl font-semibold text-slate-700 mb-3">Description</h2>
//             <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
//               {listing.description}
//             </p>
//           </div>
//         </div>

//         {/* Contact Section */}
//         <div className="md:w-80">
//           {currentUser && listing.userRef !== currentUser._id && !contact && (
//             <button
//               onClick={handleContact}
//               className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3 w-full mb-4"
//             >
//               Contact landlord
//             </button>
//           )}
          
//           {contact && landlord && (
//             <div className="bg-white border border-gray-200 rounded-lg p-4">
//               <p className="text-lg font-semibold mb-3">
//                 Contact <span className="font-normal">{landlord.username}</span> for{' '}
//                 <span className="font-normal">{listing.name.toLowerCase()}</span>
//               </p>
              
//               <textarea
//                 name="message"
//                 id="message"
//                 rows="4"
//                 value={message}
//                 onChange={onChange}
//                 placeholder={`Hi, I am interested in ${listing.name}. Please let me know if it's still available.`}
//                 className="w-full border p-3 rounded-lg focus:outline-none focus:border-slate-500 resize-none"
//               ></textarea>
              
//               <a
//                 href={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
//                 className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95 block mt-3"
//               >
//                 Send Message
//               </a>
//             </div>
//           )}

//           {currentUser && listing.userRef === currentUser._id && (
//             <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
//               <p className="text-lg font-semibold mb-3 text-slate-700">
//                 This is your listing
//               </p>
//               <div className="space-y-2">
//                 <button 
//                   onClick={() => navigate(`/update-listing/${listing._id}`)}
//                   className="bg-green-700 text-white rounded-lg hover:opacity-95 p-3 w-full"
//                 >
//                   Edit Listing
//                 </button>
//                 <button 
//                   onClick={() => {
//                     // Handle delete functionality
//                     if (window.confirm('Are you sure you want to delete this listing?')) {
//                       // Delete API call here
//                     }
//                   }}
//                   className="bg-red-700 text-white rounded-lg hover:opacity-95 p-3 w-full"
//                 >
//                   Delete Listing
//                 </button>
//               </div>
//             </div>
//           )}

//           {!currentUser && (
//             <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
//               <p className="text-slate-600 mb-3">
//                 Please sign in to contact the landlord
//               </p>
//               <button
//                 onClick={() => navigate('/sign-in')}
//                 className="bg-slate-700 text-white rounded-lg hover:opacity-95 p-3 w-full"
//               >
//                 Sign In
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Listing;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MyListings = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/Api/user/listings/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser.token}` // adjust if token stored differently
          }
        });
        const data = await res.json();
        if (res.ok) {
          setListings(data);
        } else {
          setError(data.message || 'Failed to fetch listings');
        }
      } catch (err) {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    if (currentUser) {
      fetchListings();
    }
  }, [currentUser]);

  if (loading) return <p>Loading listings...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!listings.length) return <p>No listings found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {listings.map(listing => (
          <div key={listing._id} className="border rounded-lg p-4 shadow hover:shadow-lg">
            <img
              src={listing.imageUrls[0]}
              alt={listing.name}
              className="h-48 w-full object-cover rounded mb-3"
            />
            <h2 className="text-lg font-semibold">{listing.name}</h2>
            <p className="text-gray-600">{listing.address}</p>
            <p className="font-bold mt-2">
              ₦{listing.offer ? listing.discountedPrice : listing.regularPrice}
            </p>
            <button
              onClick={() => navigate(`/listing/${listing._id}`)}
              className="mt-3 bg-slate-700 text-white px-4 py-2 rounded hover:opacity-90"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListings;
