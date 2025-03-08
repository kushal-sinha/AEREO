import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Modal,
    TextInput,
    useColorScheme
} from "react-native";

interface MarkerInfoModalProps {
    selectedMarker: { id: string; title: string; latitude: number; longitude: number } | null;
    setSelectedMarker: (marker: { id: string; title: string; latitude: number; longitude: number } | null) => void;
    setModalVisible: (visible: boolean) => void;
    onEditMarker: (id: string, newTitle: string) => void;
    onDeleteMarker: (id: string) => void;
}

const MarkerInfoModal: React.FC<MarkerInfoModalProps> = ({
    selectedMarker,
    setSelectedMarker,
    setModalVisible,
    onEditMarker,
    onDeleteMarker
}) => {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark";

    const [newTitle, setNewTitle] = useState(selectedMarker?.title || "");
    const [isEditing, setIsEditing] = useState(false);

    const handleSaveEdit = () => {
        if (selectedMarker && newTitle.trim() !== "") {
            onEditMarker(selectedMarker.id, newTitle);
            setIsEditing(false);
        }
    };

    return (
        <Modal
            visible={!!selectedMarker}
            transparent
            animationType="fade"
            onRequestClose={() => setSelectedMarker(null)}
        >
            <View style={styles.modalContainer}>
                <View style={[styles.modalContent, isDarkMode && styles.darkModalContent]}>
                    {isEditing ? (
                        <TextInput
                            style={[styles.input, isDarkMode && styles.darkInput]}
                            value={newTitle}
                            onChangeText={setNewTitle}
                            autoFocus
                        />
                    ) : (
                        <Text style={[styles.title, isDarkMode && styles.darkText]}>
                            📍 {selectedMarker?.title}
                        </Text>
                    )}

                    <View style={styles.separator} />

                    <Text style={[styles.text, isDarkMode && styles.darkText]}>
                        🌍 Latitude: {selectedMarker?.latitude.toFixed(6)}
                    </Text>
                    <Text style={[styles.text, isDarkMode && styles.darkText]}>
                        🌏 Longitude: {selectedMarker?.longitude.toFixed(6)}
                    </Text>

                    <View style={styles.buttonRow}>
                        {isEditing ? (
                            <TouchableOpacity
                                style={[styles.editButton, styles.saveButton]}
                                onPress={handleSaveEdit}
                            >
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => setIsEditing(true)}
                            >
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => {
                                if (selectedMarker) {
                                    onDeleteMarker(selectedMarker.id);
                                    setModalVisible(false);
                                }
                            }}
                        >
                            <Text style={styles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={[styles.closeButton, isDarkMode && styles.darkCloseButton]}
                        onPress={() => {
                            setSelectedMarker(null);
                            setModalVisible(false);
                        }}
                    >
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.6)", // Dark overlay
    },
    modalContent: {
        backgroundColor: "white",
        padding: 25,
        borderRadius: 15,
        width: 320,
        alignItems: "center",
        elevation: 10, // Android shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    darkModalContent: {
        backgroundColor: "#1e1e1e",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: "#333",
        marginBottom: 5,
    },
    darkText: {
        color: "#ffffff",
    },
    separator: {
        width: "100%",
        height: 1,
        backgroundColor: "#ccc",
        marginVertical: 10,
    },
    input: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#007AFF",
        width: "90%",
        textAlign: "center",
        marginBottom: 10,
    },
    darkInput: {
        color: "#ffffff",
        borderBottomColor: "#bbb",
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 10,
    },
    editButton: {
        backgroundColor: "#007AFF",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginHorizontal: 5,
    },
    saveButton: {
        backgroundColor: "#28A745",
    },
    deleteButton: {
        backgroundColor: "#FF3B30",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginHorizontal: 5,
    },
    closeButton: {
        backgroundColor: "#666",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginTop: 15,
    },
    darkCloseButton: {
        backgroundColor: "#444",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default MarkerInfoModal;
