import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, updateUser } from "../redux/userSlice";
import { AppDispatch, RootState } from "../redux/store";
import CustomButton from "../components/CustomButton";

const UserView: React.FC = () => {
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
    dispatch(updateUser(userData));
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    setUserDataState((prev) => ({ ...prev, [field]: value }));
  };

  if (user.status === "loading") {
    return <Text>Loading...</Text>;
  }

  return (
    <View className="flex-1 bg-gray-800">
      <View className="flex-row justify-center items-center py-4">
        <Text className="text-2xl text-emerald-500 font-bold w-1/3 text-center">
          User Details
        </Text>
      </View>
      <View className="flex-1 p-2">
        <TextInput
          className="bg-gray-700 text-white border border-emerald-500 rounded-lg text-xl p-4 my-4"
          value={userData.name}
          onChangeText={(text) => handleChange("name", text)}
          editable={isEditing}
        />
        <TextInput
          className="bg-gray-700 text-white border border-emerald-500 rounded-lg text-xl p-4 my-4"
          value={userData.username}
          onChangeText={(text) => handleChange("username", text)}
          editable={isEditing}
        />
        <TextInput
          className="bg-gray-700 text-white border border-emerald-500 rounded-lg text-xl p-4 my-4"
          value={userData.email}
          onChangeText={(text) => handleChange("email", text)}
          editable={isEditing}
        />
        <TextInput
          className="bg-gray-700 text-white border border-emerald-500 rounded-lg text-xl p-4 my-4"
          value={userData.birthDate}
          onChangeText={(text) => handleChange("birthDate", text)}
          editable={isEditing}
        />
        {isEditing ? (
          <CustomButton onPress={handleSave} title="Save" />
        ) : (
          <CustomButton onPress={handleEdit} title="Edit" />
        )}
      </View>
    </View>
  );
};

export default UserView;
