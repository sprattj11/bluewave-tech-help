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
          <Link to="/" className="flex items-center space-x-2 hover:opacity-90">
            <svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden sm:block">
              <rect width="64" height="64" rx="8" fill="white" fillOpacity="0.2"/>
              <path d="M12 32 C20 24, 28 24, 36 32 C44 40, 52 40, 60 32" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <path d="M12 42 C20 34, 28 34, 36 42 C44 50, 52 50, 60 42" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7"/>
              <rect x="28" y="20" width="8" height="6" rx="1" fill="white" opacity="0.9"/>
            </svg>
            <span className="text-xl sm:text-2xl font-bold tracking-wide">BlueWave Tech Help</span>
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