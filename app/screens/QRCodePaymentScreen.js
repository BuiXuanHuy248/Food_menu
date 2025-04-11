import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const QRCodePaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { price } = route.params || { price: 20 };

  useEffect(() => {
    // Set a timer to navigate to PaymentSuccessScreen after 5 seconds
    const timer = setTimeout(() => {
      navigation.navigate("PaymentSuccessScreen");
    }, 5000);

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [navigation]);

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.container}>
        <View style={styles.qrCodeContainer}>
          <Text style={styles.scanText}>SCAN TO PAY</Text>
          <Image
            source={require("../../assets/images/qrcode.jpg")}
            style={styles.qrCode}
            resizeMode="contain"
          />
          <Text style={styles.priceText}>${price}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  qrCodeContainer: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  scanText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
  },
  qrCode: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
  priceText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default QRCodePaymentScreen;
