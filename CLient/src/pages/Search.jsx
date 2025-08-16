// // import { useEffect, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';

// // const Search = () => {
// //     const navigate = useNavigate();
// //   const [sideBarData, setSideBarData] = useState({
// //     searchTerm: '',
// //     type: 'all',
// //     parking: false,
// //     furnished: false,
// //     offer: false,
// //     sort: 'createdAt',
// //     order: 'desc',
// //   });


// //   useEffect(() => {
// //     const urlParams = new URLSearchParams(location.search);
// //     const searchTerm = urlParams.get('searchTerm') 
// //     const type = urlParams.get('type') 
// //     const parking = urlParams.get('parking') 
// //     const furnished = urlParams.get('furnished') 
// //     const offer = urlParams.get('offer') 
// //     const sort = urlParams.get('sort') 
// //     const order = urlParams.get('order');
// //   })

// //   if(
// //     searchTermFromUrl ||
// //     typeFromUrl ||
// //     parkingFromUrl ||
// //     furnishedFromUrl ||
// //     offerFromUrl ||
// //     sortFromUrl ||
// //     orderFromUrl
// //   ) {
// //     setSideBarData({
// //         searchTerm: searchTermFromUrl || '',
// //         type: typeFromUrl || 'all',
// //         parking: parkingFromUrl === 'true' ? true: false,
// //         furnished: furnishedFromUrl === 'true' ? true: false,
// //         offer: offerFromUrl === 'true' ? true: false,
// //         sort: sortFromUrl || 'createdAt',
// //         order: orderFromUrl || 'desc',
// //     }, [location.search])
// //   }

  

// //   const handleChange = (e) => {
// //     const { id, value, checked, type } = e.target;

// //     // Search input
// //     if (id === 'searchTerm') {
// //       setSideBarData({ ...sideBarData, searchTerm: value });
// //     }

// //     // Type (radio buttons)
// //     if (id === 'all' || id === 'rent' || id === 'sale') {
// //       setSideBarData({ ...sideBarData, type: id });
// //     }

// //     // Checkboxes (parking, furnished, offer)
// //     if (id === 'parking' || id === 'furnished' || id === 'offer') {
// //       setSideBarData({ ...sideBarData, [id]: checked });
// //     }

// //     // Sorting
// //     if (id === 'sort_order') {
// //       const [sort, order] = value.split('_');
// //       setSideBarData({ ...sideBarData, sort, order });
// //     }
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     console.log('Search triggered with:', sideBarData);
// //     // You can navigate or fetch listings here
// //     const urlParams = new URLSearchParams();
// //     urlParams.set('searchTerm', sideBarData.searchTerm);
// //     urlParams.set('type', sideBarData.type);
// //     urlParams.set('parking', sideBarData.parking);
// //     urlParams.set('furnished', sideBarData.furnished);
// //     urlParams.set('offer', sideBarData.offer);
// //     urlParams.set('sort', sideBarData.sort);
// //     urlParams.set('order', sideBarData.order);
// //     const searchQuery = urlParams.toString();
// //     navigate(`/search?${searchQuery}`);
// //   };

// //   return (
// //     <div className="flex flex-col md:flex-row">
// //       {/* Sidebar */}
// //       <div className="p-7 border-b md:border-b-0 md:border-r border-gray-300 md:min-h-screen">
// //         <form  className="flex flex-col gap-5" onSubmit={handleSubmit}>
          
// //           {/* Search Term */}
// //           <div className="flex items-center gap-5">
// //             <label className="whitespace-nowrap">Search Terms</label>
// //             <input
// //               type="text"
// //               id="searchTerm"
// //               placeholder="Search..."
// //               className="bg-transparent border p-3 rounded-lg border-gray-300 w-full focus:outline-none sm:w-64"
// //               value={sideBarData.searchTerm}
// //               onChange={handleChange}
// //             />
// //           </div>

