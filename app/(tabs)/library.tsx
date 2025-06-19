import { StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import SearchBar from "~/components/SearchBar";
import BookDisplay from "~/components/BookDisplay";
import { useState } from "react";
import { recentSummaries } from "~/data/summaries";

export default function Tab() {
  const [searchResults, setSearchResults] = useState(recentSummaries);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchChange = (results: any[]) => {
    setSearchResults(results);
    setIsSearching(results.length !== recentSummaries.length);
  };

  return (
    <LinearGradient colors={["#000000", "#D72638"]} style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={styles.logo}>SUMMAFY</Text>
      <SearchBar
        route="Your Library"
        source="local"
        onResultsChange={handleSearchChange}
      />
      {!isSearching && (
        <View style={styles.headerContainer}>
          <Text style={styles.mainHeading}>Your Library</Text>
          <Text style={styles.subHeading}>
            {searchResults.length} summaries available
          </Text>
        </View>
      )}
      <BookDisplay books={searchResults} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 60,
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
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    paddingLeft: 20,
  },
});
