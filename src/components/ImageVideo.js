import React from 'react';
import {StyleSheet, View, Dimensions, Image, TouchableOpacity, Text} from 'react-native';
import {useHistory} from "react-router-dom";
import {Video} from "expo-av";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";

const win = Dimensions.get('window');

export default function ImageVideo({url}) {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    return (
        <View>
            <View>
                {!url &&
                <Image
                    source={require('../assets/images/no-image.png')}
                    style={styles.noImage}
                />
                }
                {url.includes('.jpg') &&
                <Image
                    source={{
                        uri: 'http://poznaj-testy.hekko24.pl/pytania/' + url,
                    }}
                    style={styles.image}
                />
                }
                {url.includes('.mp4') &&
                <View style={styles.videoBox}>
                    <Video
                        source={{uri: 'http://poznaj-testy.hekko24.pl/pytania/' + url}}
                        ref={video}
                        style={styles.video}
                        resizeMode="contain"
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                    />
                    {!status.isPlaying && status.positionMillis !== status.playableDurationMillis &&
                    <TouchableOpacity
                        style={[styles.playButton, {display: status.isPlaying ? 'none' : 'flex'}]}
                        onPress={() =>
                            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                        }
                    ><FontAwesomeIcon icon={faPlay} style={styles.iconMain} size={30}/></TouchableOpacity>
                    }
                </View>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: win.width,
        height: 242,
    },
    noImage: {
        width: win.width,
        height: 222,
        resizeMode: 'contain',
        marginTop: 10,
        marginBottom: 10,
    },
    video: {
        width: win.width,
        height: 242,
    },
    playButton: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 80,
        zIndex: 1,
        backgroundColor: "#ff7206",
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconMain: {
        color: '#ffffff',
    },
    videoBox: {
        justifyContent: 'center',
        alignItems: 'center'
    },
});
