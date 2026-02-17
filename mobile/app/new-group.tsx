import { View, Text, TextInput, Pressable, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useCreateGroup } from "@/hooks/useChats";
import { Image } from "expo-image";
import * as ImagePicker from 'expo-image-picker';

export default function NewGroupScreen() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const { mutate: createGroup, isPending } = useCreateGroup();

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleCreate = () => {
        if (!name.trim()) return;

        createGroup({
            name,
            description,
            groupImage: image || undefined
        }, {
            onSuccess: (chat) => {
                router.replace({
                    pathname: "/chat/[id]",
                    params: {
                        id: chat._id,
                        participantId: "GROUP", // Special flag for group handling in ChatScreen
                        name: chat.name,
                        avatar: chat.groupImage,
                        isGroup: "true"
                    }
                });
            }
        });
    };

    return (
        <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
            {/* Header */}
            <View className="px-4 py-3 flex-row items-center justify-between border-b border-surface-light">
                <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full bg-surface-card">
                    <Ionicons name="close" size={24} color="#F4A261" />
                </Pressable>
                <Text className="text-xl font-bold text-foreground">New Group</Text>
                <Pressable
                    onPress={handleCreate}
                    disabled={!name.trim() || isPending}
                    className={`${!name.trim() || isPending ? 'opacity-50' : 'opacity-100'}`}
                >
                    {isPending ? (
                        <ActivityIndicator size="small" color="#F4A261" />
                    ) : (
                        <Text className="text-primary font-bold text-lg">Create</Text>
                    )}
                </Pressable>
            </View>

            <View className="p-6 items-center">
                {/* Image Picker */}
                <Pressable onPress={pickImage} className="mb-8">
                    <View className="w-24 h-24 rounded-full bg-surface-light items-center justify-center border-2 border-dashed border-primary/30 overflow-hidden relative">
                        {image ? (
                            <Image
                                source={{ uri: image }}
                                style={{ width: '100%', height: '100%' }}
                            />
                        ) : (
                            <Ionicons name="camera-outline" size={32} color="#6B6B70" />
                        )}
                        <View className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full items-center justify-center border-2 border-surface">
                            <Ionicons name="pencil" size={14} color="#0D0D0F" />
                        </View>
                    </View>
                </Pressable>

                {/* Name Input */}
                <View className="w-full bg-surface-card rounded-2xl p-4 mb-4 border border-surface-light">
                    <Text className="text-xs text-subtle-foreground mb-1 uppercase tracking-wider">Group Name</Text>
                    <TextInput
                        placeholder="e.g. The Avengers"
                        placeholderTextColor="#6B6B70"
                        className="text-foreground text-lg font-medium"
                        value={name}
                        onChangeText={setName}
                        autoFocus
                    />
                </View>

                {/* Description Input */}
                <View className="w-full bg-surface-card rounded-2xl p-4 border border-surface-light">
                    <Text className="text-xs text-subtle-foreground mb-1 uppercase tracking-wider">Description (Optional)</Text>
                    <TextInput
                        placeholder="What's this group about?"
                        placeholderTextColor="#6B6B70"
                        className="text-foreground text-base"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                    />
                </View>

                <Text className="text-subtle-foreground text-xs text-center mt-6">
                    By creating a group, you will become the Admin. You can invite others after creating.
                </Text>
            </View>
        </SafeAreaView>
    );
}
