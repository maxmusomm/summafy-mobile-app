import { StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import SearchBar from "~/components/SearchBar";
import { Stack } from "expo-router";
import BookDisplay from "~/components/BookDisplay";
import { useState } from "react";
import { getBooks } from "~/lib/getBooks";

interface Book {
  id: string;
  title: string;
  author: string;
  date: string;
  duration: string | null;
  color: string;
  summary: string | null;
}

export default function Tab() {
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchChange = (results: any[]) => {
    setSearchResults(results);
    setIsSearching(results.length !== searchResults.length);
  };

  return (
    <LinearGradient colors={["#000000", "#D72638"]} style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar hidden={true} />
      <Text style={styles.logo}>SUMMAFY</Text>

      <SearchBar
        route="Upload Book"
        source="local"
        onResultsChange={handleSearchChange}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    paddingLeft: 20,
  },
  container: {
    paddingVertical: 60,
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 20,
    marginVertical: 24,
    alignItems: "center",
  },
  mainHeading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 12,
  },
  subHeading: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    lineHeight: 24,
  },
});
