import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react-native";
import { useBookSearch, SearchSource } from "~/hooks/useBookSearch";

interface SearchBarProps {
  route: string;
  source: SearchSource;
  onResultsChange?: (results: any[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  route,
  source,
  onResultsChange,
}) => {
  const { searchQuery, setSearchQuery, results, isLoading, error } =
    useBookSearch({
      source,
    });

  React.useEffect(() => {
    onResultsChange?.(results);
  }, [results, onResultsChange]);

  return (
    <View style={styles.container}>
      <SearchIcon color="white" size={20} />
      <Input
        placeholder={`Search ${route}`}
        placeholderTextColor="rgba(255, 255, 255, 0.6)"
        style={styles.input}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {isLoading && <ActivityIndicator style={styles.loader} color="white" />}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 10,
    position: "relative",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    color: "white",
    fontSize: 16,
    marginLeft: 10,
    paddingVertical: 8,
  },
  loader: {
    marginLeft: 8,
  },
  error: {
    color: "#ff4444",
    fontSize: 12,
    position: "absolute",
    bottom: -20,
    left: 12,
  },
});

export default SearchBar;
