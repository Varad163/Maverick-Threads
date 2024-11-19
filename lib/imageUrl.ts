import { client } from "@/sanity/lib/client";
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
const builder = imageUrlBuilder(client);

// Function to generate the image URL
export function imageUrl(source: SanityImageSource) {
    return builder.image(source); // Corrected 'Image' to 'image'
}
