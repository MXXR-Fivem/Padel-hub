import { Image, Text, ScrollView, StyleSheet, View, TextInput, Pressable, ImageSourcePropType, TouchableOpacity } from "react-native";
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from "@expo/vector-icons/Feather";
import Ionicons from '@expo/vector-icons/Ionicons';
import Header from "../components/Header";

export type Player = {
    id: string,
    name: string,
    avatar: ImageSourcePropType,
}

export const playersList: Player[] = [
    {
        id: "1",
        name: "Theo Busiris",
        avatar: require("../../assets/images/avatar3.png"),
    },
    {
        id: "2",
        name: "Simon Léger",
        avatar: require("../../assets/images/avatar1.png"),
    },
    {
        id: "3",
        name: "Plouf Paff",
        avatar: require("../../assets/images/avatar2.png"),
    },
    {
        id: "5",
        name: "Jules Sebag",
        avatar: require("../../assets/images/avatar4.png"),
    },
    {
        id: "6",
        name: "Elodie Delacour",
        avatar: require("../../assets/images/avatar5.png"),
    },
    {
        id: "7",
        name: "Steph Curry",
        avatar: require("../../assets/images/avatar6.png"),
    },   
    {
        id: "8",
        name: "Agustin Furry",
        avatar: require("../../assets/images/avatar7.png"),
    },  
    {
        id: "9",
        name: "Simone Shorty",
        avatar: require("../../assets/images/avatar8.png"),
    },  
    {
        id: "10",
        name: "Rocky Balboa",
        avatar: require("../../assets/images/avatar9.png"),
    },  
    {
        id: "11",
        name: "Victor Delacroix",
        avatar: require("../../assets/images/avatar10.png"),
    },   
];

export default function Tab() {
    const [filter, setFilter] = useState<string>("");
    const { myId } = useLocalSearchParams<{ myId: string }>();

    return (
        <View style={styles.container}>

            <Header
                leftIcon={{
                    icon: <MaterialIcons name="arrow-back-ios" size={28} color="black" />,
                    onPress: () => router.back()
                }}
                rightIcon={{
                    icon: <SimpleLineIcons name="paper-plane" size={26} color="black" />,
                    onPress: () => router.navigate("../(message)/message")
                }}
            />


            <View style={styles.separator}/>

            <View style={styles.searchContainer}>
                <Feather name="search" size={18} color="#888" />
                <TextInput
                    placeholder={"Find a friend"}
                    placeholderTextColor={"#6b6b6b"}
                    value={filter}
                    onChangeText={(newFilter) => setFilter(newFilter)}
                    style={styles.searchLane}
                />
            </View>

            <ScrollView style={styles.scrollview} contentContainerStyle={styles.ScrollViewContent}>
                {playersList.filter((p) => (p.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) && p.id != myId).map((player, index) => (
                    <TouchableOpacity 
                        onPress={() => router.back()}
                        key={index} 
                        style={styles.row}
                    >
                        <View style={styles.player}>
                            <Image source={player.avatar} style={styles.avatar} />
                            <Text style={styles.name}>{player.name}</Text>
                        </View>

                        <View style={styles.ball}>
                            <Ionicons name="tennisball" size={24} color="green" />
                        </View>
                    </TouchableOpacity>
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
        backgroundColor: "#e4e0dd",
        borderRadius: 18,
        paddingVertical: 14,
        paddingHorizontal: 16,

        shadowColor: "#464646",
        shadowOffset: { width: 0, height: 4 },
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
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    name: {
        fontWeight: "500",
    },
    ball: {
        flexDirection: "row",
        alignItems: "center",
        width: "10%",
        gap: 5,
        shadowColor: "#0000",
        shadowRadius: 10,
        shadowOpacity: 0.5,
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