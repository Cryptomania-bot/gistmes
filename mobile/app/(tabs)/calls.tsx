import { View, Text, FlatList, ActivityIndicator, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRecentCalls } from "@/hooks/useCalls";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "expo-router";

export default function CallsScreen() {
    const { data: calls, isLoading } = useRecentCalls();
    const router = useRouter();

    if (isLoading) {
        return (
            <View className="flex-1 bg-surface items-center justify-center">
                <ActivityIndicator size="large" color="#F4A261" />
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
            <View className="px-4 pb-4">
                <Text className="text-3xl font-bold text-foreground font-mono">Calls</Text>
            </View>

            <FlatList
                data={calls}
                keyExtractor={(item) => item._id}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}
                renderItem={({ item }) => (
                    <Pressable
                        className="flex-row items-center justify-between py-3 border-b border-surface-light"
                        onPress={() => router.push({
                            pathname: "/call/[id]",
                            params: {
                                id: item._id,
                                name: item.receiver.name,
                                avatar: item.receiver.avatar
                            }
                        })}
                    >
                        <View className="flex-row items-center gap-3">
                            <Image
                                source={item.receiver.avatar}
                                style={{ width: 48, height: 48, borderRadius: 24 }}
                                className="bg-surface-light"
                            />
                            <View>
                                <Text className="text-foreground font-semibold text-base">{item.receiver.name}</Text>
                                <View className="flex-row items-center gap-1">
                                    <Ionicons
                                        name={item.status === 'missed' ? "arrow-down" : "arrow-up"}
                                        size={14}
                                        color={item.status === 'missed' ? "#ef4444" : "#22c55e"}
                                    />
                                    <Text className="text-subtle-foreground text-xs">
                                        {formatDistanceToNow(new Date(item.startedAt), { addSuffix: true })}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <Pressable className="p-2">
                            <Ionicons name="call-outline" size={24} color="#F4A261" />
                        </Pressable>
                    </Pressable>
                )}
                ListEmptyComponent={
                    <View className="items-center justify-center py-20">
                        <Ionicons name="call-outline" size={64} color="#3F3F46" />
                        <Text className="text-subtle-foreground mt-4">No recent calls</Text>
                    </View>
                }
            />

            <Pressable
                className="absolute bottom-6 right-6 w-14 h-14 bg-primary rounded-full items-center justify-center shadow-lg shadow-orange-500/20"
            // For now, just a dummy action or maybe open contact picker to start call
            >
                <Ionicons name="add-outline" size={30} color="#0D0D0F" />
            </Pressable>
        </SafeAreaView>
    );
}
