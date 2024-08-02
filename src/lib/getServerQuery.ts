import { GetServerSidePropsContext } from 'next';
import castArray from '../utils/castArray';

const getServerQuery = (context: GetServerSidePropsContext) => {
  const { query } = context;
  const categoryId = Number(query.categoryId) || 0;
  const keyword = castArray(query.search) || '';
  const order = castArray(query.order) || '';

  return { categoryId, keyword, order };
};

export default getServerQuery;
