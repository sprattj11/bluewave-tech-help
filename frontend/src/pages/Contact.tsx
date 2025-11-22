export default function Contact() {
    return (
        <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 text-center text-gray-800 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-4">Contact Us</h2>
            <p className="mb-8 text-base sm:text-lg">We'd love to help! Reach out to book a visit or ask a question.</p>

            <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 space-y-4 text-left max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <strong className="text-gray-700 min-w-[80px]">Email:</strong>
                    <a href="mailto:sprattsj@gmail.com" className="text-blue-700 hover:underline break-all">
                        sprattsj@gmail.com
                    </a>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <strong className="text-gray-700 min-w-[80px]">Phone:</strong>
                    <a href="tel:702-994-0967" className="text-blue-700 hover:underline">
                        702-994-0967
                    </a>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <strong className="text-gray-700 min-w-[80px]">Location:</strong>
                    <span className="text-gray-900">Bluffton, SC</span>
                </div>
            </div>
        </section>
    );
}