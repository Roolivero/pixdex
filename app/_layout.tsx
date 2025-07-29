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
                        <Stack.Screen name="detalle/[audiovisual_id]" options={{ headerShown: true }} />
                    </Stack>
                </View>
            </AudiovisualProvider>
        </UserProvider>
    );
}