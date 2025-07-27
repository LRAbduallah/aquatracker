import React, { useState, useRef } from 'react';

interface FileUploadProps {
  title: string;
  description: string;
  accept?: string;
  onFilesSelected?: (files: FileList) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  title,
  description,
  accept = "*/*",
  onFilesSelected
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && onFilesSelected) {
      onFilesSelected(files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && onFilesSelected) {
      onFilesSelected(files);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className="flex w-full flex-col items-stretch text-white text-center justify-center p-4">
      <div
        className={`flex w-full flex-col items-center px-6 py-14 rounded-lg border-dashed border-2 transition-colors ${
          isDragOver 
            ? 'border-[rgba(26,148,229,1)] bg-[rgba(26,148,229,0.1)]' 
            : 'border-[rgba(61,74,84,1)]'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex w-[281px] max-w-full flex-col items-center">
          <h3 className="min-h-[23px] w-full text-lg font-bold leading-none">
            {title}
          </h3>
          <p className="w-[223px] max-w-full text-sm font-normal mt-2">
            {description}
          </p>
        </div>
        
        <button
          type="button"
          onClick={handleBrowseClick}
          className="bg-[rgba(41,51,56,1)] flex min-w-[84px] min-h-10 w-[116px] max-w-full items-center overflow-hidden text-sm font-bold justify-center mt-6 px-4 rounded-lg hover:bg-[rgba(41,51,56,0.8)] transition-colors"
        >
          Browse Files
        </button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </section>
  );
};
