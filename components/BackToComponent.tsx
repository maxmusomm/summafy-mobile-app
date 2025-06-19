import { View, Text, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { ArrowLeftCircle } from "lucide-react-native";

const BackToComponent = ({ route, text, style, returnRoute = "" }) => {
  return (
    <Link style={style} href={route} asChild>
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          borderColor: "white",
          borderWidth: 1,
          padding: 6,
          borderRadius: 8,
          width: 160,
        }}
      >
        <ArrowLeftCircle size={32} color={"white"} />
        <Text style={{ color: "white" }}>{text}</Text>
      </Pressable>
    </Link>
  );
};

export default BackToComponent;
