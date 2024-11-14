import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dimensions, Platform } from "react-native";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";

export const Tab = createBottomTabNavigator();

export const useAppDispatch: () => AppDispatch = useDispatch;

export const ios = Platform.OS === "ios";

export const screenWidth = Dimensions.get("window").width;
