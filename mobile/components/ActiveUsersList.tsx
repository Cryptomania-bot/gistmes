import { View, Text, ScrollView, Pressable } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useCurrentUser } from "@/hooks/useAuth";

// Mock data for initial implementation
const MOCK_ACTIVE_USERS = [
    { id: "1", name: "Emma", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
    { id: "2", name: "Mia", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
    { id: "3", name: "Alex", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
    { id: "4", name: "Daniel", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
    { id: "5", name: "Team", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop" },
];

export default function ActiveUsersList() {
    const { data: user } = useCurrentUser();

    return (
        <View className="mb-6">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}
            >
                {/* Add Story Button */}
                <View className="items-center gap-1">
                    <View className="relative">
                        <View className="w-16 h-16 rounded-full border-2 border-dashed border-primary/50 items-center justify-center">
                            <Image
                                source={user?.avatar}
                                style={{ width: 56, height: 56, borderRadius: 999 }}
                            />
                        </View>
                        <View className="absolute bottom-0 right-0 w-5 h-5 bg-primary rounded-full items-center justify-center border-2 border-surface">
                            <Ionicons name="add" size={14} color="#0D0D0F" />
                        </View>
                    </View>
                    <Text className="text-xs text-subtle-foreground">My Story</Text>
                </View>

                {/* Active Users */}
                {MOCK_ACTIVE_USERS.map((activeUser) => (
                    <Pressable key={activeUser.id} className="items-center gap-1">
                        <View className="relative">
                            <View className="w-16 h-16 rounded-full border-2 border-primary items-center justify-center p-0.5">
                                <Image
                                    source={activeUser.avatar}
                                    style={{ width: "100%", height: "100%", borderRadius: 999 }}
                                />
                            </View>
                            {/* Online Dot */}
                            <View className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-surface" />
                        </View>
                        <Text className="text-xs text-foreground font-medium">{activeUser.name}</Text>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
}
