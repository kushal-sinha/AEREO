import React, { useEffect, useRef } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Animated } from "react-native";

const SplashScreenComponent = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <Text style={styles.text}>🌍 LOCO APP</Text>
            <ActivityIndicator size="large" color="#ff3b30" />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1e1e1e",
    },
    text: {
        fontSize: 20,
        color: "#ffffff",
        marginBottom: 10,
    },
});

export default SplashScreenComponent;
