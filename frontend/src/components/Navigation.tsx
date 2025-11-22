import { useState } from "react";
import { Link } from "react-router-dom";

function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header 
      className="bg-[#007BFF] text-white shadow-md sticky top-0 z-50"
      style={{ backgroundColor: '#007BFF', color: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <Link to="/" className="text-xl sm:text-2xl font-bold tracking-wide hover:opacity-90">
            BlueWave Tech Help
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:underline py-2" style={{ color: 'white', textDecoration: 'none' }}>
              Home
            </Link>
            <Link to="/about" className="text-sm font-medium hover:underline py-2" style={{ color: 'white', textDecoration: 'none' }}>
              About
            </Link>
            <Link to="/services" className="text-sm font-medium hover:underline py-2" style={{ color: 'white', textDecoration: 'none' }}>
              Services
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:underline py-2" style={{ color: 'white', textDecoration: 'none' }}>
              Contact
            </Link>
            <Link
              to="/booking"
              className="bg-white text-[#007BFF] px-4 py-2 rounded-lg font-semibold hover:bg-[#F3F4F6] transition min-h-[44px] flex items-center justify-center"
              style={{ backgroundColor: 'white', color: '#007BFF', fontWeight: '600', textDecoration: 'none' }}
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 text-base font-medium hover:bg-white/10 rounded-lg min-h-[44px] flex items-center"
              style={{ color: 'white', textDecoration: 'none' }}
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 text-base font-medium hover:bg-white/10 rounded-lg min-h-[44px] flex items-center"
              style={{ color: 'white', textDecoration: 'none' }}
            >
              About
            </Link>
            <Link
              to="/services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 text-base font-medium hover:bg-white/10 rounded-lg min-h-[44px] flex items-center"
              style={{ color: 'white', textDecoration: 'none' }}
            >
              Services
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 text-base font-medium hover:bg-white/10 rounded-lg min-h-[44px] flex items-center"
              style={{ color: 'white', textDecoration: 'none' }}
            >
              Contact
            </Link>
            <Link
              to="/booking"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 bg-white text-[#007BFF] font-semibold rounded-lg text-center min-h-[44px] flex items-center justify-center mt-2"
              style={{ backgroundColor: 'white', color: '#007BFF', fontWeight: '600', textDecoration: 'none' }}
            >
              Book Now
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navigation;