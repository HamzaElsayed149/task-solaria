import React from 'react';
import './UnitTooltip.css';

interface UnitTooltipProps {
  unit: {
    code: string;
    type: string;
    area: number;
    price: number;
    status: string;
  };
  onCallback?: () => void;
}

const UnitTooltip: React.FC<UnitTooltipProps> = ({ unit, onCallback }) => {
  return (
    <div className="unit-tooltip">
      <div className="unit-header">
        <span className="unit-code">{unit.code}</span>
        <span className={`unit-status ${unit.status.toLowerCase()}`}>{unit.status}</span>
      </div>
      
      <div className="unit-info">
        <div className="info-row">
          <span className="info-label">Unit Type</span>
          <span className="info-value">{unit.type}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Total Area</span>
          <span className="info-value">{unit.area} M²</span>
        </div>
        <div className="info-row">
          <span className="info-label">Price</span>
          <span className="info-value">{unit.price} EGP</span>
        </div>
      </div>

      <button className="callback-button" onClick={onCallback}>
        Callback
      </button>
    </div>
  );
};

export default UnitTooltip;