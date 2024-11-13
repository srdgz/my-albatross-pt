import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrencies } from "../redux/currencySlice";
import { AppDispatch, RootState } from "../redux/store";
import Ionicons from "@expo/vector-icons/Ionicons";

const useAppDispatch: () => AppDispatch = useDispatch;

export default function CurrenciesScreen() {
  const dispatch = useAppDispatch();
  const { list, status } = useSelector((state: RootState) => state.currencies);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCurrencies());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <Text>Loading...</Text>;
  }

  if (status === "failed") {
    return <Text>Error loading currencies</Text>;
  }

  return (
    <View className="flex-1 bg-zinc-800">
      <View className="flex-row justify-between items-center py-3 border-b border-gray-500">
        <Text className="text-2xl text-white font-bold w-1/3 text-center">
          Currency
        </Text>
        <Text className="text-2xl text-white font-bold w-1/3 text-center">
          Rate
        </Text>
        <Text className="text-2xl text-white font-bold w-1/3 text-center">
          Chart
        </Text>
      </View>
      <FlatList
        data={list}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center text-center py-4 border-b border-gray-500">
            <View className="w-1/3">
              <Text className="text-2xl text-white font-bold text-center">
                {item.code}
              </Text>
            </View>
            <View className="w-1/3">
              <Text className="text-lg text-gray-200 text-center">
                {item.currentRate.toFixed(4)}€
              </Text>
              <View className="flex-row justify-center">
                {item.differenceBetweenYesterdayRate > 0 ? (
                  <Ionicons name="arrow-up" size={18} color="#56d1a3" />
                ) : (
                  <Ionicons name="arrow-down" size={18} color="#dc2626" />
                )}
                <Text
                  className={`text-lg ${
                    item.differenceBetweenYesterdayRate > 0
                      ? "text-emerald-400"
                      : "text-red-600"
                  }`}
                >
                  {item.differenceBetweenYesterdayRate.toFixed(4)}€
                </Text>
              </View>
            </View>
            <View className="w-1/3">
              <Ionicons
                name="bar-chart-outline"
                size={24}
                color="white"
                className="text-center"
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}
