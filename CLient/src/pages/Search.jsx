import React from 'react'

const Search = () => {
  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b-1 border-b-gray-300 md:border-r-1 md:border-r-gray-300 md:min-h-screen'>
            <form className='flex flex-col gap-3'>
            <div className='flex items-center gap-5'>
                <label className='whitespace-nowrap'>Search Terms</label>
                <input type="text" id='searchTerm' placeholder='Search...' className='bg-transparent border p-3 rounded-lg border-gray-300 w-full focus:outline-none sm:w-64' />
            </div>
            <div className='flex gap-2 flex-wrap mt-3 items-center'>
                <label>Type:</label>
                <div>
                <input type="checkbox" id="all" className='w-5' />
                <span>Rent & Sell</span>
                </div>
                <div>
                <input type="checkbox" id="rent" className='w-5' />
                <span>Rent</span>
                </div><div>
                <input type="checkbox" id="sale" className='w-5' />
                <span>Sale</span>
                </div><div>
                <input type="checkbox" id="offer" className='w-5' />
                <span>Offer</span>
                </div>
            </div>
            <div className='flex gap-2 flex-wrap mt-3 items-center'>
                <label>Amenities:</label>
                <div>
                <input type="checkbox" id="parking" className='w-5' />
                <span>Parking</span>
                </div>
                <div>
                <input type="checkbox" id="furnished" className='w-5' />
                <span>Furnished</span>
                </div>
            </div>
            <div>
                <label>Sort:</label>
                <select id="sort_order" className='border rounded-lg p-3 border-gray-300'>
                    <option>Price high to low</option>
                    <option>Low to high</option>
                    <option>Latest</option>
                    <option>Oldest</option>

                </select>
            </div>
            <button className='bg-blue-600 text-white p-3 rounded-lg hover:opacity-90 mt-4'>Search</button>
        </form>
        </div>
        <div>
            <h1 className='text-3xl font-bold text-gray-600 mt-5'>Listing Results</h1>
        </div>
    </div>
  )
}

export default Search