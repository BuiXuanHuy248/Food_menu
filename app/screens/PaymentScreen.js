import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { onSelect } = route.params || {};
  const [selectedPayment, setSelectedPayment] = useState("cash");
  const [cards, setCards] = useState([
    {
      id: "default",
      holderName: "Default Card",
      cardNumber: "1234567890123426",
      expireDate: "12/2025",
      cvc: "123",
      lastDigits: "426",
    },
  ]);
  const [selectedCard, setSelectedCard] = useState("default");

  const handleBack = () => {
    navigation.goBack();
  };

  const handleChoose = () => {
    // Get display name for the selected payment method
    let paymentDisplayName = "Cash";
    if (selectedPayment === "bank") paymentDisplayName = "Bank";
    if (selectedPayment === "card") paymentDisplayName = "Mastercard";

    // Call the callback if it exists
    if (onSelect) {
      onSelect(selectedPayment, paymentDisplayName);
    }

    // Go back to the previous screen
    navigation.goBack();
  };

  const handleAddNewCard = () => {
    navigation.navigate("AddCard", {
      onAddCard: (newCard) => {
        setCards((prevCards) => [...prevCards, newCard]);
        setSelectedCard(newCard.id);
        setSelectedPayment("card");
      },
    });
  };

  const handleSelectCard = (cardId) => {
    setSelectedCard(cardId);
    setSelectedPayment("card");
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

      <ScrollView style={styles.container}>
        <View style={styles.paymentOptions}>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              selectedPayment === "cash" && styles.selectedPayment,
            ]}
            onPress={() => setSelectedPayment("cash")}
          >
            <View style={styles.paymentIconContainer}>
              <Ionicons name="cash-outline" size={28} color="#FE5621" />
            </View>
            <Text style={styles.paymentText}>Cash</Text>
            {selectedPayment === "cash" && (
              <View style={styles.checkmarkContainer}>
                <Ionicons name="checkmark-circle" size={20} color="#FE5621" />
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              selectedPayment === "bank" && styles.selectedPayment,
            ]}
            onPress={() => setSelectedPayment("bank")}
          >
            <View style={styles.paymentIconContainer}>
              <Ionicons name="business-outline" size={28} color="#666" />
            </View>
            <Text style={styles.paymentText}>Bank</Text>
            {selectedPayment === "bank" && (
              <View style={styles.checkmarkContainer}>
                <Ionicons name="checkmark-circle" size={20} color="#FE5621" />
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              selectedPayment === "card" && styles.selectedPayment,
            ]}
            onPress={() => setSelectedPayment("card")}
          >
            <View style={styles.paymentIconContainer}>
              <Ionicons name="card-outline" size={28} color="#FE5621" />
            </View>
            <Text style={styles.paymentText}>Mastercard</Text>
            {selectedPayment === "card" && (
              <View style={styles.checkmarkContainer}>
                <Ionicons name="checkmark-circle" size={20} color="#FE5621" />
              </View>
            )}
          </TouchableOpacity>
        </View>

        {selectedPayment === "card" && (
          <View style={styles.cardDetailsContainer}>
            {cards.map((card) => (
              <TouchableOpacity
                key={card.id}
                style={[
                  styles.cardDetails,
                  selectedCard === card.id && styles.selectedCardDetails,
                ]}
                onPress={() => handleSelectCard(card.id)}
              >
                <View style={styles.cardLogoContainer}>
                  <Ionicons name="card" size={24} color="#FE5621" />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>Master Card</Text>
                  <Text style={styles.cardNumber}>
                    •••• •••• •••• {card.lastDigits}
                  </Text>
                </View>
                {selectedCard === card.id && (
                  <View style={styles.cardCheckmark}>
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#FE5621"
                    />
                  </View>
                )}
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.addNewButton}
              onPress={handleAddNewCard}
            >
              <Text style={styles.addNewButtonText}>ADD NEW</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.chooseButton, { backgroundColor: "#FE5621" }]}
          onPress={handleChoose}
        >
          <Text style={styles.chooseButtonText}>CHOOSE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
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
  paymentOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 20,
  },
  paymentOption: {
    backgroundColor: "#f0f0f0",
    width: "30%",
    aspectRatio: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    position: "relative",
  },
  selectedPayment: {
    backgroundColor: "#FFE3E3",
    borderWidth: 1,
    borderColor: "#FE5621",
  },
  paymentIconContainer: {
    marginBottom: 8,
  },
  paymentText: {
    fontSize: 14,
    color: "#333",
  },
  checkmarkContainer: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  cardDetailsContainer: {
    marginHorizontal: 20,
    marginBottom: 100, // Extra space for footer
  },
  cardDetails: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 12,
  },
  selectedCardDetails: {
    borderColor: "#FE5621",
    borderWidth: 1,
  },
  cardLogoContainer: {
    backgroundColor: "#FFE8D6",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  cardNumber: {
    fontSize: 14,
    color: "#666",
  },
  cardCheckmark: {
    width: 20,
    height: 20,
  },
  addNewButton: {
    alignItems: "center",
    padding: 12,
    marginTop: 4,
  },
  addNewButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FE5621",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  chooseButton: {
    backgroundColor: "#FF6B6B",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  chooseButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PaymentScreen;
