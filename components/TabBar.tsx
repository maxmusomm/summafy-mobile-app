import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Home, Settings, Book } from "lucide-react-native";

const TabBar = ({ state, descriptors, navigation }) => {
  const getIcon = (routeName: string, color: string) => {
    switch (routeName) {
      case "index":
        return <Home size={28} color={color} />;
      case "library":
        return <Book size={28} color={color} />;
      case "settings":
        return <Settings size={28} color={color} />;
      default:
        return <Home size={28} color={color} />;
    }
  };

  const noTabBarRoutes = [
    "summary",
    "[id]/[id]",
    "summary/[id]",
    "summary/[id]/audio",
    "summary/[id]/read",
  ];

  const shouldShowTabBar = !noTabBarRoutes.includes(
    state.routes[state.index].name
  );

  return (
    <View style={shouldShowTabBar ? styles.container : { display: "none" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        console.log("TabBar", route.name);
        if (
          [
            "summary",
            "[id]/[id]",
            "summary/[id]",
            "summary/[id]/audio",
            "summary/[id]/read",
          ].includes(route.name)
        )
          return null;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityRole="button"
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.tabitems, isFocused && styles.focusedTab]}
            key={route.key}
          >
            {getIcon(route.name, isFocused ? "black" : "white")}
            <Text
              style={{
                color: isFocused ? "black" : "white",
                marginTop: 4,
                fontSize: 12,
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  focusedTab: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ffb703",
  },
  tabitems: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    position: "absolute",
    bottom: 55,
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    padding: 15,
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 20,
  },
});

export default TabBar;
