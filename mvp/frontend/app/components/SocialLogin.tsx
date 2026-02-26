import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { ComponentType } from "react";
import { SvgProps } from "react-native-svg";

export type ButtonData = {
    text: string,
    vector: ComponentType<SvgProps>,
    backgroundColor: string,
    textColor: string,
    size?: number,
}

type ButtonProps = {
    data: ButtonData,
}

export default function SocialLogin({ data }: ButtonProps) {
    const Vector = data.vector;

    return (
        <TouchableOpacity onPress={() => {}} style={[styles.container, styles.shadow, {backgroundColor: data.backgroundColor}]}>
            <Vector width={data.size || 25} style={styles.icon}/>
            <Text style={[styles.text, {color: data.textColor}]}>{data.text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: "100%",
        borderRadius: 17,
        paddingHorizontal: 20,
        gap: 12,
    },
    icon: {
        width: 25,
        height: 25,
    },
    text: {
        fontSize: 16,
        fontWeight: "500",
    },
    shadow: {
        shadowColor: "#525252",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2.5,
    },
});