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
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";

const PaymentSuccessScreen = () => {
  const navigation = useNavigation();

  const handleOk = () => {
    // Navigate to OrderSuccess screen
    navigation.navigate("OrderSuccess");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Ionicons name="checkmark" size={36} color="#FFFFFF" />
          </View>

          <Text style={styles.title}>PAYMENT SUCCESSFULLY</Text>

          <TouchableOpacity style={styles.okButton} onPress={handleOk}>
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
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
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 24,
    width: "90%",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FE5621", // Orange color
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 24,
  },
  okButton: {
    backgroundColor: "#FE5621", // Orange color
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 4,
    width: "100%",
    alignItems: "center",
  },
  okButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PaymentSuccessScreen;
