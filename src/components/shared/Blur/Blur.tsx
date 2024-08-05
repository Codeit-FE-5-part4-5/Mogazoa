import { cn } from '@/lib/cn';

interface BlurProps {
  image: string;
  size?: number;
  className?: string;
}

const Blur = ({ image, className, size = 800 }: BlurProps) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image}
      alt="blur이미지"
      className={cn('absolute opacity-15 blur-[160px]', className)}
      style={{
        width: size,
        height: size,
        top: `-${size / 4}`,
        objectFit: 'cover',
        pointerEvents: 'none',
      }}
    />
  );
};

export default Blur;
