import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
  FlatList,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const menuItems = [
  {
    id: "1",
    name: "Vietnamese Pho",
    category: "Noodles",
    price: 20,
    rating: 5,
    reviews: 70,
    image: require("../../assets/images/VietnamesePho.jpg"),
    description:
      "Vietnamese Pho is a beloved dish that has gained international fame for its delicious flavors and rich cultural heritage. Pho is a traditional Vietnamese soup made with a savory and fragrant beef or chicken broth, topped with tender slices of meat, fresh herbs, and crunchy bean sprouts.",
  },
  {
    id: "3",
    name: "Spaghetti",
    category: "Noodles",
    price: 20,
    rating: 5,
    reviews: 100,
    image: require("../../assets/images/Spagheti.jpg"),
    description:
      "Spaghetti is a classic Italian pasta dish. Our spaghetti is made with fresh pasta, rich tomato sauce, and topped with premium herbs and cheese for an authentic taste of Italy.",
  },
  {
    id: "7",
    name: "Fried Rice",
    category: "Rice",
    price: 23,
    rating: 5,
    reviews: 100,
    image: require("../../assets/images/Fried Rice.jpg"),
    description:
      "Our Fried Rice is a flavorful dish made with fragrant rice stir-fried with fresh vegetables, eggs, and your choice of protein. It's seasoned with our special blend of spices for an authentic taste.",
  },
  {
    id: "5",
    name: "Rice Balls",
    category: "Rice",
    price: 7,
    rating: 5,
    reviews: 50,
    image: require("../../assets/images/Rice Balls.jpg"),
    description:
      "Rice Balls are a popular Asian dish made with sticky rice that is shaped into balls and filled with various ingredients. They are often served with a savory sauce and make for a delicious snack or light meal.",
  },
  {
    id: "8",
    name: "Rolled Rice",
    category: "Rice",
    price: 15,
    rating: 5,
    reviews: 100,
    image: require("../../assets/images/Rolled Rice.jpg"),
    description:
      "Rolled Rice is a delicate dish featuring thin sheets of rice rolled around fresh vegetables and protein. Each bite offers a perfect balance of textures and flavors.",
  },
  {
    id: "9",
    name: "Fried Pork Rice",
    category: "Rice",
    price: 23,
    rating: 5,
    reviews: 170,
    image: require("../../assets/images/Fried Fork Rice.jpg"),
    description:
      "Fried Pork Rice combines tender slices of marinated pork with fragrant rice and vegetables. The dish is stir-fried to perfection, creating a satisfying meal with bold flavors.",
  },
  {
    id: "10",
    name: "Orange Juice",
    category: "Drinks",
    price: 12,
    rating: 5,
    reviews: 100,
    image: require("../../assets/images/Orange Juice.jpg"),
    description:
      "Our Orange Juice is freshly squeezed daily from premium oranges, offering a perfect balance of sweetness and citrus tang. A refreshing beverage packed with vitamin C.",
  },
  {
    id: "6",
    name: "Lemonade",
    category: "Drinks",
    price: 10,
    rating: 5,
    reviews: 150,
    image: require("../../assets/images/Lemonade.jpg"),
    description:
      "Our refreshing lemonade is made with freshly squeezed lemons, filtered water, and just the right amount of sweetness. It's the perfect companion to any meal or a refreshing drink on its own.",
  },
  {
    id: "11",
    name: "Soju Wine",
    category: "Drinks",
    price: 19,
    rating: 5,
    reviews: 100,
    image: require("../../assets/images/Soju Wine.jpg"),
    description:
      "Soju Wine is a popular Korean alcoholic beverage with a clean, neutral taste. Our premium selection offers a smooth finish that pairs excellently with our food menu.",
  },
  {
    id: "12",
    name: "Watermelon Juice",
    category: "Drinks",
    price: 15,
    rating: 5,
    reviews: 170,
    image: require("../../assets/images/Watermelon.jpg"),
    description:
      "Our Watermelon Juice is blended fresh from ripe watermelons, creating a naturally sweet and hydrating beverage. Perfect for cooling down on warm days.",
  },
  {
    id: "2",
    name: "Udon Noodle",
    category: "Noodles",
    price: 25,
    rating: 5,
    reviews: 94,
    image: require("../../assets/images/Udon.jpg"),
    description:
      "Udon is a thick, chewy Japanese noodle made from wheat flour. Served in a savory broth with various toppings, it's a comforting and satisfying dish perfect for any season.",
  },
  {
    id: "4",
    name: "Black Bean Noodle",
    category: "Noodles",
    price: 23,
    rating: 5,
    reviews: 140,
    image: require("../../assets/images/BlackBeanNoodle.jpg"),
    description:
      "Black Bean Noodles, also known as Jajangmyeon, is a popular Korean-Chinese dish featuring wheat noodles topped with a thick sauce made from black bean paste, diced pork, and vegetables.",
  },
];

const categories = ["All", "Noodles", "Rice", "Drinks"];

const MenuScreen = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [refreshing, setRefreshing] = React.useState(false);
  const navigation = useNavigation();

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate a data refresh
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert("Refreshed", "Menu items have been refreshed!");
    }, 1000);
  }, []);

  const renderStars = (rating) => {
    return [...Array(rating)].map((_, index) => (
      <Ionicons key={index} name="star" size={16} color="#FFD700" />
    ));
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSearch = () => {
    Alert.alert("Search", "Search functionality will be implemented here");
  };

  const handleAddToCart = (item) => {
    Alert.alert(
      "Add to Cart",
      `Added ${item.name} to cart. Price: $${item.price}`,
      [{ text: "OK" }]
    );
  };

  const handleFoodPress = (food) => {
    navigation.navigate("FoodDetail", { food });
  };

  const renderFoodItem = ({ item }) => (
    <TouchableOpacity
      style={styles.foodCard}
      onPress={() => handleFoodPress(item)}
    >
      <Image source={item.image} style={styles.foodImage} />
      <View style={styles.ratingContainer}>
        {renderStars(item.rating)}
        <Text style={styles.reviews}>({item.reviews})</Text>
      </View>
      <Text style={styles.categoryLabel}>{item.category}</Text>
      <Text style={styles.foodName}>{item.name}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => handleAddToCart(item)}
        >
          <Ionicons name="cart-outline" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>MENU</Text>
          <TouchableOpacity onPress={handleSearch}>
            <Ionicons name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filteredItems}
          renderItem={renderFoodItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.foodList}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#FE5621"]}
              tintColor="#FE5621"
            />
          }
          showsVerticalScrollIndicator={false}
        />
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
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  categoryContainer: {
    flexDirection: "row",
    backgroundColor: "#FE5621",
    justifyContent: "space-around",
    paddingVertical: 12,
  },
  categoryButton: {
    paddingVertical: 10,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  selectedCategory: {
    backgroundColor: "transparent",
    borderRadius: 0,
    borderBottomWidth: 3,
    borderBottomColor: "#000",
  },
  categoryText: {
    color: "#000000",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
  selectedCategoryText: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 16,
  },
  foodList: {
    padding: 10,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  foodCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 15,
    padding: 0,
    overflow: "hidden",
  },
  foodImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    paddingHorizontal: 8,
  },
  reviews: {
    marginLeft: 4,
    color: "#666666",
    fontSize: 12,
  },
  categoryLabel: {
    color: "#888",
    fontSize: 12,
    paddingHorizontal: 8,
  },
  foodName: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 2,
    paddingHorizontal: 8,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FE5621",
  },
  cartButton: {
    backgroundColor: "#FE5621",
    borderRadius: 5,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MenuScreen;
