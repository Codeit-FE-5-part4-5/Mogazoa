import Image from 'next/image';

const KakaoButton = () => {
  const clientKey = `&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}`;
  const redirectUri = `&redirect_uri=${process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_DEVELOPMENT_URL : ''}`;

  return (
    <a
      type="button"
      href={`https://kauth.kakao.com/oauth/authorize?response_type=code${clientKey}${redirectUri}`}
      className="flex size-[56px] cursor-pointer items-center justify-center rounded-[50%] border border-var-black3"
    >
      <Image src="/kakao.svg" alt="카카오 로그인" width={28} height={28} />
    </a>
  );
};

export default KakaoButton;
