import { Image, Text, ScrollView, StyleSheet, View, StatusBar, TextInput, Pressable, ImageSourcePropType } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from "@expo/vector-icons/Feather";
import Ionicons from '@expo/vector-icons/Ionicons';
import Header from "../components/Header";

type friends = {
    name: string,
    avatar: ImageSourcePropType,
    message: string,
    group: boolean,
}

const friendsList: friends[] = [
    {
        
        name: "Selena",
        avatar: require("../../assets/images/avatar11.png"),
        message: "Tell me when your available we need to...",
        group: false,
    },
    {
        name: "Team KB5",
        avatar: require("../../assets/images/avatar12.png"),
        message: "Theo: I need to practise my smash guys!...",
        group: true,
    },
    {
        name: "Bob",
        avatar: require("../../assets/images/avatar13.png"),
        message: "Love the strat' you've played last week!",
        group: false,
    },
    {
        name: "Clara",
        avatar: require("../../assets/images/avatar14.png"),
        message: "I miss ours matchs so much ;)",
        group: false,
    },
    {
        name: "Liza",
        avatar: require("../../assets/images/avatar15.png"),
        message: "Ok see u!",
        group: false,
    },
    {
        name: "Laeticia",
        avatar: require("../../assets/images/avatar16.png"),
        message: "Did you win last tournament dear ?",
        group: false,
    },   
    {
        name: "Team Kitchen",
        avatar: require("../../assets/images/avatar17.png"),
        message: "Celia: i bring the balls for the match",
        group: false,
    },  
    {
        name: "Julianne",
        avatar: require("../../assets/images/avatar18.png"),
        message: "I broke your glasses :////",
        group: false,
    },  
    {
        name: "Victor",
        avatar: require("../../assets/images/avatar19.png"),
        message: "Can you bring your second racket ?",
        group: false,
    },  
    {
        name: "Elodie",
        avatar: require("../../assets/images/avatar20.png"),
        message: "I miss u so much slack",
        group: false,
    },   
];


export default function Tab() {
    const [filter, setFilter] = useState<string>("");

    return (
        <View style={styles.container}>

            <Header
                leftIcon={{
                    icon: <MaterialIcons name="arrow-back-ios" size={28} color="black" />,
                    onPress: () => router.back()
                }}
                rightIcon={{
                    icon: <Feather name="bell" size={26} color="black" />,
                    onPress: () => router.navigate("../(notification)/notif")
                }}
            />

            <View style={styles.separator} />

            <View style={styles.searchContainer}>
                <Feather name="search" size={18} color="#888" />
                <TextInput
                    style={styles.searchLane}
                    value={filter}
                    onChangeText={(newFilter) => setFilter(newFilter)}
                    placeholderTextColor={"#6b6b6b"}
                    placeholder="Find a friend"
                />
            </View>

            <ScrollView style={styles.scrollview} contentContainerStyle={styles.ScrollViewContent}>
                {friendsList.filter((p) => p.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())).map((player, index) => (
                    <Pressable
                        key={index}
                        style={styles.row}
                        onPress={() =>
                            router.push({
                                pathname: "./messagePrivate",
                                params: { group: player.group ? "true" : "false" },
                            })
                        }
                    >
                        <View style={styles.player}>
                            <Image source={player.avatar} style={styles.avatar} />
                            <View>
                                <Text style={styles.name}>{player.name}</Text>
                                <Text style={styles.message}>{player.message}</Text>
                            </View>
                        </View>

                        <View style={styles.ball}>
                            <Ionicons name="tennisball" size={32} color="green" />
                        </View>
                    </Pressable>
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
    row: {
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#f0f0f0",
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        shadowColor: "#464646",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    rank: {
        width: "10%",
        fontWeight: "bold",
    },
    player: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    name: {
        fontWeight: "500",
        
    },
    message: {
        flexDirection: "column",
        fontStyle: "normal",
        fontSize: 10
    },
    ball: {
        flexDirection: "row",
        alignItems: "center",
        width: "10%",
        gap: 5,
    },
    icon: {
        width: 24,
        height: 16,
    },
    points: {
        width: "15%",
        textAlign: "right",
        fontWeight: "bold",
    },
    searchContainer: {
        width: "90%",
        height: 42,
        backgroundColor: "#f0f0f0",
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        gap: 8,
        marginBottom: 6,
        shadowColor: "#4a4a4a",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 3,
    },
    searchLane: {
        color: "#888",
        fontSize: 14,
        width: "90%",
        marginLeft: 5,
    },
});