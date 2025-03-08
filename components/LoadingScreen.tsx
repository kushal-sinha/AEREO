import React from "react";
import { StyleSheet, View, Text, ActivityIndicator, useColorScheme } from "react-native";

const LoadingScreen: React.FC = () => {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark";

    return (
        <View style={[styles.loaderContainer, isDarkMode && styles.darkBackground]}>
            <ActivityIndicator size="large" color={isDarkMode ? "#ffffff" : "#0000ff"} />
            <Text style={[styles.text, isDarkMode && styles.darkText]}>Fetching location...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
    },
    darkBackground: {
        backgroundColor: "#1e1e1e",
    },
    text: {
        color: "#000000",
        marginTop: 10,
    },
    darkText: {
        color: "#ffffff",
    },
});

export default LoadingScreen;
