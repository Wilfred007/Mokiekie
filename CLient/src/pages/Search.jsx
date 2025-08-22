// import { useEffect, useState } from "react";
// import { ImLocation2 } from "react-icons/im";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import { IoHome } from "react-icons/io5";
// import { FaBed } from "react-icons/fa";
// import { FaBath } from "react-icons/fa";

// const Search = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [sideBarData, setSideBarData] = useState({
//     searchTerm: "",
//     type: "all",
//     parking: false,
//     furnished: false,
//     offer: false,
//     sort: "createdAt",
//     order: "desc",
//   });

//   const [loading, setLoading] = useState(false);
//   const [listings, setListings] = useState([]);
//   const [error, setError] = useState(null);
//   const [showMore, setShowMore] = useState(false)

//   // Sync URL params + fetch listings
//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);

//     const searchTerm = urlParams.get("searchTerm") || "";
//     const type = urlParams.get("type") || "all";
//     const parking = urlParams.get("parking") === "true";
//     const furnished = urlParams.get("furnished") === "true";
//     const offer = urlParams.get("offer") === "true";
//     const sort = urlParams.get("sort") || "createdAt";
//     const order = urlParams.get("order") || "desc";

//     setSideBarData({
//       searchTerm,
//       type,
//       parking,
//       furnished,
//       offer,
//       sort,
//       order,
//     });

//     const fetchListings = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const res = await fetch(`/Api/listing/get?${urlParams.toString()}`);
//         if (!res.ok) throw new Error("Failed to fetch listings");

//         const data = await res.json();
//         if (data.length > 8){
//           setShowMore(true);
//         }
//         setListings(data);
//       } catch (err) {
//         setError(err.message);
//         setListings([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchListings();
//   }, [location.search]);

//   // Handle sidebar changes
//   const handleChange = (e) => {
//     const { id, value, checked } = e.target;

//     if (id === "searchTerm") {
//       setSideBarData((prev) => ({ ...prev, searchTerm: value }));
//     }

//     if (["all", "rent", "sale"].includes(id)) {
//       setSideBarData((prev) => ({ ...prev, type: id }));
//     }

//     if (["parking", "furnished", "offer"].includes(id)) {
//       setSideBarData((prev) => ({ ...prev, [id]: checked }));
//     }

//     if (id === "sort_order") {
//       const [sort, order] = value.split("_");
//       setSideBarData((prev) => ({ ...prev, sort, order }));
//     }
//   };

//   // Apply filters
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const urlParams = new URLSearchParams();
//     urlParams.set("searchTerm", sideBarData.searchTerm);
//     urlParams.set("type", sideBarData.type);
//     urlParams.set("parking", sideBarData.parking);
//     urlParams.set("furnished", sideBarData.furnished);
//     urlParams.set("offer", sideBarData.offer);
//     urlParams.set("sort", sideBarData.sort);
//     urlParams.set("order", sideBarData.order);

//     navigate(`/search?${urlParams.toString()}`);
//   };

//   return (
//     <div className="flex flex-col md:flex-row">
//       {/* Sidebar */}
//       <div className="p-7 border-b md:border-b-0 md:border-r border-gray-300 md:min-h-screen">
//         <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
//           {/* Search Term */}
//           <div className="flex items-center gap-5">
//             <label className="whitespace-nowrap">Search Terms</label>
//             <input
//               type="text"
//               id="searchTerm"
//               placeholder="Search..."
//               className="bg-transparent border p-3 rounded-lg border-gray-300 w-full focus:outline-none sm:w-64"
//               value={sideBarData.searchTerm}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Type */}
//           <div className="flex gap-4 flex-wrap mt-3 items-center">
//             <label>Type:</label>
//             {["all", "rent", "sale"].map((type) => (
//               <div key={type}>
//                 <input
//                   type="radio"
//                   id={type}
//                   name="type"
//                   className="w-5"
//                   onChange={handleChange}
//                   checked={sideBarData.type === type}
//                 />
//                 <span className="ml-1 capitalize">
//                   {type === "all" ? "Rent & Sell" : type}
//                 </span>
//               </div>
//             ))}
//           </div>

