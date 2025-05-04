import create from "zustand";

interface SearchStore {
  searchParams: { [key: string]: string };
  setSearchParams: (context: string, params: string) => void;
}

export const useSearch = create<SearchStore>((set) => ({
  searchParams: {},
  setSearchParams: (context, params) =>
    set((state) => ({
      searchParams: { ...state.searchParams, [context]: params },
    })),
}));