export default function Home() {
    return (
        <section className="flex flex-col items-center justify-center text-center p-10 bg-blue-50">
            <h2 className="text-3xl font-bold text-blue-700 mb-4">
                Your Neighborhood Tech Support
            </h2>
            <p className="text-gray-700 max-w-xl">
                Friendly, affordable, and professional tech help for your home and small business.
                Book a session today and let's make technology simple again.
            </p>
            <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Book Now
            </button>
        </section>
    );
}