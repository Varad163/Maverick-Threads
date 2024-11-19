import { sanityFetch } from "../live";

export const getAllProducts = async () => {
    const ALL_PRODUCTS_QUERY = `
    *[_type == "product"] | order(name asc)
  `;

    try {
        const products = await sanityFetch({
            query: ALL_PRODUCTS_QUERY,
        });

        // Assuming `sanityFetch` returns an array directly
        return products || [];
    } catch (error) {
        console.error("Error fetching all products:", error);
        return [];
    }
};
