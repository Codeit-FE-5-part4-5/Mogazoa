import { setCookie } from '@/shared/utils/cookie';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const googleFlowAuthRequest = (params: {
  clientId: string;
  clientSecret: string;
  token: string;
  redirectUri: string;
}) => {
  return axios.post(
    `https://oauth2.googleapis.com/token?client_id=${params.clientId}&client_secret=${params.clientSecret}&code=${params.token}&grant_type=authorization_code&redirect_uri=${params.redirectUri}`,
  );
};

const useGoogleFlow = () => {
  return useMutation({
    mutationFn: googleFlowAuthRequest,
    onSuccess: (data) => {
      setCookie('idToken', data.data.id_token);
    },
  });
};

export default useGoogleFlow;
