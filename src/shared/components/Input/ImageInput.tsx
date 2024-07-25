import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import apiInstance from '@/shared/utils/axios';

type ImageInputProps = {
  onChange: (image: string | null) => void;
  initialImageUrl?: string | null;
};

const ImageInput: React.FC<ImageInputProps> = ({
  onChange,
  initialImageUrl,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(
    initialImageUrl || null,
  );

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    setImageUrl(initialImageUrl || null);
  }, [initialImageUrl]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        if (typeof event.target?.result === 'string') {
          setImageUrl(event.target.result);
          onChange(null);
        }
      };
      reader.readAsDataURL(e.target.files[0]);

      const formData = new FormData();
      formData.append('image', e.target.files[0]);

      try {
        const response = await apiInstance.post('images/upload', formData);

        if (response.status === 201) {
          setImageUrl(response.data.url);
          onChange(response.data.url);
        } else {
          throw new Error('Image upload failed');
        }
      } catch (error) {
        setErrorMessage('이미지 업로드에 실패했습니다.');
      }
    }
  };

  const handleRemoveImage = () => {
    setImageUrl(null);
    onChange(null);
  };

  return (
    <div className="relative h-full w-full rounded-lg border-[2px] border-var-black3 p-2 hover:border-var-indigo">
      {!imageUrl ? (
        <div className="flex h-full w-full items-center justify-center">
          <label
            htmlFor="imageInput"
            className="flex cursor-pointer items-center"
          >
            <Image src="/images/file.png" width={50} height={50} alt="file" />
            <input
              id="imageInput"
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
              type="button"
              onClick={handleRemoveImage}
              className="flex items-center justify-center rounded-full bg-black bg-opacity-50 p-1 text-white"
            >
              <Image
                src="/images/close.png"
                alt="Close"
                className="h-8 w-8"
                width={32}
                height={32}
              />
            </button>
          </div>
          <Image
            src={imageUrl}
            alt="Preview"
            className="h-full w-full rounded-lg object-cover"
            width={100000}
            height={100000}
          />
        </div>
      )}
      {errorMessage && <div className="mt-2 text-red-500">{errorMessage}</div>}
    </div>
  );
};

export default ImageInput;
