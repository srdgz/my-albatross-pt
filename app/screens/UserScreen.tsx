import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, updateUser } from "../redux/userSlice";
import { AppDispatch, RootState } from "../redux/store";
import CustomButton from "../components/CustomButton";
import CustomTextInput from "../components/CustomTextInput";
import Loading from "../components/Loading";

const UserScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserDataState] = useState({
    name: "",
    username: "",
    email: "",
    birthDate: "",
  });

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (user.id) {
      setUserDataState({
        name: user.name,
        username: user.username,
        email: user.email,
        birthDate: user.birthDate,
      });
    }
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    try {
      dispatch(updateUser(userData));
      setIsEditing(false);
    } catch (error: any) {
      console.error("Error updating user:", error.message);
    }
  };

  const handleChange = (field: string, value: string) => {
    setUserDataState((prev) => ({ ...prev, [field]: value }));
  };

  if (user.status === "loading") {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-gray-800">
      <View className="flex-row justify-center items-center py-4">
        <Text className="text-2xl text-emerald-500 font-bold w-1/3 text-center">
          User Details
        </Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 p-2">
            <CustomTextInput
              value={userData.name}
              onChangeText={(text) => handleChange("name", text)}
              editable={isEditing}
              placeholder="Name"
            />
            <CustomTextInput
              value={userData.username}
              onChangeText={(text) => handleChange("username", text)}
              editable={isEditing}
              placeholder="Username"
            />
            <CustomTextInput
              value={userData.email}
              onChangeText={(text) => handleChange("email", text)}
              editable={isEditing}
              placeholder="Email"
            />
            <CustomTextInput
              value={userData.birthDate}
              onChangeText={(text) => handleChange("birthDate", text)}
              editable={isEditing}
              placeholder="Birth Date"
            />

            {isEditing ? (
              <CustomButton onPress={handleSave} title="Save" />
            ) : (
              <CustomButton onPress={handleEdit} title="Edit" />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default UserScreen;
