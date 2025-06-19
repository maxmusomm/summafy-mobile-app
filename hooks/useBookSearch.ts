import { useState, useEffect, useCallback } from "react";
import { recentSummaries } from "../data/summaries";

export type SearchSource = "local" | "database";

interface UseBookSearchProps {
  source: SearchSource;
}

export const useBookSearch = ({ source }: UseBookSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState(recentSummaries);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchBooks = useCallback(
    async (query: string) => {
      setIsLoading(true);
      setError(null);

      try {
        if (source === "local") {
          // Search in local data
          const filteredResults = recentSummaries.filter(
            (book) =>
              book.title.toLowerCase().includes(query.toLowerCase()) ||
              book.author.toLowerCase().includes(query.toLowerCase())
          );
          setResults(filteredResults);
        } else {
          // TODO: Implement database search
          // This would be where you make API calls to your backend
          // For now, we'll just search local data
          const filteredResults = recentSummaries.filter(
            (book) =>
              book.title.toLowerCase().includes(query.toLowerCase()) ||
              book.author.toLowerCase().includes(query.toLowerCase())
          );
          setResults(filteredResults);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while searching"
        );
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [source]
  );

  useEffect(() => {
    if (searchQuery.trim()) {
      const debounceTimer = setTimeout(() => {
        searchBooks(searchQuery);
      }, 300); // Debounce search for better performance

      return () => clearTimeout(debounceTimer);
    } else {
      setResults(recentSummaries); // Show all results when search is empty
    }
  }, [searchQuery, searchBooks]);

  return {
    searchQuery,
    setSearchQuery,
    results,
    isLoading,
    error,
  };
};
