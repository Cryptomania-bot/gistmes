import { useAuth } from "@clerk/clerk-expo";
import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!isLoaded) return;

    // We check if we are already in the right place to avoid loops
    const inAuthGroup = segments[0] === "(auth)";

    if (isSignedIn) {
      router.replace("/(tabs)");
    } else if (!isSignedIn) {
      router.replace("/(auth)");
    }
  }, [isSignedIn, isLoaded]);

  return (
    <View className="flex-1 items-center justify-center bg-[#0D0D0F]">
      <ActivityIndicator size="large" color="white" />
    </View>
  );
}