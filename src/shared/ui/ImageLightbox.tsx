"use client";
import { useEffect } from "react";
import Image from "next/image";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { createPortal } from "react-dom";

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function ImageLightbox({ images, currentIndex, isOpen, onClose, onNavigate }: ImageLightboxProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex + 1) % images.length);
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 z-[110] rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
        aria-label="Close lightbox"
      >
        <FaTimes className="text-xl" />
      </button>

      <button 
        onClick={handlePrev}
        className="absolute left-6 z-[110] rounded-full bg-white/10 p-4 text-white transition hover:bg-white/20 block"
        aria-label="Previous image"
      >
        <FaChevronLeft className="text-2xl" />
      </button>

      <div className="relative aspect-square w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <Image 
          src={images[currentIndex]} 
          alt={`Gallery image ${currentIndex + 1}`}
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
      </div>

      <button 
        onClick={handleNext}
        className="absolute right-6 z-[110] rounded-full bg-white/10 p-4 text-white transition hover:bg-white/20 block"
        aria-label="Next image"
      >
        <FaChevronRight className="text-2xl" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
        {currentIndex + 1} / {images.length}
      </div>
    </div>,
    document.body
  );
}
