// src/lib/appwrite.js

import { Client, Account, Databases, Storage } from 'appwrite';

// 1. Initialize the Appwrite Client
const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_URL) // Your Appwrite API Endpoint
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Your Appwrite Project ID

// 2. Export instances of Appwrite services
// This makes them available for import in any other file
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// You can also export the client itself if needed
export default client;