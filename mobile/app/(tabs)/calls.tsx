import EmptyUI from "@/components/EmptyUI";
import { View } from "react-native";

export default function CallsScreen() {
    return (
        <View className="flex-1 bg-surface">
            <EmptyUI
                title="No calls yet"
                subtitle="Start a voice or video call with your friends."
                iconName="call-outline"
                iconColor="#6B6B70"
                iconSize={64}
            />
        </View>
    );
}
