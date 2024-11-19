import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";
import ProductGrid from "@/components/ProductGrid";

interface SearchPageProps {
    searchParams: {
        query: string;
    };
}
const SearchPage = async ({ searchParams }: SearchPageProps) => {
    // Await searchParams to ensure the query is available
    const { query } = await searchParams;

    // Fetch products based on the search query
    const products = await searchProductsByName(query);

    console.log("Fetched Products:", products); // Log the fetched products to verify the data

    if (!products || products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                    <h1 className="text-xl font-semibold text-gray-800 mb-4">
                        No Products found for: {query}
                    </h1>
                    <p className="text-gray-600 text-center">
                        Try searching with different keywords
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Search results for {query}
                </h1>
                <ProductGrid products={products} />
            </div>
        </div>
    );
};

export default SearchPage;
