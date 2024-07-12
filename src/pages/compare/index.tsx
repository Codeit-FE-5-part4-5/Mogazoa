import Button from '@/shared/components/Button/Button';
import CompareDropDownInput from '@/shared/components/DropDown/CompareDropDownInput';
import { Table } from '@/shared/components/Table/Table';
import useGetInfiniteProducts from '@/shared/models/product/useGetInfiniteProducts';
import { Product } from '@/shared/types/product/product';
import React, { SetStateAction, useEffect, useState } from 'react';

const Compare = () => {
  const [value1, setValue1] = useState('');
  const [bedge1, setBedge1] = useState('');
  const [value2, setValue2] = useState('');
  const [bedge2, setBedge2] = useState('');

  const [product1, setProduct1] = useState<Product | null>(null);
  const [product2, setProduct2] = useState<Product | null>(null);

  const {
    fetchNextPage: fetchNextPage1,
    hasNextPage: hasNextPage1,
    isFetchingNextPage: isFetchingNextPage1,
    isFetching: isFetching1,
    data: keywordList1,
  } = useGetInfiniteProducts({ keyword: value1 });

  const {
    fetchNextPage: fetchNextPage2,
    hasNextPage: hasNextPage2,
    isFetchingNextPage: isFetchingNextPage2,
    isFetching: isFetching2,
    data: keywordList2,
  } = useGetInfiniteProducts({ keyword: value2 });

  const onChangeEvent = (
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<SetStateAction<string>>,
  ) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (bedge1) {
      const selectedProducts1 = keywordList1?.pages
        ?.flatMap((page) => page.list)
        .find((item) => item.name === bedge1);
      setProduct1(selectedProducts1 || null);
      console.log(selectedProducts1);
    }
  }, [bedge1, keywordList1]);

  useEffect(() => {
    if (bedge2) {
      const selectedProducts2 = keywordList2?.pages
        ?.flatMap((page) => page.list)
        .find((item) => item.name === bedge2);
      setProduct2(selectedProducts2 || null);
      console.log(selectedProducts2);
    }
  }, [bedge2, keywordList2]);

  return (
    <div className="items-centers flex flex-col justify-center px-5 md:items-center">
      <div className="grid w-auto items-end gap-[20px] text-var-white md:grid-cols-3 xl:w-[940px]">
        <div>
          <h3 className="mb-[10px] text-[14px] xl:text-[16px]">상품 1</h3>
          <CompareDropDownInput
            itemList={keywordList1?.pages || []}
            onClick={setValue1}
            Bedge={bedge1}
            setBedge={setBedge1}
            value={value1}
            setValue={setValue1}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChangeEvent(e, setValue1)
            }
            fetchNextPage={fetchNextPage1}
            isFetching={isFetching1}
            hasNextPage={hasNextPage1}
          />
        </div>
        <div>
          <h3 className="mb-[10px] text-[14px] xl:text-[16px]">상품 2</h3>
          <CompareDropDownInput
            itemList={keywordList2?.pages || []}
            onClick={setValue2}
            Bedge={bedge2}
            setBedge={setBedge2}
            value={value2}
            setValue={setValue2}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChangeEvent(e, setValue2)
            }
            fetchNextPage={fetchNextPage2}
            isFetching={isFetching2}
            hasNextPage={hasNextPage2}
          />
        </div>
        <div>
          <Button variant="primary" text="비교하기" />
        </div>
        <div className="mt-[100px] text-var-white md:col-span-3 md:mt-[140px]">
          <div className="text-center">
            <span className="text-[20px] font-semibold leading-[28px] text-var-white xl:text-[24px] xl:leading-normal">
              <span className="text-var-pink">Air Pods Max</span> 상품이
              <br className="md:inline-block md:px-[2px] md:content-['']" />
              승리하였습니다!
            </span>
            <div className="mt-[20px] text-[12px] font-normal text-var-gray2 xl:text-[16px]">
              3가지 항목 중 2가지 항목에서 우세합니다.
            </div>
          </div>
          <div className="mt-[40px] md:mt-[80px]">
            <Table />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compare;
