import React, { useState } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import 'tailwindcss/tailwind.css';

const SortBy = ({ onSortChange }) => {
  // Define the sorting options as an array of objects
  const sortOptions = [
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'name_asc', label: 'Name: A to Z' },
    { value: 'name_desc', label: 'Name: Z to A' },
  ];

  // State to track the visibility of the dropdown menu and the selected sorting option
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState(null);

  // Toggle the visibility of the dropdown menu
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  // Handle selection of a sorting option
  const handleSortChange = (option) => {
    setSelectedSort(option.value);
    onSortChange(option.value); // Notify the parent component of the selected option
    setIsDropdownVisible(false); // Hide the dropdown menu after selection
  };

  return (
    <div className="relative inline-block">
      <div className="shopcategory-indexSort flex justify-end">
        <div
            className="group text-white w-fit px-6 py-3 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer"
            onClick={toggleDropdown}
        >
            <span>Sort By</span>
            <MdKeyboardArrowRight
                size={25}
                className={`ml-1 transition-transform duration-300 ${isDropdownVisible ? 'rotate-90' : ''}`}
            />
        </div>
    </div>


      {/* Dropdown menu */}
      {isDropdownVisible && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-20">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              className={`w-full px-4 py-2 text-left hover:bg-gray-200 ${
                selectedSort === option.value ? 'bg-gray-200' : ''
              }`}
              onClick={() => handleSortChange(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortBy;
