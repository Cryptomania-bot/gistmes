import {useSSO} from "@clerk/clerk-expo";
import {useState}from "react";
import {Alert} from "react-native";
import { useAuthCallback } from "./useAuth";



function useAuthSocial() {
const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
const {startSSOFlow} = useSSO();
const { mutateAsync: syncUser } = useAuthCallback();

const handleSocialAuth =async (starategy:'oauth_google' |'oauth_apple') => {
   if (loadingStrategy) {
    return;
   }
   setLoadingStrategy(starategy);


   try{
    const {createdSessionId, setActive} = await startSSOFlow({ strategy: starategy });

    if (!createdSessionId || !setActive) {
      const provider = starategy === 'oauth_google' ? 'Google' : 'Apple';
      Alert.alert("Sign-in incomplete", `unsuccessful signed in with ${provider}`);
      console.log(`Successfully signed in with ${provider}`);
      return;
      
    }
    await setActive({ session: createdSessionId });
    await syncUser();
   } catch (error) {
    console.log('Social auth error:', error);
    const provider = starategy === 'oauth_google' ? 'Google' : 'Apple';
    Alert.alert(`Failed to sign in with ${provider}`)
   } finally {
    setLoadingStrategy(null);
   }
}
 return{
        handleSocialAuth,
        loadingStrategy,
    }
}
export default useAuthSocial