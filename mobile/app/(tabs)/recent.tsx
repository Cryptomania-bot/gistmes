import EmptyUI from "@/components/EmptyUI";
import { View } from "react-native";

export default function RecentScreen() {
    return (
        <View className="flex-1 bg-surface">
            <EmptyUI
                title="No recent activity"
                subtitle="Your recent calls and chats will appear here."
                iconName="time-outline"
                iconColor="#6B6B70"
                iconSize={64}
            />
        </View>
    );
}
