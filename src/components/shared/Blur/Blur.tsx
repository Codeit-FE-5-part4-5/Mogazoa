import { cn } from '@/lib/cn';

interface BlurProps {
  image: string;
  size?: number;
  className?: string;
}

const Blur = ({ image, className, size = 400 }: BlurProps) => {
  return (
    <div
      className="animate-pulseSlowly absolute"
      style={{
        top: 0,
        pointerEvents: 'none',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt="blur이미지"
        className={cn('opacity-20 blur-[80px]', className)}
        style={{
          width: size,
          height: size,
          objectFit: 'cover',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default Blur;
