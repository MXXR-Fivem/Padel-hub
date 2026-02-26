import React, { useState } from "react";
import { router } from "expo-router";
import { View, Text, StyleSheet, Pressable, Image, ScrollView, TouchableOpacity } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ball from "../../assets/vectors/tennis_ball.svg";
import Mail from "../../assets/vectors/enveloppe.svg";
import RepostGreen from "../../assets/vectors/RepostGreen.svg";
import RepostBlack from "../../assets/vectors/Repost.svg";
import PerfGreen from "../../assets/vectors/PerfGreen.svg";
import PerfBlackfrom from "../../assets/vectors/Perf.svg";
import PostGreen from "../../assets/vectors/PostGreen.svg";
import PostBlack from "../../assets/vectors/Post.svg";
import Rank from "../../assets/vectors/Rank.svg";
import Icons from "../../assets/vectors/LikeAndMessageIcon.svg";

type currentCategorie = "repost" | "post" | "perf";

const repostImages = [
    require("../../assets/images/profilePage/Feed1.png"),
    require("../../assets/images/profilePage/Feed2.png"),
    require("../../assets/images/profilePage/Feed3.png"),
    require("../../assets/images/profilePage/Feed4.png"),
    require("../../assets/images/profilePage/Feed5.png"),
    require("../../assets/images/profilePage/Feed6.png"),
    require("../../assets/images/profilePage/Feed7.png"),
    require("../../assets/images/profilePage/Feed8.png"),
    require("../../assets/images/profilePage/Feed9.png"),
    require("../../assets/images/profilePage/Feed10.png"),
    require("../../assets/images/profilePage/Feed11.png"),
    require("../../assets/images/profilePage/Feed12.png"),
];

const postImages = [
    require("../../assets/images/profilePage/Feed5.png"),
    require("../../assets/images/profilePage/Feed8.png"),
    require("../../assets/images/profilePage/Feed9.png"),
    require("../../assets/images/profilePage/Feed10.png"),
    require("../../assets/images/profilePage/Feed6.png"),
    require("../../assets/images/profilePage/Feed4.png"),
    require("../../assets/images/profilePage/Feed3.png"),
    require("../../assets/images/profilePage/Feed2.png"),
    require("../../assets/images/profilePage/Feed11.png"),
    require("../../assets/images/profilePage/Feed12.png"),
    require("../../assets/images/profilePage/Feed7.png"),
    require("../../assets/images/profilePage/Feed1.png"),
];

type followButton = "follow" | "followed";

