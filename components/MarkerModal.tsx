import React from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Modal } from "react-native";

interface MarkerModalProps {
    modalVisible: boolean;
    markerTitle: string;
    setMarkerTitle: (title: string) => void;
    onSave: () => void;
    onClose: () => void;
}

const MarkerModal: React.FC<MarkerModalProps> = ({
    modalVisible,
    markerTitle,
    setMarkerTitle,
    onSave,
    onClose
}) => {
    return (
        <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Enter POI details</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="POI Title"
                        placeholderTextColor="#888"
                        value={markerTitle}
                        onChangeText={setMarkerTitle}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
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
        backgroundColor: "rgba(0,0,0,0.6)", // Darker overlay
    },
    modalContent: {
        backgroundColor: "white",
        padding: 25,
        borderRadius: 15,
        width: 320,
        alignItems: "center",
        elevation: 5, // Shadow effect
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#333",
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 20,
        color: "#333",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    saveButton: {
        backgroundColor: "#007AFF",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        flex: 1,
        alignItems: "center",
        marginRight: 10,
    },
    cancelButton: {
        backgroundColor: "#FF3B30",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        flex: 1,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default MarkerModal;
