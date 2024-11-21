import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import Home from "../screens/Home";
import Calculator from "../screens/Calculator";
import Wiki from "../screens/Wiki";
import Tables from "../screens/Tables";

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Calculator") {
              iconName = focused ? "calculator" : "calculator-outline";
            } else if (route.name === "Wiki") {
              iconName = focused ? "book" : "book-outline";
            } else if (route.name === "Tables") {
              iconName = focused ? "grid" : "grid-outline";
            }

            return <Ionicons name={iconName} size={size} color={"black"} />;
          },
          tabBarActiveTintColor: "#4A90E2",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            transform: [{ scale: 1.1 }],
            transitionProperty: "transform",
            transitionDuration: "0.5s",
          },
          headerStyle: {
            backgroundColor: "#6b97d6",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Calculator" component={Calculator} />
        <Tab.Screen name="Wiki" component={Wiki} />
        <Tab.Screen name="Tables" component={Tables} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
