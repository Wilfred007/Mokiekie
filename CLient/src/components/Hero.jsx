import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function HomePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return; // prevent empty searches
    const urlParams = new URLSearchParams({ searchTerm });
    navigate(`/search?${urlParams.toString()}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
        style={{
          backgroundImage: `url('/heros.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6 text-white drop-shadow-lg">
            Find Your Dream{" "}
            <span className="text-accent text-8xl font-extrabold text-blue-200">Home</span>
            <br />
            With Ease
          </h1>

          <div className="mb-8 max-w-2xl mx-auto">
            <p className="text-lg md:text-xl text-white leading-relaxed drop-shadow-md">
              At Mokiekie Global, every detail is considered. We want to get you
              that dream home you have always wanted.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8 max-w-md mx-auto">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Search property..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg bg-white/95 text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="submit"
                className="bg-secondary hover:bg-secondary/90 border border-gray-200 rounded-lg text-white 
                   flex items-center justify-center 
                   text-secondary-foreground px-6 py-2"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
