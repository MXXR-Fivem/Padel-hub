import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Invite from "../../assets/vectors/Invite.svg";

type Message = {
    id: number;
    text?: string;
    fromMe: boolean;
    system?: boolean;
    avatar?: any;
};

export default function messagePrivate() {

    const { group } = useLocalSearchParams<{ group?: string }>();
    const isGroup = group === "true";

    const header = isGroup
        ? { title: "TEAM KB5", avatar: require("../../assets/images/avatar12.png") }
        : { title: "Victor", avatar: require("../../assets/images/avatar19.png") };

    const messages: Message[] = isGroup
        ? [
              { id: 1, text: "We need to play guys", fromMe: false, avatar: require("../../assets/images/avatar2.png") },
              { id: 2, text: "What happened mate??", fromMe: true, avatar: require("../../assets/images/avatar1.png") },
              { id: 3, text: "I messed up... my teammate was so bad.", fromMe: false, avatar: require("../../assets/images/avatar9.png") },
              { id: 4, text: "Did u play with Théo?????", fromMe: true, avatar: require("../../assets/images/avatar1.png") },
              { id: 5, system: true, fromMe: false },
              { id: 6, text: "Can you take your second racket ? bring it since i destroyed mine", fromMe: false, avatar: require("../../assets/images/avatar2.png") },
              { id: 7, text: "Simon and Raph accept the invite so we play together!", fromMe: false, avatar: require("../../assets/images/avatar3.png") },
          ]
        : [
              { id: 1, text: "Bro last time at the park...", fromMe: false, avatar: require("../../assets/images/avatar19.png") },
              { id: 2, text: "What happened mate??", fromMe: true, avatar: require("../../assets/images/avatar1.png") },
              { id: 3, text: "I messed up... my teammate was so bad.", fromMe: false, avatar: require("../../assets/images/avatar19.png") },
              { id: 4, text: "Did u play with Théo?????", fromMe: true, avatar: require("../../assets/images/avatar1.png") },
              { id: 5, text: "This guy has been acting pretty badly lately. Ever since he got with his girlfriend, she's been isolating him and creating distance between him and us. I don't really know her; I met her in Portugal in 2022, and she wasn't very respectful. Next time, please send me an invite.", fromMe: true, avatar: require("../../assets/images/avatar1.png") },
              { id: 6, text: "Can you take your second racket ? bring it since i destroyed mine", fromMe: false, avatar: require("../../assets/images/avatar19.png") },
              { id: 7, text: "ye ill take it", fromMe: true, avatar: require("../../assets/images/avatar1.png") },
          ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()}>
                    <MaterialIcons name="arrow-back-ios" size={28} />
                </Pressable>

                <View style={styles.headerCenter}>
                    <Image source={header.avatar} style={styles.headerAvatar} />
                    <Text style={styles.headerTitle}>{header.title}</Text>
                </View>

                <SimpleLineIcons name="options-vertical" size={20} />
            </View>

            <View style={styles.separator} />

            <ScrollView style={styles.messages} contentContainerStyle={styles.messagesContent}>
                {messages.map((msg) => {
                    if (msg.system) {
                        return (
                            <View key={msg.id} style={styles.inviteCard}>
                                <View style={styles.inviteTop}>
                                    <Image style={styles.inviteLogo} source={require("../../assets/images/PadelHub.png")} />
                                    <View style={styles.inviteCenter}>
                                        <Text style={styles.inviteName}>TOM invited you!</Text>
                                        <Text style={styles.inviteTitle}>Friendly match</Text>
                                        <Text style={styles.inviteSub}>Urban Padel Puteaux</Text>
                                        <Text style={styles.inviteSub}>Monday 10 June 18h-20h</Text>
                                    </View>
                                    <View style={styles.inviteRight}>
                                        <View style={styles.inviteRow}>
                                            <Image style={styles.inviteAvatar} source={require("../../assets/images/avatar13.png")} />
                                            <Image style={styles.inviteAvatar} source={require("../../assets/images/avatar2.png")} />
                                        </View>
                                        <View style={styles.inviteRow}>
                                            <Invite width={45} height={45} />
                                            <Invite width={45} height={45} />
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.inviteFooter}>
                                    <TouchableOpacity style={styles.inviteButton}>
                                        <Text style={styles.inviteButtonText}>Accept</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    }

                    return (
                        <View key={msg.id} style={[styles.messageRow,msg.fromMe ? styles.alignRight : styles.alignLeft]}>
                            {!msg.fromMe && msg.avatar && <Image source={msg.avatar} style={styles.messageAvatar} />}
                            <View style={[styles.bubble,msg.fromMe ? styles.fromMe : styles.fromOther]}>
                                <Text style={styles.bubbleText}>{msg.text}</Text>
                            </View>
                            {msg.fromMe && msg.avatar && <Image source={msg.avatar} style={styles.messageAvatar} />}
                        </View>
                    );
                })}
            </ScrollView>

            <View style={styles.inputBar}>
                <TextInput placeholder="Type your message..." style={styles.input} />
                <View style={styles.sendButton}>
                    <Image source={require("../../assets/images/avatar1.png")} style={{ width: 22, height: 22 }} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f6efe6",
    },
    header: {
        paddingTop: 50,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerCenter: {
        alignItems: "center",
        gap: 6,
    },
    headerAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: "600",
    },
    separator: {
        height: 2,
        backgroundColor: "#92c650",
        marginTop: 12,
    },
    messages: {
        flex: 1,
    },
    messagesContent: {
        paddingHorizontal: 14,
        paddingVertical: 18,
        gap: 18,
    },
    messageRow: {
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 8,
        maxWidth: "85%",
    },
    alignRight: {
        alignSelf: "flex-end",
    },
    alignLeft: {
        alignSelf: "flex-start",
    },
    bubble: {
        paddingHorizontal: 18,
        paddingVertical: 14,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 8,
    },
    fromMe: {
        backgroundColor: "#2f4fff",
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
    },
    fromOther: {
        backgroundColor: "#92c650",
        borderBottomRightRadius: 30,
        borderTopLeftRadius: 30,
    },
    bubbleText: {
        color: "white",
        fontSize: 14,
        lineHeight: 20,
    },
    messageAvatar: {
        width: 34,
        height: 34,
        borderRadius: 17,
    },
    inviteCard: {
        backgroundColor: "#dadada",
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        borderTopLeftRadius: 30,
        borderBottomRightRadius: 30,
        gap: 10,
    },
    inviteTop: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 12,
    },
    inviteLogo: {
        width: 55,
        height: 55,
        borderRadius: 12,
    },
    inviteCenter: {
        flex: 1,
        gap: 4,
    },
    inviteRight: {
        alignItems: "flex-end",
        gap: 6,
    },
    inviteRow: {
        flexDirection: "row",
        gap: 6,
    },
    inviteAvatar: {
        width: 45,
        height: 45,
        borderRadius: 20,
    },
    inviteName: {
        color: "#3F79DC",
        fontWeight: "700",
        fontSize: 13,
    },
    inviteTitle: {
        fontWeight: "700",
        fontSize: 15,
    },
    inviteSub: {
        fontSize: 12,
        color: "#555",
    },
    inviteFooter: {
        alignItems: "center",
        marginTop: 6,
    },
    inviteButton: {
        backgroundColor: "#92c650",
        paddingVertical: 8,
        paddingHorizontal: 50,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    inviteButtonText: {
        fontWeight: "700",
        fontSize: 14,
        letterSpacing: 0.5,
    },
    inputBar: {
        flexDirection: "row",
        paddingHorizontal: 12,
        paddingVertical: 10,
        paddingBottom: 20,
        alignItems: "center",
        gap: 10,
    },
    input: {
        flex: 1,
        backgroundColor: "#ffffff",
        borderRadius: 30,
        paddingHorizontal: 18,
        height: 46,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 6,
    },
    sendButton: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: "#92c650",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
});