// //           {/* Type */}
// //           <div className="flex gap-4 flex-wrap mt-3 items-center">
// //             <label>Type:</label>
// //             <div>
// //               <input
// //                 type="radio"
// //                 id="all"
// //                 name="type"
// //                 className="w-5"
// //                 onChange={handleChange}
// //                 checked={sideBarData.type === 'all'}
// //               />
// //               <span className="ml-1">Rent & Sell</span>
// //             </div>
// //             <div>
// //               <input
// //                 type="radio"
// //                 id="rent"
// //                 name="type"
// //                 className="w-5"
// //                 onChange={handleChange}
// //                 checked={sideBarData.type === 'rent'}
// //               />
// //               <span className="ml-1">Rent</span>
// //             </div>
// //             <div>
// //               <input
// //                 type="radio"
// //                 id="sale"
// //                 name="type"
// //                 className="w-5"
// //                 onChange={handleChange}
// //                 checked={sideBarData.type === 'sale'}
// //               />
// //               <span className="ml-1">Sale</span>
// //             </div>
// //           </div>

// //           {/* Offer */}
// //           <div className="flex gap-4 mt-3 items-center">
// //             <input
// //               type="checkbox"
// //               id="offer"
// //               className="w-5"
// //               onChange={handleChange}
// //               checked={sideBarData.offer}
// //             />
// //             <label htmlFor="offer">Offer</label>
// //           </div>

// //           {/* Amenities */}
// //           <div className="flex gap-4 flex-wrap mt-3 items-center">
// //             <label>Amenities:</label>
// //             <div>
// //               <input
// //                 type="checkbox"
// //                 id="parking"
// //                 className="w-5"
// //                 onChange={handleChange}
// //                 checked={sideBarData.parking}
// //               />
// //               <span className="ml-1">Parking</span>
// //             </div>
// //             <div>
// //               <input
// //                 type="checkbox"
// //                 id="furnished"
// //                 className="w-5"
// //                 onChange={handleChange}
// //                 checked={sideBarData.furnished}
// //               />
// //               <span className="ml-1">Furnished</span>
// //             </div>
// //           </div>

// //           {/* Sort */}
// //           <div className="flex flex-col gap-2">
// //             <label>Sort:</label>
// //             <select
// //               id="sort_order"
// //               onChange={handleChange}
// //               value={`${sideBarData.sort}_${sideBarData.order}`}
// //               className="border rounded-lg p-3 border-gray-300"
// //             >
// //               <option value="regularPrice_desc">Price high to low</option>
// //               <option value="regularPrice_asc">Price low to high</option>
// //               <option value="createdAt_desc">Latest</option>
// //               <option value="createdAt_asc">Oldest</option>
// //             </select>
// //           </div>

// //           {/* Search Button */}
// //           <button className="bg-blue-600 text-white p-3 rounded-lg hover:opacity-90 mt-4">
// //             Search
// //           </button>
// //         </form>
// //       </div>

// //       {/* Results Section */}
// //       <div className="flex-1 p-7">
// //         <h1 className="text-3xl font-bold text-gray-600 mt-5">Listing Results</h1>
// //         {/* Listing results would be displayed here */}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Search;


// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

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
//   const [loading, setLoading] = useState(false)
//   const [listings, setListings] = useState([])
//   console.log(listings)

//   // Sync state with URL params on load & whenever query string changes
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

//     const fetchListings = async()=> {
//       setLoading(true);
//       const searchQuery = urlParams.toString();
//       const res = await fetch(`/Api/listing/get?${searchQuery}`);
//       const data = await res.json();
//       setListings(data);
//       setLoading(false)

//     }

//     fetchListings();
//   }, [location.search]);

//   const handleChange = (e) => {
//     const { id, value, checked, type } = e.target;

//     // Search input
//     if (id === "searchTerm") {
//       setSideBarData({ ...sideBarData, searchTerm: value });
//     }

//     // Type (radio buttons)
//     if (id === "all" || id === "rent" || id === "sale") {
//       setSideBarData({ ...sideBarData, type: id });
//     }

