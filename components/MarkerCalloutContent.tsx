import React from "react";
import { View, Text } from "react-native";

interface MarkerCalloutContentProps {
    title: string;
    latitude: number;
    longitude: number;
}

const MarkerCalloutContent: React.FC<MarkerCalloutContentProps> = ({ title, latitude, longitude }) => {
    return (
        <View>
            <Text style={{ fontWeight: "bold" }}>{title}</Text>
            <Text>Lat: {latitude}</Text>
            <Text>Lng: {longitude}</Text>
        </View>
    );
};

export default MarkerCalloutContent;