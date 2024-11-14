import React from "react";
import { View, Text, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ios } from "../utils/constants";

const Header: React.FC = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View
      className="flex-row items-center justify-center px-4 py-4 bg-gray-800"
      style={{ paddingTop: ios ? top : top + 10 }}
    >
      <Image
        source={require("../../assets/images/icon.png")}
        style={{ width: 24, height: 24, marginRight: 4 }}
        resizeMode="contain"
      />
      <Text className="text-2xl text-white font-bold">
        <Text className="text-emerald-500">my</Text>albatross
      </Text>
    </View>
  );
};

export default Header;
