
import React, { ReactNode } from 'react';

export interface ImageUploadProps {
  onUpload: (url: string) => void;
  children?: ReactNode;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload, children }) => {
  // For now, this is a mock implementation
  const handleClick = () => {
    // Simulate upload with a placeholder image
    onUpload('https://source.unsplash.com/random/800x600');
  };

  return (
    <div 
      onClick={handleClick}
      className="cursor-pointer"
    >
      {children}
    </div>
  );
};

export default ImageUpload;
