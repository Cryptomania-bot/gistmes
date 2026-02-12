import { View, Text, ScrollView, Pressable, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import * as Haptics from "expo-haptics";

const NotificationsSettingsScreen = () => {
    const router = useRouter();
    const [messageNotifications, setMessageNotifications] = useState(true);
    const [sound, setSound] = useState(true);
    const [vibration, setVibration] = useState(true);
    const [showPreview, setShowPreview] = useState(true);
    const [groupNotifications, setGroupNotifications] = useState(true);

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
                    <Text className="text-xl font-bold text-foreground ml-2">Notifications</Text>
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {/* Message Notifications */}
                <View className="mt-6 mx-5">
                    <Text className="text-subtle-foreground text-xs font-semibold uppercase tracking-wider mb-2 ml-1">
                        Messages
                    </Text>
                    <View className="bg-surface-card rounded-2xl overflow-hidden">
                        {/* Enable Notifications */}
                        <View className="flex-row items-center justify-between px-4 py-4 border-b border-surface-light">
                            <View className="flex-1">
                                <Text className="text-foreground font-medium">Message Notifications</Text>
                                <Text className="text-muted-foreground text-sm mt-0.5">
                                    Receive notifications for new messages
                                </Text>
                            </View>
                            <Switch
                                value={messageNotifications}
                                onValueChange={() => handleToggle(setMessageNotifications, messageNotifications)}
                                trackColor={{ false: "#3A3A3D", true: "#F4A26180" }}
                                thumbColor={messageNotifications ? "#F4A261" : "#6B6B70"}
                            />
                        </View>

                        {/* Show Preview */}
                        <View className="flex-row items-center justify-between px-4 py-4 border-b border-surface-light">
                            <View className="flex-1">
                                <Text className="text-foreground font-medium">Show Preview</Text>
                                <Text className="text-muted-foreground text-sm mt-0.5">
                                    Display message content in notifications
                                </Text>
                            </View>
                            <Switch
                                value={showPreview}
                                onValueChange={() => handleToggle(setShowPreview, showPreview)}
                                trackColor={{ false: "#3A3A3D", true: "#F4A26180" }}
                                thumbColor={showPreview ? "#F4A261" : "#6B6B70"}
                                disabled={!messageNotifications}
                            />
                        </View>

                        {/* Group Notifications */}
                        <View className="flex-row items-center justify-between px-4 py-4">
                            <View className="flex-1">
                                <Text className="text-foreground font-medium">Group Notifications</Text>
                                <Text className="text-muted-foreground text-sm mt-0.5">
                                    Receive notifications for group messages
                                </Text>
                            </View>
                            <Switch
                                value={groupNotifications}
                                onValueChange={() => handleToggle(setGroupNotifications, groupNotifications)}
                                trackColor={{ false: "#3A3A3D", true: "#F4A26180" }}
                                thumbColor={groupNotifications ? "#F4A261" : "#6B6B70"}
                                disabled={!messageNotifications}
                            />
                        </View>
                    </View>
                </View>

                {/* Alert Style */}
                <View className="mt-6 mx-5">
                    <Text className="text-subtle-foreground text-xs font-semibold uppercase tracking-wider mb-2 ml-1">
                        Alert Style
                    </Text>
                    <View className="bg-surface-card rounded-2xl overflow-hidden">
                        {/* Sound */}
                        <View className="flex-row items-center justify-between px-4 py-4 border-b border-surface-light">
                            <View className="flex-1">
                                <Text className="text-foreground font-medium">Sound</Text>
                                <Text className="text-muted-foreground text-sm mt-0.5">
                                    Play sound for notifications
                                </Text>
                            </View>
                            <Switch
                                value={sound}
                                onValueChange={() => handleToggle(setSound, sound)}
                                trackColor={{ false: "#3A3A3D", true: "#F4A26180" }}
                                thumbColor={sound ? "#F4A261" : "#6B6B70"}
                                disabled={!messageNotifications}
                            />
                        </View>

                        {/* Vibration */}
                        <View className="flex-row items-center justify-between px-4 py-4">
                            <View className="flex-1">
                                <Text className="text-foreground font-medium">Vibration</Text>
                                <Text className="text-muted-foreground text-sm mt-0.5">
                                    Vibrate for notifications
                                </Text>
                            </View>
                            <Switch
                                value={vibration}
                                onValueChange={() => handleToggle(setVibration, vibration)}
                                trackColor={{ false: "#3A3A3D", true: "#F4A26180" }}
                                thumbColor={vibration ? "#F4A261" : "#6B6B70"}
                                disabled={!messageNotifications}
                            />
                        </View>
                    </View>
                </View>

                {/* Info Note */}
                <View className="mx-5 mt-6 bg-surface-card rounded-2xl p-4">
                    <View className="flex-row">
                        <Ionicons name="information-circle-outline" size={20} color="#F4A261" />
                        <Text className="flex-1 ml-2 text-muted-foreground text-sm">
                            Notification settings may also be controlled by your device's system settings.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default NotificationsSettingsScreen;
