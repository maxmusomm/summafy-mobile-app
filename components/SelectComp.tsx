import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { LucideBadgeDollarSign, Volume2 } from "lucide-react-native";

const DropdownComponent = ({ data }) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={"Select item"}
      value={value}
      onFocus={() => setIsFocus(true)}
      onChange={(item) => {
        setValue(item.value);
        setIsFocus(false);
      }}
      renderLeftIcon={() => (
        <Volume2 style={styles.icon} color={"white"} size={20} />
      )}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    width: 280,
    borderColor: "white",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 8,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "white",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "white",
  },
});
