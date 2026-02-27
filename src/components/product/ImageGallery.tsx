import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";


const BASE_IMG = "http://localhost:5173/products-img";

export default function ImageGallery({ images, productName, categoryName }: any) {
  const [selected, setSelected] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="bg-stone-100 rounded-xl flex items-center justify-center h-96">
        <PhotoIcon className="h-24 w-24 text-stone-300" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="bg-stone-100 rounded-xl overflow-hidden h-96 flex items-center justify-center">
        <img
          src={`${BASE_IMG}/${categoryName}/${images[selected]}`}
          alt={productName}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img: string, i: number) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                i === selected ? "border-amber-500" : "border-stone-200 hover:border-stone-400"
              }`}
            >
              <img
                src={`${BASE_IMG}/${categoryName}/${img}`}
                alt={`${productName} ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
