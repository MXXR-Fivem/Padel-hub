import { Image, Text, ScrollView, StyleSheet, View } from "react-native";
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

            <View style={styles.separator}/>
            
            <View style={[styles.topContainer, {borderBottomLeftRadius: 45, borderBottomRightRadius: 45}]}>
                <LinearGradient
                    colors = {["#3d5ce6", "#A6FFCB"]}
                    style = {[
                        styles.gradient,
                        {borderBottomLeftRadius: 45, borderBottomRightRadius: 45}
                    ]}>
                </LinearGradient>
                <Text style={[styles.topText, styles.textShadow]}>Padel Strat</Text>
            </View>

            <ScrollView style={styles.scrollview} contentContainerStyle={styles.ScrollViewContent}>

                <View style={styles.containerBtn}>
                    <Text style={[styles.btnText]}>THE SHIFT</Text>
                </View>

                <View>
                    <Image style={styles.screen} source={require("../../assets/images/Strat1.png")} />
                </View>         

                <View style={styles.container2Btn}>
                    <Text style={[styles.btnText2]}>The serve is underhand</Text>
                </View>

                <View style={styles.containerBtn}>
                    <Text style={[styles.btnText]}>LOB & ADVANTAGE TOGETHER</Text>
                </View>

                <View>
                    <Image style={styles.screen} source={require("../../assets/images/Strat2.png")} />   
                </View>

                <View style={styles.container2Btn}>
                    <Text style={[styles.btnText2]}>The ball must bounce on the ground and musn't be above waist when hit</Text>
                </View>

                <View style={styles.containerBtn}>
                    <Text style={[styles.btnText]}>CHIQUITA to win the net</Text>
                </View>

                <View>
                    <Image style={styles.screen} source={require("../../assets/images/Strat2.png")} />
                </View>

                <View style={styles.container2Btn}>
                    <Text style={[styles.btnText2]}>Hit a low ball then advance</Text>
                </View>

                <View style={styles.containerBtn}>
                    <Text style={[styles.btnText]}>Bandera/Vibora to counter lobs</Text>
                </View>

                <View>
                    <Image style={styles.screen} source={require("../../assets/images/Strat3.png")} />
                </View>

                <View style={styles.container2Btn}>
                    <Text style={[styles.btnText2]}>Player must never touch the net or hit the ball before it has crossed the net</Text>
                </View>

                <View style={styles.containerBtn}>
                    <Text style={[styles.btnText]}>Australian</Text>
                </View>

                <View>
                    <Image style={styles.screen} source={require("../../assets/images/Strat4.png")} />   
                </View>
                
                <View style={styles.containerBtn}>
                    <Text style={[styles.btnText]}>Service Tactic</Text>
                </View>

                <View>
                    <Image style={{paddingBottom: 25,}} source={require("../../assets/images/Strat4.png")} />
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
        marginBottom: 0,
    },
    topContainer: {
        zIndex: 1,
        width: "90%",
        height: "8%",
        display: "flex",
        alignItems: "center",
        shadowColor: "#888888",
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.7,
        shadowRadius: 4,
    },
    topText: {
        color: "white",
        fontSize: 35,
        fontWeight: 900,
        marginVertical: 12.5,
    },
    textShadow: {
        shadowColor: "#393939",
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.7,
        shadowRadius: 2,
    },
    gradient: {
        width: "100%",
        height: "100%",
        position: "absolute",
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
        fontWeight: 700,
        letterSpacing: 0.5,
        textAlign: "center",
    },
    container2Btn: {
        backgroundColor: "#d7d8d6",
        width: "75%",
        height: 35,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    btnText2: {
        fontSize: 11,
        color: "#000000",
        fontWeight: 700,
        letterSpacing: 0.2,
        textAlign: "center",
    },
    screen: {
        justifyContent: "center",
    },
    scrollview: {
        marginTop: "-2%",
        maxHeight: "84%",
        width: "100%",
    },
    ScrollViewContent: {
        paddingTop: 45,
        paddingBottom: 75, 
        alignItems: "center", 
        gap: 20
    },
    icon: {
        width: 24,
        height: 16,
    },
    searchContainer: {
        width: "90%",
        height: 42,
        backgroundColor: "#F7F2EE",
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        gap: 8,
        marginBottom: 20,

        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    searchLane: {
        color: "#888",
        fontSize: 14,
    },
});