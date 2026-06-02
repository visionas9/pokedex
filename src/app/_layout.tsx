import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Pokemons",
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          title: "Pokemon Details",
          headerBackButtonDisplayMode: "minimal",
          presentation: "formSheet",
          sheetAllowedDetents: [0.7],
        }}
      />
    </Stack>
  );
}