//           {/* Offer */}
//           <div className="flex gap-4 mt-3 items-center">
//             <input
//               type="checkbox"
//               id="offer"
//               className="w-5"
//               onChange={handleChange}
//               checked={sideBarData.offer}
//             />
//             <label htmlFor="offer">Offer</label>
//           </div>

//           {/* Amenities */}
//           <div className="flex gap-4 flex-wrap mt-3 items-center">
//             <label>Amenities:</label>
//             {["parking", "furnished"].map((amenity) => (
//               <div key={amenity}>
//                 <input
//                   type="checkbox"
//                   id={amenity}
//                   className="w-5"
//                   onChange={handleChange}
//                   checked={sideBarData[amenity]}
//                 />
//                 <span className="ml-1 capitalize">{amenity}</span>
//               </div>
//             ))}
//           </div>

//           {/* Sort */}
//           <div className="flex flex-col gap-2">
//             <label>Sort:</label>
//             <select
//               id="sort_order"
//               onChange={handleChange}
//               value={`${sideBarData.sort}_${sideBarData.order}`}
//               className="border rounded-lg p-3 border-gray-300"
//             >
//               <option value="regularPrice_desc">Price high to low</option>
//               <option value="regularPrice_asc">Price low to high</option>
//               <option value="createdAt_desc">Latest</option>
//               <option value="createdAt_asc">Oldest</option>
//             </select>
//           </div>

//           {/* Search Button */}
//           <button className="bg-blue-600 text-white p-3 rounded-lg hover:opacity-90 mt-4">
//             Search
//           </button>
//         </form>
//       </div>

//       {/* Results Section */}
//       <div className="flex-1 p-7">
//         <h1 className="text-3xl font-bold text-gray-600 mt-5">Listing Results</h1>
//           <div className="flex justify-center"> 
//         {loading && <p className="mt-3">Loading listings...</p>}
//         {error && <p className="text-red-500 mt-3">{error}</p>}
//         {!loading && !error && listings.length === 0 && (
//           <p className="mt-3">No listings found.</p>
//         )}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
//           {listings.map((listing) => (
//             <Link to={`/listing/${listing._id}`}>
//               <div className="bg-white rounded-xl shadow-md overflow-hidden w-80 h-96 mx-auto transform transition hover:scale-105">
//                 <img
//                   src={listing.imageUrls?.[0] || "https://www.google.com/imgres?q=estate&imgurl=https%3A%2F%2Famenestate.com%2Fassets%2Fimages%2Fthe-afin-front.jpg&imgrefurl=https%3A%2F%2Famenestate.com%2Four-estates%2Fphase-one%2F&docid=tSbeJIpqhChkQM&tbnid=JOvUyw2mvspCTM&vet=12ahUKEwiLhu7fspCPAxWqWEEAHXCRE6MQM3oECB8QAA..i&w=875&h=550&hcb=2&ved=2ahUKEwiLhu7fspCPAxWqWEEAHXCRE6MQM3oECB8QAA"}
//                   alt={listing.name}
//                   className="w-full h-40 object-cover"
//                 />
//                 <div className="p-4 flex flex-col justify-between h-[calc(100%-10rem)]">
//                   <div>
//                     <div className="flex gap-2">
//                     <IoHome className=" text-teal-500 self-center" />
//                     <h2 className="text-lg font-semibold line-clamp-1">
//                       {listing.name}
//                     </h2>
//                     </div>
//                     <div className="flex gap-3 mt-2">
//                     <ImLocation2  className=" text-blue-500 self-center"/>
//                     <p className="text-sm text-gray-500">{listing.address}</p>
//                     </div>
//                     <div>
//                     <p className="text-gray-600 text-sm mt-2 line-clamp-2">
//                       {listing.description}
//                     </p>
//                     </div>
//                     <div className="mt-2 flex gap-5">
//                       <div className="flex gap-3">
//                         <FaBed className="self-center text-blue-500"/>

