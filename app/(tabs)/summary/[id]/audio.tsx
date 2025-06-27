import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";
import { Card } from "~/components/ui/card";
import BackToComponent from "~/components/BackToComponent";
import { LinearGradient } from "expo-linear-gradient";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react-native";

const Audio = () => {
  const { id } = useLocalSearchParams();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = async () => {
    if (isPlaying) {
      console.log("pause");
    } else {
      console.log("play");
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <LinearGradient colors={["#000000", "#D72638"]} style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Back Button */}
      <BackToComponent
        route={`/summary/${id}`}
        style={styles.backButton}
        text={"Back to Summary"}
      />

      {/* Album Art Card */}
      <Card style={styles.albumCard}>
        <View style={styles.albumArt}>
          {/* You can add an image here later */}
        </View>
        <Text style={styles.cardTitle}>Summary Title</Text>
        <Text style={styles.cardDescription}>Author Name</Text>
      </Card>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: "30%" }]} />
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>0:00</Text>
          <Text style={styles.timeText}>3:45</Text>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <Pressable style={styles.secondaryButton}>
          <SkipBack size={24} color="#FFF" />
        </Pressable>

        <Pressable style={styles.playButton} onPress={handlePlayPause}>
          {isPlaying ? (
            <Pause size={32} color="#000" />
          ) : (
            <Play size={32} color="#000" />
          )}
        </Pressable>

        <Pressable style={styles.secondaryButton}>
          <SkipForward size={24} color="#FFF" />
        </Pressable>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 48,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    paddingLeft: 2,
  },
  scrollView: {
    flex: 1,
    marginBottom: 105,
  },
  fixedHeader: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 20,
  },
  content: {
    paddingTop: 120,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#999",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderColor: "#000",
    padding: 20,
    marginBottom: 20,
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: "#999",
    marginBottom: 16,
  },
  textarea: {
    marginBottom: 16,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    height: 120,
  },
  voiceSelection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  voiceIcon: {
    marginRight: 12,
  },
  select: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 8,
    color: "#fff",
  },
  albumCard: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderColor: "rgba(255, 255, 255, 0.1)",
    padding: 24,
    width: "90%",
    maxWidth: 400,
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 48,
  },
  albumArt: {
    width: 240,
    height: 240,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    marginBottom: 24,
  },
  progressContainer: {
    width: "90%",
    maxWidth: 400,
    marginBottom: 32,
  },
  progressBar: {
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    backgroundColor: "#FFB703",
    borderRadius: 2,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  timeText: {
    color: "#999",
    fontSize: 12,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFB703",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  secondaryButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Audio;
