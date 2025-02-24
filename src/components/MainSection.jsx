import { Route, Routes } from "react-router";
import CategoriesPage from "./pages/CategoriesPage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";

function MainSection() {
  return (
    <main className="bg-slate-300 w-full">
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/products" element={<ProductPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
      </Routes>
    </main>
  );
}
export default MainSection;
