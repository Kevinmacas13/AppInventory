import { Stack } from "expo-router";
// import { AnimalProvider } from "@/context/AnimalContext";
export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false, // Aquí ocultas la barra de navegación
        }}
      />
    </>
  );
}
