import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Slider from '../components/Slider'

const Home = () => {
  return (
    <div>
      <div className=''>
        {/* <div>
        <h1 className='text-8xl font-bold text-teal-700'>Find Your Next <span className='text-teal-400'>Home</span> <br/>With Ease</h1>
        <div className='mt-3'>
          <p className='text-gray-700'>At Mokiekie Global Every Detail Is Considered, We Want to get you that dream home you have always wanted  </p>
        </div>
        <Link to={"/search"} className='mt-4'>Lets Start Now...</Link>
      </div> */}
      <Hero/>
      <div className="my-16 text-center px-4">
  {/* Heading */}
  <h1 className="text-3xl font-bold text-gray-700 mb-8 inline-block border-b border-gray-300 pb-2">
    Featured Companies
  </h1>

  {/* Logos + Names */}
  <div className="flex flex-wrap justify-center gap-10 md:gap-16 mt-8">
    {/* Company 1 */}
    <div className="flex flex-col items-center w-28 sm:w-32">
      <img
        src="/est1.jpg"
        alt="Company 1"
        className="w-20 h-20 sm:w-28 sm:h-28 rounded-full object-cover shadow-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-xl"
      />
      <p className="mt-3 text-gray-600 font-medium text-sm sm:text-base">
        Sable & Grey
      </p>
    </div>

    {/* Company 2 */}
    <div className="flex flex-col items-center w-28 sm:w-32">
      <img
        src="/est2.jpg"
        alt="Company 2"
        className="w-20 h-20 sm:w-28 sm:h-28 rounded-full object-cover shadow-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-xl"
      />
      <p className="mt-3 text-gray-600 font-medium text-sm sm:text-base">
        Salis Ventilated Homes
      </p>
    </div>

    {/* Company 3 */}
    <div className="flex flex-col items-center w-28 sm:w-32">
      <img
        src="/est3.jpg"
        alt="Company 3"
        className="w-20 h-20 sm:w-28 sm:h-28 rounded-full object-cover shadow-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-xl"
      />
      <p className="mt-3 text-gray-600 font-medium text-sm sm:text-base">
        The Juciherz
      </p>
    </div>
  </div>
</div>


      <Slider />
      </div>
    </div>
  )
}

export default Home