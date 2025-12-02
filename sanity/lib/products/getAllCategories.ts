import { sanityFetch } from "../live";

export const getAllCategories = async () => {
  const ALL_CATEGORIES_QUERY = `
    *[_type == "category"] | order(name asc)
  `;

  try {
    const categories = await sanityFetch({
      query: ALL_CATEGORIES_QUERY,
    });

    return categories;
  } catch (error) {
    console.error("Error fetching all categories:", error);
  }
};
