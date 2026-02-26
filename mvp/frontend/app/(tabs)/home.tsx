import { ScrollView, StyleSheet, View, StatusBar } from "react-native";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Card, {CardData} from "../components/HomeCards";
import Header from "../components/Header";
import Feed from "../../assets/vectors/Feed.svg";
import PadelCourt from "../../assets/vectors/PadelCourt.svg";
import Shop from "../../assets/vectors/Shop.svg";
import Training from "../../assets/vectors/Training.svg";

export default function Tab() {

    const cards: CardData[] = [
        { title: "Feed", path: "../(feed)/feed", vector: Feed, backgroundFade: ["#866AFC", "#71A4F0"], top: "22.5%", useShadow: false },
        { title: "Book a court", path: "./book", vector: PadelCourt, backgroundFade: ["#79D9FC", "#89FA8E"], top: "30%", useShadow: true },
        { title: "Training", path: "./training", vector: Training, backgroundFade: ["#F59B7E", "#FDABE1"], top: "22.5%", useShadow: false },
        { title: "Shop", path: "./shop", vector: Shop, backgroundFade: ["#F35D82", "#E3D26F"], top: "5%", useShadow: true },
    ]

    return (
        <View style={styles.container}>

            <StatusBar
                animated={true}
                barStyle={"dark-content"}
            />

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

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle = {{
                    paddingTop: 20,
                    paddingBottom: 25, 
                    alignItems: "center", 
                    gap: 20
                }}
                style={styles.scrollview}
                >
                {cards.map((data, index) => (
                    <Card key={index} data={data} index={index} />
                ))}
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
});