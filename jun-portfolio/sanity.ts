import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,  // Accessing the project ID from environment variables
  dataset: 'production',  // Your dataset, usually 'production'
  apiVersion: '2024-10-14', // Using the latest API version
  useCdn: false,  // Ensure fresh data when writing to the Sanity dataset
  token: process.env.SANITY_API_TOKEN,  // Accessing the token from the environment variable
});
