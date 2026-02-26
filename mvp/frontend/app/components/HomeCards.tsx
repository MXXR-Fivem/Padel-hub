import { Text, StyleSheet, View, Pressable} from "react-native";
import { ComponentType } from "react";
import { RelativePathString, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SvgProps } from "react-native-svg"

export type CardData = {
    title: string,
    vector: ComponentType<SvgProps>,
    backgroundFade: [string, string],
    useShadow: boolean,
    top: string,
    path: RelativePathString,
    overflowHidden?: boolean,
}

type CardProps = {
    data: CardData,
    index: number,
}

export default function Card({ data, index }: CardProps) {
    const Vector = data.vector;
    const radiusBorder: (index: number) => number = (index: number) => (index % 2 === 0 ? 50 : 15);
    const borders: object = {
        borderTopLeftRadius: radiusBorder(index),
        borderTopRightRadius: radiusBorder(index+1),
        borderBottomLeftRadius: radiusBorder(index+1),
        borderBottomRightRadius: radiusBorder(index)
    }

    return (
        <Pressable
            onPress={() => router.navigate(data.path)}
            style = {[
                styles.card,
                styles.shadow,
                borders,
                {shadowOffset: {width: index % 2 === 0 ? 3 : -2, height: 6}}
            ]}>
            <LinearGradient
                colors = {data.backgroundFade}
                style = {[
                    styles.gradient,
                    borders,
                ]}>
            </LinearGradient>
            <View style={[styles.vectorContainer, borders]}>
                <Vector 
                    style = {[
                        styles.vector,
                        data.useShadow && styles.shadow,
                        {
                            top: parseInt(data.top),
                        }
                    ]}
                />
            </View>
            <Text style={[styles.title, styles.shadow]}>{data.title.toUpperCase()}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        width: "90%",
        height: 195,
        justifyContent: "center",
        alignItems: "center",
    },
    gradient: {
        width: "100%",
        height: "100%",
    },
    vectorContainer: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        overflow: "hidden",
    },
    vector: {
        position: "absolute", 
    },
    title: {
        position: "absolute",
        top: "8%", 
        color: "white",
        fontWeight: "800",
        fontSize: 32.5,
    },
    shadow: {
        shadowColor: "#393939",
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.7,
        shadowRadius: 2,
    },
})