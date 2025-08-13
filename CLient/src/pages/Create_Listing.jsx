import React from "react";

const Create_Listing = () => {
  return (
    <main className="p-3 max-w-4xl  mx-auto">
      {/* <div className="flex justify-center"> */}
        <h1 className="text-3xl font-bold text-gray-600">Create a Listing</h1>
      {/* </div> */}
      <form className="flex flex-col sm:flex-row gap-4 space-x-5">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border-none border p-3 focus:outline-none focus:border-blue-500 bg-white rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border-none border p-3 h-64 focus:outline-none focus:border-blue-500 bg-white rounded-lg"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border-none border p-3 focus:outline-none focus:border-blue-500 bg-white rounded-lg"
            id="address"
            required
          />
          <div className="flex gap-3 flex-wrap mt-5">
          <div className="flex gap-2">
            <input type="checkbox" id="sale" className="w-5" />
            <span>Sell</span>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" id="rent" className="w-5" />
            <span>Rent</span>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" id="parking" className="w-5" />
            <span>Parking Spot</span>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" id="furnished" className="w-5" />
            <span>Furnished</span>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" id="offer" className="w-5" />
            <span>Offer</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-5">
          <div className="flex items-center gap-2">
            <input
              type="number"
              id="bed"
              min="1"
              max="20"
              className="p-1 border border-gray-300 rounded-xl"
              required
            />
            <p>Beds</p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              id="bathrooms"
              min="1"
              max="20"
              className="p-1 border border-gray-300 rounded-xl"
              required
            />
            <p>Bath</p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              id="regularPrice"
              min="1"
              max="20"
              className="p-1 border border-gray-300 rounded-xl"
              required
            />
            <div className="flex flex-col items-center">
              <p>Regular Price</p>
              <span className="text-sm">(Naira/ Month)</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              id="discountPrice"
              min="1"
              max="20"
              className="p-1 border border-gray-300 rounded-lg"
              required
            />
            <div className="flex flex-col items-center">
              <p>Discounted Price</p>
              <span className="text-sm">(Naira/ Month)</span>
            </div>{" "}
          </div>
        </div>
        </div>
        
        <div className="flex flex-col flex-1">
            <p className="font-semi-bold">Images: <span className="text-gray-600 font-normal ml-2">The first image will be the cover (max 6)</span></p>
            <div>
                <input className="p-3 border border-gray-300 w-full" type="file" id='images' accept='image/*' multiple />
                <button className="w-full p-3 bg-blue-700 text-white mt-4 rounded-lg hover:shadow-lg disabled:opacity-80">Upload Image</button>
            </div>
            {/* <input type="file" id="image" className=""/> */}
            <button className="p-3 bg-green-700 w-full my-5 rounded-lg text-white hover:opacity-95 disabled:opacity-80">Create Listing</button>

        </div>

       
      </form>

    </main>
  );
};

export default Create_Listing;
