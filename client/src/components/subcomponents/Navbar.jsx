import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../../lib/auth";

export default function NavBar({ isAuthenticated, setIsAuthenticated }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    removeToken();
    setIsAuthenticated(false);
    navigate("/auth");
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      navigate(`/search/${trimmedQuery}`);
      setSearchQuery("");
    } else {
      navigate("/search/invalid");
    }
  }

  const linkClass =
    "font-sans text-sm uppercase tracking-widest2 text-ink/70 hover:text-ink transition-colors";

  return (
    <header className="bg-cream border-b border-ink/10 px-6 md:px-16 py-4 flex items-center justify-between relative">
      <Link to="/" className="font-serif text-2xl tracking-tight">
        Grail
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-8">
        <Link to="/" className={linkClass}>Home</Link>
        {isAuthenticated && (
          <>
            <Link to="/homefeed" className={linkClass}>Feed</Link>
            <Link to="/add-item" className={linkClass}>Sell</Link>
            <Link to="/cart" className={linkClass}>Cart</Link>
            <button onClick={handleLogout} className={linkClass}>Logout</button>
          </>
        )}
        {!isAuthenticated && (
          <Link to="/auth" className={linkClass}>Login / Register</Link>
        )}

        {isAuthenticated && (
          <form onSubmit={handleSearchSubmit} className="flex items-center border border-ink/20">
            <input
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent px-3 py-1.5 text-sm focus:outline-none w-40"
            />
            <button type="submit" className="px-3 py-1.5 text-sm uppercase tracking-widest2 border-l border-ink/20 hover:bg-ink hover:text-cream transition-colors">
              Go
            </button>
          </form>
        )}
      </nav>

      {/* Mobile toggle */}
      <button
        className="md:hidden font-sans text-sm uppercase tracking-widest2"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "Close" : "Menu"}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-cream border-b border-ink/10 px-6 py-6 flex flex-col gap-4 md:hidden z-50">
          <Link to="/" className={linkClass} onClick={() => setMenuOpen(false)}>Home</Link>
          {isAuthenticated && (
            <>
              <Link to="/homefeed" className={linkClass} onClick={() => setMenuOpen(false)}>Feed</Link>
              <Link to="/add-item" className={linkClass} onClick={() => setMenuOpen(false)}>Sell</Link>
              <Link to="/cart" className={linkClass} onClick={() => setMenuOpen(false)}>Cart</Link>
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className={`${linkClass} text-left`}>Logout</button>
              <form onSubmit={handleSearchSubmit} className="flex items-center border border-ink/20 mt-2">
                <input
                  type="search"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent px-3 py-1.5 text-sm focus:outline-none flex-1"
                />
                <button type="submit" className="px-3 py-1.5 text-sm uppercase tracking-widest2 border-l border-ink/20">
                  Go
                </button>
              </form>
            </>
          )}
          {!isAuthenticated && (
            <Link to="/auth" className={linkClass} onClick={() => setMenuOpen(false)}>Login / Register</Link>
          )}
        </div>
      )}
    </header>
  );
}