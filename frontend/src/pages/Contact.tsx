export default function Contact() {
    return (
        <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 text-center text-gray-800 max-w-2xl mx-auto">
            <div className="mb-8">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4">
                    <rect width="64" height="64" rx="12" fill="#007BFF" opacity="0.1"/>
                    <path d="M32 16 L24 28 L32 32 L40 28 Z" fill="#007BFF" opacity="0.8"/>
                    <path d="M32 32 L32 48" stroke="#007BFF" strokeWidth="3" strokeLinecap="round"/>
                    <circle cx="32" cy="48" r="4" fill="#007BFF"/>
                </svg>
                <h2 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-4">Contact Us</h2>
                <p className="mb-8 text-base sm:text-lg">We'd love to help! Reach out to book a visit or ask a question.</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 space-y-6 text-left max-w-md mx-auto">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <strong className="text-gray-700 block mb-1">Email:</strong>
                        <a href="mailto:sprattsj@gmail.com" className="text-blue-700 hover:underline break-all">
                            sprattsj@gmail.com
                        </a>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                    </div>
                    <div>
                        <strong className="text-gray-700 block mb-1">Phone:</strong>
                        <a href="tel:702-994-0967" className="text-blue-700 hover:underline">
                            702-994-0967
                        </a>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <div>
                        <strong className="text-gray-700 block mb-1">Location:</strong>
                        <span className="text-gray-900">Bluffton, SC</span>
                    </div>
                </div>
            </div>
        </section>
    );
}