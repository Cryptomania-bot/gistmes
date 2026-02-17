import { View, Text, Pressable, TextInput, Image as RNImage, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import { useCreateStory } from "@/hooks/useStories";

export default function NewStoryScreen() {
    const router = useRouter();
    const [image, setImage] = useState<string | null>(null);
    const [caption, setCaption] = useState("");
    const { mutate: createStory, isPending } = useCreateStory();

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [9, 16],
            quality: 0.8,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handlePost = () => {
        if (!image) return;

        // In a real app, we would upload the image to a storage bucket (Cloudinary/S3) here.
        // For this demo, we'll just use the local URI or a placeholder if it's not a remote URL.
        // Since we don't have a real storage backend setup in this environment:
        // We will simulate by sending a dummy remote URL or just the local one (which won't work for others but works for demo).

        // TODO: Implement actual file upload
        const mediaUrl = image;

        createStory({
            mediaUrl: mediaUrl,
            type: 'image',
            text: caption
        }, {
            onSuccess: () => {
                router.back();
            }
        });
    };

    return (
        <SafeAreaView className="flex-1 bg-surface-dark">
            <View className="flex-row items-center justify-between p-4">
                <Pressable onPress={() => router.back()}>
                    <Ionicons name="close" size={28} color="white" />
                </Pressable>
                <Text className="text-white font-bold text-lg">New Story</Text>
                <Pressable
                    onPress={handlePost}
                    disabled={!image || isPending}
                    className={`${(!image || isPending) ? 'opacity-50' : 'opacity-100'}`}
                >
                    {isPending ? (
                        <ActivityIndicator size="small" color="#F4A261" />
                    ) : (
                        <Text className="text-primary font-bold text-lg">Post</Text>
                    )}
                </Pressable>
            </View>

            <View className="flex-1 items-center justify-center p-4">
                {image ? (
                    <View className="w-full h-4/5 rounded-2xl overflow-hidden relative">
                        <RNImage
                            source={{ uri: image }}
                            style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                        />
                        <View className="absolute bottom-0 left-0 right-0 p-4 bg-black/40">
                            <TextInput
                                placeholder="Add a caption..."
                                placeholderTextColor="#999"
                                value={caption}
                                onChangeText={setCaption}
                                className="text-white text-base font-medium"
                                multiline
                                maxLength={100}
                            />
                        </View>
                        <Pressable
                            onPress={() => setImage(null)}
                            className="absolute top-4 right-4 bg-black/50 p-2 rounded-full"
                        >
                            <Ionicons name="trash-outline" size={20} color="white" />
                        </Pressable>
                    </View>
                ) : (
                    <Pressable
                        onPress={pickImage}
                        className="items-center justify-center w-64 h-80 border-2 border-dashed border-surface-light rounded-3xl bg-surface-light/10"
                    >
                        <Ionicons name="image-outline" size={64} color="#6B6B70" />
                        <Text className="text-subtle-foreground mt-4 font-medium">Select from Gallery</Text>
                    </Pressable>
                )}
            </View>
        </SafeAreaView>
    );
}
