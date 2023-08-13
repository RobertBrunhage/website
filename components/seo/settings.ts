// Create new environment variable for production, preview and use localhost if none of these are set

export const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return `${process.env.NEXT_PUBLIC_VERCEL_URL}`
  }
  return process.env.NEXT_PUBLIC_URL;
};
