import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// API base URL configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'production' 
    ? 'https://mokiekie.onrender.com' 
    : 'http://localhost:3000')

const Slider = () => {
  const [offerListings, setOfferListings] = useState([])
  const [saleListings, setSaleListings] = useState([])
  const [rentListings, setRentListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true)
        setError(null)


        const baseUrl = 'https://mokiekie.onrender.com/Api/'
        
        // Use proxy in development, direct URL in production
        // const baseUrl = import.meta.env.MODE === 'development' 
        //   ? '/Api/listing/get'  // Use Vite proxy in development
        //   : `${API_BASE_URL}/Api/listing/get`; // Direct URL in production
        
        // console.log('🔄 Fetching listings from:', baseUrl);
        // console.log('🏗️ Environment mode:', import.meta.env.MODE);

        // Fetch offers
        const offerRes = await fetch(`${baseUrl}?offer=true&limit=4`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        
        if (!offerRes.ok) {
          console.error('❌ Offer listings fetch failed:', offerRes.status);
        } else {
          const offerData = await offerRes.json()
          console.log('✅ Offer listings fetched:', offerData?.length || 0);
          setOfferListings(offerData)
        }

        // Fetch rent
        const rentRes = await fetch(`${baseUrl}?type=rent&limit=4`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        
        if (!rentRes.ok) {
          console.error('❌ Rent listings fetch failed:', rentRes.status);
        } else {
          const rentData = await rentRes.json()
          console.log('✅ Rent listings fetched:', rentData?.length || 0);
          setRentListings(rentData)
        }

        // Fetch sale
        const saleRes = await fetch(`https://mokiekie.onrender.com/Api/?type=sale&limit=4`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        
        if (!saleRes.ok) {
          console.error('❌ Sale listings fetch failed:', saleRes.status);
        } else {
          const saleData = await saleRes.json()
          console.log('✅ Sale listings fetched:', saleData?.length || 0);
          setSaleListings(saleData)
        }

      } catch (error) {
        console.error('❌ Error fetching listings:', error)
        setError('Failed to load listings. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchListings()
  }, [])

  const ListingSection = ({ title, listings }) => (
    <div className="mb-10 w-5/6 mx-auto">
      <h2 className="text-2xl text-gray-600 font-bold mb-4">{title}</h2>
      
      {/* Loading state */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="rounded-lg shadow-md bg-gray-200 animate-pulse">
              <div className="w-full h-40 bg-gray-300 rounded-t-lg"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Error state */}
      {error && !loading && (
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}
      
      {/* Listings grid */}
      {!loading && !error && listings.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <Link
              to={`/listing/${listing._id}`}
              key={listing._id}
              className="rounded-lg shadow-md hover:shadow-lg transition bg-white block transform hover:scale-105 duration-200"
            >
              <img
                src={listing.imageUrls?.[0]}
                alt={listing.name}
                className="w-full h-40 object-cover rounded-t-lg"
                onError={(e) => {
                  e.target.src = '/placeholder-house.jpg' // Fallback image
                }}
              />
              <div className="p-4">
                <h3 className="text-lg font-bold line-clamp-1">{listing.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                  {listing.description}
                </p>
                <p className="mt-2 text-blue-600 font-semibold">
                  ₦{listing.regularPrice?.toLocaleString()}
                  {listing.type === "rent" && " / month"}
                </p>
                {listing.discountedPrice && (
                  <p className="text-sm text-green-600">
                    Discount: ₦{listing.discountedPrice?.toLocaleString()}
                  </p>
                )}
                <div className="flex justify-between text-sm text-gray-500 mt-3">
                  <span>{listing.bedrooms} beds</span>
                  <span>{listing.bathrooms} baths</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      
      {/* No listings state */}
      {!loading && !error && listings.length === 0 && (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No {title.toLowerCase()} available at the moment.</p>
        </div>
      )}
    </div>
  )

  return (
    <div className="p-6">
      <ListingSection title="Special Offers" listings={offerListings} />
      <ListingSection title="Places for Rent" listings={rentListings} />
      <ListingSection title="Places for Sale" listings={saleListings} />
    </div>
  )
}

export default Slider