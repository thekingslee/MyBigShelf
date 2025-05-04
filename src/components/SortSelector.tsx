/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDownIcon, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useSearch } from '@/stores';
import { useLocation, useNavigate } from 'react-router-dom';

interface SortOption {
  value: string;
  name: string;
  icon?: string;
  isTemporary?: boolean;
}

interface SortSelectorProps {
  sortOption: SortOption[];
  onSortChange: (sortBy: string) => void;
  initialValue?: string;
  searchContext: string;
}

const transformSortOption = (option: SortOption): SortOption => ({
  ...option,
  value: option.value.replace(/\s+/g, '-').toLowerCase(),
});

const SortSelector = ({
  onSortChange,
  sortOption,
  searchContext,
}: SortSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { searchParams } = useSearch();
  const searchTerm = searchParams[searchContext] || '';
  const location = useLocation();
  const navigate = useNavigate();
  const selectorRef = useRef<HTMLDivElement>(null);

  const transformedOptions = sortOption.map(transformSortOption);

  const createTemporaryOption = (value: string): SortOption => ({
    value: value.toLowerCase(),
    name: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
    isTemporary: true,
  });

  // Function to update both URL and state
  const updateGenreAndURL = (newValue: string) => {
    const currentParams = new URLSearchParams(location.search);

    if (newValue) {
      currentParams.set('genre', newValue);
    } else {
      currentParams.delete('genre');
    }

    // Preserve other URL parameters
    const otherParams = Array.from(currentParams.entries())
      .filter(([key]) => key !== 'genre')
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    const newSearch = newValue
      ? `${otherParams ? otherParams + '&' : ''}genre=${newValue}`
      : otherParams;

    // Update URL directly
    navigate(`${location.pathname}${newSearch ? '?' + newSearch : ''}`, {
      replace: true,
    });

    // Notify parent component
    onSortChange(newValue);
  };

  // Get selected options from URL
  const getSelectedFromUrl = () => {
    const params = new URLSearchParams(location.search);
    const genreParam = params.get('genre');

    if (!genreParam) return [];

    const genreValue = genreParam.toLowerCase();
    const existingOption = transformedOptions.find(
      (option) => option.value === genreValue
    );

    return existingOption
      ? [existingOption]
      : [createTemporaryOption(genreParam)];
  };

  const [selectedOptions, setSelectedOptions] =
    useState<SortOption[]>(getSelectedFromUrl);

  // Update selections when URL changes
  useEffect(() => {
    setSelectedOptions(getSelectedFromUrl());
  }, [location.search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: SortOption) => {
    if (searchTerm) {
      toast.error('Please clear your search terms first');
      setIsOpen(false);
      return;
    }

    const isSelected = selectedOptions.some(
      (opt) => opt.value === option.value
    );

    if (isSelected) {
      setSelectedOptions([]);
      updateGenreAndURL('');
    } else {
      setSelectedOptions([option]);
      updateGenreAndURL(option.value);
    }

    setIsOpen(false);
  };

  const handleRemoveOption = (_option: SortOption, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOptions([]);
    updateGenreAndURL('');
  };

  if (transformedOptions.length === 0) {
    return (
      <div className="relative font-bodyRegularFont">
        <button
          disabled
          className="flex items-center justify-between h-[39px] w-full md:w-[240px] px-2 py-2 bg-white border border-custom-black-400 rounded-[8px] text-sm"
        >
          <div className="flex gap-2 text-sm">
            <h3>Sort By:</h3>
            <span className="flex items-center">Loading...</span>
          </div>
          <ChevronDownIcon className="w-4 h-4 ml-2" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative font-bodyRegularFont" ref={selectorRef}>
      <button
        onClick={() => {
          if (searchTerm) {
            toast.error('Please clear your search terms first');
            return;
          }
          setIsOpen(!isOpen);
        }}
        className="relative flex items-center justify-between h-[39px] w-full md:w-[240px] px-2 py-2 bg-white border border-custom-black-400 rounded-[8px] text-sm focus:bg-custom-info-light focus:ring-1 focus:ring-custom-info"
      >
        <div className="flex items-center text-sm">
          <h3 className="mr-2 flex-shrink-0">Sort By:</h3>
          {selectedOptions.length > 0 ? (
            <div
              className="flex gap-1 overflow-x-auto scrollbar-hide w-[150px]"
              style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
            >
              {selectedOptions.map((option) => (
                <span
                  key={option.value}
                  className={cn(
                    'flex items-center gap-1 px-2 py-0.5 rounded-full text-xs flex-shrink-0',
                    option.isTemporary
                      ? 'bg-gray-50 text-gray-500'
                      : 'bg-gray-100'
                  )}
                >
                  {option.name}
                  <button
                    onClick={(e) => handleRemoveOption(option, e)}
                    className="hover:text-red-500 focus:outline-none"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <span className="flex items-center">Select Genre</span>
          )}
        </div>
        <ChevronDownIcon className="w-4 h-4 ml-2 flex-shrink-0" />
      </button>
      {isOpen && !searchTerm && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="px-1 rounded-[8px] max-h-[200px] overflow-y-auto">
            {transformedOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option)}
                className={cn(
                  'flex items-center my-1 w-full px-3 py-2 text-sm rounded-[8px]',
                  selectedOptions.some((opt) => opt.value === option.value)
                    ? 'bg-custom-card-hover text-custom-text-primary font-bodyBoldFont'
                    : 'text-gray-700 hover:bg-custom-info-light text-custom-text-secondary font-bodyMediumFont'
                )}
              >
                {option.icon && (
                  <img src={option.icon} alt="" className="w-4 h-4 mr-2" />
                )}
                {option.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortSelector;
