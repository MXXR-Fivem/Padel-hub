import { Image, Text, ScrollView, StyleSheet, View, StatusBar, useWindowDimensions } from "react-native";
import { router } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/Header";

export default function Tab() {
    return (
        <View style={styles.container}>
            
            <Header
                leftIcon={{
                    icon: <MaterialIcons name="arrow-back-ios" size={24} color="black" />,
                    onPress: () => router.navigate("../../(tabs)/training")
                }}
                rightIcon={{
                    icon: <Feather name="bell" size={30} color="black" />,
                    onPress: () => router.navigate("../../(notification)/notif")
                }}
            />

            <View style={styles.separator} />

            <View style={[styles.topContainer, { borderBottomLeftRadius: 45, borderBottomRightRadius: 45 }]}>
                <LinearGradient colors={["#88F8A7", "#E9CF91"]} style={[styles.gradient, { borderBottomLeftRadius: 45, borderBottomRightRadius: 45 }]} />
                <Text style={[styles.topText, styles.textShadow]}>Padel Rules</Text>
            </View>

            <ScrollView style={styles.scrollview} contentContainerStyle={styles.ScrollViewContent}>

                <View style={styles.containerBtn}>
                    <Text style={styles.btnText}>THE SHIFT</Text>
                </View>

                <Image style={styles.screen} source={require("../../assets/images/Rules1.png")} />

                <View style={styles.container2Btn}>
                    <Text style={styles.btnText2}>
                        Racket: Choose a round, lightweight racket when you're starting out for maximum control and fewer mistakes.{"\n\n"}
                        A wrist strap must be worn at all times.
                    </Text>
                </View>

                <View style={styles.containerBtn}>
                    <Text style={styles.btnText}>SCORING</Text>
                </View>

                <View style={styles.container2Btn}>
                    <Text style={styles.btnText2}>
                        Game: 15, 30, 40.{"\n"}At 40-40, play advantage.{"\n\n"}Set: First to 6 games. Tie-break at 6-6.{"\n"}Match: Best of 3 sets.{"\n\n"}Tie-break: First to 7 points with a 2-point lead.{"\n"}First server has only one serve.
                    </Text>
                </View>

                <View style={styles.containerBtn}>
                    <Text style={styles.btnText}>THE SERVE</Text>
                </View>

                <View style={styles.container2Btn}>
                    <Text style={styles.btnText2}>
                        Two attempts per point.{"\n"}Let: replay if the ball touches the net and lands correctly.{"\n\n"}After the bounce, the ball may hit the glass but not the fence.{"\n\n"}Serve alternates right and left sides.{"\n"}Partners take turns serving each game.
                    </Text>
                </View>

                <Image style={styles.screen} source={require("../../assets/images/Rules2.png")} />

                <View style={styles.container2Btn}>
                    <Text style={styles.btnText2}>
                        1. Server{"\n"}2. Server's partner (free position){"\n"}3. Receiver (free position){"\n"}4. Receiver's partner (free position)
                    </Text>
                </View>

                <Image style={styles.screen} source={require("../../assets/images/Rules3.png")} />

                <View style={styles.container2Btn}>
                    <Text style={styles.btnText2}>The serve is underhand.{"\n"}The ball must bounce on the ground and must not be above waist at the moment it is hit.</Text>
                </View>

                <Image style={styles.screen} source={require("../../assets/images/Rules4.png")} />

                <View style={styles.container2Btn}>
                    <Text style={styles.btnText2}>
                        At no time before the hit may the server's feet touch or cross the service line or the center line
                    </Text>
                </View>

                <Image style={styles.screen} source={require("../../assets/images/Rules5.png")} />

                <View style={styles.container2Btn}>
                    <Text style={styles.btnText2}>On the serve, the ball may hit the glass wall after bouncing in the service box, but not the mesh fence.</Text>
                </View>

                <Image style={styles.imageSpacing} source={require("../../assets/images/Rules6.png")} />

                <View style={styles.container2Btn}>
                    <Text style={styles.btnText2}>If the ball hits the junction between the glass wall and the mesh fence, the ball is in play only if it rebounds toward the receiver.</Text>
                </View>

                <Image style={styles.imageSpacing} source={require("../../assets/images/Rules7.png")} />

                <View style={styles.container2Btn}>
                    <Text style={styles.btnText2}>The ball must hit the ground before touching the wall or the mesh fence.</Text>
                </View>

                <Image style={styles.imageSpacing} source={require("../../assets/images/Rules8.png")} />

                <View style={styles.container2Btn}>
                    <Text style={styles.btnText2}>The ball may touch the walls or the mesh fence several times, but it may hit the ground only once.</Text>
                </View>

                <Image style={styles.imageSpacing} source={require("../../assets/images/Rules9.png")} />

                <View style={styles.container2Btn}>
                    <Text style={styles.btnText2}>The ball may be played off your own glass wall, but not your own mesh fence.</Text>
                </View>

                <Image style={styles.imageSpacing} source={require("../../assets/images/Rules10.png")} />

                <View style={styles.container2Btn}>
                    <Text style={styles.btnText2}>A player must never touch the net or hit the ball before it has crossed the net</Text>
                </View>

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
    },
    topContainer: {
        zIndex: 1,
        width: "90%",
        height: "8%",
        alignItems: "center",

        shadowColor: "#888",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.7,
        shadowRadius: 4,
    },
    topText: {
        color: "white",
        fontSize: 35,
        fontWeight: "900",
        marginVertical: 12.5,
    },
    textShadow: {
        shadowColor: "#393939",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.7,
        shadowRadius: 2,
    },
    gradient: {
        width: "100%",
        height: "100%",
        position: "absolute",
    },
    scrollview: {
        flex: 1,
        width: "100%",
        marginTop: "-2%",
    },
    ScrollViewContent: {
        paddingTop: 45,
        paddingBottom: 85,
        alignItems: "center",
        gap: 20,
    },
    containerBtn: {
        backgroundColor: "#92c650",
        width: "65%",
        height: 45,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#494949",
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 3,
    },
    btnText: {
        fontSize: 13,
        color: "#ffffff",
        fontWeight: "700",
        textAlign: "center",
        letterSpacing: 0.5,
    },
    container2Btn: {
        backgroundColor: "#F7F2EE",
        width: "85%",
        borderRadius: 20,

        paddingVertical: 12,
        paddingHorizontal: 16,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    btnText2: {
        fontSize: 12,
        color: "#000000",
        fontWeight: "600",
        textAlign: "center",
        lineHeight: 16,
        letterSpacing: 0.3,
    },
    screen: {
        width: "90%",
        resizeMode: "contain",
    },
    imageSpacing: {
        width: "90%",
        resizeMode: "contain",
        marginBottom: 25,
    },
});