// Create new environment variable for production, preview and use localhost if none of these are set

export const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_VERCEL_URL ?? "http://localhost:3000";
};
