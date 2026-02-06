import {useSSO} from "@clerk/clerk-expo";
import {useState}from "react";
import {Alert} from "react-native";


function useAuthSocial() {
const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
const {startSSOFlow} = useSSO();

const handleSocialAuth =async (starategy:'oauth_google' |'oauth_apple') => {
   setLoadingStrategy(starategy);


   try{
    const {createdSessionId, setActive} = await startSSOFlow({ strategy: starategy });
    if (createdSessionId && setActive) {
      await setActive({ session: createdSessionId });
    }
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