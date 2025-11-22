export default function Services() {
    const services = [
        { title: "Device Setup", description: "Help setting up computers, tablets, phones, or smart devices." },
        { title: "Printer Help", description: "Set up printers, troubleshoot printing issues, and connect wireless printers." },
        { title: "Software Assistance", description: "Support installing or learning new apps and software." },
        { title: "Wi-Fi Setup & Help", description: "Set up Wi-Fi routers, troubleshoot internet connections, and improve network performance." }
    ];

    return (
        <section className="p-10 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-blue-700 mb-6">Services</h2>
            <div className="grid gap-6 sm:grid-cols-2">
                {services.map((service) => (
                    <div key={service.title} className="bg-white shadow-md rounded-lg p-6 border">
                        <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                        <p className="text-gray-600 mb-2">{service.description}</p>
                        <p className="text-blue-700 font-semibold">$25/hr</p>
                    </div>
                ))}
            </div>
        </section>
    );
}