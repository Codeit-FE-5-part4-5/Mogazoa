import { Product } from '@/shared/types/product/product';

interface Prop {
  productIdData1: Product;
  productIdData2: Product;
}

const saveUserProduct = ({ productIdData1, productIdData2 }: Prop) => {
  if (productIdData1)
    localStorage.setItem('productIdData1', JSON.stringify(productIdData1));
  if (productIdData2)
    localStorage.setItem('productIdData2', JSON.stringify(productIdData2));
};

export default saveUserProduct;