//                         <span className="text-gray-600 text-xs">{listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}</span>
//                       </div>
//                       <div className="flex gap-3">
//                         <FaBath className="self-center text-blue-500"/>

//                         <span className="text-gray-600 text-xs">{listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div>
//                     <p className="text-indigo-600 font-bold mt-2">
//                       ₦{listing.regularPrice.toLocaleString()}
//                     </p>
//                     {listing.offer && (
//                       <span className="text-green-600 font-medium text-sm mt-1 inline-block">
//                         🔥 On Offer
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </Link>
//             // {showMore && (<button onClick={() => {onShowMoreClick()}}>Show More</button>)}
//           ))}
//           <div className="mt-10">
//           {showMore && (
//   <button onClick={onShowMoreClick} className="text-5xl font-bold">
//     Show More
//   </button>
// )}
// </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Search;


import { useEffect, useState } from "react";
import { ImLocation2 } from "react-icons/im";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FaBed, FaBath } from "react-icons/fa";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sideBarData, setSideBarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(false);

  // Sync URL params + fetch listings
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const searchTerm = urlParams.get("searchTerm") || "";
    const type = urlParams.get("type") || "all";
    const parking = urlParams.get("parking") === "true";
    const furnished = urlParams.get("furnished") === "true";
    const offer = urlParams.get("offer") === "true";
    const sort = urlParams.get("sort") || "createdAt";
    const order = urlParams.get("order") || "desc";

    setSideBarData({
      searchTerm,
      type,
      parking,
      furnished,
      offer,
      sort,
      order,
    });


    const baseUrl = 'https://mokiekie.onrender.com'

    const fetchListings = async () => {
      try {
        setLoading(true);
        setError(null);

        // Always start with index 0 on first fetch
        urlParams.set("startIndex", 0);
        urlParams.set("limit", 9);

        const res = await fetch(`${baseUrl}/Api/listing/get?${urlParams.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch listings");

        const data = await res.json();

        setListings(data);

        // If more than or equal to 9, show "Show More"
        setShowMore(data.length === 9);
      } catch (err) {
        setError(err.message);
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [location.search]);

  // Fetch more listings on button click
  const onShowMoreClick = async () => {
    try {
      const urlParams = new URLSearchParams(location.search);
      urlParams.set("startIndex", listings.length); // Continue from current
      urlParams.set("limit", 9);

      const res = await fetch(`${baseUrl}/Api/listing/get?${urlParams.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch more listings");

      const data = await res.json();

      setListings((prev) => [...prev, ...data]);

      // If less than 9 returned, hide "Show More"
      if (data.length < 9) {
        setShowMore(false);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle sidebar changes
  const handleChange = (e) => {
    const { id, value, checked } = e.target;

    if (id === "searchTerm") {
      setSideBarData((prev) => ({ ...prev, searchTerm: value }));
    }

    if (["all", "rent", "sale"].includes(id)) {
      setSideBarData((prev) => ({ ...prev, type: id }));
    }

    if (["parking", "furnished", "offer"].includes(id)) {
      setSideBarData((prev) => ({ ...prev, [id]: checked }));
    }

    if (id === "sort_order") {
      const [sort, order] = value.split("_");
      setSideBarData((prev) => ({ ...prev, sort, order }));
    }
  };

  // Apply filters
  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sideBarData.searchTerm);
    urlParams.set("type", sideBarData.type);
    urlParams.set("parking", sideBarData.parking);
    urlParams.set("furnished", sideBarData.furnished);
    urlParams.set("offer", sideBarData.offer);
    urlParams.set("sort", sideBarData.sort);
    urlParams.set("order", sideBarData.order);

    navigate(`/search?${urlParams.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="p-7 border-b md:border-b-0 md:border-r border-gray-300 md:min-h-screen">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Search Term */}
          <div className="flex items-center gap-5">
            <label className="whitespace-nowrap">Search Terms</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="bg-transparent border p-3 rounded-lg border-gray-300 w-full focus:outline-none sm:w-64"
              value={sideBarData.searchTerm}
              onChange={handleChange}
            />
          </div>

          {/* Type */}
          <div className="flex gap-4 flex-wrap mt-3 items-center">
            <label>Type:</label>
            {["all", "rent", "sale"].map((type) => (
              <div key={type}>
                <input
                  type="radio"
                  id={type}
                  name="type"
                  className="w-5"
                  onChange={handleChange}
                  checked={sideBarData.type === type}
                />
                <span className="ml-1 capitalize">
                  {type === "all" ? "Rent & Sell" : type}
                </span>
              </div>
            ))}
          </div>

          {/* Offer */}
          <div className="flex gap-4 mt-3 items-center">
            <input
              type="checkbox"
              id="offer"
              className="w-5"
              onChange={handleChange}
              checked={sideBarData.offer}
            />
            <label htmlFor="offer">Offer</label>
          </div>

          {/* Amenities */}
          <div className="flex gap-4 flex-wrap mt-3 items-center">
            <label>Amenities:</label>
            {["parking", "furnished"].map((amenity) => (
              <div key={amenity}>
                <input
                  type="checkbox"
                  id={amenity}
                  className="w-5"
                  onChange={handleChange}
                  checked={sideBarData[amenity]}
                />
                <span className="ml-1 capitalize">{amenity}</span>
              </div>
            ))}
          </div>

          {/* Sort */}
          <div className="flex flex-col gap-2">
            <label>Sort:</label>
            <select
              id="sort_order"
              onChange={handleChange}
              value={`${sideBarData.sort}_${sideBarData.order}`}
              className="border rounded-lg p-3 border-gray-300"
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>

          {/* Search Button */}
          <button className="bg-blue-600 text-white p-3 rounded-lg hover:opacity-90 mt-4">
            Search
          </button>
        </form>
      </div>

      {/* Results Section */}
      <div className="flex-1 p-7">
        <h1 className="text-3xl font-bold text-gray-600 mt-5">
          Listing Results
        </h1>
        <div className="flex justify-center">
          {loading && <p className="mt-3">Loading listings...</p>}
          {error && <p className="text-red-500 mt-3">{error}</p>}
          {!loading && !error && listings.length === 0 && (
            <p className="mt-3">No listings found.</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
          {listings.map((listing) => (
            <Link key={listing._id} to={`/listing/${listing._id}`}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden w-80 h-96 mx-auto transform transition hover:scale-105">
                <img
                  src={
                    listing.imageUrls?.[0] ||
                    "https://via.placeholder.com/400x250.png?text=No+Image"
                  }
                  alt={listing.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 flex flex-col justify-between h-[calc(100%-10rem)]">
                  <div>
                    <div className="flex gap-2">
                      <IoHome className=" text-teal-500 self-center" />
                      <h2 className="text-lg font-semibold line-clamp-1">
                        {listing.name}
                      </h2>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <ImLocation2 className=" text-blue-500 self-center" />
                      <p className="text-sm text-gray-500">
                        {listing.address}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                        {listing.description}
                      </p>
                    </div>
                    <div className="mt-2 flex gap-5">
                      <div className="flex gap-3">
                        <FaBed className="self-center text-blue-500" />
                        <span className="text-gray-600 text-xs">
                          {listing.bedrooms > 1
                            ? `${listing.bedrooms} beds`
                            : `${listing.bedrooms} bed`}
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <FaBath className="self-center text-blue-500" />
                        <span className="text-gray-600 text-xs">
                          {listing.bathrooms > 1
                            ? `${listing.bathrooms} baths`
                            : `${listing.bathrooms} bath`}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-indigo-600 font-bold mt-2">
                      ₦{listing.regularPrice.toLocaleString()}
                    </p>
                    {listing.offer && (
                      <span className="text-green-600 font-medium text-sm mt-1 inline-block">
                        🔥 On Offer
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Show More Button */}
        {showMore && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={onShowMoreClick}
              className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:opacity-90"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
