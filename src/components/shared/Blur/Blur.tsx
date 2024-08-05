import { cn } from '@/lib/cn';

interface BlurProps {
  image: string;
  size?: number;
  className?: string;
}

const Blur = ({ image, className, size = 400 }: BlurProps) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image}
      alt="blur이미지"
      className={cn('absolute opacity-15 blur-3xl', className)}
      style={{
        width: size,
        height: size,
        top: `-${size / 3}px`,
        objectFit: 'cover',
      }}
    />
  );
};

export default Blur;
