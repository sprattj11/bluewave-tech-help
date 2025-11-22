import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center px-4 py-10 sm:py-16 md:py-20 bg-gradient-to-br from-blue-50 to-blue-100 min-h-[60vh]">
                {/* Logo/Icon */}
                <div className="mb-6">
                    <svg width="80" height="80" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                        <rect width="64" height="64" rx="12" fill="#007BFF" opacity="0.1"/>
                        <path d="M12 32 C20 24, 28 24, 36 32 C44 40, 52 40, 60 32" 
                              stroke="#007BFF" strokeWidth="3" fill="none" strokeLinecap="round"/>
                        <path d="M12 42 C20 34, 28 34, 36 42 C44 50, 52 50, 60 42" 
                              stroke="#007BFF" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7"/>
                        <rect x="28" y="20" width="8" height="6" rx="1" fill="#007BFF" opacity="0.8"/>
                        <circle cx="48" cy="24" r="3" fill="#007BFF" opacity="0.6"/>
                    </svg>
                </div>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700 mb-4 px-4">
                    Your Neighborhood Tech Support
                </h2>
                <p className="text-gray-700 max-w-xl px-4 text-base sm:text-lg mb-8">
                    Friendly, affordable, and professional tech help for your home and small business.
                    Book a session today and let's make technology simple again.
                </p>
                <Link
                    to="/booking"
                    className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold button-primary text-base sm:text-lg min-h-[48px] touch-manipulation shadow-lg"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Book Now
                </Link>
            </section>

            {/* Features Section */}
            <section className="py-12 px-4 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Choose BlueWave?</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-6 rounded-lg bg-blue-50">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Fast Response</h4>
                            <p className="text-sm text-gray-600">Quick booking and same-day availability</p>
                        </div>
                        <div className="text-center p-6 rounded-lg bg-blue-50">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Trusted Service</h4>
                            <p className="text-sm text-gray-600">Professional and reliable tech support</p>
                        </div>
                        <div className="text-center p-6 rounded-lg bg-blue-50">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Affordable Rates</h4>
                            <p className="text-sm text-gray-600">Transparent $25/hour pricing</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}