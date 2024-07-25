const signUpGoogle = (nickname?: string) => {
  const uri = `https://mogazoa-lac.vercel.app/api/oauth/google?nickname=${nickname}`;
  window.location.href = uri;
};

export default signUpGoogle;
