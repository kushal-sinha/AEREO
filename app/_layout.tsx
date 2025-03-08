import React, { useState, useEffect, useCallback } from "react";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/useColorScheme";
import SplashScreenComponent from "@/components/SplashScreen";

// Prevent splash screen from auto-hiding until we manually control it
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      if (loaded) {
        // Keep splash screen for 2 seconds minimum
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setAppReady(true);
        await SplashScreen.hideAsync(); // Properly hide the splash screen
      }
    };

    prepareApp();
  }, [loaded]);

  if (!appReady) {
    return <SplashScreenComponent />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
