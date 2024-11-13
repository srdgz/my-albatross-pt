import React from "react";
import { View, Text, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HeaderProps {
  title?: string;
}

const ios = Platform.OS === "ios";

const Header: React.FC<HeaderProps> = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View
      className="flex-row items-center justify-center px-4 py-4 bg-gray-800"
      style={{ paddingTop: ios ? top : top + 10 }}
    >
      <Text className="text-2xl text-white font-bold">
        <Text className="text-emerald-500">my</Text>albatross
      </Text>
    </View>
  );
};

export default Header;
