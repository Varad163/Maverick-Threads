import { Product } from "@/sanity.types";
import Link from "next/link";
import Image from "next/image";


import { imageUrl } from "@/lib/imageUrl";

function ProductThumb({ product }: { product: Product }) {
  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <Link
      href={`/product/${product.slug?.current}`}
      className={`group flex flex-col bg-white rounded-lg border border-gray-200 
                 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden 
                 ${isOutOfStock ? "opacity-50" : ""}`}
    >

      <div className="relative aspect-square w-full h-full overflow-hidden">
        {product.image && (
          <Image
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            src={imageUrl(product.image).url()}
            alt={product.name || "Product image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>             <div className="p-4">
        {isOutOfStock && <p className="text-red-500">Out of stock</p>}
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h2>
        <p className="mt-3 text-sm text-gray-600 line-clamp-2">
          {product.description
            ? product.description
              .map((block) =>
                block._type === "block"
                  ? block.children?.map((child) => child.text).join("")
                  : ""
              )
              .join(" ") || "No description available"
            : "No description available"}
        </p>
        <p className="mt-2 text-lg font-bold text-gray-900">
          £{product.price?.toFixed(2)}
        </p>
      </div>
     
      
    </Link>
  );
}

export default ProductThumb;
