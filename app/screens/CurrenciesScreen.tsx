import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { fetchCurrencies, fetchCurrencyDetail } from "../redux/currencySlice";
import { RootState } from "../redux/store";
import Ionicons from "@expo/vector-icons/Ionicons";
import CurrencyDetailModal from "./CurrencyDetailModal";
import Loading from "../components/Loading";
import { useAppDispatch } from "../constants/constants";

export default function CurrenciesScreen() {
  const dispatch = useAppDispatch();
  const { list, status } = useSelector((state: RootState) => state.currencies);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<{
    code: string;
    history: Array<{ date: string; rate: number }>;
  } | null>(null);

  const handleOpenModal = async (currencyCode: string) => {
    try {
      const response = await dispatch(
        fetchCurrencyDetail(currencyCode)
      ).unwrap();
      setSelectedCurrency(response);
      setModalVisible(true);
    } catch (error) {
      console.error("Error fetching currency details:", error);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedCurrency(null);
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCurrencies());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "failed") {
    return <Text>Error loading currencies</Text>;
  }

  return (
    <View className="flex-1 bg-gray-800">
      <View className="flex-row justify-between items-center py-4">
        <Text className="text-2xl text-emerald-500 font-bold w-1/3 text-center">
          Currency
        </Text>
        <Text className="text-2xl text-emerald-500 font-bold w-1/3 text-center">
          Rate
        </Text>
        <Text className="text-2xl text-emerald-500 font-bold w-1/3 text-center">
          Chart
        </Text>
      </View>
      <FlatList
        data={list}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center text-center py-4 mb-2 bg-gray-700 mx-2 rounded-xl">
            <View className="w-1/3">
              <Text className="text-2xl text-white font-bold text-center">
                {item.code}
              </Text>
            </View>
            <View className="w-1/3">
              <Text className="text-lg text-gray-200 font-semibold text-center">
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
            <TouchableOpacity
              className="w-1/3"
              onPress={() => handleOpenModal(item.code)}
            >
              <Ionicons
                name="bar-chart-outline"
                size={24}
                color="white"
                className="text-center"
              />
            </TouchableOpacity>
          </View>
        )}
      />
      <CurrencyDetailModal
        visible={modalVisible}
        onClose={handleCloseModal}
        currencyData={selectedCurrency}
      />
    </View>
  );
}
