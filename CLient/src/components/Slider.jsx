import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Slider = () => {
  const [offerListings, setOfferListings] = useState([])
  const [saleListings, setSaleListings] = useState([])
  const [rentListings, setRentListings] = useState([])

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Fetch offers
        const offerRes = await fetch("/Api/listing/get?offer=true&limit=4")
        const offerData = await offerRes.json()
        setOfferListings(offerData)

        // Fetch rent
        const rentRes = await fetch("/Api/listing/get?type=rent&limit=4")
        const rentData = await rentRes.json()
        setRentListings(rentData)

        // Fetch sale
        const saleRes = await fetch("/Api/listing/get?type=sale&limit=4")
        const saleData = await saleRes.json()
        setSaleListings(saleData)
      } catch (error) {
        console.log(error)
      }
    }

    fetchListings()
  }, [])

  const ListingSection = ({ title, listings }) => (
    <div className="mb-10 w-5/6 mx-auto">
      <h2 className="text-2xl text-gray-600 font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listings.map((listing) => (
          <Link
            to={`/listing/${listing._id}`}
            key={listing._id}
            className=" rounded-lg shadow-md hover:shadow-lg transition bg-white block"
          >
            <img
              src={listing.imageUrls?.[0]}
              alt={listing.name}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">{listing.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {listing.description}
              </p>
              <p className="mt-2 text-secondary font-semibold">
              ₦{listing.regularPrice}
                {listing.type === "rent" && " / month"}
              </p>
              {listing.discountedPrice && (
                <p className="text-sm text-green-600">
                  Discount: ₦{listing.discountedPrice}
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
