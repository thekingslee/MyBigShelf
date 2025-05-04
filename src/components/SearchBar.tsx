import { Search, X } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { useSearch } from "@/stores";
import { cn } from "@/lib/utils";
import { useURLParams } from "@/hooks/useURLParams";

interface SearchBarProps {
  placeholder?: string;
  context: string;
}

const SearchBar = ({ placeholder = "Search...", context }: SearchBarProps) => {
  const { searchParams, setSearchParams } = useSearch();
  const [searchTerm, setSearchTerm] = useState(searchParams[context] || "");
  const { params, updateParams } = useURLParams<{ genre: string }>({
    genre: { type: "string", default: "" },
  });

  useEffect(() => {
    setSearchTerm(searchParams[context] || "");
  }, [searchParams, context]);

  // Effect to handle genre clearing whenever search term changes
  useEffect(() => {
    if (searchTerm && params.genre) {
      updateParams({ genre: "" });
    }
  }, [searchTerm, params.genre, updateParams]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    setSearchParams(context, newSearchTerm);
  };

  const handleClearInput = () => {
    setSearchTerm("");
    setSearchParams(context, "");
  };

  return (
    <div className="relative w-full md:w-[320px] lg:w-[180px] xl:w-[200px]">
      <Input
        type="text"
        placeholder={placeholder}
        className={cn(
          "w-full pr-8 h-[39px] text-base text-custom-text-body rounded-lg bg-white border-custom-black-400 focus:bg-custom-info-light focus:ring-1 focus:ring-custom-info focus:outline-none focus:border focus:border-custom-info"
        )}
        value={searchTerm}
        onChange={handleInputChange}
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-custom-text-primary">
        {searchTerm ? (
          <X className="h-4 w-4 cursor-pointer" onClick={handleClearInput} />
        ) : (
          <Search className="h-4 w-4" />
        )}
      </div>
    </div>
  );
};

export default SearchBar;