import { View, Text ,ScrollView, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@clerk/clerk-expo';


 function ProfileTab() {

  const {signOut} = useAuth()
  return (
   
       <SafeAreaView edges={['top']} className="flex-1 bg-surface">
         <ScrollView 
           className="flex-1"
           contentInsetAdjustmentBehavior="automatic"
         >
           <View className="p-4">
            <Text className="text-2xl font-bold text-white">Profile</Text>
             
           </View>

           <Pressable className="" onPress={() => signOut()}>
            <Text className="text-red-500">Sign Out</Text>

           </Pressable>
         </ScrollView>
       </SafeAreaView>
  )
}

export default ProfileTab