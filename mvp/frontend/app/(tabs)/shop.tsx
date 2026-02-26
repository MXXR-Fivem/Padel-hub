import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { ComponentType } from "react";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SvgProps } from "react-native-svg";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import PadelBag from "../../assets/vectors/PadelBag.svg";
import Racket from "../../assets/vectors/Racket.svg";
import Shoes from "../../assets/vectors/Shoes.svg";
import Tshirt from "../../assets/vectors/Tshirt.svg";
import Casquette from "../../assets/vectors/Casquette.svg";
import Racket2 from "../../assets/vectors/Racket2.svg";
import BallBack from "../../assets/vectors/BallPack.svg";
import Tshirt2 from "../../assets/vectors/Tshirt2.svg";
import Header from "../components/Header";

const { width: screenWidth } = Dimensions.get("window");
const GAP = 15;
const CONTAINER_WIDTH = screenWidth * 0.9;
const CATEGORY_WIDTH = (CONTAINER_WIDTH - GAP) / 2;

type Category = {
    name: string,
    vector: ComponentType<SvgProps>,
    vectorPosition: {bottom: number, right: number},
    bottom?: number,
    right?: number,
    backgroundFade: [string, string],
    titleColor: string,
    useShadow?: boolean,
}

type Products = {
    name: string,
    price: number,
    vector: ComponentType<SvgProps>,
    useShadow?: boolean,
}

