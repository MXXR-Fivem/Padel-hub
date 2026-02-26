import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { useState } from "react";
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from "@expo/vector-icons/FontAwesome";

export interface InputButtonData {
    icon: string,
    placeHolder: string,
    value?: (content: string) => void,
    showPassword?: boolean,
    setShowPassword?: () => void,
}

type LoginInputProps = {
    data: InputButtonData,
}

export default function LoginInput({ data }: LoginInputProps) {
    const [inputValue, setInputValue] = useState("");
    const isPasswordVisible = data.showPassword;
    const hasRightIcon = Boolean(data.setShowPassword);

    const handleChange = (text: string) => {
        setInputValue(text);
        data.value?.(text);
    };

    const renderIcon = (iconName?: string) => {
        if (!iconName) return null;

        const feather = new Set<string>(["mail", "lock", "eye", "eye-off"]);
        const fontAwesome = new Set<string>(["user-circle-o"]);

        const size = 20;
        const color = "black";

        if (feather.has(iconName)) return <Feather name={iconName as any} size={size} color={color} />;
        if (fontAwesome.has(iconName)) return <FontAwesome name={iconName as any} size={size} color={color} />;

        return <></>;
    };

    return (
        <View style={[styles.container, styles.shadow]}>
            <View style={[styles.iconSlot, hasRightIcon ? styles.iconSlotTwoIcons : styles.iconSlotOneIcon]}>
                {renderIcon(data.icon)}
            </View>

            <View style={[styles.inputSlot, hasRightIcon ? styles.inputSlotTwoIcons : styles.inputSlotOneIcon]}>
                <TextInput
                    placeholder={data.placeHolder}
                    value={inputValue}
                    onChangeText={handleChange}
                    style={styles.input}
                    placeholderTextColor="#6b6b6b"
                    secureTextEntry={isPasswordVisible != null && !isPasswordVisible}
                />
            </View>

            {hasRightIcon && (
                <Pressable
                    style={[styles.iconSlot, styles.iconSlotTwoIcons]}
                    onPress={() => data.setShowPassword?.()}
                    hitSlop={10}
                >
                    {renderIcon(!isPasswordVisible ? "eye-off" : "eye")}
                </Pressable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#d6d6d6",
        height: 45,
        width: "100%",
        borderRadius: 20,
        paddingHorizontal: 10,
    },
    iconSlot: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    inputSlot: {
        height: "100%",
        justifyContent: "center",
    },
    iconSlotOneIcon: {
        flex: 1,
    },
    inputSlotOneIcon: {
        flex: 9,
    },
    iconSlotTwoIcons: {
        flex: 1,
    },
    inputSlotTwoIcons: {
        flex: 8,
    },
    input: {
        flex: 1,
        width: "100%",
        color: "#1a1a1a",
        paddingHorizontal: 8,
        paddingVertical: 0,
    },
    shadow: {
        shadowColor: "#1a1a1a",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2.5,
    },
});