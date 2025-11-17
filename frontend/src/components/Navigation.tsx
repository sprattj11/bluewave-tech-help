import { Link } from "react-router-dom";

function Navigation() {
    return (
        <header 
            className="bg-[#007BFF] text-white px-6 py-4 shadow-md"
            style={{ backgroundColor: '#007BFF', color: 'white', padding: '1rem 1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
        >
            <div 
                className="max-w-6xl mx-auto flex justify-between items-center"
                style={{ maxWidth: '72rem', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
                {/* Logo / Brand */}
                <h1 className="text-2xl font-bold tracking-wide">BlueWave Tech Help</h1>

                {/* Navigation Links */}
                <nav 
                    className="space-x-6 text-sm font-medium"
                    style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem', fontWeight: '500' }}
                >
                <Link to="/" className="hover:underline" style={{ color: 'white', textDecoration: 'none' }}>
                    Home
                </Link>
                <Link to="/about" className="hover:underline" style={{ color: 'white', textDecoration: 'none' }}>
                    About
                </Link>
                <Link to="/services" className="hover:underline" style={{ color: 'white', textDecoration: 'none' }}>
                    Services
                </Link>
                <Link to="/contact" className="hover:underline" style={{ color: 'white', textDecoration: 'none' }}>
                    Contact
                </Link>
                </nav>
            
                {/* Call-to-Action Button */}
                <Link
                    to="/booking"
                    className="bg-white text-[#007BFF] px-4 py-2 rounded-lg font-semibold hover:bg-[#F3F4F6] transition"
                    style={{ backgroundColor: 'white', color: '#007BFF', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: '600', textDecoration: 'none' }}
                >
                    Book Now
                </Link>
            </div>
        </header>
    );
}

export default Navigation;