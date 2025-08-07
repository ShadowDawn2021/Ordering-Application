import { useState, useContext } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

function Header() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContext);

  return (
    <header className="bg-sushi-rice shadow-md font-sawarabi">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-3">
          <img
            src="/logo.jpg"
            alt="Logo"
            className="w-12 h-12 object-contain rounded-full"
            onClick={() => navigate("/")}
          />
          <h1
            className="text-2xl font-bold text-sushi-soy tracking-wide"
            onClick={() => navigate("/")}
          >
            Sushi House
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-base text-sushi-soy font-medium">
          <Link to="/menu" className="hover:text-sushi-orange transition">
            Menu
          </Link>
          <Link to="/promo" className="hover:text-sushi-orange transition">
            Promo
          </Link>
          <Link to="/about" className="hover:text-sushi-orange transition">
            About
          </Link>
          <Link to="/gallery" className="hover:text-sushi-orange transition">
            Gallery
          </Link>
          <Link to="/contact" className="hover:text-sushi-orange transition">
            Contact Us
          </Link>
        </nav>

        {/* Desktop Account Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Link
            to="/login"
            className="bg-sushi-orange text-white text-base px-4 py-2 rounded-full hover:bg-sushi-pink transition font-medium"
          >
            Login
          </Link>
          <Link
            to="/cart"
            className="bg-sushi-orange text-white text-base px-4 py-2 rounded-full hover:bg-sushi-pink transition font-medium"
          >
            Cart (0)
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-sushi-soy"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden bg-sushi-rice px-6 py-4 space-y-4 text-sushi-soy font-medium shadow-inner">
          <Link to="/menu" className="block hover:text-sushi-orange transition">
            Menu
          </Link>

          <Link
            to="/promo"
            className="block hover:text-sushi-orange transition"
          >
            Promos
          </Link>
          <Link
            to="/about"
            className="block hover:text-sushi-orange transition"
          >
            About
          </Link>
          <Link
            to="/gallery"
            className="block hover:text-sushi-orange transition"
          >
            Gallery
          </Link>
          <Link
            to="/contact"
            className="block hover:text-sushi-orange transition"
          >
            Contact
          </Link>

          <div className="pt-2 border-t border-sushi-soy/20 space-y-2">
            <Link
              to="/login"
              className="block w-full text-center bg-sushi-orange text-white px-4 py-2 rounded-full hover:bg-sushi-pink transition font-medium"
            >
              Login
            </Link>
            <Link
              to="/cart"
              className="block w-full text-center bg-sushi-orange text-white px-4 py-2 rounded-full hover:bg-sushi-pink transition font-medium"
            >
              Cart (0)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
