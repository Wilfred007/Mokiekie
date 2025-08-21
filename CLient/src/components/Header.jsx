import { useState, useEffect } from "react"
import { FaSearch, FaUser } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const Header = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [searchTerm, setSearchTerm] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set("searchTerm", searchTerm)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const searchTermFromUrl = urlParams.get("searchTerm")
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl)
    }
  }, [window.location.search])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-transparent backdrop-blur-md shadow-lg border-b border-gray-100"
          : " shadow-sm"
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <img
              src="/logo.jpg"
              alt="Mokiekie Estate Logo"
              className="w-12 h-12 object-cover rounded-full ring-2 ring-blue-500/20 group-hover:ring-blue-500/40 transition-all duration-300"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300"></div>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-bold text-xl text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
              Mokiekie
            </h1>
            <p className="text-sm text-gray-500 -mt-1">Globals Ltd</p>
          </div>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-md mx-4 sm:mx-8">
          <form onSubmit={handleSubmit} className="relative group">
            <div className="relative">
              <input
                type="text"
                placeholder="Search properties..."
                className="w-full bg-gray-50 border border-gray-200 rounded-full py-3 pl-4 pr-12 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-gray-100"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <FaSearch className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-1 sm:space-x-2">
          <Link
            to="/"
            className="hidden sm:block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hidden sm:block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium"
          >
            Contact
          </Link>

          <Link
            to="/profile"
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-300 group"
          >
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <img
                  src={currentUser.avatar || "/placeholder.svg"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-200 group-hover:ring-blue-300 transition-all duration-300"
                />
                <span className="hidden md:block text-sm font-medium text-gray-700 group-hover:text-blue-600">
                  Profile
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 hover:scale-105">
                <FaUser className="w-4 h-4" />
                <span className="font-medium">Sign In</span>
              </div>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
