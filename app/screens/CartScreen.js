import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const CartScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { foodItem, quantity, note } = route.params || {};

  const [cartItems, setCartItems] = useState([]);
  const [itemQuantity, setItemQuantity] = useState(quantity || 1);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentName, setPaymentName] = useState("Payment");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (foodItem) {
      setCartItems([
        {
          ...foodItem,
          quantity: quantity || 1,
          note: note || "",
        },
      ]);
    }
  }, [foodItem, quantity, note]);

  const handleBack = () => {
    navigation.goBack();
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleEditAddress = () => {
    alert("Edit address functionality");
  };

  const increaseQuantity = () => {
    setItemQuantity(itemQuantity + 1);
    updateCartItemQuantity(foodItem.id, itemQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (itemQuantity > 1) {
      setItemQuantity(itemQuantity - 1);
      updateCartItemQuantity(foodItem.id, itemQuantity - 1);
    }
  };

  const updateCartItemQuantity = (itemId, newQuantity) => {
    const updatedItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handlePayment = () => {
    navigation.navigate("Payment", {
      onSelect: (method, displayName) => {
        // This function will be called from PaymentScreen
        setSelectedPayment(method);
        setPaymentName(displayName);
      },
    });
  };

  const handleQRCodePayment = () => {
    navigation.navigate("QRCodePayment", {
      price: calculateTotal(),
    });
  };

  const handlePlaceOrder = () => {
    if (!selectedPayment) {
      alert("Please select a payment method first");
      return;
    }

    // If bank payment is selected, navigate to QR Code Payment
    if (selectedPayment === "bank") {
      navigation.navigate("QRCodePayment", {
        price: calculateTotal(),
      });
      return;
    }

    // If card (Mastercard) payment is selected, go directly to PaymentSuccessScreen
    if (selectedPayment === "card") {
      navigation.navigate("PaymentSuccessScreen");
      return;
    }

    // For other payment methods, navigate to Order Success screen
    navigation.navigate("OrderSuccess");
  };

  const removeItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    // If there are no more items, go back
    if (cartItems.length <= 1) {
      setTimeout(() => {
        navigation.goBack();
      }, 300);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cart</Text>
        <TouchableOpacity onPress={toggleEditMode}>
          <Text style={[styles.editButton, editMode && { color: "#4CD964" }]}>
            {editMode ? "DONE" : "EDIT"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
            <View style={styles.quantityControl}>
              <TouchableOpacity
                onPress={decreaseQuantity}
                style={styles.quantityButton}
              >
                <Ionicons name="remove-circle" size={24} color="#FE5621" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{itemQuantity}</Text>
              <TouchableOpacity
                onPress={increaseQuantity}
                style={styles.quantityButton}
              >
                <Ionicons name="add-circle" size={24} color="#FE5621" />
              </TouchableOpacity>
            </View>
            {editMode && (
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeItem(item.id)}
              >
                <Ionicons name="close-circle" size={24} color="#FE5621" />
              </TouchableOpacity>
            )}
          </View>
        ))}

        <View style={styles.deliverySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>DELIVERY ADDRESS</Text>
            <TouchableOpacity onPress={handleEditAddress}>
              <Text style={styles.editButton}>EDIT</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.addressText}>
            22 My An 12 Street, Ngu Hanh Son District
          </Text>
        </View>

        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>TOTAL:</Text>
          <Text style={styles.totalAmount}>${calculateTotal()}</Text>
        </View>

        <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
          <Text style={styles.paymentText}>{paymentName}</Text>
          <Ionicons name="chevron-forward" size={16} color="#FE5621" />
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.placeOrderText}>PLACE ORDER</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
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
  editButton: {
    color: "#FE5621",
    fontSize: 14,
    fontWeight: "500",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cartItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  quantityButton: {
    padding: 4,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  removeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  deliverySection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 12,
    color: "#888",
    fontWeight: "500",
  },
  addressText: {
    fontSize: 14,
    color: "#333",
  },
  totalSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  totalAmount: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  paymentButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 16,
  },
  paymentText: {
    color: "#FE5621",
    fontWeight: "500",
    marginRight: 4,
    fontSize: 16,
  },
  footer: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  placeOrderButton: {
    backgroundColor: "#FE5621",
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
  },
  placeOrderText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CartScreen;
