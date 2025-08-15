// // // import React, { useState } from "react";

// // // const Create_Listing = () => {
// // //     const [files, setFiles] = useState([])
// // //     // console.log(files)
// // //     const handleImageSubmit = (e) => {
// // //         if(files.length > 0 && files.length < 7){
// // //             const promises = [];

// // //             for (let i = 0; i < files.length; i++) {
// // //                 promises.push(storeImage(files[i]));
// // //             }
// // //         }
// // //     };

// // //     // const storeImage = async (files)
// // //     const storeImage = async (file) => {
// // //         const formData = new FormData();
// // //         formData.append("file", file);
      
// // //         try {
// // //           const res = await fetch("http://localhost:5000/upload", { // change to your backend URL
// // //             method: "POST",
// // //             body: formData,
// // //           });
      
// // //           if (!res.ok) {
// // //             throw new Error("Image upload failed");
// // //           }
      
// // //           const data = await res.json();
// // //           return data.url; // secure Cloudinary URL
// // //         } catch (error) {
// // //           console.error("Error uploading image:", error);
// // //           throw error;
// // //         }
// // //       };
        
// // //   return (
// // //     <main className="p-3 max-w-4xl  mx-auto">
// // //       {/* <div className="flex justify-center"> */}
// // //         <h1 className="text-3xl font-bold text-gray-600">Create a Listing</h1>
// // //       {/* </div> */}
// // //       <form className="flex flex-col sm:flex-row gap-4 space-x-5">
// // //         <div className="flex flex-col gap-4 flex-1">
// // //           <input
// // //             type="text"
// // //             placeholder="Name"
// // //             className="border-none border p-3 focus:outline-none focus:border-blue-500 bg-white rounded-lg"
// // //             id="name"
// // //             maxLength="62"
// // //             minLength="10"
// // //             required
// // //           />
// // //           <textarea
// // //             type="text"
// // //             placeholder="Description"
// // //             className="border-none border p-3 h-64 focus:outline-none focus:border-blue-500 bg-white rounded-lg"
// // //             id="description"
// // //             required
// // //           />
// // //           <input
// // //             type="text"
// // //             placeholder="Address"
// // //             className="border-none border p-3 focus:outline-none focus:border-blue-500 bg-white rounded-lg"
// // //             id="address"
// // //             required
// // //           />
// // //           <div className="flex gap-3 flex-wrap mt-5">
// // //           <div className="flex gap-2">
// // //             <input type="checkbox" id="sale" className="w-5" />
// // //             <span>Sell</span>
// // //           </div>
// // //           <div className="flex gap-2">
// // //             <input type="checkbox" id="rent" className="w-5" />
// // //             <span>Rent</span>
// // //           </div>
// // //           <div className="flex gap-2">
// // //             <input type="checkbox" id="parking" className="w-5" />
// // //             <span>Parking Spot</span>
// // //           </div>
// // //           <div className="flex gap-2">
// // //             <input type="checkbox" id="furnished" className="w-5" />
// // //             <span>Furnished</span>
// // //           </div>
// // //           <div className="flex gap-2">
// // //             <input type="checkbox" id="offer" className="w-5" />
// // //             <span>Offer</span>
// // //           </div>
// // //         </div>
// // //         <div className="flex flex-wrap gap-5">
// // //           <div className="flex items-center gap-2">
// // //             <input
// // //               type="number"
// // //               id="bed"
// // //               min="1"
// // //               max="20"
// // //               className="p-1 border border-gray-300 rounded-xl"
// // //               required
// // //             />
// // //             <p>Beds</p>
// // //           </div>
// // //           <div className="flex items-center gap-2">
// // //             <input
// // //               type="number"
// // //               id="bathrooms"
// // //               min="1"
// // //               max="20"
// // //               className="p-1 border border-gray-300 rounded-xl"
// // //               required
// // //             />
// // //             <p>Bath</p>
// // //           </div>
// // //           <div className="flex items-center gap-2">
// // //             <input
// // //               type="number"
// // //               id="regularPrice"
// // //               min="1"
// // //               max="20"
// // //               className="p-1 border border-gray-300 rounded-xl"
// // //               required
// // //             />
// // //             <div className="flex flex-col items-center">
// // //               <p>Regular Price</p>
// // //               <span className="text-sm">(Naira/ Month)</span>
// // //             </div>
// // //           </div>
// // //           <div className="flex items-center gap-2">
// // //             <input
// // //               type="number"
// // //               id="discountPrice"
// // //               min="1"
// // //               max="20"
// // //               className="p-1 border border-gray-300 rounded-lg"
// // //               required
// // //             />
// // //             <div className="flex flex-col items-center">
// // //               <p>Discounted Price</p>
// // //               <span className="text-sm">(Naira/ Month)</span>
// // //             </div>{" "}
// // //           </div>
// // //         </div>
// // //         </div>
        
