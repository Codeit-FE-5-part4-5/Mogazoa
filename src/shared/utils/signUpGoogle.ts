const signUpGoogle = (nickname?: string) => {
  const uri = `${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}?nickname=${nickname}`;
  window.location.href = uri;
};

export default signUpGoogle;
