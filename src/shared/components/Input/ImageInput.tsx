import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import apiInstance from '@/shared/utils/axios';

type ImageInputProps = {
  onChange: (image: string | null) => void;
};

const ImageInput: React.FC<ImageInputProps> = ({ onChange }) => {
  // const [image, setImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (typeof e.target?.result === 'string') {
          setImageUrl(e.target.result);
          onChange(null);
        }
      };
      reader.readAsDataURL(e.target.files[0]);

      const formData = new FormData();
      formData.append('image', e.target.files[0]);

      try {
        const response = await apiInstance.post('images/upload', formData);

        console.log(response.data);

        if (response.status === 201) {
          setImageUrl(response.data.url);
          onChange(response.data.url);
        } else {
          throw new Error('Image upload failed');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleRemoveImage = () => {
    // setImage(null);
    setImageUrl(null);
    onChange(null);
  };

  // useEffect(() => {
  //   onChange(image);
  // }, [image, onChange]);

  return (
    <div className="relative h-full w-full rounded-lg border-[2px] border-var-black3 p-2 hover:border-var-indigo">
      {!imageUrl ? (
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
            src={imageUrl}
            alt="Preview"
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default ImageInput;
