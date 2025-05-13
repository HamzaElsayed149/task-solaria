import React, { useState } from 'react';
import './FilterControls.css';

interface FilterControlsProps {
  filters: {
    status: string;
    price: string;
  };
  onFilterChange: (type: 'status' | 'price', value: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ filters, onFilterChange }) => {
  const [priceValue, setPriceValue] = useState(50000);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPriceValue(value);
    onFilterChange('price', `0-${value}`);
  };

  return (
    <div className="filters-panel">
      <div className="filter-header">
        <div className="filter-row">
          <span className="filter-label">Type</span>
          <span className="filter-label">Availability</span>
        </div>
        <div className="filter-options">
          <select
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="status-select"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
            <option value="sold">Sold</option>
          </select>
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-row">
          <span className="filter-label">Price</span>
          <div className="range-slider">
            <input 
              type="range" 
              min="0" 
              max="100000" 
              step="1000"
              value={priceValue}
              onChange={handlePriceChange}
            />
            <span className="range-value">
              ${0} - ${priceValue.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;