import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "3ullc1fm", // Your Sanity project ID
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production", // Default to "production" if not set
  apiVersion: "2024-01-01", // Latest API version
  useCdn: process.env.NODE_ENV === "production", // true for production, false for development
});
