'use client';
import { useState } from 'react';
import ChevronDown from '@/app/components/Icons/ChevronDown'; // Імпортуйте свій SVG компонент
import { useSelector } from 'react-redux';
import { selectColorThemeValue } from '@/redux/colorTheme/selectors';
import clsx from 'clsx';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  handleFilter: (filter: string) => void;
}

const CustomSelect = ({ handleFilter }: CustomSelectProps) => {
  const colorTheme = useSelector(selectColorThemeValue);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('A to Z');

  const options = [
    { value: 'a-z', label: 'A to Z' },
    { value: 'z-a', label: 'Z to A' },
    { value: 'high-low', label: 'High-Low Price' },
    { value: 'low-hight', label: 'Low-High Price' },
    { value: 'popular', label: 'Popular' },
    { value: 'unpopular', label: 'Not popular' },
  ];

  const handleSelect = ({ label, value }: Option) => {
    setSelectedOption(label);
    setIsOpen(false);
    handleFilter(value);
  };

  return (
    <div className="relative">
      <div
        className={clsx(
          'inline-flex justify-between py-3 px-7 mb-8 rounded-3xl text-primary-white outline-none cursor-pointer items-center xl:min-w-52',
          colorTheme === 'orange' && 'bg-primary-orange',
          colorTheme === 'green' && 'bg-primary-green',
          colorTheme === 'blue' && 'bg-primary-blue'
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption}
        <div className=" pointer-events-none ">
          <ChevronDown />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 bg-white rounded-lg shadow-lg top-16 xl:min-w-52">
          <ul>
            {options.map(option => (
              <li
                key={option.value}
                value={option.value}
                className="opacity-50 py-2 px-4 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
