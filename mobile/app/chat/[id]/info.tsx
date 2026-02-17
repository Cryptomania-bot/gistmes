import { View, Text, ScrollView, Pressable, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useChat } from "@/hooks/useChats";
import { useCurrentUser } from "@/hooks/useAuth";
import * as Clipboard from 'expo-clipboard';

export default function GroupInfoScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { data: chat, isLoading } = useChat(id);
    const { data: currentUser } = useCurrentUser();

    if (isLoading) {
        return (
            <View className="flex-1 bg-surface items-center justify-center">
                <ActivityIndicator size="large" color="#F4A261" />
            </View>
        );
    }

    if (!chat) {
        return (
            <View className="flex-1 bg-surface items-center justify-center">
                <Text className="text-foreground">Chat not found</Text>
            </View>
        );
    }

    const isAdmin = chat.admin === currentUser?._id;

    const copyInviteCode = async () => {
        if (chat.inviteCode) {
            await Clipboard.setStringAsync(chat.inviteCode);
            Alert.alert("Copied", "Invite code copied to clipboard!");
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
            <View className="px-4 py-2 flex-row items-center cursor-pointer">
                <Pressable onPress={() => router.back()} className="mr-4">
                    <Ionicons name="arrow-back" size={24} color="#F4A261" />
                </Pressable>
                <Text className="text-xl font-bold text-foreground">Group Info</Text>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Header Info */}
                <View className="items-center py-6 border-b border-surface-light">
                    <Image
                        source={chat.groupImage || require("@/assets/images/icon.png")}
                        style={{ width: 100, height: 100, borderRadius: 50 }}
                        className="mb-4 bg-surface-light"
                    />
                    <Text className="text-2xl font-bold text-foreground mb-1">{chat.name}</Text>
                    <Text className="text-subtle-foreground text-center px-8">
                        {chat.description || "No description"}
                    </Text>
                </View>

                {/* Admin Actions */}
                {isAdmin && (
                    <View className="px-4 py-6 border-b border-surface-light">
                        <Text className="text-sm font-bold text-subtle-foreground mb-3 uppercase tracking-wider">Admin Controls</Text>

                        <Pressable
                            className="flex-row items-center justify-between bg-surface-card p-4 rounded-xl mb-3"
                            onPress={copyInviteCode}
                        >
                            <View className="flex-row items-center gap-3">
                                <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
                                    <Ionicons name="link" size={20} color="#F4A261" />
                                </View>
                                <View>
                                    <Text className="text-foreground font-medium">Invite Code</Text>
                                    <Text className="text-subtle-foreground text-xs">{chat.inviteCode || "Generate Code"}</Text>
                                </View>
                            </View>
                            <Ionicons name="copy-outline" size={20} color="#6B6B70" />
                        </Pressable>

                        <Pressable className="flex-row items-center justify-between bg-surface-card p-4 rounded-xl">
                            <View className="flex-row items-center gap-3">
                                <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
                                    <Ionicons name="settings-outline" size={20} color="#F4A261" />
                                </View>
                                <View>
                                    <Text className="text-foreground font-medium">Group Settings</Text>
                                    <Text className="text-subtle-foreground text-xs">Manage permissions</Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#6B6B70" />
                        </Pressable>
                    </View>
                )}

                {/* Participants */}
                <View className="px-4 py-6">
                    <Text className="text-sm font-bold text-subtle-foreground mb-3 uppercase tracking-wider">
                        {chat.participants?.length || 0} Participants
                    </Text>

                    {chat.participants?.map((participant: any) => (
                        <View key={participant._id} className="flex-row items-center justify-between py-3 border-b border-surface-light/50">
                            <View className="flex-row items-center gap-3">
                                <Image
                                    source={participant.avatar}
                                    style={{ width: 40, height: 40, borderRadius: 20 }}
                                />
                                <View>
                                    <Text className="text-foreground font-medium">{participant.name}</Text>
                                    <Text className="text-subtle-foreground text-xs">{participant.email}</Text>
                                </View>
                            </View>
                            {chat.admin === participant._id && (
                                <View className="bg-primary/20 px-2 py-1 rounded-md">
                                    <Text className="text-primary text-xs font-bold">Admin</Text>
                                </View>
                            )}
                        </View>
                    ))}
                </View>

                <Pressable className="mx-4 mt-4 p-4 rounded-xl bg-red-500/10 items-center border border-red-500/20">
                    <Text className="text-red-500 font-bold">Leave Group</Text>
                </Pressable>

            </ScrollView>
        </SafeAreaView>
    );
}
