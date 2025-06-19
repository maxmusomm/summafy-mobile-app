import { StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import SearchBar from "~/components/SearchBar";
import { Stack } from "expo-router";
import BookDisplay from "~/components/BookDisplay";
import { useState } from "react";
import { recentSummaries } from "~/data/summaries";
import CreateSummary from "~/components/CreateSummary";

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
      <StatusBar hidden={true} />
      <Text style={styles.logo}>SUMMAFY</Text>
      <CreateSummary style={styles.createSummary} />

      <SearchBar
        route="Upload Book"
        source="local"
        onResultsChange={handleSearchChange}
      />
      {!isSearching && (
        <View style={styles.headerContainer}>
          <Text style={styles.mainHeading}>
            Smart summaries—like you've read every word
          </Text>
          <Text style={styles.subHeading}>
            Upload a book and get a clear, AI-crafted summary—with reading or
            listening options.
          </Text>
        </View>
      )}
      <BookDisplay
        books={searchResults}
        onRefresh={() => {
          // TODO: Implement refresh logic
          console.log("Refreshing...");
        }}
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
  createSummary: {
    position: "absolute",
    bottom: 155,
    alignSelf: "center",
    zIndex: 10,
  },
});
