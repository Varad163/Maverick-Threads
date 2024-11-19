import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import ProductsView from "@/components/ui/ProductsView";
import BlackFridayBanner from "@/components/BlackfridayBanner";
import CategorySelectorComponent from "@/components/ui/ProductsView";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  return (
    <div >
      <BlackFridayBanner/>
      <div className="flex flex-col items-center justify-top  bg-gray-100"> </div>
      { <ProductsView products={products} categories={categories} /> }

    </div>
  );
}