// // //         <div className="flex flex-col flex-1">
// // //             <p className="font-semi-bold">Images: <span className="text-gray-600 font-normal ml-2">The first image will be the cover (max 6)</span></p>
// // //             <div>
// // //                 <input onChange={(e) => setFiles(e.target.files)} className="p-3 border border-gray-300 w-full" type="file" id='images' accept='image/*' multiple />
// // //                 <button type="button" onSubmit={handleImageSubmit} className="w-full p-3 bg-blue-700 text-white mt-4 rounded-lg hover:shadow-lg disabled:opacity-80">Upload Image</button>
// // //             </div>
// // //             {/* <input type="file" id="image" className=""/> */}
// // //             <button className="p-3 bg-green-700 w-full my-5 rounded-lg text-white hover:opacity-95 disabled:opacity-80">Create Listing</button>

// // //         </div>

       
// // //       </form>

// // //     </main>
// // //   );
// // // };

// // // export default Create_Listing;

// // import React, { useState } from "react";

// // const Create_Listing = () => {
// //     const [files, setFiles] = useState([])
// //     const [formData, setFormData] = useState({
// //         imageUrls: [],
// //         name: '',
// //         description: '',
// //         address: '',
// //         type: 'rent',
// //         bedrooms: 1,
// //         bathrooms: 1,
// //         regularPrice: 50,
// //         discountPrice: 0,
// //         offer: false,
// //         parking: false,
// //         furnished: false,
// //     });
// //     const [imageUploadError, setImageUploadError] = useState(false);
// //     const [uploading, setUploading] = useState(false);
// //     const [uploadProgress, setUploadProgress] = useState({});
// //     const [error, setError] = useState(false);
// //     const [loading, setLoading] = useState(false);

// //     console.log(formData);

// //     const handleImageSubmit = (e) => {
// //         if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
// //             setUploading(true);
// //             setImageUploadError(false);
// //             const promises = [];

// //             for (let i = 0; i < files.length; i++) {
// //                 promises.push(storeImage(files[i], i));
// //             }
            
// //             Promise.all(promises).then((urls) => {
// //                 setFormData({
// //                     ...formData,
// //                     imageUrls: formData.imageUrls.concat(urls),
// //                 });
// //                 setImageUploadError(false);
// //                 setUploading(false);
// //                 setUploadProgress({});
// //             }).catch((err) => {
// //                 setImageUploadError('Image upload failed (max 4MB per image)');
// //                 setUploading(false);
// //                 setUploadProgress({});
// //             });
// //         } else {
// //             setImageUploadError('You can only upload 6 images per listing');
// //             setUploading(false);
// //         }
// //     };

// //     const storeImage = async (file, index) => {
// //         return new Promise((resolve, reject) => {
// //             const formDataUpload = new FormData();
// //             formDataUpload.append("file", file);

// //             // Create XMLHttpRequest to track upload progress
// //             const xhr = new XMLHttpRequest();
            
// //             // Track upload progress for each file
// //             xhr.upload.addEventListener('progress', (e) => {
// //                 if (e.lengthComputable) {
// //                     const progress = Math.round((e.loaded / e.total) * 100);
// //                     setUploadProgress(prev => ({
// //                         ...prev,
// //                         [index]: progress
// //                     }));
// //                 }
// //             });

// //             // Handle response
// //             xhr.onload = function() {
// //                 if (xhr.status === 200) {
// //                     try {
// //                         const response = JSON.parse(xhr.responseText);
// //                         resolve(response.url);
// //                     } catch (parseError) {
// //                         reject(new Error('Failed to parse server response'));
// //                     }
// //                 } else {
// //                     try {
// //                         const errorResponse = JSON.parse(xhr.responseText);
// //                         reject(new Error(errorResponse.error || `Upload failed: ${xhr.status}`));
// //                     } catch (parseError) {
// //                         reject(new Error(`Upload failed with status: ${xhr.status}`));
// //                     }
// //                 }
// //             };

// //             xhr.onerror = function() {
// //                 reject(new Error('Network error - check if server is running'));
// //             };

// //             // Send request to your API endpoint
// //             xhr.open('POST', '/Api/upload');
// //             xhr.send(formDataUpload);
// //         });
// //     };

// //     const handleRemoveImage = (index) => {
// //         setFormData({
// //             ...formData,
// //             imageUrls: formData.imageUrls.filter((_, i) => i !== index),
// //         });
// //     };

// //     const handleChange = (e) => {
// //         if (e.target.id === 'sale' || e.target.id === 'rent') {
// //             setFormData({
// //                 ...formData,
// //                 type: e.target.id,
// //             });
// //         }

// //         if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
// //             setFormData({
// //                 ...formData,
// //                 [e.target.id]: e.target.checked,
// //             });
// //         }