export default function InstaLikeTabs() {
    const [categorie, setCategorie] = useState<currentCategorie>("repost");
    const [followState, setFollowState] = useState<followButton>("follow");
    const [followers, setFollowers] = useState<number>(422);

    return (
    <View style={styles.container}>

        <View style={styles.header}>
            <Pressable onPress={() => router.back()}>
                <MaterialIcons name="arrow-back-ios" size={22} />
            </Pressable>

            <Text style={styles.headerTitle}>Simon</Text>

            <SimpleLineIcons name="options-vertical" size={18} />
        </View>

        <View style={styles.profileSection}>
            <View style={styles.rowProfile}>
                <Image
                    source={require("../../assets/images/profilePage/slackSelfie.png")}
                    style={styles.avatar}
                />
                <View style={styles.columnProfile}>
                    <Text style={styles.username}>@SLACKito</Text>
                    <Text style={styles.bio}>
                        Franco-Mexicano 🇲🇽{"\n"}
                        Padel champ of my area xD{"\n"}
                        University of George Town
                    </Text>
                </View>
           </View>
            <View style={styles.stats}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{followers}</Text>
                    <Text style={styles.statLabel}>Followers</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>191</Text>
                    <Text style={styles.statLabel}>Following</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>420K</Text>
                    <Text style={styles.statLabel}>Likes</Text>
                </View>
            </View>
        </View>

        <View style={styles.secondHeader}>
            <Pressable
                style={[styles.containerBtn,followState === "followed" && styles.containerBtnFollowed,]}
                onPress={() => {setFollowState(followState === "follow" ? "followed" : "follow"); setFollowers(followState === "follow" ? (followers+1) : (followers-1))}}
            >
                <Text style={[styles.btnText,followState === "followed" && styles.btnTextFollowed,]}>{followState === "follow" ? "Follow" : "Followed"}</Text>
            </Pressable>

            <View style={styles.iconLane}>
                <Ball width={42} height={42}/>
            </View>
            <TouchableOpacity
                onPress={() => router.navigate("../(message)/message")}
                style={styles.iconLane}
            >
                <Mail width={42} height={42}/>
            </TouchableOpacity>
        </View>

        <View style={styles.tabs}>
            <Pressable onPress={() => setCategorie("repost")} style={styles.tabIcon}>
                {categorie === "repost" ? <RepostGreen /> : <RepostBlack />}
                <View style={[styles.lane, categorie === "repost" ? styles.laneActive : styles.laneInactive]} />
            </Pressable>

            <Pressable onPress={() => setCategorie("post")} style={styles.tabIcon}>
                {categorie === "post" ? <PostGreen /> : <PostBlack />}
                <View style={[styles.lane, categorie === "post" ? styles.laneActive : styles.laneInactive]} />
            </Pressable>

            <Pressable onPress={() => setCategorie("perf")} style={styles.tabIcon}>
                {categorie === "perf" ? <PerfGreen /> : <PerfBlackfrom />}
                <View style={[styles.lane, categorie === "perf" ? styles.laneActive : styles.laneInactive]} />
            </Pressable>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ display: categorie === "repost" ? "flex" : "none" }}>
                <ImageGrid images={repostImages} />
            </View>
            <View style={{ display: categorie === "post" ? "flex" : "none" }}>
                <ImageGrid images={postImages} />
            </View>
            {categorie === "perf" && (
                <View>
                    <View style={styles.perfCard}>

                        <Text style={styles.perfTitle}>Afternoon Workout</Text>
                        <Text style={styles.perfSub}>12/05/25</Text>

                        <View style={styles.perfRow}>
                            <Text style={styles.perfMeta}><FontAwesome name="map-marker" size={14} color="black" /> Saint-Ouen-sur-Seine</Text>
                            <Text style={styles.perfMeta}><Feather name="watch" size={14} color="black" /> Garmin vivoactive 5</Text>
                        </View>

                        <View style={styles.statsRow}>
                            <View style={styles.statBox}>
                                <Text style={styles.statLabel}>Temps</Text>
                                <Text style={styles.statValue}>2h35min</Text>
                            </View>
                            <View style={styles.statBox}>
                                <Text style={styles.statLabel}>Distance</Text>
                                <Text style={styles.statValue}>4,90 km</Text>
                            </View>
                            <View style={styles.statBox}>
                                <Text style={styles.statLabel}>Cal</Text>
                                <Text style={styles.statValue}>715 kcal</Text>
                            </View>
                        </View>

                        <View style={styles.scoreBox}>
                            <View style={[styles.scoreRow, styles.green]}>
                                <Text style={styles.scoreName}>SLACK</Text>
                                <Text style={styles.scoreSet}>6</Text>
                                <Text style={styles.scoreSet}>2</Text>
                                <Text style={styles.scoreSet}>6</Text>
                            </View>

                            <View style={styles.scoreRow}>
                                <Text style={styles.scoreName}>FISCHER</Text>
                                <Text style={styles.scoreSet}>2</Text>
                                <Text style={styles.scoreSet}>6</Text>
                                <Text style={styles.scoreSet}>4</Text>
                            </View>
                        </View>
                        
                        <View>
                            <Rank/>
                        </View>

                        <View style={styles.imageRow}>
                            <Image source={require("../../assets/images/profilePage/Perf1.png")} style={styles.perfImgLeft}/>
                            <Image source={require("../../assets/images/profilePage/Perf.png")} style={styles.perfImgRight}/>
                        </View>

                        <View style={styles.footerRow}>
                            <Text style={styles.likes}><Image source={require("../../assets/images/profilePage/Profilepictures.png")}></Image>12 likes</Text>
                            <Icons width={90} height={24}/>
                        </View>
                    </View>

                    <View style={styles.perfCard}>

                        <Text style={styles.perfTitle}>Morning Workout</Text>
                        <Text style={styles.perfSub}>21/04/25</Text>

                        <View style={styles.perfRow}>
                            <Text style={styles.perfMeta}><FontAwesome name="map-marker" size={14} color="black" /> Cergy-le-haut</Text>
                            <Text style={styles.perfMeta}><Feather name="watch" size={14} color="black" /> Garmin vivoactive 5</Text>
                        </View>

                        <View style={styles.statsRow}>
                            <View style={styles.statBox}>
                                <Text style={styles.statLabel}>Temps</Text>
                                <Text style={styles.statValue}>1h48</Text>
                            </View>
                            <View style={styles.statBox}>
                                <Text style={styles.statLabel}>Distance</Text>
                                <Text style={styles.statValue}>2,80 km</Text>
                            </View>
                            <View style={styles.statBox}>
                                <Text style={styles.statLabel}>Cal</Text>
                                <Text style={styles.statValue}>529 kcal</Text>
                            </View>
                        </View>

                        <View style={styles.scoreBox}>
                            <View style={[styles.scoreRow, styles.green]}>
                                <Text style={styles.scoreName}>SLACK</Text>
                                <Text style={styles.scoreSet}>2</Text>
                                <Text style={styles.scoreSet}>7</Text>
                                <Text style={styles.scoreSet}>6</Text>
                            </View>

                            <View style={styles.scoreRow}>
                                <Text style={styles.scoreName}>VICTOR</Text>
                                <Text style={styles.scoreSet}>6</Text>
                                <Text style={styles.scoreSet}>5</Text>
                                <Text style={styles.scoreSet}>3</Text>
                            </View>
                        </View>
                        <View> 
                            <Rank/>
                        </View>

                        <View style={styles.imageRow}>
                            <Image source={require("../../assets/images/profilePage/Strava2.png")} style={styles.perfImgLeft}/>
                            <Image source={require("../../assets/images/profilePage/Strava2.1.png")} style={styles.perfImgRight}/>
                        </View>

                        <View style={styles.footerRow}>
                            <Text style={styles.likes}><Image source={require("../../assets/images/profilePage/Profilepictures.png")}></Image>9 likes</Text>
                            <Icons width={90} height={24}/>
                        </View>
                    </View>
                </View>
            )}
        </ScrollView>
    </View>
    );
}

