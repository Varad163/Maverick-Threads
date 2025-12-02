import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import ProductsView from "@/components/ui/ProductsView";
import BlackFridayBanner from "@/components/BlackfridayBanner";
import ProductGrid from "@/components/ProductGrid";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  if (!categories) {
    return <div>No categories found</div>;
  }

  if (!products) {
    return <div>No products found</div>;
  }

  return (
    <div >
      <BlackFridayBanner />
      <div className="flex flex-col items-center justify-top  bg-gray-100"> </div>
      {<ProductsView categories={categories} />}
      {<ProductGrid products={products.data} />}
    </div>
  );
}
