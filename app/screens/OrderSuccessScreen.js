import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, CommonActions } from "@react-navigation/native";

const OrderSuccessScreen = () => {
  const navigation = useNavigation();

  const handleOk = () => {
    // Reset and navigate to Menu tab
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: "Main",
            params: { screen: "Menu" },
          },
        ],
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark" size={50} color="#FFFFFF" />
        </View>

        <Text style={styles.title}>ORDERED SUCCESSFULLY</Text>

        <Text style={styles.message}>Thank you for your ordering</Text>

        <Text style={styles.enjoyMessage}>Enjoy your meal!</Text>

        <TouchableOpacity style={styles.okButton} onPress={handleOk}>
          <Text style={styles.okButtonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FE5621",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 8,
    textAlign: "center",
  },
  enjoyMessage: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 30,
    textAlign: "center",
  },
  okButton: {
    backgroundColor: "#FE5621",
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 4,
  },
  okButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OrderSuccessScreen;
