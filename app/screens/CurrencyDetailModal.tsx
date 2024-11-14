import React from "react";
import { Modal, View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import CustomButton from "../components/CustomButton";
import Loading from "../components/Loading";
import { CurrencyDetailModalProps } from "../types/types";

const screenWidth = Dimensions.get("window").width;

const formatDate = (date: string) => {
  const parsedDate = new Date(date);
  const year = parsedDate.getFullYear();
  const month = parsedDate.getMonth() + 1;
  return `${year}-${month < 10 ? `0${month}` : month}`;
};

const CurrencyDetailModal: React.FC<CurrencyDetailModalProps> = ({
  visible,
  onClose,
  currencyData,
}) => {
  const generateChartData = () => {
    if (!currencyData) return { labels: [], datasets: [] };

    const sampledData = currencyData.history.filter(
      (_, index) => index % 35 === 0
    );

    const labels = sampledData.map((item) => formatDate(item.date));
    const rates = sampledData.map((item) => item.rate);

    return {
      labels,
      datasets: [
        {
          data: rates,
          strokeWidth: 2,
        },
      ],
    };
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 bg-gray-800">
        <Text className="text-4xl font-bold text-white text-center mt-24">
          <Text className="text-emerald-500">{currencyData?.code}</Text> Details
        </Text>
        <View className="flex-1 justify-center items-center">
          {currencyData ? (
            <>
              <LineChart
                data={generateChartData()}
                width={screenWidth * 0.95}
                height={screenWidth * 1}
                withVerticalLines={false}
                withHorizontalLines={false}
                verticalLabelRotation={90}
                chartConfig={{
                  backgroundGradientFrom: "#1f2937",
                  backgroundGradientTo: "#4b5563",
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(86, 209, 163, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 8,
                  },
                  propsForDots: {
                    r: "2",
                    strokeWidth: "1",
                    stroke: "#34d399",
                  },
                }}
                bezier
                style={{ borderRadius: 8 }}
              />
            </>
          ) : (
            <Loading />
          )}
        </View>
        <CustomButton onPress={onClose} title="Close" />
      </View>
    </Modal>
  );
};

export default CurrencyDetailModal;
