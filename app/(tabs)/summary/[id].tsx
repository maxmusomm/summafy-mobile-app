import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import BackToComponent from "~/components/BackToComponent";
import { Card } from "~/components/ui/card";
import { Play, Book } from "lucide-react-native";
const summary = () => {
  const { id } = useLocalSearchParams();
  return (
    <LinearGradient colors={["#000000", "#D72638"]} style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.fixedHeader}>
        <Text style={styles.appName}>SUMMAFY</Text>
      </View>
      <BackToComponent
        route="/"
        text="Back to Home"
        style={styles.fixedBackBtn}
      />
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Title</Text>
        <Text style={styles.cardDescription}>Author</Text>
        <Text style={styles.cardDescription}>Time</Text>

        <Link href={`/summary/${id}/audio`} asChild>
          <Pressable style={styles.button1}>
            <Play size={20} color={"black"} />
            <Text style={{ color: "black" }}>Listen to audio</Text>
          </Pressable>
        </Link>
        <Link href={`/summary/${id}/read`} asChild>
          <Pressable style={styles.button2}>
            <Book size={20} color={"white"} />
            <Text style={{ color: "white" }}>Read summary</Text>
          </Pressable>
        </Link>
      </Card>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 60,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    paddingLeft: 2,
  },
  fixedHeader: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 20,
  },
  fixedBackBtn: {
    position: "absolute",
    top: 100,
    left: 25,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 20,
  },
  button1: {
    flexDirection: "row",
    gap: 8,
    margin: 10,
    backgroundColor: "rgb(255 183 3)",
    paddingVertical: 24,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignContent: "center",
    justifyContent: "center",
  },
  button2: {
    flexDirection: "row",
    gap: 8,
    margin: 10,
    backgroundColor: "rgb(2 2 2 / 0%)",
    color: "white",
    fontWeight: "bold",
    paddingVertical: 24,
    paddingHorizontal: 8,
    borderBlockColor: "rgb(2 2 2 / 57%)",
    borderWidth: 1,
    borderRadius: 8,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
    marginBottom: 105,
  },
  content: {
    paddingTop: 120,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderColor: "#000",
    padding: 20,
    marginBottom: 20,
    borderRadius: 12,
    width: 350,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: "rgb(255 183 3)",
    marginBottom: 16,
  },
});

export default summary;
