const accessKakao = (nickname?: string) => {
  const uri = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}${nickname ? `&state=${nickname}` : ''}`;
  window.location.href = uri;
};

export default accessKakao;
