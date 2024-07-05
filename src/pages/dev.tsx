import Button from '@/shared/components/Button/Button';
import DropDown from '@/shared/components/DropDown/DropDown';
import Floating from '@/shared/components/Floating/Floating';

export default function Dev() {
  const list = ['카테고리1', '카테고리2', '카테고리3', '카테고리4'];
  const orderList = ['최신순', '가격순', '인기순'];
  return (
    <div className="flex h-dvh items-center justify-center bg-[#1C1C22]">
      <div className="flex w-[600px] flex-col gap-[10px]">
        <Floating onClick={() => console.log('...')} />
        <Button text="가입하기" variant="primary" />
        <Button text="가입하기" variant="secondary" />
        <Button text="가입하기" variant="tertiary" />
        <DropDown itemList={list} onClick={() => console.log('...')} />
        <DropDown
          itemList={orderList}
          onClick={() => console.log('...')}
          isOrder
        />
      </div>
    </div>
  );
}