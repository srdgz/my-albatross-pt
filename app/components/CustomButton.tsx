import React from "react";
import { Pressable, Text } from "react-native";

interface CustomButtonProps {
  onPress: () => void;
  title: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onPress, title }) => {
  return (
    <Pressable
      onPress={onPress}
      className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-gray-700 border border-emerald-500 px-10 py-4 rounded-full"
    >
      <Text className="text-white text-center text-xl font-bold">{title}</Text>
    </Pressable>
  );
};

export default CustomButton;
