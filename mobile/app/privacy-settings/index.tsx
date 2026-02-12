import { View, Text, ScrollView, Pressable, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import * as Haptics from "expo-haptics";

const PrivacySettingsScreen = () => {
    const router = useRouter();
    const [profileVisibility, setProfileVisibility] = useState(true);
    const [readReceipts, setReadReceipts] = useState(true);
    const [lastSeen, setLastSeen] = useState(true);
    const [onlineStatus, setOnlineStatus] = useState(true);

    const handleToggle = async (setter: (value: boolean) => void, currentValue: boolean) => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setter(!currentValue);
    };

    return (
        <View className="flex-1 bg-surface-dark">
            {/* Header */}
            <View className="px-5 pt-16 pb-4 border-b border-surface-light">
                <View className="flex-row items-center">
                    <Pressable
                        onPress={() => router.back()}
                        className="w-10 h-10 items-center justify-center active:opacity-70 -ml-2"
                    >
                        <Ionicons name="arrow-back" size={24} color="#F4F4F5" />
                    </Pressable>
                    <Text className="text-xl font-bold text-foreground ml-2">Privacy & Security</Text>
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {/* Privacy Section */}
                <View className="mt-6 mx-5">
                    <Text className="text-subtle-foreground text-xs font-semibold uppercase tracking-wider mb-2 ml-1">
                        Privacy
                    </Text>
                    <View className="bg-surface-card rounded-2xl overflow-hidden">
                        {/* Profile Visibility */}
                        <View className="flex-row items-center justify-between px-4 py-4 border-b border-surface-light">
                            <View className="flex-1">
                                <Text className="text-foreground font-medium">Profile Visibility</Text>
                                <Text className="text-muted-foreground text-sm mt-0.5">
                                    Allow others to see your profile
                                </Text>
                            </View>
                            <Switch
                                value={profileVisibility}
                                onValueChange={() => handleToggle(setProfileVisibility, profileVisibility)}
                                trackColor={{ false: "#3A3A3D", true: "#F4A26180" }}
                                thumbColor={profileVisibility ? "#F4A261" : "#6B6B70"}
                            />
                        </View>

                        {/* Read Receipts */}
                        <View className="flex-row items-center justify-between px-4 py-4 border-b border-surface-light">
                            <View className="flex-1">
                                <Text className="text-foreground font-medium">Read Receipts</Text>
                                <Text className="text-muted-foreground text-sm mt-0.5">
                                    Let others know when you've read their messages
                                </Text>
                            </View>
                            <Switch
                                value={readReceipts}
                                onValueChange={() => handleToggle(setReadReceipts, readReceipts)}
                                trackColor={{ false: "#3A3A3D", true: "#F4A26180" }}
                                thumbColor={readReceipts ? "#F4A261" : "#6B6B70"}
                            />
                        </View>

                        {/* Last Seen */}
                        <View className="flex-row items-center justify-between px-4 py-4 border-b border-surface-light">
                            <View className="flex-1">
                                <Text className="text-foreground font-medium">Last Seen</Text>
                                <Text className="text-muted-foreground text-sm mt-0.5">
                                    Show when you were last active
                                </Text>
                            </View>
                            <Switch
                                value={lastSeen}
                                onValueChange={() => handleToggle(setLastSeen, lastSeen)}
                                trackColor={{ false: "#3A3A3D", true: "#F4A26180" }}
                                thumbColor={lastSeen ? "#F4A261" : "#6B6B70"}
                            />
                        </View>

                        {/* Online Status */}
                        <View className="flex-row items-center justify-between px-4 py-4">
                            <View className="flex-1">
                                <Text className="text-foreground font-medium">Online Status</Text>
                                <Text className="text-muted-foreground text-sm mt-0.5">
                                    Show when you're online
                                </Text>
                            </View>
                            <Switch
                                value={onlineStatus}
                                onValueChange={() => handleToggle(setOnlineStatus, onlineStatus)}
                                trackColor={{ false: "#3A3A3D", true: "#F4A26180" }}
                                thumbColor={onlineStatus ? "#F4A261" : "#6B6B70"}
                            />
                        </View>
                    </View>
                </View>

                {/* Security Section */}
                <View className="mt-6 mx-5">
                    <Text className="text-subtle-foreground text-xs font-semibold uppercase tracking-wider mb-2 ml-1">
                        Security
                    </Text>
                    <View className="bg-surface-card rounded-2xl overflow-hidden">
                        {/* Blocked Users */}
                        <Pressable className="flex-row items-center px-4 py-4 border-b border-surface-light active:bg-surface-light">
                            <View className="w-9 h-9 rounded-xl items-center justify-center bg-red-500/20">
                                <Ionicons name="ban-outline" size={20} color="#EF4444" />
                            </View>
                            <Text className="flex-1 ml-3 text-foreground font-medium">Blocked Users</Text>
                            <Ionicons name="chevron-forward" size={18} color="#6B6B70" />
                        </Pressable>

                        {/* Two-Factor Authentication */}
                        <Pressable className="flex-row items-center px-4 py-4">
                            <View className="w-9 h-9 rounded-xl items-center justify-center bg-green-500/20">
                                <Ionicons name="shield-checkmark-outline" size={20} color="#10B981" />
                            </View>
                            <Text className="flex-1 ml-3 text-foreground font-medium">Two-Factor Authentication</Text>
                            <Ionicons name="chevron-forward" size={18} color="#6B6B70" />
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default PrivacySettingsScreen;
