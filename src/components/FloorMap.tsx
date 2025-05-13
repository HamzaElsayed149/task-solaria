import React, { useRef, useEffect } from 'react';

interface FloorMapProps {
  scale: number;
  transformOrigin: string;
  image: string;
  svgContent: string;
  onWheel: (e: WheelEvent) => void;
}

const FloorMap: React.FC<FloorMapProps> = ({
  scale,
  transformOrigin,
  image,
  svgContent,
  onWheel
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', onWheel, { passive: false });
      return () => container.removeEventListener('wheel', onWheel);
    }
  }, [onWheel]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#272727'
      }}
    >
      <div
        style={{
          position: 'relative',
          transform: `scale(${scale})`,
          transformOrigin,
          transition: 'transform 0.2s ease-out, transform-origin 0.2s ease-out'
        }}
      >
        <img
          style={{
            display: 'block',
            maxWidth: '100vw',
            maxHeight: '100vh',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain'
          }}
          src={image}
          alt="Floor Plan"
        />
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      </div>
    </div>
  );
};

export default FloorMap;