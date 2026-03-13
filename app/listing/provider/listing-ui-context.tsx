"use client";

import {
  createContext,
  useContext,
  useTransition,
  type ReactNode,
  type TransitionStartFunction,
} from "react";

interface ListingUiContextValue {
  isApplyingFilters: boolean;
  startFiltersTransition: TransitionStartFunction;
}

const ListingUiContext = createContext<ListingUiContextValue | undefined>(
  undefined
);

export function ListingUiProvider({ children }: { children: ReactNode }) {
  const [isApplyingFilters, startFiltersTransition] = useTransition();

  return (
    <ListingUiContext.Provider
      value={{ isApplyingFilters, startFiltersTransition }}
    >
      {children}
    </ListingUiContext.Provider>
  );
}

export function useListingUi() {
  const context = useContext(ListingUiContext);
  if (!context) {
    throw new Error("useListingUi must be used within a ListingUiProvider");
  }
  return context;
}
