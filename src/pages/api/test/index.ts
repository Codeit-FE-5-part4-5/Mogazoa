import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query;
  switch (code) {
    case '400': {
      setTimeout(() => {
        res.status(400).send({ code: 400, message: '잘못된 요청입니다.' });
      }, 3000);
      break;
    }
    case '401': {
      setTimeout(() => {
        res.status(401).send({ code: 401, message: '인증 오류 입니다.' });
      }, 3000);
      break;
    }
    case '1': {
      setTimeout(() => {
        res.status(200).send({ title: '안녕하세요', message: '반갑습니다' });
      }, 3000);
      break;
    }
    default:
      break;
  }
};

export default handler;
