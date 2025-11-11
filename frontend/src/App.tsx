import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

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