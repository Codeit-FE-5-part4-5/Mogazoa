import Button from '@/shared/components/Button/Button';
import CompareDropDownInput from '@/shared/components/DropDown/CompareDropDownInput';
import useGetInfiniteProducts from '@/shared/models/product/useGetInfiniteProducts';
import useProduct from '@/shared/models/product/useProduct';
import React, { SetStateAction, useEffect, useState } from 'react';
import { Product } from '@/shared/types/product/product';
import onClickCompare from '@/shared/models/product/onClickCompare';
import CompareResult from '@/shared/components/CompareResult/CompareResult';
import CompareTable from '@/shared/components/CompareTable/CompareTable';

const Compare = () => {
  const [value1, setValue1] = useState('');
  const [bedge1, setBedge1] = useState('');
  const [value2, setValue2] = useState('');
  const [bedge2, setBedge2] = useState('');
  const [productId1, setProductId1] = useState<number | null>(null);
  const [productId2, setProductId2] = useState<number | null>(null);

  // 로컬 스토리지
  useEffect(() => {
    const getProductData1 = localStorage.getItem('productIdData1');
    const getProductData2 = localStorage.getItem('productIdData2');
    if (getProductData1) {
      const parseProductData1: Product = JSON.parse(getProductData1);
      setBedge1(parseProductData1.name);
      setProductId1(parseProductData1.id);
    }
    if (getProductData2) {
      const parseProductData2: Product = JSON.parse(getProductData2);
      setBedge2(parseProductData2.name);
      setProductId2(parseProductData2.id);
    }
  }, []);

  // 무한 스크롤 itemList api
  const {
    fetchNextPage: fetchNextPage1,
    hasNextPage: hasNextPage1,
    isFetching: isFetching1,
    data: keywordList1,
  } = useGetInfiniteProducts({ keyword: value1 });

  const {
    fetchNextPage: fetchNextPage2,
    hasNextPage: hasNextPage2,
    isFetching: isFetching2,
    data: keywordList2,
  } = useGetInfiniteProducts({ keyword: value2 });

  const onChangeEvent = (
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<SetStateAction<string>>,
  ) => {
    setValue(e.target.value);
  };

  // 클릭시 아이템 조회 api
  const { data: productIdData1 } = useProduct({ productId: productId1 });
  const { data: productIdData2 } = useProduct({ productId: productId2 });

  // 비교하기 table
  const [isTable, setIsTable] = useState(false);

  const areBothValid = !!(productIdData1 && productIdData2);
  const integratedData = {
    product1: productIdData1,
    product2: productIdData2,
  };
  const [winnerCount, setWinnerCount] = useState([0, 0]);

  return (
    <div className="items-centers flex flex-col justify-center px-5 py-12 md:items-center">
      <div className="grid w-full items-end gap-[20px] text-var-white md:grid-cols-3 xl:w-[940px]">
        <div>
          <h3 className="mb-[10px] text-[14px] xl:text-[16px]">상품 1</h3>
          <CompareDropDownInput
            setIsTable={setIsTable}
            itemList={keywordList1?.pages || []}
            onClick={setValue1}
            Bedge={bedge1}
            setBedge={setBedge1}
            value={value1}
            setValue={setValue1}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChangeEvent(e, setValue1)
            }
            setProductId={setProductId1}
            fetchNextPage={fetchNextPage1}
            isFetching={isFetching1}
            hasNextPage={hasNextPage1}
          />
        </div>
        <div>
          <h3 className="mb-[10px] text-[14px] xl:text-[16px]">상품 2</h3>
          <CompareDropDownInput
            setIsTable={setIsTable}
            itemList={keywordList2?.pages || []}
            onClick={setValue2}
            Bedge={bedge2}
            setBedge={setBedge2}
            value={value2}
            setValue={setValue2}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChangeEvent(e, setValue2)
            }
            setProductId={setProductId2}
            fetchNextPage={fetchNextPage2}
            isFetching={isFetching2}
            hasNextPage={hasNextPage2}
          />
        </div>
        <div>
          <Button
            variant="primary"
            text="비교하기"
            disabled={!areBothValid}
            onClick={() =>
              onClickCompare({
                productIdData1,
                productIdData2,
                setWinnerCount,
                setIsTable,
              })
            }
          />
        </div>
        {isTable && areBothValid && (
          <div className="mt-[100px] text-var-white md:col-span-3 md:mt-[140px]">
            <CompareResult
              winnerCount={winnerCount}
              integratedData={integratedData}
            />
            <div className="mt-[40px] md:mt-[80px]">
              <CompareTable integratedData={integratedData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;
