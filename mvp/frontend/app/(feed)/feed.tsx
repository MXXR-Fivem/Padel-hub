import { View, StyleSheet, TouchableOpacity, ScrollView, Image, ImageSourcePropType, Dimensions, Pressable, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { router } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from '@expo/vector-icons/Feather';

const { width, height } = Dimensions.get("window");

type typeContent = "image" | "video";

type scrollContent = {
    id: string,
    type: typeContent,
    imageSource?: ImageSourcePropType,
    videoSource?: any,
}

const VideoPlayer = forwardRef(({ source, style }: { source: any; style: any }, ref) => {
    const [isPlaying, setIsPlaying] = useState(false);
    
    const player = useVideoPlayer(source, player => {
        player.loop = true;
    });

    useImperativeHandle(ref, () => ({
        resetAndPlay: () => {
            player.currentTime = 0;
            player.play();
            setIsPlaying(true);
        },
        pause: () => {
            player.pause();
            setIsPlaying(false);
        }
    }));

    const togglePlayPause = () => {
        if (player.playing) {
            player.pause();
            setIsPlaying(false);
        } else {
            player.play();
            setIsPlaying(true);
        }
    };

    return (
        <Pressable onPress={togglePlayPause} style={style}>
            <VideoView
                player={player}
                style={style}
                contentFit={"cover"}
                nativeControls={false}
            />
            {!isPlaying &&
                <View style={styles.playButton}>
                    <Feather name="play" size={42} color="white" />
                </View>
            }
        </Pressable>
    );
});

const scrollList: scrollContent[] = [
    {id: "1", type: "image", imageSource: require("../../assets/images/feed1.png")},
    {id: "2", type: "video", videoSource: require("../../assets/images/feed5.mp4")},
    {id: "3", type: "video", videoSource: require("../../assets/images/feed7.mp4")},
    {id: "4", type: "image", imageSource: require("../../assets/images/feed3.png")},
    {id: "5", type: "image", imageSource: require("../../assets/images/feed2.png")},
    {id: "6", type: "video", videoSource: require("../../assets/images/feed6.mp4")},
]

export default function Tab() {
    const videoRefs = useRef<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const index = Math.round(offsetY / height);
        
        if (index !== currentIndex) {
            setCurrentIndex(index);
            
            if (scrollList[index].type === "video" && videoRefs.current[index]) {
                videoRefs.current[index].resetAndPlay();
            }
            
            scrollList.forEach((content, i) => {
                if (i !== index && content.type === "video" && videoRefs.current[i]) {
                    videoRefs.current[i].pause();
                }
            });
        }
    };

    useEffect(() => {
        if (scrollList[0].type === "video" && videoRefs.current[0]) {
            setTimeout(() => {
                videoRefs.current[0]?.resetAndPlay();
            }, 100);
        }
    }, []);

    return (
        <View style={styles.container}>

            <ScrollView 
                pagingEnabled 
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {scrollList.map((content, index) => (
                    <View key={content.id} style={styles.viewContent}>
                        {content.type === "image" && content.imageSource && (
                            <Image source={content.imageSource} style={styles.image} />
                        )}
                        {content.type === "video" && content.videoSource && (
                            <VideoPlayer 
                                ref={(ref: any) => (videoRefs.current[index] = ref)}
                                source={content.videoSource} 
                                style={styles.image} 
                            />
                        )}
                    </View>
                ))}
            </ScrollView>

            <View style={styles.navbar}>
                <TouchableOpacity
                    onPress={() => router.navigate("/(tabs)/home")}
                >
                    <Entypo style={styles.icons} name="home" size={35} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {}}
                    style={styles.plusButton}
                >
                    <AntDesign style={[styles.icons, {color: "black", shadowOpacity: 0.2}]} name="plus" size={30} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.navigate("/(tabs)/profile")}
                >
                    <FontAwesome style={styles.icons} name="user-circle-o" size={35} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    viewContent: {
        width: width,
        height: height,
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
    },
    navbar: {
        position: "absolute",
        bottom: "4%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "65%",
        height: "6.25%",
        backgroundColor: "rgba(188, 188, 188, 0.5)",
        borderRadius: 25,
        paddingVertical: 10,
    },
    icons: {
        color: "#92c650",
        shadowColor: "#393939",
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    plusButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 15,
        width: "25%",
        height: "95%",
        borderColor: "#92c650",
        borderLeftWidth: 4,
        borderRightWidth: 4,
    },
    playButton: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        width: 100,
        borderRadius: 50,
        paddingLeft: 6,
        backgroundColor: "rgba(189, 189, 189, 0.8)",
    },
});