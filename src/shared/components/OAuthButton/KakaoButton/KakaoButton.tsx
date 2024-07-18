import Image from 'next/image';

const KakaoButton = () => {
  const clientKey = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  return (
    <a
      href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientKey}&redirect_uri=${redirectUri}`}
      className="flex size-[56px] cursor-pointer items-center justify-center rounded-[50%] border border-var-black3"
    >
      <Image src="/kakao.svg" alt="카카오 로그인" width={28} height={28} />
    </a>
  );
};

export default KakaoButton;
