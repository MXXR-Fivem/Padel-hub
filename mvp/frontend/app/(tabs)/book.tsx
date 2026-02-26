import { View, Text, StyleSheet, Image, TextInput, ScrollView, Pressable, ImageSourcePropType } from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import Slider from '@react-native-community/slider';
import { LinearGradient } from "expo-linear-gradient";
import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import StarFilled from "../../assets/vectors/stars_filled.svg";
import StarUnfilled from "../../assets/vectors/stars_unfilled.svg";
import MapScreen from "../(map)/map";
import Header from "../components/Header";

export type PadelCourt = {
    id: string;
    name: string,
    image: ImageSourcePropType,
    note: number,
    numberComments: number,
    priceHour: number,
    latitude: number;
    longitude: number;
};

export const courtsList: PadelCourt[] = [
    {
        id: "1",
        name: "Padel Effel Tower",
        image: require("../../assets/images/padelEffelTower.png"),
        note: 4.7,
        numberComments: 145,
        priceHour: 50,
        latitude: 48.851219,
        longitude: 2.278951,
    },
    {
        id: "2",
        name: "Padel Puteau",
        image: require("../../assets/images/padelPuteau.png"),
        note: 4.3,
        numberComments: 58,
        priceHour: 48,
        latitude: 48.876258,
        longitude: 2.243995,
    },
    {
        id: "3",
        name: "Padel 95 Pontoise",
        image: require("../../assets/images/padel95.png"),
        note: 4.8, numberComments: 26,
        priceHour: 46,
        latitude: 49.047801,
        longitude: 2.07899,
    },
    {
        id: "4",
        name: "Night Padel Paris",
        image: require("../../assets/images/nightPadel.png"),
        note: 4.9,
        numberComments: 134,
        priceHour: 52,
        latitude: 48.87422669457615,
        longitude: 2.3888530448560283,
    },
    {
        id: "5",
        name: "Forest Hill - Aquaboulevard",
        image: require("../../assets/images/forestHillPadel.png"),
        note: 4.5,
        numberComments: 88,
        priceHour: 50,
        latitude: 48.83117029790076,
        longitude: 2.2758228683128654,
    },
]

