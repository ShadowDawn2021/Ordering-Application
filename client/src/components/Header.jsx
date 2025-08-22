import { useState, useContext, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin, cart } =
    useContext(AppContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownTimeout = useRef(null);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = async () => {
    try {
      await axios.post(
        backendUrl + "/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setUserData(null);
      setIsLoggedin(false);
      document.cookie = "token=; Max-Age=0";
      navigate("/");
    } catch (error) {
      toast.error("Logout failed" + error.message);
    }
  };

  const openDropdown = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };

  const closeDropdown = () => {
    dropdownTimeout.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 200);
  };

  return (
    <header className="bg-sushi-rice shadow-md font-sawarabi">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            src="/logo.jpg"
            alt="Logo"
            className="w-12 h-12 object-contain rounded-full cursor-pointer"
            onClick={() => navigate("/")}
          />
          <h1
            className="text-2xl font-bold text-sushi-soy tracking-wide cursor-pointer"
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
        <div className="hidden md:flex items-center space-x-3 relative">
          {userData?.firstName ? (
            <div
              className="relative"
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
            >
              <button className="bg-sushi-orange text-white text-base px-4 py-2 rounded-full font-medium hover:bg-sushi-pink transition">
                {userData.firstName}
              </button>

              {dropdownOpen && (
                <div
                  className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md w-40 py-2 z-50"
                  onMouseEnter={openDropdown}
                  onMouseLeave={closeDropdown}
                >
                  <Link
                    to={userData.role == "admin" ? "/adminAccount" : "/account"}
                    className="block px-4 py-2 text-sushi-soy hover:bg-sushi-orange hover:text-white transition"
                  >
                    Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sushi-soy hover:bg-sushi-orange hover:text-white transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-sushi-orange text-white text-base px-4 py-2 rounded-full hover:bg-sushi-pink transition font-medium"
            >
              Login
            </Link>
          )}
          <Link
            to="/cart"
            className="bg-sushi-orange text-white text-base px-4 py-2 rounded-full hover:bg-sushi-pink transition font-medium"
          >
            Cart ({cartCount})
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
            {userData?.firstName ? (
              <>
                <Link
                  to="/account"
                  className="block w-full text-center bg-sushi-orange text-white px-4 py-2 rounded-full hover:bg-sushi-pink transition font-medium"
                >
                  {userData.firstName}'s Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-center bg-sushi-orange text-white px-4 py-2 rounded-full hover:bg-sushi-pink transition font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block w-full text-center bg-sushi-orange text-white px-4 py-2 rounded-full hover:bg-sushi-pink transition font-medium"
              >
                Login
              </Link>
            )}
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
