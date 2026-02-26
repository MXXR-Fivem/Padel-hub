import { Image, Text, ScrollView, StyleSheet, View, StatusBar, ImageSourcePropType } from "react-native";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Header from "../components/Header";

type Player = {
    rank: string,
    name: string,
    country: string,
    points: number,
    avatar: ImageSourcePropType,
    flag: ImageSourcePropType,
}

const players: Player[] = [
    {
        rank: "01 -",
        name: "Simon Léger",
        country: "FRA",
        points: 2506,
        avatar: require("../../assets/images/avatar1.png"),
        flag: require("../../assets/images/fr.png"),
    },
    {
        rank: "02 -",
        name: "Plouf Paff",
        country: "FRA",
        points: 2480,
        avatar: require("../../assets/images/avatar2.png"),
        flag: require("../../assets/images/fr.png"),
    },
    {
        rank: "03 -",
        name: "Theo Busiris",
        country: "FRA",
        points: 2453,
        avatar: require("../../assets/images/avatar3.png"),
        flag: require("../../assets/images/fr.png"),
    },
    {
        rank: "04 -",
        name: "Jules Sebag",
        country: "FRA",
        points: 2426,
        avatar: require("../../assets/images/avatar4.png"),
        flag: require("../../assets/images/fr.png"),
    },
    {
        rank: "05 -",
        name: "Elodie Delacour",
        country: "FRA",
        points: 2342,
        avatar: require("../../assets/images/avatar5.png"),
        flag: require("../../assets/images/fr.png"),
    },
    {
        rank: "06 -",
        name: "Steph Curry",
        country: "FRA",
        points: 2316,
        avatar: require("../../assets/images/avatar6.png"),
        flag: require("../../assets/images/fr.png"),
    },   
    {
        rank: "07 -",
        name: "Agustin Furry",
        country: "FRA",
        points: 2287,
        avatar: require("../../assets/images/avatar7.png"),
        flag: require("../../assets/images/fr.png"),
    },  
    {
        rank: "08 -",
        name: "Simone Shorty",
        country: "FRA",
        points: 2284,
        avatar: require("../../assets/images/avatar8.png"),
        flag: require("../../assets/images/fr.png"),
    },  
    {
        rank: "09 -",
        name: "Rocky Balboa",
        country: "FRA",
        points: 2253,
        avatar: require("../../assets/images/avatar9.png"),
        flag: require("../../assets/images/fr.png"),
    },  
    {
        rank: "10 -",
        name: "Victor Delacroix",
        country: "FRA",
        points: 2234,
        avatar: require("../../assets/images/avatar10.png"),
        flag: require("../../assets/images/fr.png"),
    },   
];


export default function Tab() {

    return (
        <View style={styles.container}>

            <Header
                leftIcon={{
                    icon: <MaterialIcons name="arrow-back-ios" size={28} color="black" />,
                    onPress: () => router.back()
                }}
                rightIcon={{
                    icon: <Feather name="bell" size={30} color="black" />,
                    onPress: () => router.navigate("../(notification)/notif")
                }}
            />

            <View style={styles.separator}/>

              <View style={styles.hearderBoard}>
                <Text style={styles.board}>Rank</Text>
                <Text style={styles.board}>Player</Text>
                <Text style={styles.board}>Country</Text>
                <Text style={styles.board}>Points</Text>
            </View>

             <View style={styles.separator2}/>

              <ScrollView style={styles.scrollview} contentContainerStyle={styles.ScrollViewContent}>
                {players.map((player, index) => (
                    <View key={index} style={styles.row}>
                        
                        <Text style={styles.rank}>{player.rank}</Text>

                        <View style={styles.player}>
                            <Image source={player.avatar} style={styles.avatar} />
                            <Text style={styles.name}>{player.name}</Text>
                        </View>

                        <View style={styles.country}>
                            <Image source={player.flag} style={styles.flag} />
                            <Text>{player.country}</Text>
                        </View>

                        <Text style={styles.points}>{player.points}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: "6.35%",
        alignItems: "center",
    },
    separator: {
        backgroundColor: "#92c650",
        height: 2,
        width: "100%",
        marginBottom: 15,
    },
    separator2: {
        backgroundColor: "#000000",
        height: 2,
        width: "100%",
        marginTop: 10,
    },
    scrollview: {
        maxHeight: "84%",
        width: "100%",
    },
    hearderBoard: {
        gap: 38,
        flexDirection: "row",
    },
    board: {
        fontSize: 20,
        fontWeight: "bold",
    },
    ScrollViewContent: {
        paddingTop: 20,
        paddingBottom: 25, 
        alignItems: "center", 
        gap: 20
    },
    row: {
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    rank: {
        width: "10%",
        fontWeight: "bold",
    },
    player: {
        flexDirection: "row",
        alignItems: "center",
        width: "40%",
        gap: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    name: {
        fontWeight: "500",
    },
    country: {
        flexDirection: "row",
        alignItems: "center",
        width: "20%",
        gap: 5,
    },
    flag: {
        width: 24,
        height: 16,
    },
    points: {
        width: "15%",
        textAlign: "right",
        fontWeight: "bold",
    },
});