import { Home, Settings, Book } from "lucide-react-native";
import { Tabs } from "expo-router";
import TabBar from "../../components/TabBar";

export default function TabLayout() {
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
