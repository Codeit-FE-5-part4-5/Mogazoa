import { Product } from '@/types/product/product';
import CompareTableDetermineResult from '../CompareTableDetermineResult/CompareTableDetermineResult';

interface Props {
  winnerCount: number[];
  integratedData: {
    product2?: Product | undefined;
    product1?: Product | undefined;
  };
}
// test
const CompareResult = ({ winnerCount, integratedData }: Props) => {
  const product = {
    productName1: integratedData.product1?.name,
    productName2: integratedData.product2?.name,
  };

  return CompareTableDetermineResult(winnerCount, product);
};

export default CompareResult;
