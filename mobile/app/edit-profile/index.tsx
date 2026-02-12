import { useUser } from "@clerk/clerk-expo";
import { View, Text, ScrollView, Pressable, TextInput, Alert, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import * as Haptics from "expo-haptics";

const EditProfileScreen = () => {
  const { user } = useUser();
  const router = useRouter();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const handleSave = async () => {
    if (!user) return;

    try {
      setLoading(true);
      await user.update({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });

      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert("Success", "Profile updated successfully", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error("Error updating profile:", error);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImagePick = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== "granted") {
        Alert.alert("Permission Required", "Please grant permission to access your photos.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setImageLoading(true);
        const imageUri = result.assets[0].uri;
        
        // Convert URI to blob for Clerk
        const response = await fetch(imageUri);
        const blob = await response.blob();
        
        await user?.setProfileImage({ file: blob });
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        
        setImageLoading(false);
      }
    } catch (error) {
      console.error("Error updating profile image:", error);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert("Error", "Failed to update profile image. Please try again.");
      setImageLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-surface-dark">
      {/* Header */}
      <View className="px-5 pt-16 pb-4 border-b border-surface-light">
        <View className="flex-row items-center justify-between">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center active:opacity-70"
          >
            <Ionicons name="close" size={28} color="#F4F4F5" />
          </Pressable>
          <Text className="text-xl font-bold text-foreground">Edit Profile</Text>
          <Pressable
            onPress={handleSave}
            disabled={loading}
            className="w-10 h-10 items-center justify-center active:opacity-70"
          >
            {loading ? (
              <ActivityIndicator size="small" color="#F4A261" />
            ) : (
              <Ionicons name="checkmark" size={28} color="#F4A261" />
            )}
          </Pressable>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Profile Picture */}
        <View className="items-center mt-8 mb-8">
          <View className="relative">
            <View className="rounded-full border-2 border-primary">
              {imageLoading ? (
                <View className="w-32 h-32 rounded-full bg-surface-card items-center justify-center">
                  <ActivityIndicator size="large" color="#F4A261" />
                </View>
              ) : (
                <Image
                  source={user?.imageUrl}
                  style={{ width: 128, height: 128, borderRadius: 999 }}
                />
              )}
            </View>

            <Pressable
              onPress={handleImagePick}
              disabled={imageLoading}
              className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full items-center justify-center border-2 border-surface-dark active:opacity-70"
            >
              <Ionicons name="camera" size={20} color="#0D0D0F" />
            </Pressable>
          </View>

          <Text className="text-muted-foreground text-sm mt-3">
            Tap the camera icon to change photo
          </Text>
        </View>

        {/* Form Fields */}
        <View className="px-5 space-y-4">
          {/* First Name */}
          <View>
            <Text className="text-subtle-foreground text-xs font-semibold uppercase tracking-wider mb-2 ml-1">
              First Name
            </Text>
            <View className="bg-surface-card rounded-2xl px-4 py-4 border border-surface-light">
              <TextInput
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Enter first name"
                placeholderTextColor="#6B6B70"
                className="text-foreground text-base"
                autoCapitalize="words"
              />
            </View>
          </View>

          {/* Last Name */}
          <View className="mt-4">
            <Text className="text-subtle-foreground text-xs font-semibold uppercase tracking-wider mb-2 ml-1">
              Last Name
            </Text>
            <View className="bg-surface-card rounded-2xl px-4 py-4 border border-surface-light">
              <TextInput
                value={lastName}
                onChangeText={setLastName}
                placeholder="Enter last name"
                placeholderTextColor="#6B6B70"
                className="text-foreground text-base"
                autoCapitalize="words"
              />
            </View>
          </View>

          {/* Email (Read-only) */}
          <View className="mt-4">
            <Text className="text-subtle-foreground text-xs font-semibold uppercase tracking-wider mb-2 ml-1">
              Email
            </Text>
            <View className="bg-surface-card rounded-2xl px-4 py-4 border border-surface-light opacity-60">
              <Text className="text-foreground text-base">
                {user?.emailAddresses[0]?.emailAddress}
              </Text>
            </View>
            <Text className="text-muted-foreground text-xs mt-1 ml-1">
              Email cannot be changed
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;
