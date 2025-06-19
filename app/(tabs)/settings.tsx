import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Card } from "~/components/ui/card";
import { Textarea } from "~/components/ui/textarea";
import SelectComp from "~/components/SelectComp";
import { Option, Volume2 } from "lucide-react-native";

type Option = {
  value: string;
  label: string;
};

const voices: Option[] = [
  { value: "aria", label: "Aria - Clear & Professional" },
  { value: "sarah", label: "Sarah - Warm & Friendly" },
  { value: "liam", label: "Liam - Deep & Authoritative" },
  { value: "charlotte", label: "Charlotte - Smooth & Elegant" },
];

const DEFAULT_PROMPT =
  "Create a comprehensive yet concise summary that captures the key points, main arguments, and essential details of the content while maintaining clarity and coherence.";

const SaveChangesBtn = ({ method }) => {
  return (
    <Pressable onPress={() => method()} style={styles.button}>
      <Text style={{ color: "white", textAlign: "center" }}>Save Changes</Text>
    </Pressable>
  );
};

export default function Settings() {
  const [summaryPrompt, setSummaryPrompt] = React.useState(DEFAULT_PROMPT);
  const [selectedVoice, setSelectedVoice] = React.useState(voices[0].value); // Default to first voice

  Option;

  return (
    <LinearGradient colors={["#000000", "#D72638"]} style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.fixedHeader}>
          <Text style={styles.appName}>SUMMAFY</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>
            Customize your summarization experience
          </Text>

          {/* Summary Settings Card */}
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Summary Settings</Text>
            <Text style={styles.cardDescription}>
              Customize the default prompt used for summarization
            </Text>
            <Textarea
              value={summaryPrompt}
              onChangeText={setSummaryPrompt}
              style={styles.textarea}
              numberOfLines={4}
            />
            <SaveChangesBtn method={() => alert("Save custom prompt")} />
          </Card>

          {/* Audio Settings Card */}
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Audio Settings</Text>
            <Text style={styles.cardDescription}>
              Choose your preferred voice for audio summaries
            </Text>
            <View style={styles.voiceSelection}>
              <SelectComp data={voices} />
            </View>
            <SaveChangesBtn method={() => alert("Save audio settings")} />
          </Card>
        </View>
      </ScrollView>
      <StatusBar hidden={true} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgb(255 183 3)",
    color: "white",
    fontWeight: "bold",
    padding: 8,
    borderRadius: 8,
    alignContent: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
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
});
