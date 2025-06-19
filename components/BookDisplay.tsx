import { View, FlatList, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { recentSummaries } from "~/data/summaries";
import SummaryCard from "./SummaryCard";

interface Book {
  id: number;
  title: string;
  author: string;
  color: string;
  date: string;
  duration: string;
}

interface BookDisplayProps {
  books?: Book[];
  onEndReached?: () => void;
  refreshing?: boolean;
  onRefresh?: () => void;
}

const { width } = Dimensions.get("window");
const COLUMN_COUNT = 3;
const SPACING = 16;
const CARD_WIDTH = (width - SPACING * (COLUMN_COUNT + 1)) / COLUMN_COUNT;

const BookDisplay: React.FC<BookDisplayProps> = ({
  books = recentSummaries,
  onEndReached,
  refreshing = false,
  onRefresh,
}) => {
  // Calculate number of columns based on books length
  const columnCount = books.length <= 2 ? 2 : 3;

  // Recalculate card width based on column count
  const cardWidth = (width - SPACING * (columnCount + 1)) / columnCount;

  // Dynamic styles for card container
  const cardContainerStyle = React.useMemo(
    () => ({
      width: cardWidth,
      alignItems: "center" as const,
    }),
    [cardWidth]
  );

  return (
    <FlatList
      key={`flatlist-${columnCount}`}
      data={books}
      renderItem={({ item }) => (
        <View style={cardContainerStyle}>
          <SummaryCard summary={item} />
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
      numColumns={columnCount}
      style={styles.list}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.contentContainer}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingHorizontal: SPACING,
  },
  row: {
    justifyContent: "space-between",
    paddingVertical: SPACING,
  },
  contentContainer: {
    paddingBottom: SPACING * 4,
  },
});

export default BookDisplay;
