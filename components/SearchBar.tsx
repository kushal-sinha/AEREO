import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={[styles.container, isFocused && styles.focusedContainer]}>
            <Ionicons name="search" size={20} color={isFocused ? "#6200EE" : "gray"} style={styles.icon} />
            <TextInput
                style={styles.searchBar}
                placeholder="Search by title..."
                placeholderTextColor="gray"
                value={searchQuery}
                onChangeText={setSearchQuery}
                returnKeyType="search"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
        borderRadius: 10,
        paddingHorizontal: 12,
        marginHorizontal: 10,
        marginTop: 40,
        height: 45,
        elevation: 3, // Android shadow
        shadowColor: "#000", // iOS shadow
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    focusedContainer: {
        borderWidth: 1,
        borderColor: "#6200EE",
        backgroundColor: "#FFFFFF",
    },
    searchBar: {
        flex: 1,
        fontSize: 16,
        color: "#333",
        paddingVertical: 10,
    },
    icon: {
        marginRight: 10,
    },
});

export default SearchBar;
