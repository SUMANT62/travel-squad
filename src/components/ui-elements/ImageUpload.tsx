
import React, { useState, useRef, ReactNode } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ImageUploadProps {
  onUpload: (url: string) => void;
  children?: ReactNode;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload, children }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Prepare for upload
    setIsUploading(true);

    // In a real implementation, we would upload to our Node.js backend
    // For now, we'll simulate the upload with a timeout
    try {
      // Simulating upload - will be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // We'd get the URL back from the server in reality
      // For now, just use the data URL as preview
      onUpload(reader.result as string);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full">
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileChange}
      />
      
      {preview ? (
        <div className="relative aspect-square rounded-md overflow-hidden border border-border">
          <img src={preview} alt="Upload preview" className="w-full h-full object-cover" />
          <button 
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-background/80 p-1 rounded-full hover:bg-background"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <div 
          onClick={handleClick}
          className="aspect-square rounded-md border-2 border-dashed border-border hover:border-primary cursor-pointer flex flex-col items-center justify-center p-4 transition-colors"
        >
          {children || (
            <>
              <Upload size={24} className="mb-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Upload image</span>
            </>
          )}
        </div>
      )}
      
      {isUploading && (
        <div className="mt-2 text-sm text-muted-foreground">
          Uploading...
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
