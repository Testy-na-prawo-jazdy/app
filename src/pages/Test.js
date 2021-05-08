import React, {useEffect} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text,} from 'react-native';
import {ProgressBar, Colors} from 'react-native-paper';
import {Video} from 'expo-av';
import NavBar from "../components/NavBar";
import {Dimensions} from 'react-native';
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {completeTest} from "../helpers/RestQueries";
import {useHistory} from "react-router-dom";
const win = Dimensions.get('window');

export default function Test(data) {
    const exam = data.location.state.test
    const category = data.location.state.category
    const type = exam.examId
    const history = useHistory();
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [progress, setProgress] = React.useState(35);
    const [index, setIndex] = React.useState(0);
    const [primaryTaskList, setPrimaryTaskList] = React.useState([]);
    const [specialistTaskList, setSpecialistTaskList] = React.useState([]);
    let timeout = undefined;

    if (type) {
        let standard = exam.primaryTaskList
        let specialist = exam.specialistTaskList

        if(index === (specialist.length + standard.length)){
            completeTest(exam.examId, primaryTaskList, specialistTaskList, history);
        }

        useEffect(() => {
            if(progress > 0){
                timeout = setTimeout(() => setProgress(progress - 1), 1000)
            }else{
                setIndex(index + 1)
                clearTimeout(timeout);
                setProgress(35)
            }
        }, [progress]);

        return (
            <View style={styles.container}>
                <NavBar title={'Test'}/>
                <View>
                    <ProgressBar progress={progress/35} color={Colors.red800}/>
                    {index < standard.length &&
                    <View>
                        {standard[index].primaryTask.filename.includes('.jpg') ?
                            <Image
                                style={styles.image}
                                source={{uri: 'https://poznaj-testy.hekko24.pl/pytania/' + standard[index].primaryTask.filename}}
                            />
                            :
                            <View style={styles.videoBox}>
                                <Video
                                    ref={video}
                                    style={styles.video}
                                    source={{
                                        uri: 'https://poznaj-testy.hekko24.pl/pytania/' + standard[index].primaryTask.filename,
                                    }}
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
                        <View style={styles.testContainer}>
                            <Text
                                style={styles.testNumber}>Pytanie {index + 1} z {standard.length + specialist.length}</Text>
                            <Text style={styles.question}>{standard[index].primaryTask.question}</Text>
                            <View style={styles.answers}>
                                <TouchableOpacity style={styles.trueAnswer} onPress={() => {
                                    setPrimaryTaskList([...primaryTaskList, {
                                        id: standard[index].id,
                                        chosenAnswer: true
                                    }])
                                    clearTimeout(timeout);
                                    setProgress(35)
                                    status.isPlaying && video.current.pauseAsync();
                                    setIndex(index + 1)
                                }}><Text>Tak</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.falseAnswer} onPress={() => {
                                    setPrimaryTaskList([...primaryTaskList, {
                                        id: standard[index].id,
                                        chosenAnswer: false
                                    }])
                                    clearTimeout(timeout);
                                    setProgress(35)
                                    status.isPlaying && video.current.pauseAsync();
                                    setIndex(index + 1)
                                }}><Text>Nie</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    }
                    {index >= standard.length && index < (specialist.length + standard.length) &&
                    <View>
                        {specialist[index - standard.length].specialistTask.filename.includes('.jpg') ?
                            <Image
                                style={styles.image}
                                source={{uri: 'https://poznaj-testy.hekko24.pl/pytania/' + specialist[index - standard.length].specialistTask.filename}}
                            />
                            :
                            <View style={styles.videoBox}>
                                <Video
                                    ref={video}
                                    style={styles.video}
                                    source={{
                                        uri: 'https://poznaj-testy.hekko24.pl/pytania/' + specialist[index - standard.length].specialistTask.filename,
                                    }}
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
                        <View style={styles.testContainer}>
                            <Text
                                style={styles.testNumber}>Pytanie {index + 1} z {standard.length + specialist.length}</Text>
                            <Text
                                style={styles.question}>{specialist[index - standard.length].specialistTask.question}</Text>
                            <View style={styles.answersSpec}>
                                <TouchableOpacity style={styles.specAnswer} onPress={() => {
                                    setSpecialistTaskList([...specialistTaskList, {
                                        id: specialist[index - standard.length].id,
                                        chosenAnswer: 'A'
                                    }])
                                    clearTimeout(timeout);
                                    setProgress(35)
                                    status.isPlaying && video.current.pauseAsync();
                                    setIndex(index + 1)
                                }}><Text>{specialist[index - standard.length].specialistTask.answerA}</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.specAnswer} onPress={() => {
                                    setSpecialistTaskList([...specialistTaskList, {
                                        id: specialist[index - standard.length].id,
                                        chosenAnswer: 'B'
                                    }])
                                    clearTimeout(timeout);
                                    setProgress(35)
                                    status.isPlaying && video.current.pauseAsync();
                                    setIndex(index + 1)
                                }}><Text>{specialist[index - standard.length].specialistTask.answerB}</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.specAnswer} onPress={() => {
                                    setSpecialistTaskList([...specialistTaskList, {
                                        id: specialist[index - standard.length].id,
                                        chosenAnswer: 'C'
                                    }])
                                    clearTimeout(timeout);
                                    setProgress(35)
                                    status.isPlaying && video.current.pauseAsync();
                                    setIndex(index + 1)
                                }}><Text>{specialist[index - standard.length].specialistTask.answerC}</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    }
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <NavBar title={"Test"}/>
            <View>
                <Text style={styles.text}>Test kategorii: {category}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    text: {
        fontSize: 22
    },
    image: {
        width: win.width,
        height: 242,
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
    question: {
        fontSize: 19,
        height: 120,
    },
    testContainer: {
        padding: 25,
    },
    answers: {
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        marginTop: 50,
    },
    answersSpec: {
        display: 'flex',
        marginTop: 25,
    },
    specAnswer: {
        width: '100%',
        height: 75,
        justifyContent: 'center',
        backgroundColor: "#ff8906",
        marginTop: 10,
        paddingLeft: 25,
        paddingRight: 25,
    },
    trueAnswer: {
        width: '50%',
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: "#ff8906",
    },
    falseAnswer: {
        width: '50%',
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: "#ff7206",
    },
    testNumber: {
        fontSize: 16,
        color: '#3e3e3e'
    }
});
