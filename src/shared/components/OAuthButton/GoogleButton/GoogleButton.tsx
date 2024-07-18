import Image from 'next/image';
import useEnvironmentVariable from '@/shared/hooks/useEnvironmentVariable';

const GoogleButton = () => {
  const [redirectUri, clientId] = useEnvironmentVariable('google');
  const scope =
    'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';

  return (
    <a
      href={`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`}
      className="flex size-[56px] cursor-pointer items-center justify-center rounded-[50%] border border-var-black3"
    >
      <Image src="/google.svg" alt="구글 로그인" width={28} height={28} />
    </a>
  );
};

export default GoogleButton;
