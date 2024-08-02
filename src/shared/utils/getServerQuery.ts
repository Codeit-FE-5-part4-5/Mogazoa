import { isServer } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import castArray from './castArray';

const getServerQuery = (context: GetServerSidePropsContext) => {
  if (isServer) {
    const { query } = context;
    const categoryId = Number(query.categoryId) || 0;
    const keyword = castArray(query.search) || '';
    const order = castArray(query.order) || '';

    return { categoryId, keyword, order };
  }
  return {};
};

export default getServerQuery;