// //         if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
// //             setFormData({
// //                 ...formData,
// //                 [e.target.id]: e.target.value,
// //             });
// //         }
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         try {
// //             if (formData.imageUrls.length < 1) return setError('You must upload at least one image');
// //             if (+formData.regularPrice < +formData.discountPrice) return setError('Discount price must be lower than regular price');
            
// //             setLoading(true);
// //             setError(false);
            
// //             const res = await fetch('/Api/listing/create', {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                 },
// //                 credentials: 'include',
// //                 body: JSON.stringify({
// //                     ...formData,
// //                     // userRef: currentUser._id, // You'll need to get this from Redux
// //                 }),
// //             });
            
// //             const data = await res.json();
// //             setLoading(false);
            
// //             if (data.success === false) {
// //                 setError(data.message);
// //             } else {
// //                 // Navigate to listing page or show success message
// //                 console.log('Listing created successfully:', data);
// //             }
// //         } catch (error) {
// //             setError(error.message);
// //             setLoading(false);
// //         }
// //     };
        
// //     return (
// //         <main className="p-3 max-w-4xl mx-auto">
// //             <h1 className="text-3xl font-bold text-gray-600 text-center my-7">Create a Listing</h1>
// //             <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
// //                 <div className="flex flex-col gap-4 flex-1">
// //                     <input
// //                         type="text"
// //                         placeholder="Name"
// //                         className="border p-3 focus:outline-none focus:border-blue-500 bg-white rounded-lg"
// //                         id="name"
// //                         maxLength="62"
// //                         minLength="10"
// //                         required
// //                         onChange={handleChange}
// //                         value={formData.name}
// //                     />
// //                     <textarea
// //                         placeholder="Description"
// //                         className="border p-3 h-64 focus:outline-none focus:border-blue-500 bg-white rounded-lg"
// //                         id="description"
// //                         required
// //                         onChange={handleChange}
// //                         value={formData.description}
// //                     />
// //                     <input
// //                         type="text"
// //                         placeholder="Address"
// //                         className="border p-3 focus:outline-none focus:border-blue-500 bg-white rounded-lg"
// //                         id="address"
// //                         required
// //                         onChange={handleChange}
// //                         value={formData.address}
// //                     />
                    
// //                     <div className="flex gap-6 flex-wrap">
// //                         <div className="flex gap-2">
// //                             <input 
// //                                 type="checkbox" 
// //                                 id="sale" 
// //                                 className="w-5" 
// //                                 onChange={handleChange}
// //                                 checked={formData.type === 'sale'}
// //                             />
// //                             <span>Sell</span>
// //                         </div>
// //                         <div className="flex gap-2">
// //                             <input 
// //                                 type="checkbox" 
// //                                 id="rent" 
// //                                 className="w-5" 
// //                                 onChange={handleChange}
// //                                 checked={formData.type === 'rent'}
// //                             />
// //                             <span>Rent</span>
// //                         </div>
// //                         <div className="flex gap-2">
// //                             <input 
// //                                 type="checkbox" 
// //                                 id="parking" 
// //                                 className="w-5" 
// //                                 onChange={handleChange}
// //                                 checked={formData.parking}
// //                             />
// //                             <span>Parking Spot</span>
// //                         </div>
// //                         <div className="flex gap-2">
// //                             <input 
// //                                 type="checkbox" 
// //                                 id="furnished" 
// //                                 className="w-5" 
// //                                 onChange={handleChange}
// //                                 checked={formData.furnished}
// //                             />
// //                             <span>Furnished</span>
// //                         </div>
// //                         <div className="flex gap-2">
// //                             <input 
// //                                 type="checkbox" 
// //                                 id="offer" 
// //                                 className="w-5" 
// //                                 onChange={handleChange}
// //                                 checked={formData.offer}
// //                             />
// //                             <span>Offer</span>
// //                         </div>
// //                     </div>
                    
// //                     <div className="flex flex-wrap gap-6">
// //                         <div className="flex items-center gap-2">
// //                             <input
// //                                 type="number"
// //                                 id="bedrooms"
// //                                 min="1"
// //                                 max="10"
// //                                 required
// //                                 className="p-3 border border-gray-300 rounded-lg"
// //                                 onChange={handleChange}
// //                                 value={formData.bedrooms}
// //                             />
// //                             <p>Beds</p>
// //                         </div>
// //                         <div className="flex items-center gap-2">
// //                             <input
// //                                 type="number"
// //                                 id="bathrooms"
// //                                 min="1"
// //                                 max="10"
// //                                 required
// //                                 className="p-3 border border-gray-300 rounded-lg"
// //                                 onChange={handleChange}
// //                                 value={formData.bathrooms}
// //                             />
// //                             <p>Baths</p>
// //                         </div>
// //                         <div className="flex items-center gap-2">
// //                             <input
// //                                 type="number"
// //                                 id="regularPrice"
// //                                 min="50"
// //                                 max="10000000"
// //                                 required
// //                                 className="p-3 border border-gray-300 rounded-lg"
// //                                 onChange={handleChange}
// //                                 value={formData.regularPrice}
// //                             />
// //                             <div className="flex flex-col items-center">
// //                                 <p>Regular price</p>
// //                                 {formData.type === 'rent' && (
// //                                     <span className="text-xs">(Naira / month)</span>
// //                                 )}
// //                             </div>
// //                         </div>
// //                         {formData.offer && (
// //                             <div className="flex items-center gap-2">
// //                                 <input
// //                                     type="number"
// //                                     id="discountPrice"
// //                                     min="0"
// //                                     max="10000000"
// //                                     required
// //                                     className="p-3 border border-gray-300 rounded-lg"
// //                                     onChange={handleChange}
// //                                     value={formData.discountPrice}
// //                                 />
// //                                 <div className="flex flex-col items-center">
// //                                     <p>Discounted price</p>
// //                                     {formData.type === 'rent' && (
// //                                         <span className="text-xs">(Naira / month)</span>
// //                                     )}
// //                                 </div>
// //                             </div>
// //                         )}
// //                     </div>
// //                 </div>
                
// //                 <div className="flex flex-col flex-1 gap-4">
// //                     <p className="font-semibold">
// //                         Images:
// //                         <span className="font-normal text-gray-600 ml-2">
// //                             The first image will be the cover (max 6)
// //                         </span>
// //                     </p>
// //                     <div className="flex gap-4">
// //                         <input
// //                             onChange={(e) => setFiles(e.target.files)}
// //                             className="p-3 border border-gray-300 rounded w-full"
// //                             type="file"
// //                             id="images"
// //                             accept="image/*"
// //                             multiple
// //                         />
// //                         <button
// //                             type="button"
// //                             disabled={uploading}
// //                             onClick={handleImageSubmit}
// //                             className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
// //                         >
// //                             {uploading ? 'Uploading...' : 'Upload'}
// //                         </button>
// //                     </div>
                    
// //                     {/* Upload Progress */}
// //                     {Object.keys(uploadProgress).length > 0 && (
// //                         <div className="space-y-2">
// //                             {Object.entries(uploadProgress).map(([index, progress]) => (
// //                                 <div key={index}>
// //                                     <div className="flex justify-between text-sm">
// //                                         <span>Image {parseInt(index) + 1}</span>
// //                                         <span>{progress}%</span>
// //                                     </div>
// //                                     <div className="w-full bg-gray-200 rounded-full h-2">
// //                                         <div 
// //                                             className="bg-blue-600 h-2 rounded-full transition-all duration-300"
// //                                             style={{width: `${progress}%`}}
// //                                         ></div>
// //                                     </div>
// //                                 </div>
// //                             ))}
// //                         </div>
// //                     )}
                    
// //                     <p className="text-red-700 text-sm">{imageUploadError && imageUploadError}</p>
                    
// //                     {formData.imageUrls.length > 0 &&
// //                         formData.imageUrls.map((url, index) => (
// //                             <div key={url} className="flex justify-between p-3 border items-center">
// //                                 <img
// //                                     src={url}
// //                                     alt="listing"
// //                                     className="w-20 h-20 object-contain rounded-lg"
// //                                 />
// //                                 <button
// //                                     type="button"
// //                                     onClick={() => handleRemoveImage(index)}
// //                                     className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
// //                                 >
// //                                     Delete
// //                                 </button>
// //                             </div>
// //                         ))}
                    
// //                     <button
// //                         disabled={loading || uploading}
// //                         className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
// //                     >
// //                         {loading ? 'Creating...' : 'Create listing'}
// //                     </button>
                    
// //                     {error && <p className="text-red-700 text-sm">{error}</p>}
// //                 </div>
// //             </form>
// //         </main>
// //     );
// // };

// // export default Create_Listing;

// import React, { useState } from "react";
// import { useSelector } from 'react-redux';

// const Create_Listing = () => {
//     const { currentUser } = useSelector(state => state.user);
//     const [files, setFiles] = useState([])
//     const [formData, setFormData] = useState({
//         imageUrls: [],
//         name: '',
//         description: '',
//         address: '',
//         type: 'rent',
//         bedrooms: 1,
//         bathrooms: 1,
//         regularPrice: 50,
//         discountedPrice: 0, // Changed from discountPrice to discountedPrice
//         offer: false,
//         parking: false,
//         furnished: false,
//     });
//     const [imageUploadError, setImageUploadError] = useState(false);
//     const [uploading, setUploading] = useState(false);
//     const [uploadProgress, setUploadProgress] = useState({});
//     const [error, setError] = useState(false);
//     const [loading, setLoading] = useState(false);

//     console.log(formData);
//     console.log('Current User:', currentUser);

//     // Check if user is authenticated
//     if (!currentUser) {
//         return (
//             <div className="p-3 max-w-4xl mx-auto">
//                 <h1 className="text-3xl font-bold text-gray-600 text-center my-7">
//                     Please sign in to create a listing
//                 </h1>
//             </div>
//         );
//     }

//     const handleImageSubmit = (e) => {
//         if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
//             setUploading(true);
//             setImageUploadError(false);
//             const promises = [];

//             for (let i = 0; i < files.length; i++) {
//                 promises.push(storeImage(files[i], i));
//             }
            
//             Promise.all(promises).then((urls) => {
//                 setFormData({
//                     ...formData,
//                     imageUrls: formData.imageUrls.concat(urls),
//                 });
//                 setImageUploadError(false);
//                 setUploading(false);
//                 setUploadProgress({});
//             }).catch((err) => {
//                 setImageUploadError('Image upload failed (max 4MB per image)');
//                 setUploading(false);
//                 setUploadProgress({});
//             });
//         } else {
//             setImageUploadError('You can only upload 6 images per listing');
//             setUploading(false);
//         }
//     };

//     const storeImage = async (file, index) => {
//         return new Promise((resolve, reject) => {
//             const formDataUpload = new FormData();
//             formDataUpload.append("file", file);

//             // Create XMLHttpRequest to track upload progress
//             const xhr = new XMLHttpRequest();
            
//             // Track upload progress for each file
//             xhr.upload.addEventListener('progress', (e) => {
//                 if (e.lengthComputable) {
//                     const progress = Math.round((e.loaded / e.total) * 100);
//                     setUploadProgress(prev => ({
//                         ...prev,
//                         [index]: progress
//                     }));
//                 }
//             });

//             // Handle response
//             xhr.onload = function() {
//                 if (xhr.status === 200) {
//                     try {
//                         const response = JSON.parse(xhr.responseText);
//                         resolve(response.url);
//                     } catch (parseError) {
//                         reject(new Error('Failed to parse server response'));
//                     }
//                 } else {
//                     try {
//                         const errorResponse = JSON.parse(xhr.responseText);
//                         reject(new Error(errorResponse.error || `Upload failed: ${xhr.status}`));
//                     } catch (parseError) {
//                         reject(new Error(`Upload failed with status: ${xhr.status}`));
//                     }
//                 }
//             };

//             xhr.onerror = function() {
//                 reject(new Error('Network error - check if server is running'));
//             };

//             // Send request to your API endpoint
//             xhr.open('POST', '/Api/upload');
//             xhr.send(formDataUpload);
//         });
//     };

//     const handleRemoveImage = (index) => {
//         setFormData({
//             ...formData,
//             imageUrls: formData.imageUrls.filter((_, i) => i !== index),
//         });
//     };

//     const handleChange = (e) => {
//         if (e.target.id === 'sale' || e.target.id === 'rent') {
//             setFormData({
//                 ...formData,
//                 type: e.target.id,
//             });
//         }

//         if (e.target.id === 'parking' || e.target.id === 'furnished') {
//             setFormData({
//                 ...formData,
//                 [e.target.id]: e.target.checked,
//             });
//         }

//         if (e.target.id === 'offer') {
//             setFormData({
//                 ...formData,
//                 offer: e.target.checked,
//                 // Reset discounted price when offer is unchecked
//                 discountedPrice: e.target.checked ? formData.discountedPrice : 0,
//             });
//         }

//         if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
//             setFormData({
//                 ...formData,
//                 [e.target.id]: e.target.value,
//             });
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (formData.imageUrls.length < 1) return setError('You must upload at least one image');
//             if (formData.offer && (+formData.regularPrice < +formData.discountedPrice)) {
//                 return setError('Discount price must be lower than regular price');
//             }
            
//             setLoading(true);
//             setError(false);
            
//             // Prepare form data - ensure discountedPrice is always provided
//             const submitData = {
//                 ...formData,
//                 userRef: currentUser._id,
//                 // If offer is false, set discountedPrice to regularPrice
//                 discountedPrice: formData.offer ? formData.discountedPrice : formData.regularPrice
//             };

//             console.log('Submitting data:', submitData);
            
//             const res = await fetch('/Api/listing/create', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 credentials: 'include',
//                 body: JSON.stringify(submitData),
//             });
            
//             const data = await res.json();
//             setLoading(false);
            
//             if (data.success === false) {
//                 setError(data.message);
//             } else {
//                 // Navigate to listing page or show success message
//                 console.log('Listing created successfully:', data);
//                 // You could navigate here: navigate(`/listing/${data._id}`)
//             }
//         } catch (error) {
//             setError(error.message);
//             setLoading(false);
//         }
//     };
        
//     return (
//         <main className="p-3 max-w-4xl mx-auto">
//             <h1 className="text-3xl font-bold text-gray-600 text-center my-7">Create a Listing</h1>
//             <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
//                 <div className="flex flex-col gap-4 flex-1">
//                     <input
//                         type="text"
//                         placeholder="Name"
//                         className="border p-3 focus:outline-none focus:border-blue-500 bg-white rounded-lg"
//                         id="name"
//                         maxLength="62"
//                         minLength="10"
//                         required
//                         onChange={handleChange}
//                         value={formData.name}
//                     />
//                     <textarea
//                         placeholder="Description"
//                         className="border p-3 h-64 focus:outline-none focus:border-blue-500 bg-white rounded-lg"
//                         id="description"
//                         required
//                         onChange={handleChange}
//                         value={formData.description}
//                     />
//                     <input
//                         type="text"
//                         placeholder="Address"
//                         className="border p-3 focus:outline-none focus:border-blue-500 bg-white rounded-lg"
//                         id="address"
//                         required
//                         onChange={handleChange}
//                         value={formData.address}
//                     />
                    
//                     <div className="flex gap-6 flex-wrap">
//                         <div className="flex gap-2">
//                             <input 
//                                 type="checkbox" 
//                                 id="sale" 
//                                 className="w-5" 
//                                 onChange={handleChange}
//                                 checked={formData.type === 'sale'}
//                             />
//                             <span>Sell</span>
//                         </div>
//                         <div className="flex gap-2">
//                             <input 
//                                 type="checkbox" 
//                                 id="rent" 
//                                 className="w-5" 
//                                 onChange={handleChange}
//                                 checked={formData.type === 'rent'}
//                             />
//                             <span>Rent</span>
//                         </div>
//                         <div className="flex gap-2">
//                             <input 
//                                 type="checkbox" 
//                                 id="parking" 
//                                 className="w-5" 
//                                 onChange={handleChange}
//                                 checked={formData.parking}
//                             />
//                             <span>Parking Spot</span>
//                         </div>
//                         <div className="flex gap-2">
//                             <input 
//                                 type="checkbox" 
//                                 id="furnished" 
//                                 className="w-5" 
//                                 onChange={handleChange}
//                                 checked={formData.furnished}
//                             />
//                             <span>Furnished</span>
//                         </div>
//                         <div className="flex gap-2">
//                             <input 
//                                 type="checkbox" 
//                                 id="offer" 
//                                 className="w-5" 
//                                 onChange={handleChange}
//                                 checked={formData.offer}
//                             />
//                             <span>Offer</span>
//                         </div>
//                     </div>
                    
//                     <div className="flex flex-wrap gap-6">
//                         <div className="flex items-center gap-2">
//                             <input
//                                 type="number"
//                                 id="bedrooms"
//                                 min="1"
//                                 max="10"
//                                 required
//                                 className="p-3 border border-gray-300 rounded-lg"
//                                 onChange={handleChange}
//                                 value={formData.bedrooms}
//                             />
//                             <p>Beds</p>
//                         </div>
//                         <div className="flex items-center gap-2">
//                             <input
//                                 type="number"
//                                 id="bathrooms"
//                                 min="1"
//                                 max="10"
//                                 required
//                                 className="p-3 border border-gray-300 rounded-lg"
//                                 onChange={handleChange}
//                                 value={formData.bathrooms}
//                             />
//                             <p>Baths</p>
//                         </div>
//                         <div className="flex items-center gap-2">
//                             <input
//                                 type="number"
//                                 id="regularPrice"
//                                 min="50"
//                                 max="10000000"
//                                 required
//                                 className="p-3 border border-gray-300 rounded-lg"
//                                 onChange={handleChange}
//                                 value={formData.regularPrice}
//                             />
//                             <div className="flex flex-col items-center">
//                                 <p>Regular price</p>
//                                 {formData.type === 'rent' && (
//                                     <span className="text-xs">(Naira / month)</span>
//                                 )}
//                             </div>
//                         </div>
//                         {formData.offer && (
//                             <div className="flex items-center gap-2">
//                                 <input
//                                     type="number"
//                                     id="discountedPrice"
//                                     min="0"
//                                     max="10000000"
//                                     required
//                                     className="p-3 border border-gray-300 rounded-lg"
//                                     onChange={handleChange}
//                                     value={formData.discountedPrice}
//                                 />
//                                 <div className="flex flex-col items-center">
//                                     <p>Discounted price</p>
//                                     {formData.type === 'rent' && (
//                                         <span className="text-xs">(Naira / month)</span>
//                                     )}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
                
//                 <div className="flex flex-col flex-1 gap-4">
//                     <p className="font-semibold">
//                         Images:
//                         <span className="font-normal text-gray-600 ml-2">
//                             The first image will be the cover (max 6)
//                         </span>
//                     </p>
//                     <div className="flex gap-4">
//                         <input
//                             onChange={(e) => setFiles(e.target.files)}
//                             className="p-3 border border-gray-300 rounded w-full"
//                             type="file"
//                             id="images"
//                             accept="image/*"
//                             multiple
//                         />
//                         <button
//                             type="button"
//                             disabled={uploading}
//                             onClick={handleImageSubmit}
//                             className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
//                         >
//                             {uploading ? 'Uploading...' : 'Upload'}
//                         </button>
//                     </div>
                    
//                     {/* Upload Progress */}
//                     {Object.keys(uploadProgress).length > 0 && (
//                         <div className="space-y-2">
//                             {Object.entries(uploadProgress).map(([index, progress]) => (
//                                 <div key={index}>
//                                     <div className="flex justify-between text-sm">
//                                         <span>Image {parseInt(index) + 1}</span>
//                                         <span>{progress}%</span>
//                                     </div>
//                                     <div className="w-full bg-gray-200 rounded-full h-2">
//                                         <div 
//                                             className="bg-blue-600 h-2 rounded-full transition-all duration-300"
//                                             style={{width: `${progress}%`}}
//                                         ></div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
                    
//                     <p className="text-red-700 text-sm">{imageUploadError && imageUploadError}</p>
                    
//                     {formData.imageUrls.length > 0 &&
//                         formData.imageUrls.map((url, index) => (
//                             <div key={url} className="flex justify-between p-3 border items-center">
//                                 <img
//                                     src={url}
//                                     alt="listing"
//                                     className="w-20 h-20 object-contain rounded-lg"
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={() => handleRemoveImage(index)}
//                                     className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
//                                 >
//                                     Delete
//                                 </button>
//                             </div>
//                         ))}
                    
//                     <button
//                         disabled={loading || uploading}
//                         className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
//                     >
//                         {loading ? 'Creating...' : 'Create listing'}
//                     </button>
                    
//                     {error && <p className="text-red-700 text-sm">{error}</p>}
//                 </div>
//             </form>
//         </main>
//     );
// };

// export default Create_Listing;

import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Create_Listing = () => {
    const { currentUser } = useSelector(state => state.user);
    const navigate = useNavigate();
    const [files, setFiles] = useState([])
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountedPrice: 0, // Changed from discountPrice to discountedPrice
        offer: false,
        parking: false,
        furnished: false,
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    console.log(formData);
    console.log('Current User:', currentUser);

    // Check if user is authenticated
    if (!currentUser) {
        return (
            <div className="p-3 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-600 text-center my-7">
                    Please sign in to create a listing
                </h1>
            </div>
        );
    }

    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setUploading(true);
            setImageUploadError(false);
            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i], i));
            }
            
            Promise.all(promises).then((urls) => {
                setFormData({
                    ...formData,
                    imageUrls: formData.imageUrls.concat(urls),
                });
                setImageUploadError(false);
                setUploading(false);
                setUploadProgress({});
            }).catch((err) => {
                setImageUploadError('Image upload failed (max 4MB per image)');
                setUploading(false);
                setUploadProgress({});
            });
        } else {
            setImageUploadError('You can only upload 6 images per listing');
            setUploading(false);
        }
    };

    const storeImage = async (file, index) => {
        return new Promise((resolve, reject) => {
            const formDataUpload = new FormData();
            formDataUpload.append("file", file);

            // Create XMLHttpRequest to track upload progress
            const xhr = new XMLHttpRequest();
            
            // Track upload progress for each file
            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    const progress = Math.round((e.loaded / e.total) * 100);
                    setUploadProgress(prev => ({
                        ...prev,
                        [index]: progress
                    }));
                }
            });

            // Handle response
            xhr.onload = function() {
                if (xhr.status === 200) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        resolve(response.url);
                    } catch (parseError) {
                        reject(new Error('Failed to parse server response'));
                    }
                } else {
                    try {
                        const errorResponse = JSON.parse(xhr.responseText);
                        reject(new Error(errorResponse.error || `Upload failed: ${xhr.status}`));
                    } catch (parseError) {
                        reject(new Error(`Upload failed with status: ${xhr.status}`));
                    }
                }
            };

            xhr.onerror = function() {
                reject(new Error('Network error - check if server is running'));
            };

            // Send request to your API endpoint
            xhr.open('POST', '/Api/upload');
            xhr.send(formDataUpload);
        });
    };

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
    };

    const handleChange = (e) => {
        if (e.target.id === 'sale' || e.target.id === 'rent') {
            setFormData({
                ...formData,
                type: e.target.id,
            });
        }

        if (e.target.id === 'parking' || e.target.id === 'furnished') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked,
            });
        }

        if (e.target.id === 'offer') {
            setFormData({
                ...formData,
                offer: e.target.checked,
                // Reset discounted price when offer is unchecked
                discountedPrice: e.target.checked ? formData.discountedPrice : 0,
            });
        }

        if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.imageUrls.length < 1) return setError('You must upload at least one image');
            if (formData.offer && (+formData.regularPrice < +formData.discountedPrice)) {
                return setError('Discount price must be lower than regular price');
            }
            
            setLoading(true);
            setError(false);
            setSuccess(false);
            
            // Prepare form data - ensure discountedPrice is always provided
            const submitData = {
                ...formData,
                userRef: currentUser._id,
                // If offer is false, set discountedPrice to regularPrice
                discountedPrice: formData.offer ? formData.discountedPrice : formData.regularPrice
            };

            console.log('Submitting data:', submitData);
            
            const res = await fetch('/Api/listing/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(submitData),
            });
            
            const data = await res.json();
            setLoading(false);
            
            if (data.success === false) {
                setError(data.message);
                setSuccess(false);
            } else {
                // Success! Show notification and navigate
                setSuccess(true);
                setError(false);
                console.log('Listing created successfully:', data);
                
                // Reset form after a short delay
                setTimeout(() => {
                    // Option 1: Navigate to the new listing
                    // navigate(`/listing/${data._id}`);
                    
                    // Option 2: Navigate to profile or listings page
                    // navigate('/profile');
                    
                    // Option 3: Reset form and stay on page
                    // resetForm();
                }, 2000);
            }
        } catch (error) {
            setError(error.message);
            setLoading(false);
            setSuccess(false);
        }
    };

    const resetForm = () => {
        setFormData({
            imageUrls: [],
            name: '',
            description: '',
            address: '',
            type: 'rent',
            bedrooms: 1,
            bathrooms: 1,
            regularPrice: 50,
            discountedPrice: 0,
            offer: false,
            parking: false,
            furnished: false,
        });
        setFiles([]);
        setError(false);
        setSuccess(false);
        setImageUploadError(false);
    };
        
    return (
        <main className="p-3 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-600 text-center my-7">Create a Listing</h1>
            
            {/* Success Notification */}
            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-center">
                    <p className="font-semibold">🎉 Listing created successfully!</p>
                    <p className="text-sm">Redirecting to your new listing...</p>
                </div>
            )}

            {/* Error Notification */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
                    <p className="font-semibold">❌ Error: {error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col gap-4 flex-1">
                    <input
                        type="text"
                        placeholder="Name"
                        className="border p-3 focus:outline-none focus:border-blue-500 bg-white rounded-lg disabled:opacity-50"
                        id="name"
                        maxLength="62"
                        minLength="10"
                        required
                        onChange={handleChange}
                        value={formData.name}
                        disabled={loading}
                    />
                    <textarea
                        placeholder="Description"
                        className="border p-3 h-64 focus:outline-none focus:border-blue-500 bg-white rounded-lg disabled:opacity-50"
                        id="description"
                        required
                        onChange={handleChange}
                        value={formData.description}
                        disabled={loading}
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        className="border p-3 focus:outline-none focus:border-blue-500 bg-white rounded-lg disabled:opacity-50"
                        id="address"
                        required
                        onChange={handleChange}
                        value={formData.address}
                        disabled={loading}
                    />
                    
                    <div className="flex gap-6 flex-wrap">
                        <div className="flex gap-2">
                            <input 
                                type="checkbox" 
                                id="sale" 
                                className="w-5 disabled:opacity-50" 
                                onChange={handleChange}
                                checked={formData.type === 'sale'}
                                disabled={loading}
                            />
                            <span>Sell</span>
                        </div>
                        <div className="flex gap-2">
                            <input 
                                type="checkbox" 
                                id="rent" 
                                className="w-5 disabled:opacity-50" 
                                onChange={handleChange}
                                checked={formData.type === 'rent'}
                                disabled={loading}
                            />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input 
                                type="checkbox" 
                                id="parking" 
                                className="w-5 disabled:opacity-50" 
                                onChange={handleChange}
                                checked={formData.parking}
                                disabled={loading}
                            />
                            <span>Parking Spot</span>
                        </div>
                        <div className="flex gap-2">
                            <input 
                                type="checkbox" 
                                id="furnished" 
                                className="w-5 disabled:opacity-50" 
                                onChange={handleChange}
                                checked={formData.furnished}
                                disabled={loading}
                            />
                            <span>Furnished</span>
                        </div>
                        <div className="flex gap-2">
                            <input 
                                type="checkbox" 
                                id="offer" 
                                className="w-5 disabled:opacity-50" 
                                onChange={handleChange}
                                checked={formData.offer}
                                disabled={loading}
                            />
                            <span>Offer</span>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                id="bedrooms"
                                min="1"
                                max="10"
                                required
                                className="p-3 border border-gray-300 rounded-lg disabled:opacity-50"
                                onChange={handleChange}
                                value={formData.bedrooms}
                                disabled={loading}
                            />
                            <p>Beds</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                id="bathrooms"
                                min="1"
                                max="10"
                                required
                                className="p-3 border border-gray-300 rounded-lg disabled:opacity-50"
                                onChange={handleChange}
                                value={formData.bathrooms}
                                disabled={loading}
                            />
                            <p>Baths</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                id="regularPrice"
                                min="50"
                                max="10000000"
                                required
                                className="p-3 border border-gray-300 rounded-lg disabled:opacity-50"
                                onChange={handleChange}
                                value={formData.regularPrice}
                                disabled={loading}
                            />
                            <div className="flex flex-col items-center">
                                <p>Regular price</p>
                                {formData.type === 'rent' && (
                                    <span className="text-xs">(Naira / month)</span>
                                )}
                            </div>
                        </div>
                        {formData.offer && (
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    id="discountedPrice"
                                    min="0"
                                    max="10000000"
                                    required
                                    className="p-3 border border-gray-300 rounded-lg disabled:opacity-50"
                                    onChange={handleChange}
                                    value={formData.discountedPrice}
                                    disabled={loading}
                                />
                                <div className="flex flex-col items-center">
                                    <p>Discounted price</p>
                                    {formData.type === 'rent' && (
                                        <span className="text-xs">(Naira / month)</span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="flex flex-col flex-1 gap-4">
                    <p className="font-semibold">
                        Images:
                        <span className="font-normal text-gray-600 ml-2">
                            The first image will be the cover (max 6)
                        </span>
                    </p>
                    <div className="flex gap-4">
                        <input
                            onChange={(e) => setFiles(e.target.files)}
                            className="p-3 border border-gray-300 rounded w-full disabled:opacity-50"
                            type="file"
                            id="images"
                            accept="image/*"
                            multiple
                            disabled={loading}
                        />
                        <button
                            type="button"
                            disabled={uploading || loading}
                            onClick={handleImageSubmit}
                            className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80 transition-opacity"
                        >
                            {uploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                    
                    {/* Upload Progress */}
                    {Object.keys(uploadProgress).length > 0 && (
                        <div className="space-y-2">
                            {Object.entries(uploadProgress).map(([index, progress]) => (
                                <div key={index}>
                                    <div className="flex justify-between text-sm">
                                        <span>Image {parseInt(index) + 1}</span>
                                        <span>{progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                            style={{width: `${progress}%`}}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    <p className="text-red-700 text-sm">{imageUploadError && imageUploadError}</p>
                    
                    {formData.imageUrls.length > 0 &&
                        formData.imageUrls.map((url, index) => (
                            <div key={url} className="flex justify-between p-3 border items-center">
                                <img
                                    src={url}
                                    alt="listing"
                                    className="w-20 h-20 object-contain rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    
                    <button
                        disabled={loading || uploading}
                        className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 transition-opacity"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating listing...
                            </span>
                        ) : uploading ? (
                            'Wait for upload to complete...'
                        ) : success ? (
                            <span className="flex items-center justify-center gap-2">
                                <span>✅</span>
                                Listing created!
                            </span>
                        ) : (
                            'Create listing'
                        )}
                    </button>
                    
                    {/* Additional Action Buttons */}
                    {!loading && !success && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="p-3 bg-gray-500 text-white rounded-lg uppercase hover:opacity-95 transition-opacity"
                        >
                            Reset Form
                        </button>
                    )}
                    
                    {error && <p className="text-red-700 text-sm font-semibold">{error}</p>}
                </div>
            </form>
        </main>
    );
};

export default Create_Listing;