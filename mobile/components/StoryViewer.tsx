import { View, Text, Modal, Image, Dimensions, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

type StoryViewerProps = {
    visible: boolean;
    stories: any[];
    initialStoryIndex: number;
    onClose: () => void;
};

export default function StoryViewer({ visible, stories, initialStoryIndex, onClose }: StoryViewerProps) {
    const [currentIndex, setCurrentIndex] = useState(initialStoryIndex);

    useEffect(() => {
        setCurrentIndex(initialStoryIndex);
    }, [initialStoryIndex]);

    if (!visible || !stories || stories.length === 0) return null;

    const currentStory = stories[currentIndex];

    const handleNext = () => {
        if (currentIndex < stories.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            onClose();
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <Modal visible={visible} animationType="fade" transparent>
            <View className="flex-1 bg-black">
                <SafeAreaView className="flex-1">
                    {/* Progress Bar (simplified) */}
                    <View className="flex-row gap-1 px-2 pt-2">
                        {stories.map((_, index) => (
                            <View
                                key={index}
                                className={`h-1 flex-1 rounded-full ${index <= currentIndex ? "bg-white" : "bg-white/30"}`}
                            />
                        ))}
                    </View>

                    {/* Header */}
                    <View className="flex-row items-center justify-between p-4">
                        <View className="flex-row items-center gap-2">
                            <Image
                                source={{ uri: currentStory.user.avatar }}
                                style={{ width: 32, height: 32, borderRadius: 16 }}
                            />
                            <Text className="text-white font-semibold">{currentStory.user.name}</Text>
                        </View>
                        <Pressable onPress={onClose}>
                            <Ionicons name="close" size={28} color="white" />
                        </Pressable>
                    </View>

                    {/* Content */}
                    <View className="flex-1 relative">
                        {/* Tap Areas */}
                        <Pressable className="absolute left-0 top-0 bottom-0 w-1/3 z-10" onPress={handlePrev} />
                        <Pressable className="absolute right-0 top-0 bottom-0 w-1/3 z-10" onPress={handleNext} />

                        <Image
                            source={{ uri: currentStory.mediaUrl }}
                            style={{ width: width, height: height * 0.8, resizeMode: "contain" }}
                        />

                        {currentStory.text && (
                            <View className="absolute bottom-10 left-0 right-0 items-center p-4">
                                <Text className="text-white text-center text-lg font-medium drop-shadow-md">
                                    {currentStory.text}
                                </Text>
                            </View>
                        )}
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    );
}
