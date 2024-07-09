export const Table = () => {
  return (
    <div className="rounded-[12px] border border-solid border-[#353542] bg-[rgb(37,37,48)] text-center text-[12px] md:text-[14px] xl:text-[16px]">
      <ul className="text-var-gray2 grid grid-cols-4 border-b border-solid border-b-[#353542] py-[15px] md:py-[20px]">
        <li>기준</li>
        <li>상품 1</li>
        <li>상품 2</li>
        <li>결과</li>
      </ul>
      <ul className="grid grid-cols-4 py-[15px] md:py-[30px]">
        <li className="text-var-gray2">별점</li>
        <li>4.8</li>
        <li>4.9</li>
        <li className="text-var-pink">상품 2 승리</li>
      </ul>
      <ul className="grid grid-cols-4 py-[15px] md:py-[30px]">
        <li className="text-var-gray2">리뷰 개수</li>
        <li>100</li>
        <li>300</li>
        <li className="text-var-pink">상품 2 승리</li>
      </ul>
      <ul className="grid grid-cols-4 py-[15px] md:py-[30px]">
        <li className="text-var-gray2">찜 개수</li>
        <li>10,000</li>
        <li>100</li>
        <li className="text-var-green">상품 1 승리</li>
      </ul>
    </div>
  );
};
