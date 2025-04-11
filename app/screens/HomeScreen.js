import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        <Text style={styles.title}>Food App</Text>
        <Text style={styles.subtitle}>Welcome to our Restaurant App</Text>
        <Text style={styles.instructions}>
          Please tap on the Menu tab to view our delicious food items
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#FF6B6B",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 24,
    color: "#333",
  },
  instructions: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
  },
});

export default HomeScreen;
