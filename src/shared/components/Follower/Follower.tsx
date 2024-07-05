import React from 'react';

// 기존 ranking을 어떻게 불러올지 모르므로 일단 any로 타입을 지정함.
// 사용할 때 수정필요

const Follower = ({ mockFollower }: any) => {
  const { img, name, alt } = mockFollower;
  return (
    <>
      <div className="flex items-start items-center gap-5">
        <div className="flex h-[36px] w-[36px] overflow-hidden rounded-full bg-blue-50 md:h-[42px] md:w-[42px]">
          <img src={img} alt={alt}></img>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-var-white text-[14px] font-normal md:text-[16px]">
            {name}
          </div>
        </div>
      </div>
    </>
  );
};

export default Follower;
