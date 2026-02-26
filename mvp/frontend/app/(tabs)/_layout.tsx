import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: "#92c650" }}>

            <Tabs.Screen
                name="home"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Ionicons size={28} name="home-outline" color={color} />,
                }}
            />
            <Tabs.Screen
                name="book"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Ionicons size={28} name="tennisball-outline" color={color} />,
                }}
            />
            <Tabs.Screen
                name="shop"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Feather size={28} name="shopping-cart" color={color} />,
                }}
            />
            <Tabs.Screen
                name="training"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="strategy" color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="user-circle-o" color={color} />,
                }}
            />
        </Tabs>
    );
}