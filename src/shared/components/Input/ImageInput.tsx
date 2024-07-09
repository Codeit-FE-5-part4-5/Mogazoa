import React, { useState } from 'react';
import Image from 'next/image';

const ImageInput: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          setImage(e.target.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  return (
    <div className="relative h-full w-full rounded-lg border-[2px] border-var-black3 p-2 hover:border-var-indigo">
      {!image ? (
        <div className="flex h-full w-full items-center justify-center">
          <label className="flex cursor-pointer items-center">
            <Image src="/images/file.png" width={50} height={50} alt="file" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
      ) : (
        <div className="relative h-full w-full">
          <div className="absolute right-0 top-0 m-2">
            <button
              onClick={handleRemoveImage}
              className="flex items-center justify-center rounded-full bg-black bg-opacity-50 p-1 text-white"
            >
              <img src="/images/close.png" alt="Close" className="h-8 w-8" />
            </button>
          </div>
          <img
            src={image}
            alt="Preview"
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default ImageInput;
