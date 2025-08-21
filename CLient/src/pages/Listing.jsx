"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore from "swiper"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css/bundle"
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa"
import { useSelector } from "react-redux"
import Contact from "../components/Contact"

SwiperCore.use([Navigation, Pagination, Autoplay])

const Listing = () => {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [copied, setCopied] = useState(false)
  const [contact, setContact] = useState(false)
  const [imageLoadErrors, setImageLoadErrors] = useState({})

  const { currentUser } = useSelector((state) => state.user)
  const params = useParams()

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true)
        setError(false)

        const res = await fetch(`/Api/listing/${params.listingId}`)
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

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleImageError = (index) => {
    setImageLoadErrors(prev => ({
      ...prev,
      [index]: true
    }))
  }

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
          {/* Enhanced Full-Width Image Slider */}
          {listing.imageUrls?.length > 0 && (
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mb-8">
              <Swiper
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                  dynamicMainBullets: 3,
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={listing.imageUrls.length > 1}
                spaceBetween={0}
                slidesPerView={1}
                speed={600}
                className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] shadow-2xl"
              >
                {listing.imageUrls.map((url, index) => (
                  <SwiperSlide key={`${url}-${index}`}>
                    <div
                      className="h-full w-full relative group"
                      style={{
                        backgroundImage: imageLoadErrors[index] 
                          ? 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)'
                          : `url(${url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                        imageRendering: 'crisp-edges',
                        WebkitBackfaceVisibility: 'hidden',
                        MozBackfaceVisibility: 'hidden',
                        WebkitTransform: 'translate3d(0, 0, 0)',
                        MozTransform: 'translate3d(0, 0, 0)',
                        transform: 'translate3d(0, 0, 0)',
                        filter: 'contrast(1.05) brightness(1.02)',
                      }}
                    >
                      {/* Subtle overlay for better text readability */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 group-hover:from-black/5 group-hover:to-black/15 transition-all duration-300"></div>
                      
                      {/* Image preloader to handle load errors */}
                      <img
                        src={url}
                        alt={`Property image ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
                        onError={() => handleImageError(index)}
                        loading="lazy"
                      />
                      
                      {/* Fallback content for failed images */}
                      {imageLoadErrors[index] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                          <div className="text-center text-gray-500">
                            <FaMapMarkerAlt className="text-4xl mx-auto mb-2" />
                            <p className="text-sm font-medium">Image not available</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Image counter */}
                      <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                        {index + 1} / {listing.imageUrls.length}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                
                {/* Custom navigation buttons */}
                <div className="swiper-button-prev !text-white !w-10 !h-10 !mt-0 !top-1/2 !left-4 !bg-black/30 !backdrop-blur-sm !rounded-full hover:!bg-black/50 transition-all duration-200"></div>
                <div className="swiper-button-next !text-white !w-10 !h-10 !mt-0 !top-1/2 !right-4 !bg-black/30 !backdrop-blur-sm !rounded-full hover:!bg-black/50 transition-all duration-200"></div>
              </Swiper>

              {/* Enhanced Share Button */}
              <div className="absolute top-6 right-6 z-20 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full w-12 h-12 flex justify-center items-center shadow-lg cursor-pointer hover:bg-white hover:scale-105 transition-all duration-200 group">
                <FaShare
                  className="text-slate-700 text-lg group-hover:text-blue-600 transition-colors"
                  onClick={handleShareClick}
                />
              </div>
              
              {copied && (
                <div className="absolute top-6 right-20 z-20 animate-fadeIn">
                  <div className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg shadow-lg">
                    Link copied!
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Enhanced Listing Details */}
          <div className="flex flex-col max-w-4xl mx-auto p-6 my-7 gap-6">
            {/* Price and Title */}
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {listing.name}
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-2xl md:text-3xl font-bold text-blue-600">
                  ₦{listing.offer
                    ? listing.discountedPrice?.toLocaleString("en-US") ?? "N/A"
                    : listing.regularPrice?.toLocaleString("en-US") ?? "N/A"}
                </span>
                {listing.type === "rent" && (
                  <span className="text-lg text-gray-600 font-medium">/ month</span>
                )}
                {listing.offer && listing.regularPrice && listing.discountedPrice && (
                  <span className="text-lg text-gray-500 line-through ml-2">
                    ₦{listing.regularPrice.toLocaleString("en-US")}
                  </span>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-600">
              <FaMapMarkerAlt className="text-blue-600 text-lg" />
              <span className="text-lg">{listing.address}</span>
            </div>

            {/* Property Type and Offer Status */}
            <div className="flex flex-wrap gap-3">
              <span className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </span>
              {listing.offer && (
                <span className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold text-sm border border-green-200">
                  Special Offer Available
                </span>
              )}
            </div>

            {/* Description */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-900 text-lg mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed text-base">
                {listing.description}
              </p>
            </div>

            {/* Property Features */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 text-lg mb-4">Property Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FaBed className="text-blue-600 text-xl" />
                  <div>
                    <div className="font-semibold text-gray-900">{listing.bedrooms}</div>
                    <div className="text-sm text-gray-600">
                      {listing.bedrooms > 1 ? "Bedrooms" : "Bedroom"}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FaBath className="text-blue-600 text-xl" />
                  <div>
                    <div className="font-semibold text-gray-900">{listing.bathrooms}</div>
                    <div className="text-sm text-gray-600">
                      {listing.bathrooms > 1 ? "Bathrooms" : "Bathroom"}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FaParking className="text-blue-600 text-xl" />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {listing.parking ? "Yes" : "No"}
                    </div>
                    <div className="text-sm text-gray-600">Parking</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FaChair className="text-blue-600 text-xl" />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {listing.furnished ? "Yes" : "No"}
                    </div>
                    <div className="text-sm text-gray-600">Furnished</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Agent Section */}
            {currentUser && listing.userRef !== currentUser._id && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                {!contact ? (
                  <div className="text-center">
                    <h3 className="font-bold text-gray-900 text-lg mb-2">
                      Interested in this property?
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Get in touch with the agent for more information
                    </p>
                    <button
                      onClick={() => setContact(true)}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      Contact Agent
                    </button>
                  </div>
                ) : (
                  <Contact listing={listing} />
                )}
              </div>
            )}
          </div>
        </>
      )}
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        /* Enhanced image sharpness for full-width display */
        .swiper-slide div[style*="background-image"] {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          image-rendering: pixelated;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          will-change: transform;
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
        }
        
        /* Ensure full-width container doesn't cause horizontal scroll */
        .swiper {
          width: 100vw !important;
          max-width: none !important;
        }
        
        /* High-DPI display optimization */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .swiper-slide div[style*="background-image"] {
            image-rendering: -webkit-optimize-contrast;
            image-rendering: auto;
          }
        }
        
        /* Smooth transitions for navigation */
        .swiper-button-prev::after,
        .swiper-button-next::after {
          font-size: 18px !important;
          font-weight: bold;
        }
        
        /* Custom pagination styling */
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5) !important;
          opacity: 1 !important;
        }
        
        .swiper-pagination-bullet-active {
          background: white !important;
        }
      `}</style>
    </main>
  )
}

export default Listing