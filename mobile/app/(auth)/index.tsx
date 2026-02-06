import { View,  Dimensions ,Text, Pressable, ActivityIndicator} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
  import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import useAuthSocial from '../../hooks/useSocialAuth'
const {width,height}= Dimensions.get('window')


const AuthScreen = () => {

  const {handleSocialAuth, loadingStrategy} = useAuthSocial()
  return (
    <View className='flex-1 bg-surface-dark '>
     <View className='absolute inset-0 overflow-hidden'></View>
     <SafeAreaView className='flex-1'>
<View className='items-center pt-10'>

  
   
    

  <Image source={require('../../assets/images/logo.png')}
    style={{width:100, height:100,marginVertical:-20}}
   contentFit='contain'
    />
    <Text className='text-4xl font-bold text-primary font-serif tracking-wider uppercase '>Gistme</Text>
</View>
{/* center section
   */}
    <View className='flex-1 items-center justify-center px-6'>
   
  <Image source={require('../../assets/images/Auth.png')}
    style={{width: width - 48, height: height * 0.3}}
   contentFit='contain'
    />



    <View className='mt-6 items-center'>
      <Text className='text-5xl text-foreground text-center font-bold font-serif'>Connect & Chat</Text>
      <Text className='text-3xl font-bold text-primary font-serif'>seamlessly</Text>
      
    </View>

      {/* bottom section */}


      <View className='flex-row gap-4 mt-10'>
        {/* {gooogleBtn} */}

        <Pressable className=' flex-1 flex-row items-center justify-center gap-2 bg-white/95 py-4 rounded-2xl active:scale-95'disabled={loadingStrategy === 'oauth_google'} onPress={()=>handleSocialAuth('oauth_google')}> 
        {loadingStrategy === 'oauth_google' ? (<ActivityIndicator size="small" color="#000000" />) : (
          <>
          <Image source={require('../../assets/images/google.png')} style={{width:20, height:20}} contentFit='contain' />
          <Text className='text-gray-900 font-semibold text-sm'> Google</Text>
          </>
        )}
        </Pressable>
        {/* {AppleBtn} */}

        <Pressable className=' flex-1 flex-row items-center justify-center gap-2 bg-white/10 py-4 rounded-2xl active:scale-95'disabled={loadingStrategy === 'oauth_apple'} onPress={()=>handleSocialAuth('oauth_apple')}> 
        
         {loadingStrategy === 'oauth_apple' ? (<ActivityIndicator size="small" color="#FFFFFF" />) : (
          <>
          <Ionicons name="logo-apple" size={20} color="#FFFFFF" />
          <Text className='text-foreground font-semibold text-sm'> Apple</Text>
          </>
         )}

        </Pressable>
</View>


    </View>

     </SafeAreaView>
    </View>
  )
}

export default AuthScreen