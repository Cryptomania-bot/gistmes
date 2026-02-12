import ActiveUsersList from "@/components/ActiveUsersList";
import ChatItem from "@/components/ChatItem";
import EmptyUI from "@/components/EmptyUI";
import { useCurrentUser } from "@/hooks/useAuth";
import { useChats } from "@/hooks/useChats";
import { Chat } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Pressable, Text, View, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatsTab = () => {
  const router = useRouter();
  const { data: chats, isLoading, error, refetch } = useChats();

  if (isLoading) {
    return (
      <View className="flex-1 bg-surface items-center justify-center">
        <ActivityIndicator size={"large"} color={"#f4A261"} />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-surface items-center justify-center">
        <Text className="text-red-500 text-3xl">Failed to load chats</Text>
        <Pressable onPress={() => refetch()} className="mt-4 px-4 py-2 bg-primary rounded-lg">
          <Text className="text-foreground">Retry</Text>
        </Pressable>
      </View>
    );
  }

  const handleChatPress = (chat: Chat) => {
    router.push({
      pathname: "/chat/[id]",
      params: {
        id: chat._id,
        participantId: chat.participant._id,
        name: chat.participant.name,
        avatar: chat.participant.avatar,
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <ChatItem chat={item} onPress={() => handleChatPress(item)} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        ListHeaderComponent={<Header />}
        ListEmptyComponent={
          <EmptyUI
            title="No chats yet"
            subtitle="Start a conversation!"
            iconName="chatbubbles-outline"
            iconColor="#6B6B70"
            iconSize={64}
            buttonLabel="New Chat"
            onPressButton={() => router.push("/new-chat")}
          />
        }
      />
    </SafeAreaView>
  );
};

export default ChatsTab;

function Header() {
  const router = useRouter();
  const { data: user } = useCurrentUser();

  return (
    <View className="pb-4">
      {/* Top Bar */}
      <View className="flex-row items-center justify-between mb-6 px-1">
        <Pressable onPress={() => router.push("/(tabs)/profile")}>
          <Image
            source={user?.avatar}
            style={{ width: 40, height: 40, borderRadius: 12 }}
            className="bg-surface-light rounded-xl"
          />
        </Pressable>

        <View className="flex-row items-center gap-4">
          <Pressable className="w-10 h-10 rounded-full border border-surface-light items-center justify-center">
            <Ionicons name="search" size={20} color="#F4F4F5" />
          </Pressable>
          <Pressable className="w-10 h-10 rounded-full border border-surface-light items-center justify-center relative">
            <Ionicons name="notifications-outline" size={20} color="#F4F4F5" />
            <View className="absolute top-2 right-2.5 w-2 h-2 bg-primary rounded-full" />
          </Pressable>
        </View>
      </View>

      {/* Title & Add Actions */}
      <View className="flex-row items-center justify-between mb-6 px-1">
        <View>
          <Text className="text-subtle-foreground text-sm font-medium mb-1">Good Morning,</Text>
          <Text className="text-3xl font-bold text-foreground font-mono">Chats</Text>
        </View>

        <Pressable
          className="w-12 h-12 bg-primary rounded-full items-center justify-center shadow-lg shadow-orange-500/20"
          onPress={() => router.push("/new-chat")}
        >
          <Ionicons name="add" size={24} color="#0D0D0F" />
        </Pressable>
      </View>

      {/* Active Users List */}
      <ActiveUsersList />

      {/* List Title */}
      <View className="flex-row items-center justify-between mb-2 px-1">
        <Text className="text-lg font-bold text-foreground">All Chats</Text>
        <Ionicons name="options-outline" size={20} color="#6B6B70" />
      </View>
    </View>
  );
}
