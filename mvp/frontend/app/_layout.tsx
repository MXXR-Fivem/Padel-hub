import { Stack } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";

const imagesToPreload = [
    // General
    require("../assets/images/PadelHub.png"),
    require("../assets/images/ball.png"),
    require("../assets/images/courtMap.png"),
    require("../assets/images/icon.png"),
    // Feed
    require("../assets/images/feed1.png"),
    require("../assets/images/feed5.mp4"),
    require("../assets/images/feed7.mp4"),
    require("../assets/images/feed3.png"),
    // Courts
    require("../assets/images/padelEffelTower.png"),
    require("../assets/images/padelPuteau.png"),
    require("../assets/images/padel95.png"),
    require("../assets/images/nightPadel.png"),
    require("../assets/images/forestHillPadel.png"),
    // Profile page
    require("../assets/images/profilePage/slackSelfie.png"),
    require("../assets/images/profilePage/Perf1.png"),
    require("../assets/images/profilePage/Perf.png"),
    require("../assets/images/profilePage/Strava2.png"),
    require("../assets/images/profilePage/Strava2.1.png"),
    require("../assets/images/profilePage/Profilepictures.png"),
    require("../assets/images/profilePage/Feed1.png"),
    require("../assets/images/profilePage/Feed2.png"),
    require("../assets/images/profilePage/Feed3.png"),
    require("../assets/images/profilePage/Feed4.png"),
    require("../assets/images/profilePage/Feed5.png"),
    require("../assets/images/profilePage/Feed6.png"),
    require("../assets/images/profilePage/Feed7.png"),
    require("../assets/images/profilePage/Feed8.png"),
    require("../assets/images/profilePage/Feed9.png"),
    require("../assets/images/profilePage/Feed10.png"),
    require("../assets/images/profilePage/Feed11.png"),
    require("../assets/images/profilePage/Feed12.png"),
    // Avatars
    require("../assets/images/avatar1.png"),
    require("../assets/images/avatar2.png"),
    require("../assets/images/avatar3.png"),
    require("../assets/images/avatar4.png"),
    require("../assets/images/avatar5.png"),
    require("../assets/images/avatar6.png"),
    require("../assets/images/avatar7.png"),
    require("../assets/images/avatar8.png"),
    require("../assets/images/avatar9.png"),
    require("../assets/images/avatar10.png"),
    // Coaches
    require("../assets/images/coachTom.png"),
    require("../assets/images/coachEmi.png"),
    require("../assets/images/coachSebag.png"),
    require("../assets/images/coachRomain.png"),
    require("../assets/images/coachPlouf.png"),
    // Strats
    require("../assets/images/Strat1.png"),
    require("../assets/images/Strat2.png"),
    require("../assets/images/Strat3.png"),
    require("../assets/images/Strat4.png"),
    // Rules
    require("../assets/images/Rules1.png"),
    require("../assets/images/Rules2.png"),
    require("../assets/images/Rules3.png"),
    require("../assets/images/Rules4.png"),
    require("../assets/images/Rules5.png"),
    require("../assets/images/Rules6.png"),
    require("../assets/images/Rules7.png"),
    require("../assets/images/Rules8.png"),
    require("../assets/images/Rules9.png"),
    require("../assets/images/Rules10.png"),
    // More avatars (message & notif)
    require("../assets/images/avatar11.png"),
    require("../assets/images/avatar12.png"),
    require("../assets/images/avatar13.png"),
    require("../assets/images/avatar14.png"),
    require("../assets/images/avatar15.png"),
    require("../assets/images/avatar16.png"),
    require("../assets/images/avatar17.png"),
    require("../assets/images/avatar18.png"),
    require("../assets/images/avatar19.png"),
    require("../assets/images/avatar20.png"),
    // Posts (notif)
    require("../assets/images/post1.png"),
    require("../assets/images/post2.png"),
    // Flags (ranking)
    require("../assets/images/fr.png"),
];

export default function Layout() {
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await Asset.loadAsync(imagesToPreload);
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <Stack screenOptions={{ headerShown: false, animation: "fade", gestureEnabled: false }}>
                <Stack.Screen name="(tabs)" />
            </Stack>
        </View>
    );
}