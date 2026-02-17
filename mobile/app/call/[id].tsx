import { View, Text, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { BlurView } from "expo-blur";

export default function ActiveCallScreen() {
    const router = useRouter();
    const { id, name, avatar } = useLocalSearchParams<{ id: string; name: string; avatar: string }>();
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isSpeaker, setIsSpeaker] = useState(false);
    const [isVideo, setIsVideo] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setDuration(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleEndCall = () => {
        router.back();
    };

    return (
        <View className="flex-1 bg-surface-dark relative">
            {/* Background Image (Blurred if video off) */}
            <Image
                source={avatar ? { uri: avatar } : require("@/assets/images/adaptive-icon.png")} // Fallback if no avatar
                style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.3 }}
                contentFit="cover"
            />
            <BlurView intensity={80} style={{ position: 'absolute', width: '100%', height: '100%' }} tint="dark" />

            <SafeAreaView className="flex-1 items-center justify-between py-10">
                {/* Header Info */}
                <View className="items-center gap-4 mt-10">
                    <View className="w-32 h-32 rounded-full border-4 border-surface-light overflow-hidden shadow-xl">
                        <Image
                            source={avatar ? { uri: avatar } : require("@/assets/images/adaptive-icon.png")}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </View>
                    <View className="items-center">
                        <Text className="text-3xl font-bold text-white mb-2">{name || "Unknown"}</Text>
                        <Text className="text-primary text-xl font-medium tracking-widest">
                            {formatDuration(duration)}
                        </Text>
                    </View>
                </View>

                {/* Controls */}
                <View className="w-full px-10 pb-10">
                    <View className="flex-row justify-between items-center bg-surface-light/20 rounded-3xl p-6 backdrop-blur-md">
                        {/* Mute */}
                        <Pressable
                            onPress={() => setIsMuted(!isMuted)}
                            className={`p-4 rounded-full ${isMuted ? 'bg-white' : 'bg-surface-light/30'}`}
                        >
                            <Ionicons name={isMuted ? "mic-off" : "mic"} size={28} color={isMuted ? "#000" : "#FFF"} />
                        </Pressable>

                        {/* End Call */}
                        <Pressable
                            onPress={handleEndCall}
                            className="p-5 rounded-full bg-red-500 shadow-lg shadow-red-500/30 transform scale-110"
                        >
                            <Ionicons name="call" size={32} color="white" style={{ transform: [{ rotate: '135deg' }] }} />
                        </Pressable>

                        {/* Speaker */}
                        <Pressable
                            onPress={() => setIsSpeaker(!isSpeaker)}
                            className={`p-4 rounded-full ${isSpeaker ? 'bg-white' : 'bg-surface-light/30'}`}
                        >
                            <Ionicons name={isSpeaker ? "volume-high" : "volume-medium"} size={28} color={isSpeaker ? "#000" : "#FFF"} />
                        </Pressable>
                    </View>

                    {/* Secondary Controls */}
                    <View className="flex-row justify-center gap-6 mt-8">
                        <Pressable
                            onPress={() => setIsVideo(!isVideo)}
                            className={`p-3 rounded-full ${isVideo ? 'bg-white' : 'bg-surface-light/10'}`}
                        >
                            <Ionicons name={isVideo ? "videocam" : "videocam-off"} size={24} color={isVideo ? "#000" : "#FFF"} />
                        </Pressable>
                        <Pressable className="p-3 rounded-full bg-surface-light/10">
                            <Ionicons name="chatbubble" size={24} color="#FFF" />
                        </Pressable>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}
