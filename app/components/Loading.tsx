import React from "react";
import { View, ActivityIndicator } from "react-native";

const Loading: React.FC = () => {
  return (
    <View className="flex-1 justify-center items-center absolute inset-0 bg-gray-800">
      <ActivityIndicator size="large" color="#10b981" />
    </View>
  );
};

export default Loading;