export default function Tab() {
    const [distance, setDistance] = useState(0);
    const [currentPadelCourt, setCurrentPadelCourt] = useState<string>("1");
    const [filter, setFilter] = useState("");

    useEffect(() => {
        setCurrentPadelCourt("0");
    }, [])

    const getStars = (note: number) => {
        const courtStars: any[] = [];
        for (let i = 0; i < Number(note.toString()[0]); i++) {
            courtStars.push(
                <StarFilled key={i}/>
            );
        }
        if (Number(note.toString().split('.')[1]) > 5) {
            courtStars.push(
                <StarUnfilled style={styles.unfilledstars} key={note}/>
            );
        }
        return <View style={styles.starsContainer}>{courtStars}</View>;
    };

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

            <View style={[styles.topContainer, {borderBottomLeftRadius: 25, borderBottomRightRadius: 25}]}>
                <LinearGradient
                    colors = {["#3d5ce6", "#A6FFCB"]}
                    style = {[
                        styles.gradient,
                        {borderBottomLeftRadius: 25, borderBottomRightRadius: 25}
                    ]}>
                </LinearGradient>
                <Text style={[styles.topText, styles.textShadow]}>Find a Court</Text>
                <MapScreen data={{type: "court", distance: distance, currentPadelCourt: currentPadelCourt, padelCourtList: courtsList.filter((c) => c.name.toLowerCase().includes(filter.toLowerCase())), resetCurrentPadelCourt: () => {setCurrentPadelCourt("0")}}}/>
            </View>

            <View style={[styles.searchBar]}>
                <TextInput 
                    style={styles.textInput}
                    placeholder="Search a Court ..."
                    placeholderTextColor="gray"
                    onChangeText={filter => setFilter(filter)}
                />
                <View style={styles.sliderContainer}>
                    <Text style={styles.sliderText}>{distance*4 + "km"}</Text>
                    <Slider
                        style={styles.slider}
                        value={distance}
                        step={0.5}
                        onValueChange={(value) => setDistance(Math.round(value)/4)}
                        minimumValue={0}
                        maximumValue={20}
                        minimumTrackTintColor="#92c650"
                        maximumTrackTintColor="#929191"
                    />
                    <Text style={styles.sliderText}>20km</Text>
                </View>
            </View>

            <ScrollView
                style={[styles.courtList]}
                showsVerticalScrollIndicator={false}
                contentContainerStyle = {{
                    paddingTop: 20,
                    paddingBottom: 75, 
                    alignItems: "center", 
                    gap: 12,
                }}>
                {courtsList
                    .filter((c) => c.name.toLowerCase().includes(filter.toLowerCase()))
                    .map((court, index) => {
                        return (
                            <View style={[styles.courtButton, styles.shadow]} key={index}>
                                <View style={[styles.leftContainer]}>
                                    <Image style={styles.padelCourtImage} source={court.image}/>
                                    <View>
                                        <Text style={styles.courtName}>{court.name}</Text>
                                        <View style={styles.notesContainer}>
                                            {getStars(court.note)}
                                            <Text style={styles.textNumberComments}>{"(" + court.numberComments + ")"}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.rightContainer}>
                                    <Pressable
                                        onPress={() => setCurrentPadelCourt(court.id)}
                                        style={[styles.pingButton]}
                                    >
                                        <FontAwesome6 style={styles.shadow} name="map-pin" size={24} color="white" />
                                    </Pressable>
                                    <Pressable
                                        onPress={() =>
                                            router.navigate({
                                                pathname: "../(booking)/confirmation",
                                                params: { courtId: String(court.id) },
                                            })
                                        }
                                        style={[styles.bookButton]}
                                    >
                                        <AntDesign style={styles.shadow} name="arrow-right" size={24} color="white" />
                                    </Pressable>
                                </View>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: "7%",
        alignItems: "center",
    },
    separator: {
        backgroundColor: "#92c650",
        height: 2,
        width: "100%",
    },
    gradient: {
        width: "100%",
        height: "100%",
        position: "absolute",
    },
    topContainer: {
        width: "90%",
        height: "33.5%",
        alignItems: "center",
        justifyContent: "space-between",
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
    searchBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%",
        marginTop: 18,
        paddingHorizontal: 12.5,
        height: 35,
        borderWidth: 2.25,
        borderRadius: 10,
        borderColor: "#a8a8a8",
    },
    textInput: {
        color: "black",
        width: "40%",
    },
    sliderContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "55%",
        gap: 5,
    },
    slider: {
        width: "60%",
    },
    sliderText: {
        color: "#9c9c9c",
        fontWeight: 700,
    },
    courtList: {
        width: "90%",
    },
    courtButton: {
        width: "95%",
        height: 80,
        backgroundColor: "#efefef",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 15,
        paddingHorizontal: 12.5,
    },
    leftContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "50%",
        gap: 10,
    },
    padelCourtImage: {
        maxHeight: 50,
        maxWidth: 50,
        borderRadius: 100,
    },
    rightContainer: {
        height: "45%",
        width: "25%",
        flexDirection: "row",
        gap: 5,
        marginRight: 5,
    },
    pingButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#92c650",
        height: "100%",
        width: "50%",
        borderRadius: 10,
        shadowColor: "#888888",
        shadowOffset: {width: 2, height: 5},
        shadowOpacity: 0.7,
        shadowRadius: 2,
    },
    bookButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#92c650",
        height: "100%",
        width: "50%",
        borderRadius: 10,
        shadowColor: "#888888",
        shadowOffset: {width: 2, height: 5},
        shadowOpacity: 0.7,
        shadowRadius: 2,
    },
    courtName: {
        fontSize: 17.5,
        fontWeight: 600,
        marginLeft: 2,
    },
    notesContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
    },
    starsContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    unfilledstars: {
        marginRight: 5,
    },
    textNumberComments: {
        color: "#565656",
    },
    shadow: {
        shadowColor: "#4c4c4c",
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.8,
        shadowRadius: 3,
    },
});