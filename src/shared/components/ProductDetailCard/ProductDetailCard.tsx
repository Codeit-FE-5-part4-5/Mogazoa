import { useState } from 'react';
import Button from '../Button/Button';
import Chip from '../Chip/Chip';
import Image from 'next/image';

interface Props {
  name: string;
  reviews: number;
  description: string;
  text: string;
  color: string;
  image: string;
}

const ProductDetailCard = ({
  name,
  reviews,
  description,
  text,
  color,
  image,
}: Props) => {
  const [isSave, setIsSave] = useState(false);

  const onClickSave = () => {
    setIsSave(!isSave);
  };

  return (
    <div className="gap-[20px] text-var-white md:flex">
      <div className="flex items-center justify-center">
        <div className="relative mb-5 h-[249px] w-[289px] md:m-0 md:h-[197px] md:h-full md:w-[280px] xl:w-[355px]">
          <Image
            className="rounded-lg"
            src={image}
            alt="리뷰이미지"
            layout="fill"
          />
        </div>
      </div>
      <div className="w-full">
        <div className="grid grid-cols-2 items-center">
          <div className="md:order-1 md:col-span-2">
            <Chip text={text} color={color} />
          </div>
          <ul className="flex justify-end gap-[10px] md:order-3">
            <li className="flex h-[24px] w-[24px] items-center justify-center rounded-[6px] bg-[#252530] xl:h-[28px] xl:w-[28px]">
              <img
                src="/images/kakaotalk.svg"
                alt="카카오 공유"
                className="h-[14px] xl:h-[18px]"
              />
            </li>
            <li className="flex h-[24px] w-[24px] items-center justify-center rounded-[6px] bg-[#252530] xl:h-[28px] xl:w-[28px]">
              <img
                src="/images/share_300.svg"
                alt="공유하기"
                className="h-[14px] xl:h-[18px]"
              />
            </li>
          </ul>
          <div className="col-span-2 flex items-center justify-between md:order-2 md:col-span-1 md:justify-normal md:gap-[15px]">
            <h3 className="my-[10px] text-[20px] xl:text-[24px]">{name}</h3>
            <button onClick={onClickSave}>
              <img
                src={isSave ? '/images/save_300.svg' : '/images/unsave_300.svg'}
                alt={isSave ? '찜풀기' : '찜하기'}
              />
            </button>
          </div>
        </div>
        <div className="text-[14px] font-light text-var-gray1 xl:text-[16px]">
          조회 {reviews}
        </div>
        <div className="mt-[20px] text-[14px] leading-[20px] xl:text-[16px] xl:leading-[22px]">
          {description}
        </div>
        <div className="mt-[40px] flex flex-col gap-[15px] md:mt-[60px] md:flex-row xl:gap-[20px]">
          <Button text="리뷰 작성하기" />
          <Button text="비교하기" variant="secondary" />
          <Button text="편집하기" variant="tertiary" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailCard;
