import { View, StyleSheet, Pressable, Image } from "react-native";
import { router } from "expo-router";
import { ReactNode } from "react";

type IconConfig = {
    icon: ReactNode;
    onPress: () => void;
};

type HeaderProps = {
    leftIcon?: IconConfig;
    rightIcon?: IconConfig;
};

export default function Header({ leftIcon, rightIcon }: HeaderProps) {
    return (
        <View style={styles.header}>
            <View style={styles.iconContainer}>
                {leftIcon ? (
                    <Pressable onPress={leftIcon.onPress}>
                        {leftIcon.icon}
                    </Pressable>
                ) : null}
            </View>

            <Pressable onPress={() => router.navigate("/(tabs)/home")}>
                <Image
                    style={styles.logo}
                    source={require("../../assets/images/PadelHub.png")}
                />
            </Pressable>

            <View style={styles.iconContainer}>
                {rightIcon ? (
                    <Pressable onPress={rightIcon.onPress}>
                        {rightIcon.icon}
                    </Pressable>
                ) : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: "85%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    logo: {
        width: 80,
        height: 80,
    },
    iconContainer: {
        width: 30,
        alignItems: "center",
        justifyContent: "center",
    },
});
