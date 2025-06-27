import { Home, Settings, Book } from "lucide-react-native";
import { Tabs } from "expo-router";
import TabBar from "../../components/TabBar";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "~/drizzle/migrations";
import { useEffect } from "react";
import { db } from "~/lib/db";
import { ActivityIndicator, View } from "react-native";

export default function TabLayout() {
  const { success, error } = useMigrations(db, migrations);
  useEffect(() => {
    if (!success) {
      console.log("Migration failed:", error);
    } else {
      console.log("Migrations completed successfully");
    }
  }, [success]);

  if (!success) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
        }}
      >
        <ActivityIndicator size="large" color="#D72638" />
      </View>
    );
  }

  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: () => <Home size={28} />,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "Library",
          tabBarIcon: () => <Book size={28} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: () => <Settings size={28} />,
        }}
      />
    </Tabs>
  );
}
