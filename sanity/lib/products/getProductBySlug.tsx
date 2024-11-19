import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { Product } from "@/sanity.types"; // Import the correct Product type

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
    const query = `*[_type == "product" && slug.current == $slug] [0]`; // Sanity query
    const response = await sanityFetch({
        query,
        params: { slug },
    });

    // Ensure that we return the correct structure of the Product
    if (!response?.data) {
        return null; // Return null if no product data found
    }

    const product = response.data;

    // Return the data in the shape of the Product type
    return {
        _id: product._id,
        _type: product._type,
        _createdAt: product._createdAt,
        _updatedAt: product._updatedAt,
        _rev: product._rev,
        name: product.name,
        image: product.image,
        stock: product.stock,
        price: product.price,
        description: product.description,
    };
};
