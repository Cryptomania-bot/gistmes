import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChatsTab = () => {
  return (

    <SafeAreaView edges={['top']} className="flex-1 bg-surface">
      <ScrollView 
        className="flex-1"
        contentInsetAdjustmentBehavior="automatic"
      >
        <View className="p-4">
          <Text className="text-foreground text-2xl font-bold">Chats</Text>
          <Text className="text-muted-foreground mt-2">AuthScreen</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatsTab;