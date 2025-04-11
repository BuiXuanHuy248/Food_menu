import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Platform,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const AddCardScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { onAddCard } = route.params || {};

  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [cvc, setCvc] = useState("");

  const handleClose = () => {
    navigation.goBack();
  };

  const handleAddCard = () => {
    // Basic validation
    if (
      !cardHolderName.trim() ||
      !cardNumber.trim() ||
      !expireDate.trim() ||
      !cvc.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    // Last 3 digits of the card number
    const lastDigits = cardNumber.slice(-3);

    // Create new card object
    const newCard = {
      id: new Date().getTime().toString(), // unique ID
      holderName: cardHolderName,
      cardNumber: cardNumber,
      expireDate: expireDate,
      cvc: cvc,
      lastDigits: lastDigits,
    };

    // Call callback to add the card
    if (onAddCard) {
      onAddCard(newCard);
    }

    // Go back to the previous screen
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Card</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.container}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>CARD HOLDER NAME</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter card holder name"
            value={cardHolderName}
            onChangeText={setCardHolderName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>CARD NUMBER</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter card number"
            value={cardNumber}
            onChangeText={setCardNumber}
            keyboardType="numeric"
            maxLength={16}
          />
        </View>

        <View style={styles.inputRow}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.inputLabel}>EXPIRE DATE</Text>
            <TextInput
              style={styles.input}
              placeholder="mm/yyyy"
              value={expireDate}
              onChangeText={setExpireDate}
            />
          </View>

          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.inputLabel}>CVC</Text>
            <TextInput
              style={styles.input}
              placeholder="•••"
              value={cvc}
              onChangeText={setCvc}
              keyboardType="numeric"
              maxLength={3}
              secureTextEntry
            />
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
          <Text style={styles.addButtonText}>ADD</Text>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footer: {
    padding: 16,
  },
  addButton: {
    backgroundColor: "#FE5621",
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddCardScreen;
