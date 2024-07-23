const getIdToken = (params: { code: string; nickname?: string }) => {
  const uri = `https://oauth2.googleapis.com/token?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET}&code=${params.code}&grant_type=authorization_code&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}`;
  window.location.href = uri;
};
