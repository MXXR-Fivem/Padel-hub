import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator, TouchableOpacity } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import LoginInput from "../components/LoginInput";
import SocialLogin from "../components/SocialLogin";
import Strava from "../../assets/vectors/Strava.svg";
import Google from "../../assets/vectors/Google.svg";
import Apple from "../../assets/vectors/Apple.svg";

export default function Login() {
    const [isLogin, setLogin] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        router.navigate("../(tabs)/home");
    };

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../../assets/images/PadelHub.png")}/>

            <View style={styles.inputContainer}>
                {!isLogin && <LoginInput data={{icon: "mail", placeHolder: "email", value: (v) => setEmail(v)}}/>}
                <LoginInput data={{icon: "user-circle-o", placeHolder: (isLogin ? "username or email" : "username"), value: (v) => setUsername(v)}}/>
                <LoginInput data={{icon: "lock", showPassword, setShowPassword: () => setShowPassword(!showPassword), placeHolder: "password", value: (v) => setPassword(v)}}/>
                {!isLogin && <LoginInput data={{icon: "lock", showPassword, placeHolder: "confirm password", value: (v) => setConfirmPassword(v)}}/>}
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity 
                onPress={handleSubmit} 
                disabled={loading}
                style={[styles.loginButton, styles.shadow, {backgroundColor: isLogin ? "#92C650" : "#375BEB", opacity: loading ? 0.7 : 1}]}
            >
                {loading ? (
                    <ActivityIndicator color="white" size="small" />
                ) : (
                    <Text style={styles.loginButtonText}>{isLogin ? "LOGIN" : "REGISTER"}</Text>
                )}
            </TouchableOpacity>

            <View style={styles.memberText}>
                <Text style={styles.greyText}>{isLogin ? "First visit ?" : "Already member ?"}</Text>
                <Pressable
                    onPress={() => {setLogin(!isLogin); setError("");}}
                    >
                    <Text style={[styles.greyText, styles.underline]}>{isLogin ? "Create an account" : "Login"}</Text>
                </Pressable>
            </View>

            <View style={styles.socialContainer}>
                <SocialLogin data = {{text: "Login with Strava", vector: Strava, backgroundColor: "#FC4C02", textColor: "white"}}/>
                <SocialLogin data = {{text: "Login with Google", vector: Google, backgroundColor: "white", textColor: "grey"}}/>
                <SocialLogin data = {{text: "Login with Apple", vector: Apple, backgroundColor: "black", textColor: "white"}}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#faf0e7",
    },
    logo: {
        position: "absolute",
        top: "8%",
        width: 250,
        height: 250,
    },
    inputContainer: {
        width: "70%",
        marginTop: "75%",
        gap: 15,
        alignItems: "center",
    },
    memberText: {
        flexDirection: "row",
        gap: 2,
        marginTop: 20,
    },
    greyText: {
        fontSize: 17,
        color: "grey",
    },
    underline: {
        textDecorationLine: "underline",
    },
    loginButton: {
        marginTop: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#d6d6d6",
        height: 35,
        width: "30%",
        borderRadius: 20,
        paddingHorizontal: 10,
    },
    loginButtonText: {
        color: "white",
        fontWeight: 600,
    },
    errorText: {
        color: "red",
        marginTop: 20,
        marginBottom: -15,
        textAlign: "center",
    },
    shadow: {
        shadowColor: "#626161",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    socialContainer: {
        marginTop: 25,
        width: "70%",
        gap: 15,
    },
});