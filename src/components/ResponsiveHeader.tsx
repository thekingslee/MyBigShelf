import React, { useState } from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import SearchBar from './SearchBar';
import SortSelector from './SortSelector';
import { Search, X } from 'lucide-react';

interface ResponsiveHeaderProps {
  sortOptions: { value: string; name: string; icon?: string }[];
  onSortChange: (sortBy: string) => void;
  searchPlaceholder: string;
  searchContext: string;
  initialGenre?: string;
}

const ResponsiveHeader: React.FC<ResponsiveHeaderProps> = ({
  sortOptions,
  onSortChange,
  searchPlaceholder,
  searchContext,
  initialGenre,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-solid border-custom-black-300 px-0 py-4 mb-6">
      <CardTitle className="mb-4 md:mb-0">
        <h3 className="text-3xl font-normal font-headingFont text-custom-text-primary">
          Explore all
        </h3>
      </CardTitle>
      <div className="flex flex-col md:flex-row items-stretch md:items-center w-full md:w-auto gap-4 md:gap-3">
        <div className="hidden md:block">
          <SearchBar placeholder={searchPlaceholder} context={searchContext} />
        </div>
        {isSearchOpen ? (
          <div className="flex items-center w-full md:hidden">
            <div className="flex-grow">
              <SearchBar
                placeholder={searchPlaceholder}
                context={searchContext}
              />
            </div>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="ml-2 p-2 rounded-full hover:bg-gray-200 flex-shrink-0"
              aria-label="Close search"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center w-full md:w-auto">
            <div className="flex-grow md:flex-grow-0 mr-2 md:mr-0">
              <SortSelector
                sortOption={sortOptions}
                onSortChange={onSortChange}
                initialValue={initialGenre}
                searchContext={searchContext}
              />
            </div>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 rounded-full hover:bg-gray-200 flex-shrink-0"
              aria-label="Open search"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </CardHeader>
  );
};

export default ResponsiveHeader;
