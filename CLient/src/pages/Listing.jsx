
"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore from "swiper"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css/bundle"
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking, FaShare } from "react-icons/fa"
import { useSelector } from 'react-redux'
import Contact from "../components/Contact"

const Listing = () => {
  SwiperCore.use([Navigation, Pagination])

  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [copied, setCopied] = useState(false)
  const { currentUser } = useSelector((state) => state.user)
  const [contact, setContact] = useState(false)

  const params = useParams()

  console.log(currentUser._id, listing?.userRef)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true)
        setError(false)

        const res = await fetch(`/Api/listing/get/${params.listingId}`)
        const data = await res.json()

        if (data.success === false) {
          setError(true)
          console.error(data.message)
          return
        }

        setListing(data)
      } catch (err) {
        setError(true)
        console.error("Error fetching listing:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchListing()
  }, [params.listingId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading listing...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-600 text-lg font-medium">
              Something went wrong while fetching the listing.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      {listing && (
        <>
          {/* Image Slider */}
          {listing.imageUrls?.length > 0 && (
            <div className="w-full mb-8">
              <Swiper
                navigation
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                loop={listing.imageUrls.length > 1}
                className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh]"
                preloadImages={true}
                lazy={false}
              >
                {listing.imageUrls.map((url, index) => (
                  <SwiperSlide key={`${url}-${index}`}>
                    <div className="relative h-full w-full">
                      <img
                        src={url}
                        alt={`Listing image ${index + 1}`}
                        className="h-full w-full object-cover"
                        style={{
                          imageRendering: "-webkit-optimize-contrast",
                          WebkitImageRendering: "-webkit-optimize-contrast",
                          MozImageRendering: "crisp-edges",
                          msInterpolationMode: "bicubic",
                          transform: "translateZ(0)",
                        }}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Share Button */}
              <div className="fixed top-[20%] right-[3%] z-10 bg-transparent border-none rounded-full w-12 h-12 flex justify-center items-center cursor-pointer">
                <FaShare
                  className="text-slate-500"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                    setCopied(true)
                    setTimeout(() => setCopied(false), 2000)
                  }}
                />
              </div>
              {copied && (
                <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
                  Link copied!
                </p>
              )}
            </div>
          )}

          {/* Listing Details */}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} - N{" "}
              {listing.offer
                ? listing.discountedPrice != null
                  ? listing.discountedPrice.toLocaleString("en-US")
                  : "N/A"
                : listing.regularPrice != null
                ? listing.regularPrice.toLocaleString("en-US")
                : "N/A"}
              {listing.type === "rent" && " / month"}
            </p>

            <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
              <FaMapMarkerAlt className="text-blue-700" />
              {listing.address}
            </p>

            <div className="flex gap-4">
              <p className="bg-blue-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              <p>{listing.offer ? "Offer Available" : "No Offer"}</p>
            </div>

            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>

            <ul className="text-gray-600 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>

          
            <div>
              {currentUser && listing.userRef !== currentUser._id && !contact && (
                            <button onClick={()=> setContact(true)} className="bg-blue-700 text-white w-full p-5 mt-5 h-15 font-bold px-3 py-2 rounded-lg hover:opacity-80">Contact Agent</button>

              )}
              {contact && <Contact listing={listing}/>}
          </div>
          </div>
         
        </>
      )}
    </main>
  )
}

export default Listing
