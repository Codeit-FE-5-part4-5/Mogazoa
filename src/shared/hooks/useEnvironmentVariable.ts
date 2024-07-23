type useEnvironmentVariableProps = 'google' | 'kakao';

const useEnvironmentVariable = (
  provider: useEnvironmentVariableProps,
): string[] => {
  const redirectUri =
    provider === 'google'
      ? process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI
      : process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  const clientId = encodeURIComponent(
    provider === 'google'
      ? process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
      : process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
  );

  const clientSecret = encodeURIComponent(
    provider === 'google'
      ? process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
      : process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET,
  );

  return [redirectUri, clientId, clientSecret];
};

export default useEnvironmentVariable;
