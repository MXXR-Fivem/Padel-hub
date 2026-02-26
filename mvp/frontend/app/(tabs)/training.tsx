import { ScrollView, StyleSheet, View, StatusBar } from "react-native";
import { router } from "expo-router";
import Card, { CardData } from "../components/HomeCards";
import Header from "../components/Header";
import Ranking from "../../assets/vectors/Ranking.svg";
import Coach from "../../assets/vectors/Coach.svg";
import Strats from "../../assets/vectors/Strats.svg";
import Rules from "../../assets/vectors/Rules.svg";

import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";


export default function Tab() {

   const cards: CardData[] = [
        { title: "Ranking", path: "../(training)/ranking", vector: Ranking, backgroundFade: ["#544EFC", "#9FF1CE"], top: "18%", useShadow: false },
        { title: "Coach", path: "../(training)/coach", vector: Coach, backgroundFade: ["#DB78FC", "#827CE6"], top: "36%", useShadow: true },
        { title: "Strats", path: "../(training)/strats", vector: Strats, backgroundFade: ["#534CFD", "#8CE7CD"], top: "30%", useShadow: false, },
        { title: "Rules", path: "../(training)/rules", vector: Rules, backgroundFade: ["#7DFDAA", "#EBCF91"], top: "27%", useShadow: true },
    ]

    return (
        <View style={styles.container}>

            <Header
                leftIcon={{
                    icon: <Feather name="bell" size={30} color="black" />,
                    onPress: () => router.navigate("../(notification)/notif")
                }}
                rightIcon={{
                    icon: <SimpleLineIcons name="paper-plane" size={26} color="black" />,
                    onPress: () => router.navigate("../(message)/message")
                }}
            />

            <View style={styles.separator}/>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle = {{
                    paddingTop: 20,
                    paddingBottom: 25, 
                    alignItems: "center", 
                    gap: 20,
                }}
                style={styles.scrollview}
                >
                {cards.map((data, index) => (
                    <Card key={index} data={data} index={index} />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: "7%",
        alignItems: "center",
        overflow: "hidden"
    },
    separator: {
        backgroundColor: "#92c650",
        height: 2,
        width: "100%",
    },
    scrollview: {
        maxHeight: "84%",
        width: "100%",
    },
    ScrollViewContent: {
        paddingTop: 20,
        paddingBottom: 25, 
        alignItems: "center", 
        gap: 20
    },
});