export default function Services() {
    const services = [
        { 
            title: "Device Setup", 
            description: "Help setting up computers, tablets, phones, or smart devices.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
        { 
            title: "Printer Help", 
            description: "Set up printers, troubleshoot printing issues, and connect wireless printers.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
            )
        },
        { 
            title: "Software Assistance", 
            description: "Support installing or learning new apps and software.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            )
        },
        { 
            title: "Wi-Fi Setup & Help", 
            description: "Set up Wi-Fi routers, troubleshoot internet connections, and improve network performance.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
            )
        }
    ];

    return (
        <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-4">Our Services</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Professional tech support services tailored to your needs. All services at $25/hour with transparent pricing.
                </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
                {services.map((service) => (
                    <div key={service.title} className="bg-white shadow-md rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all hover:border-blue-200">
                        <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                            {service.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                        <p className="text-gray-600 mb-4 text-base leading-relaxed">{service.description}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <p className="text-blue-700 font-semibold text-lg">$25/hr</p>
                            <span className="text-sm text-gray-500">Transparent pricing</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}