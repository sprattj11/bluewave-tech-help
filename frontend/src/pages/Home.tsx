import { Link } from "react-router-dom";

export default function Home() {
    return (
        <section className="flex flex-col items-center justify-center text-center px-4 py-10 sm:py-16 md:py-20 bg-blue-50 min-h-[60vh]">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700 mb-4 px-4">
                Your Neighborhood Tech Support
            </h2>
            <p className="text-gray-700 max-w-xl px-4 text-base sm:text-lg mb-6">
                Friendly, affordable, and professional tech help for your home and small business.
                Book a session today and let's make technology simple again.
            </p>
            <Link
                to="/booking"
                className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold button-primary text-base sm:text-lg min-h-[48px] touch-manipulation"
            >
                Book Now
            </Link>
        </section>
    );
}