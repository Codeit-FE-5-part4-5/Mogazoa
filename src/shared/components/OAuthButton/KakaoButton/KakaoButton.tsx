import Image from 'next/image';
import useEnvironmentVariable from '@/shared/hooks/useEnvironmentVariable';

const KakaoButton = () => {
  const [redirectUri, clientId] = useEnvironmentVariable('kakao');
  console.log(redirectUri);
  console.log(clientId);
  return (
    <a
      href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`}
      className="flex size-[56px] cursor-pointer items-center justify-center rounded-[50%] border border-var-black3"
    >
      <Image src="/kakao.svg" alt="카카오 로그인" width={28} height={28} />
    </a>
  );
};

export default KakaoButton;