//     // Checkboxes (parking, furnished, offer)
//     if (id === "parking" || id === "furnished" || id === "offer") {
//       setSideBarData({ ...sideBarData, [id]: checked });
//     }

//     // Sorting
//     if (id === "sort_order") {
//       const [sort, order] = value.split("_");
//       setSideBarData({ ...sideBarData, sort, order });
//     }
//   };

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
//             <div>
//               <input
//                 type="radio"
//                 id="all"
//                 name="type"
//                 className="w-5"
//                 onChange={handleChange}
//                 checked={sideBarData.type === "all"}
//               />
//               <span className="ml-1">Rent & Sell</span>
//             </div>
//             <div>
//               <input
//                 type="radio"
//                 id="rent"
//                 name="type"
//                 className="w-5"
//                 onChange={handleChange}
//                 checked={sideBarData.type === "rent"}
//               />
//               <span className="ml-1">Rent</span>
//             </div>
//             <div>
//               <input
//                 type="radio"
//                 id="sale"
//                 name="type"
//                 className="w-5"
//                 onChange={handleChange}
//                 checked={sideBarData.type === "sale"}
//               />
//               <span className="ml-1">Sale</span>
//             </div>
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
//             <div>
//               <input
//                 type="checkbox"
//                 id="parking"
//                 className="w-5"
//                 onChange={handleChange}
//                 checked={sideBarData.parking}
//               />
//               <span className="ml-1">Parking</span>
//             </div>
//             <div>
//               <input
//                 type="checkbox"
//                 id="furnished"
//                 className="w-5"
//                 onChange={handleChange}
//                 checked={sideBarData.furnished}
//               />
//               <span className="ml-1">Furnished</span>
//             </div>
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
//         {/* Listing results would be displayed here */}
//       </div>
//     </div>
//   );
// };

// export default Search;

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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

  console.log(listings)

  // Sync state with URL params on load & whenever query string changes
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

    const fetchListings = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/Api/listing/get?${urlParams.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch listings");

        const data = await res.json();
        setListings(data);
      } catch (err) {
        setError(err.message);
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value, checked } = e.target;

    if (id === "searchTerm") {
      setSideBarData({ ...sideBarData, searchTerm: value });
    }

    if (id === "all" || id === "rent" || id === "sale") {
      setSideBarData({ ...sideBarData, type: id });
    }

    if (id === "parking" || id === "furnished" || id === "offer") {
      setSideBarData({ ...sideBarData, [id]: checked });
    }

    if (id === "sort_order") {
      const [sort, order] = value.split("_");
      setSideBarData({ ...sideBarData, sort, order });
    }
  };

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
            <div>
              <input
                type="radio"
                id="all"
                name="type"
                className="w-5"
                onChange={handleChange}
                checked={sideBarData.type === "all"}
              />
              <span className="ml-1">Rent & Sell</span>
            </div>
            <div>
              <input
                type="radio"
                id="rent"
                name="type"
                className="w-5"
                onChange={handleChange}
                checked={sideBarData.type === "rent"}
              />
              <span className="ml-1">Rent</span>
            </div>
            <div>
              <input
                type="radio"
                id="sale"
                name="type"
                className="w-5"
                onChange={handleChange}
                checked={sideBarData.type === "sale"}
              />
              <span className="ml-1">Sale</span>
            </div>
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
            <div>
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={sideBarData.parking}
              />
              <span className="ml-1">Parking</span>
            </div>
            <div>
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sideBarData.furnished}
              />
              <span className="ml-1">Furnished</span>
            </div>
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
        <h1 className="text-3xl font-bold text-gray-600 mt-5">Listing Results</h1>

        {loading && <p>Loading listings...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && listings.length === 0 && <p>No listings found.</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
          {listings.map((listing) => (
            <div
              key={listing._id}
              className="border p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="font-bold text-lg">{listing.name}</h2>
              <p>{listing.address}</p>
              <p className="text-gray-600">${listing.regularPrice}</p>
              {listing.offer && (
                <span className="text-green-600 text-sm">On Offer</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