const ImageGrid = ({ images }: { images: any[] }) => {
    return (
        <View style={styles.grid}>
            {images.map((img, index) => (
                <Image
                    key={index}
                    source={img}
                    style={styles.gridImage}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        paddingTop: 70,
        paddingBottom: 7.5,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
    },
    profileSection: {
        alignItems: "flex-start",
        marginTop: 10,
        marginLeft: 15,
    },
    rowProfile: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    columnProfile: {
        flexDirection: "column",
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        marginBottom: 8,
    },
    username: {
        fontWeight: "700",
        fontSize: 15,
    },
    containerBtnFollowed: {
        backgroundColor: "#fdfffd",
    },
    btnTextFollowed: {
        color: "#2fd306",
    },
    bio: {
        fontSize: 11,
        // textAlign: "center",
        color: "#555",
        marginVertical: 6,
    },
    stats: {
        flexDirection: "row",
        marginTop: 8,
        width: "95%",
        justifyContent: "space-around",
    },
    statItem: {
        alignItems: "center",
    },
    statNumber: {
        fontWeight: "700",
        fontSize: 14,
    },
    statLabel: {
        fontSize: 10,
        color: "#777",
    },
    secondHeader: {
        marginTop: 10,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: 35,
        paddingHorizontal: 20,
    },
    containerBtn: {
        backgroundColor: "#92c650",
        width: "55%",
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        shadowColor: "#000000",
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 4,
    },
    btnText: {
        color: "#fff",
        fontWeight: "700",
    },
    tabs: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
        paddingHorizontal: 40,
        paddingBottom: 10,
        position: "relative",
    },
    tabIcon: {
        alignItems: "center",
        width: 60,
        gap: 8,
    },
    lane: {
        height: 2,
        width: 150,
        borderRadius: 1,
        position: "absolute",
        bottom: -10,
    },
    laneActive: {
        backgroundColor: "#92c650",
    },
    laneInactive: {
        backgroundColor: "#000",
    },
    iconLane: {
        flexDirection: "row",
        gap: 16,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    gridImage: {
        width: "33.33%",
        aspectRatio: 1,
    },
    perfCard: {
        margin: 16,
        padding: 14,
        borderRadius: 18,
        backgroundColor: "#ffffff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
    },
    perfTitle: {
        fontSize: 18,
        fontWeight: "800",
    },
    perfSub: {
        fontSize: 12,
        color: "#777",
        marginBottom: 6,
    },
    perfRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    perfMeta: {
        fontSize: 11,
        color: "#666",
    },
    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    statBox: {
        alignItems: "center",
        flex: 1,
    },
    statValue: {
        fontWeight: "700",
        fontSize: 14,
    },
    scoreBox: {
        borderRadius: 10,
        overflow: "hidden",
        marginVertical: 10,
    },
    scoreRow: {
        flexDirection: "row",
        alignItems: "center",
        padding: 6,
        backgroundColor: "#d7ecb7",
    },
    green: {
        backgroundColor: "#9dd66f",
    },
    scoreName: {
        flex: 2,
        fontWeight: "700",
    },
    scoreSet: {
        flex: 1,
        textAlign: "center",
        fontWeight: "700",
    },
    imageRow: {
        flexDirection: "row",
        gap: 5,
        marginTop: 10,
    },
    perfImgLeft: {
        width: "45%",
        height: 200,
        borderRadius: 12,
    },
    perfImgRight: {
        width: "55%",
        height: 200,
        borderRadius: 12,
    },
    footerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    likes: {
        fontSize: 12,
        textAlign: "center",
        color: "#666",
    },
});
