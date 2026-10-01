import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import Home from "../pages/Home";
import GenerateLetter from "../pages/GenerateLetters";
import AllLetters from "../pages/AllLetters";
import LetterDetails from "../pages/LetterDetails";
import NotFound from "../pages/NotFound";
import FloatingHearts from "../components/hero/FloatingHearts";

function AppRoutes() {
  return (
    <BrowserRouter>
      <FloatingHearts />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<GenerateLetter />} />
        <Route path="/letters" element={<AllLetters />} />
        <Route path="/letters/:id" element={<LetterDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default AppRoutes;