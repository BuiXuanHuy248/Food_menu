import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import MenuScreen from "./app/screens/MenuScreen";
import HomeScreen from "./app/screens/HomeScreen";
import FoodDetailScreen from "./app/screens/FoodDetailScreen";
import CartScreen from "./app/screens/CartScreen";
import PaymentScreen from "./app/screens/PaymentScreen";
import OrderSuccessScreen from "./app/screens/OrderSuccessScreen";
import QRCodePaymentScreen from "./app/screens/QRCodePaymentScreen";
import PaymentSuccessScreen from "./app/screens/PaymentSuccessScreen";
import AddCardScreen from "./app/screens/AddCardScreen";

// Create navigation stacks
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab navigator configuration
function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Menu"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Menu") {
            iconName = focused ? "restaurant" : "restaurant-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FF6B6B",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FoodDetail"
            component={FoodDetailScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Payment"
            component={PaymentScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OrderSuccess"
            component={OrderSuccessScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="QRCodePayment"
            component={QRCodePaymentScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PaymentSuccessScreen"
            component={PaymentSuccessScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddCard"
            component={AddCardScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
