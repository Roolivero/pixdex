import { Stack } from "expo-router";
import { View } from "react-native";
import { AudiovisualProvider } from "@/src/context/AudiovisualContext";

export default function RootLayout() {
    return (
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
    );
}