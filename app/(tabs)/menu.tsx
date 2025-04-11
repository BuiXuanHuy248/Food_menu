import React from "react";
import { View, StyleSheet } from "react-native";
import MenuScreen from "../screens/MenuScreen";

export default function MenuTab() {
  return (
    <View style={styles.container}>
      <MenuScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
