import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";
import { Card } from "~/components/ui/card";
import BackToComponent from "~/components/BackToComponent";
import { LinearGradient } from "expo-linear-gradient";
import { Headphones, Speaker } from "lucide-react-native";
import { db } from "~/lib/db";
import { eq } from "drizzle-orm";
import { summaries } from "~/db/schema";

type NewSummary = typeof summaries.$inferInsert;

const Read = () => {
  const { id } = useLocalSearchParams();
  const [isAudioMode, setIsAudioMode] = useState(false);
  const [summary, setSummary] = useState<NewSummary | null>(null);

  db.select()
    .from(summaries)
    .then((data) => {
      data
        .filter((item) => item.id === id)
        .forEach((item) => {
          setSummary(item);
        });
    });

  const toggleAudioMode = () => {
    setIsAudioMode(!isAudioMode);
  };

  return (
    <LinearGradient colors={["#000000", "#D72638"]} style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header Actions */}
      <View style={styles.header}>
        <BackToComponent
          route={`/summary/${id}`}
          style={styles.backButton}
          text={"Back to Summary"}
        />

        <Pressable style={styles.audioToggle} onPress={toggleAudioMode}>
          {isAudioMode ? (
            <Speaker size={24} color="#FFF" />
          ) : (
            <Headphones size={24} color="#FFF" />
          )}
        </Pressable>
      </View>

      {/* Reading Card */}
      <Card style={styles.readingCard}>
        <ScrollView style={styles.textContainer}>
          <Text style={styles.title}>{summary?.title}</Text>
          <Text style={styles.content}>{summary?.summary}</Text>
          {/* Add your actual content here */}
        </ScrollView>
      </Card>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 48,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  audioToggle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  readingCard: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderColor: "rgba(255, 255, 255, 0.1)",
    margin: 16,
    marginTop: 104,
    marginBottom: 90,
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
    textAlign: "center",
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: "#FFFFFF",
    opacity: 0.9,
  },
});

export default Read;
