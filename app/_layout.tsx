import { Stack } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {
    return (
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
    );
}