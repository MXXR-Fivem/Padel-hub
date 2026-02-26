import { View, Text, StyleSheet, Pressable, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useState, useMemo } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { addDays, format } from "date-fns";
import { courtsList, PadelCourt } from "../(tabs)/book";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from "@expo/vector-icons/Feather";
import Invite from "../../assets/vectors/Invite.svg";
import { playersList } from "./contact";
import Header from "../components/Header";

type nextDispo = {
    "07:00": boolean, "08:00": boolean, "09:00": boolean, "10:00": boolean,
    "11:00": boolean, "12:00": boolean, "13:00": boolean, "14:00": boolean,
    "15:00": boolean, "16:00": boolean, "17:00": boolean, "18:00": boolean,
    "19:00": boolean, "20:00": boolean, "21:00": boolean, "22:00": boolean,
    "23:00": boolean, "00:00": boolean,
}

type promoCode = {
    code: string,
    percent: number,
}

export default function Tab() {
    const myId = "1";
    const { courtId } = useLocalSearchParams<{ courtId?: string }>();
    const currentCourt: PadelCourt = courtsList.filter((c) => c.id == courtId)[0];
    const [currentDay, setCurrentDay] = useState<number>(0);
    const [currentHours, setCurrentHours] = useState<string | null>(null);
    const [openedPopup, setOpenedPopup] = useState<boolean>(false);
    const [duration, setDuration] = useState<number>(1);
    const [currentPromo, setCurrentPromo] = useState<number>(0);
    const [valuePromo, setValuePromo] = useState<string>("");
    const [currentplayers, setCurrentPlayers] = useState<string[]>(["1"]);

    const promoCodeList: promoCode[] = [
        {code: "EpiPadel10", percent: 10},
        {code: "Padel94", percent: 30},
    ] 

    let priceTotal = currentCourt.priceHour;
    priceTotal = useMemo(() => {
        return Math.round((priceTotal - (priceTotal * currentPromo / 100)) * 100) / 100;
    }, [duration, currentPromo])

    const nextDaysList = useMemo(() => {
        const today = new Date();
        return Array.from({ length: 10 }, (_, i) => {
            const day = addDays(today, i);
            return {
                id: i,
                label: format(day, "EEEE"),
                date: day.getDate(),
                dispo: {
                    "07:00": Math.random() > 0.5, "08:00": Math.random() > 0.5, "09:00": Math.random() > 0.5, "10:00": Math.random() > 0.5,
                    "11:00": Math.random() > 0.5, "12:00": Math.random() > 0.5, "13:00": Math.random() > 0.5, "14:00": Math.random() > 0.5,
                    "15:00": Math.random() > 0.5, "16:00": Math.random() > 0.5, "17:00": Math.random() > 0.5, "18:00": Math.random() > 0.5,
                    "19:00": Math.random() > 0.5, "20:00": Math.random() > 0.5, "21:00": Math.random() > 0.5, "22:00": Math.random() > 0.5,
                    "23:00": Math.random() > 0.5, "00:00": Math.random() > 0.5,
                }
            };
        });
    }, []);

    return (
        <View style={styles.container}>
            
            <Header
                leftIcon={{
                    icon: <MaterialIcons name="arrow-back-ios" size={24} color="black" />,
                    onPress: () => router.navigate("../../(tabs)/book")
                }}
                rightIcon={{
                    icon: <Feather name="bell" size={30} color="black" />,
                    onPress: () => router.navigate("../../(notification)/notif")
                }}
            />

            <View style={styles.separator} />

            <ScrollView 
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 5, paddingHorizontal: 5, gap: 7 }}
                style={styles.containerDays}
            >
                {nextDaysList.map((day, index) => (
                    <TouchableOpacity
                        onPress={() => {setCurrentDay(index); setCurrentHours(null)}}
                        style={[styles.bubleDay, {backgroundColor: currentDay == index ? "#92c650" : "#9d9d9d"}]} key={index}
                    >
                        <Text style={styles.dateDay}>{day.date}</Text>
                        <Text style={styles.dateLabel}>{day.label.slice(0, 3)}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <Image style={styles.courtImage} source={currentCourt.image}/>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 3, gap: 7 }}
                style={styles.scrollViewHours}
            >
                {(Object.entries(nextDaysList.find((d) => d.id == currentDay)?.dispo ?? {}) as Array<[string, boolean]>).map(([key, value], index) => (
                    <TouchableOpacity
                        onPress={() => !value && setCurrentHours(key)}
                        style={[styles.hoursButton, {backgroundColor: currentHours && currentHours == key ? "#92c650" : value ? "#666666" : "#c2c2c2" }]} key={`${key}-${index}`}
                    >
                        <Text style={styles.hoursText}>{key}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <TouchableOpacity
                onPress={() => setOpenedPopup(true)}
                style={styles.inviteFriendsButton}
            >
                <Text style={styles.inviteFriendsText}>INVITE FRIENDS</Text>
            </TouchableOpacity>

            <View style={styles.containerPrice}>
                <View style={styles.containerPriceRecap}>
                    <View style={styles.priceAndCategorie}>
                        <Text style={styles.textPriceRecap}>Court</Text>
                        <View style={styles.rightTextPriceRecap}>
                            {currentPromo > 0 && <Text style={styles.oldPrice}>{Math.round((currentCourt.priceHour - (currentCourt.priceHour * 10 / 100))) + "$"}</Text>}
                            <Text style={styles.textPriceRecap}>{Math.round((priceTotal - (priceTotal * 10 / 100)) * 100) / 100 + "$"}</Text>
                        </View>
                    </View>
                    <View style={styles.priceAndCategorie}>
                        <Text style={styles.textPriceRecap}>Fees</Text>
                        <View style={styles.rightTextPriceRecap}>
                            {currentPromo > 0 && <Text style={styles.oldPrice}>{Math.round((currentCourt.priceHour - (currentCourt.priceHour * 90 / 100))) + "$"}</Text>}
                            <Text style={styles.textPriceRecap}>{Math.round((priceTotal - (priceTotal * 90 / 100)) * 100) / 100 + "$"}</Text>
                        </View>
                    </View>
                    <View style={styles.priceAndCategorie}>
                        <Text style={styles.textPriceRecap}>Players</Text>
                        <View style={styles.rightTextPriceRecap}>
                            <Text style={styles.textPriceRecap}>{currentplayers.length == 0 ? 1 : currentplayers.length}</Text>
                        </View>
                    </View>

                    <View style={styles.separatorPrice}/>

                    <View style={styles.priceAndCategorie}>
                        <Text style={styles.textPriceRecap}>To pay</Text>
                        <View style={styles.rightTextPriceRecap}>
                            {currentPromo > 0 && <Text style={styles.oldPrice}>{currentCourt.priceHour + "$"}</Text>}
                            <Text style={styles.textPriceRecap}>{priceTotal + "$"}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.promoCode}>
                    <TextInput
                        onChangeText={(code) => {
                            setValuePromo(code);
                        }}
                        value={valuePromo}
                        placeholder="Promo code"
                        placeholderTextColor={"#b4b4b4"}
                        style={styles.textInputCode}
                    />
                    <TouchableOpacity
                        style={styles.applyButton}
                        onPress={() => {setCurrentPromo(promoCodeList.find((p) => p.code == valuePromo)?.percent || 0); setValuePromo("")}}
                    >
                        <Text style={styles.applyText}>APPLY</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity
                onPress={() => {}}
                style={styles.inviteFriendsButton}
            >
                <Text style={styles.inviteFriendsText}>{"PAY " + priceTotal + "$"}</Text>
            </TouchableOpacity>

            {openedPopup &&
                <TouchableOpacity
                    onPress={() => setOpenedPopup(false)}
                    style={styles.backgroundPopup}
                />
            }

            {openedPopup &&      
                <View style={styles.popupContainer}>
                    <View style={styles.topContainerPopup}>
                        <View style={styles.topLeftContainerPopup}>
                            <Image style={styles.logoPopup} source={require("../../assets/images/PadelHub.png")}/>
                            <View style={styles.reservationInfo}>
                                <Text style={styles.reservationInfoTitle}>Friendly match</Text>
                                <Text style={styles.reservationInfoSubTitle}>(add at least 1 player)</Text>
                                <Text style={styles.reservationInfoCourtName}>{currentCourt.name}</Text>
                                <Text style={styles.reservationInfoDate}>{nextDaysList.find((d) => d.id == currentDay)?.label}</Text>
                            </View>
                        </View>
                        <View style={styles.topRightContainerPopup}>
                            <View style={styles.containerImageProfile}>
                                <View style={styles.effectImage}/>
                                <Image style={styles.myImageProfile} source={require("../../assets/images/avatar3.png")}/>
                            </View>
                            <Invite onPress={() => router.navigate({pathname: "./contact", params: {myId: myId}})} style={styles.inviteButton}/>
                            <Invite onPress={() => router.navigate({pathname: "./contact", params: {myId: myId}})} style={styles.inviteButton}/>
                            <Invite onPress={() => router.navigate({pathname: "./contact", params: {myId: myId}})} style={styles.inviteButton}/>
                        </View>
                    </View>
                    <View style={styles.bottomContainerPopup}>
                        <TouchableOpacity
                            onPress={() => router.navigate({pathname: "./contact", params: {myId: myId}})}
                            style={styles.inviteButtonPopup}
                        >
                            <Text style={styles.inviteButtonPopupText}>Invite</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
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
    containerDays: {
        width: "95%",
        maxHeight: "7%",
        flexDirection: "row",
        backgroundColor: "#dddddd",
        marginTop: "4%",
        borderRadius: 20,
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    bubleDay: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 17.5,
        paddingVertical: 5,
        paddingHorizontal: 18.55,
    },
    dateDay: {
        fontSize: 15,
        fontWeight: 800,
    },
    dateLabel: {
        fontSize: 12,
    },
    courtImage: {
        width: "92%",
        height: "30%",
        marginTop: "2%",
        borderRadius: 10,
    },
    scrollViewHours: {
        width: "90%",
        maxHeight: 50,
        marginTop: "1%",
        borderRadius: 7,
    },
    hoursButton: {
        justifyContent: "center",
        alignItems: "center",
        height: 35,
        width: 50,
        borderRadius: 2,
        shadowColor: "#393939",
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.6,
        shadowRadius: 2,
    },
    hoursText: {
        fontWeight: 700,
    },
    inviteFriendsButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#92c650",
        width: "90%",
        marginTop: "2.75%",
        height: 50,
        borderRadius: 15,
        shadowColor: "#393939",
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.6,
        shadowRadius: 2,
    },
    inviteFriendsText: {
        color: "white",
        fontSize: 23,
        fontWeight: 700,
        shadowColor: "#393939",
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.6,
        shadowRadius: 2,
    },
    containerPrice: {
        width: "90%",
        height: "19.25%",
        marginTop: "5%",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        borderColor: "#919191",
        borderWidth: 2,
        borderRadius: 15,
    },
    promoCode: {
        width: "95%",
        flexDirection: "row",
        backgroundColor: "#ededed",
        paddingLeft: 15,
        borderWidth: 1,
        borderColor: "#767676",
        borderRadius: 20,
    },
    textInputCode: {
        width: "75%",
    },
    applyButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#92c650",
        width: "25%",
        height: 35,
        borderRadius: 20,
    },
    applyText: {
        color: "white",
        fontSize: 15,
        fontWeight: 700,
        shadowColor: "#393939",
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.6,
        shadowRadius: 2,
    },
    containerPriceRecap: {
        width: "95%",
        height: "65%",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        backgroundColor: "#dddddd",
        borderRadius: 20,
    },
    priceAndCategorie: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "94%",
        paddingLeft: 5,
    },
    rightTextPriceRecap: {
        width: "20%",
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "row",
        gap: 5,
    },
    textPriceRecap: {

    },
    oldPrice: {
        color: "red",
        textDecorationLine: "line-through",
    },
    separatorPrice: {
        width: "93%",
        height: 2,
        backgroundColor: "gray",
    },
    backgroundPopup: {
        position: "absolute",
        height: "100%",
        width: "100%",
        backgroundColor: "#a4a4a461",
    },
    popupContainer: {
        position: "absolute",
        bottom: "12.5%",
        backgroundColor: "#f2f2f2fc",
        height: "22%",
        width: "90%",
        borderRadius: 30,
        paddingVertical: "3%",
        paddingHorizontal: "5%",
    },
    topContainerPopup: {
        height: "77.5%",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    topLeftContainerPopup: {
        width: "50%",
        alignItems: "flex-start",
        justifyContent: "center",
        marginTop: -10,
    },
    reservationInfo: {
        marginTop: -8,
    },
    reservationInfoTitle: {
        fontSize: 17,
        fontWeight: 800,
    },
    reservationInfoSubTitle: {
        fontSize: 12,
        fontWeight: 400,
    },
    reservationInfoCourtName: {
        fontSize: 14,
        fontWeight: 500,
    },
    reservationInfoDate: {
        fontSize: 14,
        fontWeight: 500,
    },
    topRightContainerPopup: {
        width: "35%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 10,
        marginRight: -10,
    },
    inviteButton: {
        height: 55,
        width: 55,
        opacity: 0.65,
    },
    logoPopup: {
        height: 55,
        width: 55,
        marginLeft: -10,
        shadowColor: "#393939",
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.6,
        shadowRadius: 2,
    },
    bottomContainerPopup: {
        height: "25%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    inviteButtonPopup: {
        backgroundColor: "#92c650",
        height: "77.5%",
        width: "65%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 40,
    },
    inviteButtonPopupText: {
        color: "white",
        fontSize: 24,
        fontWeight: 700,
        shadowColor: "#393939",
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.6,
        shadowRadius: 2,
    },
    containerImageProfile:{
        width: 55,
        height: 55,
    },
    effectImage: {
        position: "absolute",
        backgroundColor: "#92c650",
        height: "97%",
        width: "97%",
        right: -1,
        top: -1,
        borderRadius: 100,
    },
    myImageProfile: {
        width: 60,
        height: 60,
        borderRadius: 100,
    },
});