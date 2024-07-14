import React, { useEffect } from 'react';
import CompareChip from '../Chip/CompareChip';
import { CompareDropDownProps } from '@/shared/types/product/product';
import { BEDGE_COLORS } from '@/shared/constants/products';
import useCompareDropdown from '@/shared/hooks/useCompareDropdown';
import CompareDropDownItemList from './CompareDropDownItemList';

const CompareDropDownInput = ({
  itemList,
  Bedge,
  setBedge,
  value,
  onChange,
  fetchNextPage,
  isFetching,
  hasNextPage,
  setValue,
  setProductId,
}: CompareDropDownProps) => {
  const onClickDelete = () => {
    setBedge('');
    setValue('');
    setProductId(null);
  };

  // 다중 배열 맵핑을 위해 flatMap 사용
  const flatItemList = itemList?.flatMap((page) => page.list) || [];
  const isItem = value.length > 1 && flatItemList.length > 0;

  //드롭다운
  const { isOpen, setIsOpen, dropDownElementRef } = useCompareDropdown();

  useEffect(() => {
    if (isItem) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [value, isFetching]);
  //

  const handleClickEvent = (name: string, id: number) => {
    setBedge(name);
    setValue('');
    setProductId(id);
  };

  return (
    <div
      ref={dropDownElementRef}
      className="relative w-full cursor-pointer items-center rounded-[6px] border border-var-black3 bg-var-black2 text-[14px] focus:border-gradient-custom"
    >
      <div className="relative flex size-full items-center justify-between">
        <label htmlFor="text" className="w-full">
          {Bedge && (
            <div className="min-h-[55px] px-[15px] py-[10px] xl:min-h-[68px] xl:px-[20px] xl:py-[15px]">
              <CompareChip
                name={Bedge}
                orderPosition={BEDGE_COLORS.green}
                onClick={onClickDelete}
              />
            </div>
          )}
          {!Bedge && (
            <input
              id="text"
              name="text"
              value={value}
              className="min-h-[57px] w-full cursor-pointer bg-var-black2 px-[15px] py-[10px] text-var-white outline-none xl:min-h-[68px] xl:px-[20px] xl:py-[15px]"
              onChange={onChange}
            />
          )}
        </label>
      </div>
      {isOpen && (
        <CompareDropDownItemList
          itemList={flatItemList}
          onClick={handleClickEvent}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetching={isFetching}
        />
      )}
    </div>
  );
};

export default CompareDropDownInput;