export default function Tab() {
    const categories: Category[] = [
        {name: "rackets", vector: Racket, vectorPosition: {bottom: -20, right: -17.5}, backgroundFade: ["#96d985", "#CAEEC1"], titleColor: "#3E7B5A"},
        {name: "shoes", vector: Shoes, vectorPosition: {bottom: -11, right: -17.5}, backgroundFade: ["#f6cb8b", "#f8ddb5"], titleColor: "#8D4E48", useShadow: true},
        {name: "clothing", vector: Tshirt, vectorPosition: {bottom: -15, right: -14.5}, backgroundFade: ["#FDADAB", "#fbc9c8"], titleColor: "#773B54", useShadow: true},
        {name: "accessories", vector: Casquette, vectorPosition: {bottom: -7, right: -20}, backgroundFade: ["#a38ef8", "#91bcfc"], titleColor: "#224C71", useShadow: true},
    ];
    const products: Products[] = [
        {name: "Carbon Racket", price: 169.99, vector: Racket2, useShadow: true},
        {name: "3-Pack Ball", price: 6.99, vector: BallBack, useShadow: true},
        {name: "Training T-shirt", price: 24.99, vector: Tshirt2, useShadow: true},
        {name: "Bag", price: 69.99, vector: PadelBag, useShadow: true},
    ];

    return (
        <View style={styles.container}>

            <Header
                leftIcon={{
                    icon: <Feather name="bell" size={30} color="black" />,
                    onPress: () => router.navigate("../(notification)/notif")
                }}
                rightIcon={{
                    icon: <Feather size={26} name="shopping-cart" color={"black"} />,
                    onPress: () => {}
                }}
            />

            <View style={styles.separator}/>

            <TouchableOpacity style={[styles.topButton, styles.shadow]}>
                <LinearGradient
                    colors = {["#f97b90", "#f8a8b5"]}
                    style = {[
                        styles.gradient,
                        {borderRadius: 35},
                    ]}>
                </LinearGradient>
                <View style={styles.topButtonTextContainer}>
                    <Text style={[styles.topButtonText, styles.shadow]}>SHOP</Text>
                    <Text style={[styles.topButtonSecondText, styles.shadow]}>Equip yourself</Text>
                </View>

                <PadelBag style={[styles.topButtonVector, styles.shadowVector]}/>

            </TouchableOpacity>

            <View style={styles.categoriesList}>
                {categories.map((category, index) => {
                    const Vector = category.vector;
                    return (
                        <TouchableOpacity style={[styles.category, styles.shadow]} key={index}>
                            <LinearGradient
                                colors = {category.backgroundFade}
                                style = {[styles.gradient, styles.shadow]}>
                            </LinearGradient>
                            <Text style={[styles.categoryTitle, {color: category.titleColor}]}>{category.name.toUpperCase()}</Text>
                            <Vector style={[{position: "absolute", bottom: category.vectorPosition.bottom, right: category.vectorPosition.right}, category.useShadow && styles.shadowVector]}/>
                        </TouchableOpacity>
                    )
                })}
            </View>

            <Text style={styles.bestSellersTitle}>BEST SELLERS</Text>

            <View style={styles.bestSellersSeparator}/>

            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle = {{
                    alignItems: "center",
                    paddingTop: 6,
                    paddingBottom: 12, 
                    gap: 10
                }}
                style={styles.bestSellersList}>
                {products.map((product, index) => {
                    const Vector = product.vector;
                    return (
                        <View key={index} style={[styles.bestSellersItem, styles.shadow]}>
                            <Vector style={[styles.vectorBestSeller, product.useShadow && styles.shadowVector]}/>
                            <View style={styles.productNamePrice}>
                                <Text style={styles.productName}>{product.name}</Text>
                                <Text style={styles.productPrice}>{"$" + product.price}</Text>
                            </View>
                            <TouchableOpacity style={[styles.addButton, styles.shadowAddButton]}>
                                <AntDesign style={styles.addButtonIcon} name="plus" size={17.5} />
                                <Text style={styles.addButtonText}>ADD</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
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
    topButton: {
        marginTop: 17.5,
        width: "90%",
        height: 175,
    },
    gradient: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 25,
    },
    topButtonVector: {
        position: "absolute",
        right: -22.5,
        bottom: -20,
    },
    topButtonTextContainer: {
        top: "20%",
        left: 20,
    },
    topButtonText: {
        color: "white",
        fontSize: 40,
        fontWeight: 900,
    },
    topButtonSecondText: {
        color: "white",
        fontSize: 28,
        fontWeight: 600,
    },
    categoriesList: {
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        width: "90%",
        marginTop: 20,
        gap: 15,
    },
    category: {
        height: 100,
        width: CATEGORY_WIDTH,
    },
    categoryTitle: {
        fontSize: 19,
        fontWeight: 900,
        top: "16%",
        left: "7.5%",
    },
    bestSellersTitle: {
        color: "#616161",
        fontSize: 20,
        fontWeight: 800,
        marginTop: 18,
        marginBottom: 5,
        alignSelf: "flex-start",
        left: "6.75%",
    },
    bestSellersSeparator: {
        width: "90%",
        height: 2,
        backgroundColor: "#8a8a8a",
        borderRadius: 20,
    },
    bestSellersList: {
        width: "92.25%",
        maxHeight: "27%",
    },
    bestSellersItem: {
        height: 65,
        width: "98%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f0ea",
        paddingHorizontal: 10,
        paddingTop: 5,
        borderRadius: 20,
    },
    vectorBestSeller: {
        flex: 2,
        maxHeight: 60,
        maxWidth: 60,
    },
    productNamePrice: {
        flex: 5,
        marginLeft: 5,
    },
    productName: {
        fontSize: 14,
        fontWeight: 500,
    },
    productPrice: {
        fontSize: 12,
        fontWeight: 500,
        color: "green",
    },
    addButton: {
        flex: 3,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#8EBC51",
        marginBottom: 7.5,
        borderRadius: 20,
        height: "65%",
        gap: 5,
    },
    addButtonIcon: {
        color: "white",
    },
    addButtonText: {
        fontSize: 17,
        fontWeight: 600,
        color: "white",
    },
    shadow: {
        shadowColor: "#6a6a6a",
        shadowOffset: {width: 1.5, height: 6},
        shadowOpacity: 0.7,
        shadowRadius: 1,
    },
    shadowVector: {
        shadowColor: "#6a6a6a",
        shadowOffset: {width: 1.5, height: 3},
        shadowOpacity: 0.6,
        shadowRadius: 1,
    },
    shadowAddButton: {
        shadowColor: "#6a6a6a",
        shadowOffset: {width: 1.5, height: 3.75},
        shadowOpacity: 0.7,
        shadowRadius: 1,
    },
});