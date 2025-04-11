import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const FoodDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { food } = route.params || {};
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  const handleBack = () => {
    navigation.goBack();
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    // Navigate to Cart screen with food item details
    navigation.navigate("Cart", {
      foodItem: food,
      quantity: quantity,
      note: note,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        <Image source={food.image} style={styles.foodImage} />

        <View style={styles.contentContainer}>
          <Text style={styles.foodName}>{food.name.toUpperCase()}</Text>
          <Text style={styles.foodPrice}>${food.price}</Text>

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description:</Text>
            <Text style={styles.descriptionText}>
              {food.description ||
                `${food.name} is a beloved dish that has gained international fame for its delicious flavors and rich cultural heritage. This is a traditional dish made with a savory and fragrant broth, topped with tender slices of meat, fresh herbs, and crunchy bean sprouts.`}
            </Text>
          </View>

          <Text style={styles.notesToRestaurant}>Note to restaurant</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="Add special instructions here..."
            value={note}
            onChangeText={setNote}
            multiline={true}
            numberOfLines={3}
          />

          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={decreaseQuantity}
              style={styles.quantityButton}
            >
              <Ionicons name="remove" size={20} color="black" />
            </TouchableOpacity>

            <Text style={styles.quantityText}>{quantity}</Text>

            <TouchableOpacity
              onPress={increaseQuantity}
              style={styles.quantityButton}
            >
              <Ionicons name="add" size={20} color="black" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
            <Text style={styles.addToCartText}>ADD TO CART</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
  },
  backButton: {
    padding: 8,
  },
  container: {
    flex: 1,
  },
  foodImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  contentContainer: {
    padding: 16,
  },
  foodName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  foodPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  descriptionContainer: {
    marginBottom: 16,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666",
  },
  notesToRestaurant: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 20,
    textAlignVertical: "top",
    minHeight: 80,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  quantityButton: {
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 20,
  },
  addToCartButton: {
    backgroundColor: "#FE5621",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  addToCartText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default FoodDetailScreen;
