import Button from '@/shared/components/Button/Button';
import CompareDropDown from '@/shared/components/DropDown/CompareDropDown';
import { Table } from '@/shared/components/Table/Table';
import { useState } from 'react';

const Compare = () => {
  const itemList = ['아이폰 4', '아이폰 5', '아이폰 6', '아이폰 7'];
  const [value, setValue] = useState('');

  return (
    <div className="items-centers flex flex-col justify-center px-5 md:items-center">
      <div className="text-var-white grid w-auto items-end gap-[20px] md:grid-cols-3 xl:w-[940px]">
        <div>
          <h3 className="mb-[10px] text-[14px] xl:text-[16px]">상품 1</h3>
          <CompareDropDown itemList={itemList} onClick={setValue} />
        </div>
        <div>
          <h3 className="mb-[10px] text-[14px] xl:text-[16px]">상품 2</h3>
          <CompareDropDown itemList={itemList} onClick={setValue} />
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
  );
};

export default Compare;
