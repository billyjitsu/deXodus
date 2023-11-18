import Image from "next/image";
import { useEffect, useRef } from "react";

export const ContentCover = ({
  id,
  image,
  name = "",
  showName = false,
  isLast,
  newLimit,
  width = "0",
  height = "0",
  sizes = "100vw",
  unoptimized = false,
}) => {
  const cardRef = useRef();

  useEffect(() => {
    if (!cardRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        newLimit();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(cardRef.current);
  }, [isLast, newLimit]);

  return (
    <div
      key={id}
      ref={cardRef}
      className="relative group rounded-t-md bg-zinc-900 overflow-hidden hover:cursor-pointer"
    >
      <Image
        src={image}
        alt={name}
        width={width}
        height={height}
        sizes={sizes}
        className={`w-full h-auto transition duration-200 ease-in transform group-hover:scale-105 `}
        unoptimized={unoptimized}
      />
      {showName && name.length > 0 && (
        <div className="bg-zinc-900 py-1 px-3 bg-opacity-80 group-hover:bg-opacity-90 rounded-br-lg absolute top-0 text-3xl text-white font-semibold">
          <span>{name}</span>
        </div>
      )}
    </div>
  );
};
