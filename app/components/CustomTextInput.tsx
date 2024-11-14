import React from "react";
import { TextInput } from "react-native";
import { CustomTextInputProps } from "../types/types";

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  value,
  onChangeText,
  editable,
  placeholder,
}) => {
  return (
    <TextInput
      className="bg-gray-700 text-white border border-emerald-500 rounded-lg text-xl p-4 my-4"
      value={value}
      onChangeText={onChangeText}
      editable={editable}
      placeholder={placeholder}
      placeholderTextColor="gray"
    />
  );
};

export default CustomTextInput;
