import { Stack } from "expo-router";
import { View } from "react-native";
import { AudiovisualProvider } from "@/src/context/AudiovisualContext";
import { UserProvider } from "@/src/context/UserContext";

export default function RootLayout() {
    return (
        <UserProvider>
            <AudiovisualProvider>
                <View style={{ flex: 1 }}>
                    <Stack
                        screenOptions={{
                        headerShown: false,
                        headerBackButtonDisplayMode: "minimal",
                        headerTitleAlign: "center",
                        }}
                    >
                        <Stack.Screen name="detail/[audioVisualId]" options={{ headerShown: false }} />
                    </Stack>
                </View>
            </AudiovisualProvider>
        </UserProvider>
    );
}