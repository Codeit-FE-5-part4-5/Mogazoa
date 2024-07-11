import Image from 'next/image';

interface IconProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

const Icon: React.FC<IconProps> = ({ src, alt = '', width, height }) => {
  return (
    <>
      <Image src={src} alt={alt} width={width} height={height} />
    </>
  );
};

export default Icon;
