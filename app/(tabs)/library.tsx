import { StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import SearchBar from "~/components/SearchBar";
import BookDisplay from "~/components/BookDisplay";
import { useEffect, useState } from "react";
import CreateSummary from "~/components/CreateSummary";
import { summaries } from "~/db/schema";
import { db } from "~/lib/db";

type NewSummary = typeof summaries.$inferInsert;

const dummy: NewSummary[] = [];

export default function Library() {
  const [books, setBooks] = useState<NewSummary[]>([]);
  const [searchResults, setSearchResults] = useState<NewSummary[]>(books);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    db.select()
      .from(summaries)
      .then((books) => {
        setBooks(books);
        setSearchResults(books);
      });
  }, []);

  const handleSearchChange = (results: any[]) => {
    setBooks(results);
    setIsSearching(results.length !== books.length);
  };

  dummy.push(...books);

  return (
    <LinearGradient colors={["#000000", "#D72638"]} style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={styles.logo}>SUMMAFY</Text>
      <CreateSummary style={styles.createSummary} />
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
      {/* <BookDisplay books={books} /> */}
      <BookDisplay books={dummy} />
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
  createSummary: {
    position: "absolute",
    bottom: 155,
    alignSelf: "center",
    zIndex: 10,
  },
});
