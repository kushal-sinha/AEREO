import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Alert,
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useCurrentLocation from "@/hooks/useLocation";
import { MapPressEvent } from "react-native-maps";
import SearchBar from "./SearchBar";
import MapComponent from "./MapComponent";
import LoadingScreen from "./LoadingScreen";
import MarkerInfoModal from "./MarkerInfoModal";
import MarkerModal from "./MarkerModal";

export default function App() {
    const { location, error } = useCurrentLocation();
    const [markers, setMarkers] = useState<{ id: string, latitude: number, longitude: number, title: string }[]>([]);
    const [newMarker, setNewMarker] = useState<{ latitude: number, longitude: number } | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [markerTitle, setMarkerTitle] = useState("");
    const [selectedMarker, setSelectedMarker] = useState<{ id: string, title: string, latitude: number, longitude: number } | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        loadMarkers();
    }, []);

    if (error) {
        Alert.alert("Location Error", error);
    }

    const loadMarkers = async () => {
        try {
            const storedMarkers = await AsyncStorage.getItem("markers");
            if (storedMarkers) {
                setMarkers(JSON.parse(storedMarkers));
            }
        } catch (err) {
            console.error("Failed to load markers", err);
        }
    };

    const saveMarkers = async (newMarkers: any) => {
        try {
            await AsyncStorage.setItem("markers", JSON.stringify(newMarkers));
        } catch (err) {
            console.error("Failed to save markers", err);
        }
    };

    const handleAddMarker = (event: MapPressEvent) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        if (selectedMarker) {
            setSelectedMarker(null);
            return;
        }
        setNewMarker({ latitude, longitude });
        setModalVisible(true);
    };

    const handleSaveMarker = () => {
        if (newMarker && markerTitle.trim() !== "") {
            const updatedMarkers = [
                ...markers,
                { id: Date.now().toString(), latitude: newMarker.latitude, longitude: newMarker.longitude, title: markerTitle }
            ];
            setMarkers(updatedMarkers);
            saveMarkers(updatedMarkers);
            setModalVisible(false);
            setMarkerTitle("");
            setNewMarker(null);
        } else {
            Alert.alert("Error", "Please enter a title for the marker.");
        }
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setNewMarker(null);
    };

    const filteredMarkers = markers.filter(marker =>
        marker.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEditMarker = (id: string, newTitle: string) => {
        const updatedMarkers = markers.map((marker) =>
            marker.id === id ? { ...marker, title: newTitle } : marker
        );
        setMarkers(updatedMarkers);
        saveMarkers(updatedMarkers);
    };

    const handleDeleteMarker = (id: string) => {
        const updatedMarkers = markers.filter((marker) => marker.id !== id);
        setMarkers(updatedMarkers);
        saveMarkers(updatedMarkers);
        setSelectedMarker(null);
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

                    {location ? (
                        <MapComponent
                            userLocation={location}
                            markers={filteredMarkers}
                            onMapPress={handleAddMarker}
                            onMarkerPress={setSelectedMarker}
                        />
                    ) : (
                        <LoadingScreen />
                    )}

                    <MarkerInfoModal
                        selectedMarker={selectedMarker}
                        setSelectedMarker={setSelectedMarker}
                        setModalVisible={setModalVisible}
                        onEditMarker={handleEditMarker}
                        onDeleteMarker={handleDeleteMarker}
                    />

                    <MarkerModal
                        modalVisible={modalVisible}
                        markerTitle={markerTitle}
                        setMarkerTitle={setMarkerTitle}
                        onSave={handleSaveMarker}
                        onClose={handleCloseModal}
                    />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

