import "server-only";
import { defineLive } from "next-sanity";
import { createClient } from "next-sanity"; // Import Sanity client
import { Client } from "@clerk/nextjs/server";


const token = process.env.SANITY_API_TOKEN;
if (!token) {
  throw new Error("Missing SANITY_API_READ_TOKEN");
}

// Define the Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-11-07", // Set to your API version or "v1"
  useCdn: false,
  token,
});

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
  fetchOptions: {
    revalidate: 0,
  },
});
