// In searchProductsByName.ts

import { client } from "../client";
import { sanityFetch } from "../live"; // adjust path as needed
import { Product } from "@/sanity.types"; // adjust path as needed

export const searchProductsByName = async (query: string) => {
    try {
        console.log("Searching products with query:", query); 
        const products = await client.fetch(
            `*[_type == "product" && name match "${query}*"]`
        ); 

        console.log("Fetched products:", products); 
        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};
