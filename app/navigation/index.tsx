import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import CurrenciesScreen from "../screens/CurrenciesScreen";

type IoniconName = "cash" | "cash-outline" | "person" | "person-outline";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName: IoniconName = "cash-outline";

          if (route.name === "Currencies") {
            iconName = focused ? "cash" : "cash-outline";
          } else if (route.name === "User") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={30} color={color} />;
        },
        tabBarActiveTintColor: "#56D1A3",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#111827",
          borderTopWidth: 0,
        },
      })}
    >
      <Tab.Screen name="Currencies" component={CurrenciesScreen} />
    </Tab.Navigator>
  );
}
