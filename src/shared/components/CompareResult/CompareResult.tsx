import tableDetermineResult from '@/shared/models/product/tableDetermineResult';
import { Product } from '@/shared/types/product/product';

interface Props {
  winnerCount: number[];
  integratedData: {
    product2?: Product | undefined;
    product1?: Product | undefined;
  };
}

const CompareResult = ({ winnerCount, integratedData }: Props) => {
  const product = {
    productName1: integratedData.product1?.name,
    productName2: integratedData.product2?.name,
  };

  return tableDetermineResult(winnerCount, product);
};

export default CompareResult;
