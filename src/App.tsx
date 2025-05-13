import { useState, useEffect, useRef } from 'react';
import image from './assets/0-floor.png';
import svgOverlay from './assets/0-floor.svg';
import data from './assets/data.json';
import './styles/Polygon.css';

import FilterControls from './components/FilterControls';
import FloorMap from './components/FloorMap';
import Tooltip from './components/Tooltip';

function App() {
  const [filters, setFilters] = useState({
    status: 'all',
    price: 'all'
  });
  const [scale, setScale] = useState(1);
  const [transformOrigin, setTransformOrigin] = useState('center center');
  const [svgContent, setSvgContent] = useState('');
  const zoomState = useRef({
    lastZoomTime: 0,
    origin: 'center center'
  });

  useEffect(() => {
    fetch(svgOverlay)
      .then(res => res.text())
      .then(setSvgContent);
  }, []);

  useEffect(() => {
    const polygons = document.querySelectorAll('polygon');
    polygons.forEach((polygon) => {
      const code = polygon.getAttribute('data-code');
      const polygonData = data.find(item => item.code.toString() === code);
      if (!polygonData) return;

      let isVisible = true;
      if (filters.status !== 'all' && polygonData.status !== filters.status) {
        isVisible = false;
      }
      if (filters.price !== 'all') {
        const [minPrice, maxPrice] = filters.price.split('-').map(Number);
        if (polygonData.price < minPrice || polygonData.price > maxPrice) {
          isVisible = false;
        }
      }

      polygon.style.opacity = isVisible ? '1' : '0.2';
      polygon.style.pointerEvents = isVisible ? 'auto' : 'none';
    });
  }, [filters, svgContent]);

  const handleFilterChange = (type: 'status' | 'price', value: string) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const now = Date.now();
    const timeSinceLastZoom = now - zoomState.current.lastZoomTime;

    if (timeSinceLastZoom > 300) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      const percentX = (offsetX / rect.width) * 100;
      const percentY = (offsetY / rect.height) * 100;
      const newOrigin = `${percentX}% ${percentY}%`;
      zoomState.current.origin = newOrigin;
      setTransformOrigin(newOrigin);
    }

    zoomState.current.lastZoomTime = now;
    setScale(prev => {
      const newScale = e.deltaY > 0 ? prev * 0.9 : prev * 1.1;
      return Math.max(0.5, Math.min(3, newScale));
    });
  };

  return (
    <>
      <FilterControls filters={filters} onFilterChange={handleFilterChange} />
      <FloorMap
        scale={scale}
        transformOrigin={transformOrigin}
        image={image}
        svgContent={svgContent}
        onWheel={handleWheel}
      />
      <Tooltip svgContent={svgContent} data={data} />
    </>
  );
}

export default App;


const handleMouseOver = (e: MouseEvent) => {
  const polygon = e.target as SVGPolygonElement;
  const code = polygon.getAttribute('data-code');
  const polygonData = data.find(item => item.code.toString() === code);

  if (!polygonData) return;

  const tooltipContent = (
    <UnitTooltip
      unit={{
        code: polygonData.code,
        type: 'Commercial',
        area: 53,
        price: 0,
        status: polygonData.status
      }}
      onCallback={() => {
        console.log('Callback clicked for unit:', polygonData.code);
      }}
    />
  );

  ReactDOM.render(tooltipContent, tooltipRef.current);
  tooltip.style.display = 'block';
  tooltip.style.left = `${e.pageX + 10}px`;
  tooltip.style.top = `${e.pageY + 10}px`;
};
