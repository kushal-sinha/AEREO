import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker, Callout, MapPressEvent } from "react-native-maps";
import MarkerCalloutContent from "./MarkerCalloutContent";

interface MapComponentProps {
    userLocation: {
        coords: {
            latitude: number;
            longitude: number;
        }
    };
    markers: Array<{
        id: string;
        latitude: number;
        longitude: number;
        title: string;
    }>;
    onMapPress: (event: MapPressEvent) => void;
    onMarkerPress: (marker: { id: string; title: string; latitude: number; longitude: number }) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({
    userLocation,
    markers,
    onMapPress,
    onMarkerPress
}) => {
    return (
        <MapView
            style={styles.map}
            initialRegion={{
                latitude: userLocation.coords.latitude,
                longitude: userLocation.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
            showsUserLocation
            onPress={onMapPress}
        >
            {markers.map((marker) => (
                <Marker
                    key={marker.id}
                    coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                    onPress={() => onMarkerPress(marker)}
                >
                    <Callout>
                        <MarkerCalloutContent
                            title={marker.title}
                            latitude={marker.latitude}
                            longitude={marker.longitude}
                        />
                    </Callout>
                </Marker>
            ))}
        </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        width: "100%",
        height: "100%",
    },
});

export default MapComponent;