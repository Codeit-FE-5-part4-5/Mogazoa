import Image from 'next/image';

interface FloatingProps {
  onClick: () => void;
}

const Floating = ({ onClick }: FloatingProps) => {
  return (
    <button
      className="flex size-[60px] items-center justify-center rounded-[50%] bg-gradient-custom"
      onClick={onClick}
    >
      <Image src="/plus.svg" alt="플러스 버튼" width={40} height={40} />
    </button>
  );
};

export default Floating;
