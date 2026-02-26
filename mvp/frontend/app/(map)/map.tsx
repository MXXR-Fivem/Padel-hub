import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Location from "expo-location";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {ActivityIndicator, Alert, Pressable, StyleSheet, Text, View} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import {PadelCourt} from "../(tabs)/book";
import { PadelCoach } from "../(training)/coach";

function regionFromCenterAndDistanceKm(params: {latitude: number; longitude: number; distanceKm: number}): Region {
    const distanceKm = Number.isFinite(params.distanceKm) ? params.distanceKm : 5;
    const clampedDistanceKm = Math.max(0.2, distanceKm);
    const spanKm = clampedDistanceKm * 2;

    const latitudeDelta = spanKm / 111;
    const latitudeRadians = (params.latitude * Math.PI) / 180;
    const kmPerDegreeLon = 111 * Math.max(0.2, Math.cos(latitudeRadians));
    const longitudeDelta = spanKm / kmPerDegreeLon;

    return {
        latitude: params.latitude,
        longitude: params.longitude,
        latitudeDelta,
        longitudeDelta,
    };
}

export type mapData = {
    type: "court" | "coach",
    padelCourtList: PadelCourt[] | PadelCoach[];
    distance: number;
    currentPadelCourt: string;
    resetCurrentPadelCourt: () => void;
};

export type mapProps = {
    data: mapData;
};

export default function Tab({ data }: mapProps) {
    const mapRef = useRef<MapView | null>(null);
    const [isLocLoading, setIsLocLoading] = useState(true);
    const [userRegion, setUserRegion] = useState<Region | null>(null);
    const [userCoords, setUserCoords] = useState({ latitude: 0, longitude: 0 });
    const [zoom, setZoom] = useState(20);
    const [isMapReady, setIsMapReady] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    Alert.alert(
                        "Permission required",
                        "Turn On the localisation.",
                    );
                    setIsLocLoading(false);
                    return;
                }

                const pos = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Balanced,
                });

                setUserCoords({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                });

                const region: Region = {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                };

                setUserRegion(region);
            } catch (e) {
                Alert.alert("Erreur", "Error on getting localisation.");
            } finally {
                setIsLocLoading(false);
            }
        })();
    }, []);

    useEffect(() => {
        if (!isMapReady) return;
        if (!mapRef.current) return;

        const target = data.padelCourtList.find((p) => p.id === data.currentPadelCourt);

        if (!target && userRegion) {
            mapRef.current.animateToRegion(
                regionFromCenterAndDistanceKm({
                    latitude: userCoords.latitude,
                    longitude: userCoords.longitude,
                    distanceKm: data.distance,
                }),
            );
        } else {
            if (!target) return;

            const targetRegion = regionFromCenterAndDistanceKm({
                latitude: target.latitude,
                longitude: target.longitude,
                distanceKm: data.distance,
            });

            mapRef.current.animateToRegion(targetRegion, 700);
        }
    }, [data.currentPadelCourt, data.distance, isMapReady, userRegion]);

    const initialRegion = useMemo<Region>(() => {
        return (
            userRegion ?? {
                latitude: 48.8566,
                longitude: 2.3522,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }
        );
    }, [userRegion]);

    const recenter = () => {
        if (!mapRef.current || !userRegion) return;
        mapRef.current.animateToRegion(userRegion, 700);
    };

    if (isLocLoading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" />
                <Text style={{ marginTop: 10 }}>Récupération de ta position…</Text>
            </View>
        );
    }

    function PadelCourtMarker({ zoom }: { zoom: number }) {
        let scale = zoom / 15;
        scale = Math.min(scale, 1.25);

        if (zoom <= 12) scale = 1;

        return (
            <View style={styles.markerWrap}>
                <View style={[styles.markerRoot, { transform: [{ scale }] }]}>
                <View style={[styles.marker, { backgroundColor: "#92c650" }]}>
                    <Ionicons name={data.type == "court" ? "tennisball" : "person"} size={14} color="white" />
                </View>
                    <View style={[styles.markerPointer, { borderTopColor: "#92c650" }]} />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={StyleSheet.absoluteFillObject}
                initialRegion={initialRegion}
                showsUserLocation={true}
                showsPointsOfInterest={false}
                toolbarEnabled={false}
                onMapReady={() => setIsMapReady(true)}
                onRegionChangeComplete={(r) => {
                    const z = Math.log2(360 / r.longitudeDelta);
                    setZoom(z);
                }}
            >
                {data.padelCourtList.map((p) => (
                    <Marker
                        key={p.id}
                        anchor={{ x: 0.5, y: 1 }}
                        centerOffset={{ x: 0, y: -21 }}
                        coordinate={{ latitude: p.latitude, longitude: p.longitude }}
                        onPress={() => {
                            mapRef.current?.animateCamera(
                                {
                                    center: { latitude: p.latitude, longitude: p.longitude },
                                    zoom: 15,
                                },
                                { 
                                    duration: 750
                                },
                            );
                        }}
                    >
                        <PadelCourtMarker zoom={zoom} />
                    </Marker>
                ))}
            </MapView>

            <Pressable
                style={styles.recenterBtn}
                onPress={() => {
                    data.resetCurrentPadelCourt();
                    recenter();
                }}
            >
                <FontAwesome6 name="location-arrow" size={24} color="black" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "90%",
        height: "50%",
        borderRadius: 30,
        overflow: "hidden",
        marginBottom: "4%",
    },
    loader: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    markerWrap: {
        alignItems: "center",
    },
    markerRoot: {
        alignItems: "center",
        transformOrigin: "bottom center",
    },
    marker: {
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: "white",
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    markerPointer: {
        width: 0,
        height: 0,
        borderLeftWidth: 7,
        borderRightWidth: 7,
        borderTopWidth: 10,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        marginTop: -2,
    },
    recenterBtn: {
        position: "absolute",
        right: 15,
        bottom: 12,
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: "white",
        borderRadius: 12,
        elevation: 3,
    },
});