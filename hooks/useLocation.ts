import { useState, useEffect } from "react";
import * as Location from "expo-location";

export default function useCurrentLocation() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [error, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
        })();
    }, []);

    return { location, error };
}
