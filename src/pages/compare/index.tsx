import Button from '@/shared/components/Button/Button';
import CompareDropDownInput from '@/shared/components/DropDown/CompareDropDownInput';
import { Table } from '@/shared/components/Table/Table';
import useGetInfiniteProducts from '@/shared/models/product/useGetInfiniteProducts';
import useGetProducts from '@/shared/models/product/useGetProducts';
import React, { SetStateAction, useState } from 'react';

const Compare = () => {
  const [value1, setValue1] = useState('');
  const [Bedge1, setBedge1] = useState('');
  const [value2, setValue2] = useState('');
  const [Bedge2, setBedge2] = useState('');
  const { data: keywordList1 } = useGetProducts({ keyword: value1 });
  const { data: keywordList2 } = useGetProducts({ keyword: value2 });

  const {
    fetchNextPage: fetchNextPage1,
    hasNextPage: hasNextPage1,
    isFetchingNextPage,
    isFetching: isFetching1,
    data: infiniteData1,
    resetInfiniteData,
  } = useGetInfiniteProducts({ keyword: value1 });

  const onChangeEvent = (
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<SetStateAction<string>>,
  ) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div className="items-centers flex flex-col justify-center px-5 md:items-center">
        <div className="text-var-white grid w-auto items-end gap-[20px] md:grid-cols-3 xl:w-[940px]">
          <div>
            <h3 className="mb-[10px] text-[14px] xl:text-[16px]">상품 1</h3>
            <CompareDropDownInput
              itemList={keywordList1}
              onClick={setValue1}
              Bedge={Bedge1}
              setBedge={setBedge1}
              value={value1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onChangeEvent(e, setValue1)
              }
              infiniteData={infiniteData1}
              fetchNextPage={fetchNextPage1}
              isFetching={isFetching1}
              hasNextPage={hasNextPage1}
            />
          </div>
          <div>
            <h3 className="mb-[10px] text-[14px] xl:text-[16px]">상품 2</h3>
            <CompareDropDownInput
              itemList={keywordList2}
              onClick={setValue2}
              Bedge={Bedge2}
              setBedge={setBedge2}
              value={value2}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onChangeEvent(e, setValue2)
              }
            />
          </div>
          <div>
            <Button variant="primary" text="비교하기" />
          </div>
          <div className="text-var-white mt-[100px] md:col-span-3 md:mt-[140px]">
            <div className="text-center">
              <span className="text-var-white text-[20px] font-semibold leading-[28px] xl:text-[24px] xl:leading-normal">
                <span className="text-var-pink">Air Pods Max</span> 상품이
                <br className="md:inline-block md:px-[2px] md:content-['']" />
                승리하였습니다!
              </span>
              <div className="text-var-gray2 mt-[20px] text-[12px] font-normal xl:text-[16px]">
                3가지 항목 중 2가지 항목에서 우세합니다.
              </div>
            </div>
            <div className="mt-[40px] md:mt-[80px]">
              <Table />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Compare;
