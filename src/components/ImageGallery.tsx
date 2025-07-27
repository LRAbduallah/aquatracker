import React from 'react';

interface ImageGalleryProps {
  images: string[];
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <section className="bg-[rgba(18,20,23,1)] flex w-full p-4">
      <div className="bg-[rgba(18,20,23,1)] min-w-60 w-full overflow-hidden flex-1 shrink basis-[0%] rounded-lg">
        <div className="flex w-full items-stretch gap-2 flex-1 flex-wrap h-full">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              className={`object-contain ${
                index === 0 
                  ? 'aspect-[1.49] w-[410px] min-w-60 grow shrink' 
                  : 'aspect-[0.75] w-[182px] shrink grow'
              }`}
              alt={`Gallery image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
