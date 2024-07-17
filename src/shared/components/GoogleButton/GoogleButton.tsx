import Image from 'next/image';

const GoogleButton = () => {
  const clientKey = `client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`;
  const redirectUri = `&redirect_uri=${process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_DEVELOPMENT_URL : ''}`;

  return (
    <a
      href={`https://accounts.google.com/o/oauth2/v2/auth?${clientKey}${redirectUri}&response_type=code&scope=email profile`}
      className="flex size-[56px] cursor-pointer items-center justify-center rounded-[50%] border border-var-black3"
    >
      <Image src="/google.svg" alt="구글 로그인" width={28} height={28} />
    </a>
  );
};

export default GoogleButton;
