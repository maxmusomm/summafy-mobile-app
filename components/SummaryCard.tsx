import * as React from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Card } from "~/components/ui/card";
import { summaries } from "~/db/schema";

// Type definition for a summary
type NewSummary = typeof summaries.$inferInsert;

interface SummaryCardProps {
  summary: NewSummary;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ summary }) => {
  const styles = StyleSheet.create({
    card: {
      borderColor: "rgba(255, 255, 255, 0.1)",
      padding: 12,
      borderRadius: 8,
      width: 129,
      height: 200,
    },
    container: {
      flex: 1,
      padding: 8,
      borderRadius: 8,
      backgroundColor: summary.color,
    },
    contentContainer: {
      flex: 1,
      borderRadius: 8,
      padding: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 14,
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      lineHeight: 15,
      height: 150, // This will accommodate exactly 4 lines (20px * 4)
    },
  });

  return (
    <Link href={`/summary/${summary.id}`} asChild>
      <Pressable>
        <Card style={styles.card}>
          <View style={styles.container}>
            <View
              style={[
                styles.contentContainer,
                { backgroundColor: summary.color },
              ]}
            >
              <Text style={styles.title} numberOfLines={7}>
                {summary.title}
              </Text>
            </View>
          </View>
        </Card>
      </Pressable>
    </Link>
  );
};

export default SummaryCard;
