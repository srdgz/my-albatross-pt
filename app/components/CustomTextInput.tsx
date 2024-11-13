import React from "react";
import { TextInput } from "react-native";

interface CustomTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  editable: boolean;
  placeholder: string;
}

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
