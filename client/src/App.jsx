import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Accounts from "./pages/Accounts";
import Promo from "./pages/Promo";
import Contact from "./pages/Contact";
import AdminAccount from "./pages/AdminAccount";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="promo" element={<Promo />} />
          <Route path="contact" element={<Contact />} />
          <Route path="account" element={<Accounts />} />
          <Route path="account-admin" element={<AdminAccount />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
