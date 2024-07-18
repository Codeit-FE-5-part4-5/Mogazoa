import Image from 'next/image';

const GoogleButton = () => {
  const clientKey = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
  const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!;
  const scope =
    'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';

  return (
    <a
      href={`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientKey}&redirect_uri=${redirectUri}&scope=${scope}`}
      className="flex size-[56px] cursor-pointer items-center justify-center rounded-[50%] border border-var-black3"
    >
      <Image src="/google.svg" alt="구글 로그인" width={28} height={28} />
    </a>
  );
};

export default GoogleButton;
