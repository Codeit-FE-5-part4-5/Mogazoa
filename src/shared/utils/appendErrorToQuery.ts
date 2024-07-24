import axios from 'axios';

const appendErrorToQuery = (error: Error) => {
  let params;

  if (axios.isAxiosError(error)) {
    params = new URLSearchParams({
      errorCode: encodeURIComponent(error?.response?.status || '500'),
      errorMessage: encodeURIComponent(
        error?.response?.data.message || 'Not Found',
      ),
    });
  }

  return params;
};

export default appendErrorToQuery;
