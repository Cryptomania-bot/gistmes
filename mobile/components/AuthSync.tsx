import { useAuthCallback } from "@/hooks/useAuth"
import { useEffect, useRef } from "react"
import { useAuth, useUser } from '@clerk/clerk-expo';
import * as sentry from "@sentry/react-native";
const AuthSync = () => {

    const { user } = useUser();
    const { isSignedIn } = useAuth();
    const { mutate: syncUser } = useAuthCallback();
    const hasSynced = useRef(false);

    useEffect(() => {
        if (isSignedIn && user && !hasSynced.current) {
            hasSynced.current = true;
            syncUser(undefined, {
                onSuccess: (data) => {
                    console.log('User synced successfully', data.name);
                    sentry.captureMessage(`user synced successfully ${data.name}`, {
                        userId:user.id,
                        userName:data.name,
                    } as any);
                },
                onError: (data) => {
                    console.log('User synced failed', data.name);
                    sentry.captureMessage(`user synced failed ${data.name}`, {
                        userId:user.id,
                        userName:data.name,
                    } as any);
                    
                }
            });
            if(!isSignedIn){
                hasSynced.current = false;
            }
        }
    }, [isSignedIn, user, syncUser])
    return null

}

export default AuthSync