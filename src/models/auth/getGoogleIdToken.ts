import axios from 'axios';

const getGoogleIdToken = async (code: string) => {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    grant_type: 'authorization_code',
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
    code,
  });
  const result = await axios.post(
    `https://oauth2.googleapis.com/token?${params.toString()}`,
  );
  return result;
};

export default getGoogleIdToken;
