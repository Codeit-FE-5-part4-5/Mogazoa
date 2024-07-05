import Button from '@/shared/components/Button/Button';
import DropDown from '@/shared/components/DropDown/DropDown';
import Floating from '@/shared/components/Floating/Floating';

export default function Home() {
  const list = ['카테고리1', '카테고리2', '카테고리3', '카테고리4'];
  return (
    <div className="flex h-dvh items-center justify-center bg-[#1C1C22]">
      <div className="flex w-[600px] flex-col gap-[10px]">
        <Floating onClick={() => console.log('...')} />
        <Button text="가입하기" size="l" variant="primary" />
        <Button text="가입하기" size="m" variant="primary" />
        <Button text="가입하기" size="s" variant="primary" />
        <Button text="가입하기" size="l" variant="secondary" />
        <Button text="가입하기" size="m" variant="secondary" />
        <Button text="가입하기" size="s" variant="secondary" />
        <Button text="가입하기" size="l" variant="tertiary" />
        <Button text="가입하기" size="m" variant="tertiary" />
        <Button text="가입하기" size="s" variant="tertiary" />
        <DropDown itemList={list} onClick={() => console.log('...')} />
      </div>
    </div>
  );
}
