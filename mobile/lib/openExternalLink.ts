import { Linking, Alert, Platform } from "react-native";

/**
 * Safely opens an external URL using React Native's Linking API
 * @param url - The URL to open
 * @param fallbackMessage - Optional message to show if URL can't be opened
 */
export const openExternalLink = async (url: string, fallbackMessage?: string) => {
    try {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(
                "Cannot Open Link",
                fallbackMessage || `Unable to open: ${url}`
            );
        }
    } catch (error) {
        console.error("Error opening URL:", error);
        Alert.alert(
            "Error",
            "An error occurred while trying to open the link. Please try again."
        );
    }
};

/**
 * Opens the app store for rating
 */
export const openAppStoreForRating = async () => {
    // These would be replaced with actual app store URLs once the app is published
    const iosAppStoreUrl = "https://apps.apple.com/app/id123456789"; // Replace with actual App Store ID
    const androidPlayStoreUrl = "https://play.google.com/store/apps/details?id=com.yourapp"; // Replace with actual package name

    const url = Platform.OS === "ios" ? iosAppStoreUrl : androidPlayStoreUrl;

    await openExternalLink(
        url,
        "App store link not configured yet. This will be available once the app is published."
    );
};

/**
 * Opens email client with pre-filled support email
 */
export const openSupportEmail = async () => {
    const email = "support@yourapp.com"; // Replace with actual support email
    const subject = "Support Request";
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

    await openExternalLink(url, "Unable to open email client. Please email us at " + email);
};

/**
 * Opens help center URL
 */
export const openHelpCenter = async () => {
    const helpCenterUrl = "https://help.yourapp.com"; // Replace with actual help center URL

    await openExternalLink(
        helpCenterUrl,
        "Help center link not configured yet."
    );
};
