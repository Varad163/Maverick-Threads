import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { notFound } from "next/navigation";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import { PortableText } from "next-sanity";
import { Product } from "@/sanity.types";  // Import the correct type
import { Button } from "@/components/ui/button";
import AddtoBasketButton from "@/components/AddtoBasketButton"; // Ensure this import is correct

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const product: Product | null = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${isOutOfStock ? "opacity-50" : ""}`}
        >
          {product.image ? (
            <Image
              src={imageUrl(product.image).url() ?? "/fallback-image.jpg"}
              alt={product.name ?? "Product image"}
              fill
              className="object-contain transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div>No Image</div>
          )}

          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name || "Untitled"}</h1>
            <div className="text-xl font-semibold mb-4">
              £{product.price ? product.price.toFixed(2) : "Price Unavailable"}
            </div>
            <div className="prose max-w-none mb-6">
              {product.description && Array.isArray(product.description) ? (
                <PortableText value={product.description} />
              ) : (
                <p>No description available</p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <AddtoBasketButton product={product} disabled={isOutOfStock} />
            <Button>Add to Basket</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
