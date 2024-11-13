import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const Loading: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#10b981" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#1f2937",
  },
});

export default Loading;
