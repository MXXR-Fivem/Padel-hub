import { Redirect } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, View, StyleSheet, Dimensions } from "react-native";

const { height: windowHeight } = Dimensions.get("window");

export default function Index() {
    const [loading, setLoading] = useState(true);

    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(windowHeight * 0.15)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 2500,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: true,
            })
        ]).start(() => {
            setLoading(false);
        });
    }, [opacity, translateY]);

    if (loading) {
        return (
            <View style={styles.container}>
                <Animated.Image
                    source={require("../assets/images/PadelHub.png")}
                    style={[
                        styles.logo,
                        {
                            opacity: opacity,
                            transform: [{ translateY: translateY }]
                        }
                    ]}
                    resizeMode="contain"
                />
            </View>
        );
    }

    return <Redirect href="/(login)/login" />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#faf0e7",
    },
    logo: {
        width: 300,
        height: 300,
        marginBottom: 30,
    }
});