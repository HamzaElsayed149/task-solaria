import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import UnitTooltip from './UnitTooltip';
import './Tooltip.css';

interface TooltipProps {
  svgContent: string;
  data: any[];
}

const Tooltip: React.FC<TooltipProps> = ({ svgContent, data }) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const polygons = document.querySelectorAll('polygon');
    const tooltip = tooltipRef.current;

    if (!tooltip) return;

    const handleMouseOver = (e: MouseEvent) => {
      const polygon = e.target as SVGPolygonElement;
      const code = polygon.getAttribute('data-code');
      const polygonData = data.find(item => item.code.toString() === code);

      if (!polygonData) return;

      ReactDOM.render(
        <UnitTooltip
          unit={{
            code: code || '',
            type: 'Commercial',
            area: 53,
            price: polygonData.price,
            status: polygonData.status
          }}
          onCallback={() => console.log('Callback clicked for unit:', code)}
        />,
        tooltip
      );

      tooltip.style.display = 'block';
      tooltip.style.left = `${e.pageX + 10}px`;
      tooltip.style.top = `${e.pageY + 10}px`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      tooltip.style.left = `${e.pageX + 10}px`;
      tooltip.style.top = `${e.pageY + 10}px`;
    };

    const handleMouseOut = () => {
      tooltip.style.display = 'none';
    };

    polygons.forEach(polygon => {
      polygon.addEventListener('mouseover', handleMouseOver);
      polygon.addEventListener('mousemove', handleMouseMove);
      polygon.addEventListener('mouseout', handleMouseOut);
    });

    return () => {
      polygons.forEach(polygon => {
        polygon.removeEventListener('mouseover', handleMouseOver);
        polygon.removeEventListener('mousemove', handleMouseMove);
        polygon.removeEventListener('mouseout', handleMouseOut);
      });
    };
  }, [svgContent, data]);

  return <div ref={tooltipRef} className="tooltip" />;
};

export default Tooltip;