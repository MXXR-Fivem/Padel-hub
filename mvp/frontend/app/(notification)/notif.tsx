import { Image, ImageSourcePropType, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Header from "../components/Header";

type interaction = "follow" | "like" | "invite";

type usersNotif = {
    type: interaction;
    new?: boolean;
    name: string;
    avatar: ImageSourcePropType;
    post?: ImageSourcePropType;
};

const usersNotifList: usersNotif[] = [
    {
        type: "like",
        new: true,
        name: "Théo",
        avatar: require("../../assets/images/avatar3.png"),
        post: require("../../assets/images/post1.png"),
    },
    {
        type: "follow",
        name: "Liza",
        avatar: require("../../assets/images/avatar11.png"),
    },
    {
        type: "invite",
        name: "Bob",
        avatar: require("../../assets/images/avatar13.png"),
    },
    {
        type: "follow",
        name: "Laeticia",
        avatar: require("../../assets/images/avatar14.png"),
    },
    {
        type: "like",
        name: "Jules",
        avatar: require("../../assets/images/avatar4.png"),
        post: require("../../assets/images/post2.png"),
    },
    {
        type: "follow",
        name: "Victor",
        avatar: require("../../assets/images/avatar19.png"),
    },
    {
        type: "invite",
        name: "Laura",
        avatar: require("../../assets/images/avatar17.png"),
    },
    {
        type: "follow",
        name: "Leanna",
        avatar: require("../../assets/images/avatar18.png"),
    },
    {
        type: "like",
        name: "Coach Plouf",
        avatar: require("../../assets/images/coachPlouf.png"),
        post: require("../../assets/images/post2.png"),
    },
];

function notifMessage(type: interaction) {
    switch (type) {
        case "follow":
            return "is following you now";
        case "invite":
            return "sent you an invite for a game";
        case "like":
        default:
            return "liked your post";
    }
}

function NotifRow({ notif }: { notif: usersNotif }) {
    return (
        <View style={styles.row}>
            <View style={styles.user}>
                <Image source={notif.avatar} style={styles.avatar} />
                <Text style={styles.name}>{notif.name}</Text>
                <Text style={styles.message}>{notifMessage(notif.type)}</Text>
            </View>
            <View style={styles.ball}>
                {notif.type === "invite" ? (
                    <Ionicons style={styles.tennisBall} name="tennisball" size={32} color="green" />
                ) : notif.type === "like" && notif.post ? (
                    <Image source={notif.post} style={styles.post} />
                ) : 
                    <Pressable style={styles.followBackButton}>
                        <Text style={styles.followBackText}>Follow</Text>
                    </Pressable>
                }
            </View>
        </View>
    );
}

export default function Tab() {
    const [filter, setFilter] = useState<string>("");
    const newNotifs = usersNotifList.filter((u) => u.new);
    const oldNotifs = usersNotifList.filter((u) => !u.new);

    return (
        <View style={styles.container}>

            <Header
                leftIcon={{
                    icon: <MaterialIcons name="arrow-back-ios" size={28} color="black" />,
                    onPress: () => router.back()
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

            <ScrollView
                style={styles.scrollview}
                contentContainerStyle={{
                    paddingTop: 20,
                    paddingBottom: 25,
                    alignItems: "center",
                    gap: 17.5,
                }}
            >
                {newNotifs.filter((n) => n.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())).length > 0 ? <Text style={styles.newText}>New</Text> : null}
                
                {newNotifs.filter((n) => n.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())).map((notif, index) => (
                    <NotifRow key={`new-${index}`} notif={notif} />
                ))}

                {newNotifs.filter((n) => n.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())).length > 0 ? <View style={styles.newSeparator} /> : null}

                {oldNotifs.filter((n) => n.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())).map((notif, index) => (
                    <NotifRow key={`old-${index}`} notif={notif} />
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
        maxHeight: "120%",
        width: "100%",
    },
    row: {
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: 15,
    },
    rank: {
        width: "10%",
        fontWeight: "bold",
    },
    user: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    name: {
        fontWeight: "500",
    },
    message: {
        flexDirection: "column",
        fontStyle: "normal",
        fontSize: 13,
        marginLeft: -5,
    },
    post: {
        position: "absolute",
        zIndex: 1,
        marginLeft: -5,
    },
    follow: {
        position: "absolute",
        zIndex: 1,
        left: -20,
        top: 2,
    },
    ball: {
        flexDirection: "row",
        alignItems: "center",
        width: "10%",
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
        marginLeft: 5,
        width: "90%",
    },
    newText: {
        alignSelf: "flex-start",
        marginLeft: "5%",
        color: "#4a4a4a",
        fontWeight: 800,
        fontSize: 17.5,
    },
    newSeparator: {
        height: 2,
        backgroundColor: "#808080",
        width: "90%",
    },
    followBackButton: {
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        width: 70,
        backgroundColor: "#92c650",
        borderRadius: 15,
        marginLeft: -13.5,
    },
    followBackText: {
        fontSize: 15,
        fontWeight: 600,
    },
    tennisBall: {
        marginLeft: 5,
    },
});
