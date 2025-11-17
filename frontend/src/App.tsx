import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminBookings from "./pages/admin/Bookings";
import AdminAvailability from "./pages/admin/Availability";
import AdminCustomers from "./pages/admin/Customers";
import AdminCalendar from "./pages/admin/Calendar";

function App() {
	return (
		<Router>
			<div className="min-h-screen flex flex-col bg-[#F3F4F6]">
				{/* Header / Navigation */}
				<Navigation />

				{/* Page Content */}
				<main className="flex-grow">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/services" element={<Services />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/booking" element={<Booking />} />
						
						{/* Admin Routes */}
						<Route path="/admin/login" element={<AdminLogin />} />
						<Route
							path="/admin"
							element={
								<ProtectedRoute>
									<AdminLayout />
								</ProtectedRoute>
							}
						>
							<Route path="dashboard" element={<AdminDashboard />} />
							<Route path="bookings" element={<AdminBookings />} />
							<Route path="availability" element={<AdminAvailability />} />
							<Route path="customers" element={<AdminCustomers />} />
							<Route path="calendar" element={<AdminCalendar />} />
						</Route>
					</Routes>
				</main>

				{/* Footer */}
				<footer className="bg-gray-100 text-center p-4 text-sm text-gray-600">
					© {new Date().getFullYear()} BlueWave Tech Help
				</footer>
			</div>
		</Router>
	);
}

export default App;