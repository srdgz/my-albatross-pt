import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

interface CurrencyDetailModalProps {
  visible: boolean;
  onClose: () => void;
  currencyData: {
    code: string;
    history: Array<{ date: string; rate: number }>;
  } | null;
}

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
            <Text className="text-lg text-gray-400 text-center mt-6">
              Loading currency details...
            </Text>
          )}
        </View>
        <TouchableOpacity
          className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-zinc-800 border border-emerald-500 px-10 py-4 rounded-full"
          onPress={onClose}
        >
          <Text className="text-white text-center text-2xl font-bold">
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  modal: {
    backgroundColor: "#1f2937",
    borderRadius: 8,
    padding: 16,
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 16,
    color: "#9ca3af",
    textAlign: "center",
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: "#34d399",
    paddingVertical: 10,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8,
  },
});

export default CurrencyDetailModal;
