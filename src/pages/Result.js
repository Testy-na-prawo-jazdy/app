import React, {useEffect} from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Text,
    TextInput,
    CheckBox,
    Modal,
    AsyncStorage,
    Dimensions
} from 'react-native';
import NavBar from "../components/NavBar";
import Icon from "react-native-vector-icons/Octicons";
import {Video} from "expo-av";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import ProgressCircle from 'react-native-progress-circle'
import {checkUserSignedIn} from "../helpers/RestQueries";
import {useHistory} from "react-router-dom";
import ImageVideo from "../components/ImageVideo";

const win = Dimensions.get('window');

export default function Result(data) {

    const results = data.location.state.results;
    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedAnswer, setSelectedAnswer] = React.useState({});
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [points, setPoints] = React.useState(0);
    const history = useHistory();

    useEffect(() => {
        var pointsCounter = 0;
        results.primaryTaskList.map((result) => {
            if (result.correct) {
                pointsCounter += result.primaryTask.points;
            }
        })
        results.specialistTaskList.map((result) => {
            if (result.correct) {
                pointsCounter += result.specialistTask.points;
            }
        })
        setPoints(pointsCounter)
    });

    return (
        <View style={styles.container}>
            <NavBar title={"Wyniki"}/>
            <View style={{margin: 20}}>
                <ProgressCircle
                    percent={points / 74 * 100}
                    radius={75}
                    borderWidth={8}
                    color={points >= 68 ? "#45ac1d" : "#ff8906"}
                    shadowColor="#999"
                    bgColor="#fff"
                >
                    <Text style={{fontSize: 22}}>{points} pkt</Text>
                    {points >= 68 &&
                        <Text style={{fontSize: 16}}>Gratulacje!</Text>
                    }
                </ProgressCircle>
            </View>
            <Text style={{fontSize: 24, marginBottom: 10}}>Wyniki</Text>
            <View style={styles.resultsWrapper}>
                {results.primaryTaskList.map((result) => {
                    if (result.correct) {
                        return <TouchableOpacity key={result.id} style={[styles.box, styles.correct]}
                                                 onPress={() => {
                                                     setSelectedAnswer(result);
                                                     setModalVisible(true)
                                                 }}></TouchableOpacity>
                    } else {
                        return <TouchableOpacity key={result.id} style={styles.box}
                                                 onPress={() => {
                                                     setSelectedAnswer(result);
                                                     setModalVisible(true)
                                                 }}></TouchableOpacity>
                    }
                })
                }
                {results.specialistTaskList.map((result) => {
                    if (result.correct) {
                        return <TouchableOpacity key={result.id} style={[styles.box, styles.correct]} onPress={() => {
                            setSelectedAnswer(result);
                            setModalVisible(true)
                        }}></TouchableOpacity>
                    } else {
                        return <TouchableOpacity key={result.id} style={styles.box} onPress={() => {
                            setSelectedAnswer(result);
                            setModalVisible(true)
                        }}></TouchableOpacity>
                    }

                })
                }
                <TouchableOpacity style={styles.returnButton} onPress={() => {
                    history.push('/')
                }}>
                    <Text>Wróć</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modal}>
                    <View style={styles.modalBar}>
                        <Icon name="chevron-left" style={styles.icon} size={30}
                              color={"#ffffff"}
                              onPress={() => setModalVisible(false)}/>
                    </View>
                    {selectedAnswer.primaryTask &&
                    <View>
                        <ImageVideo url={selectedAnswer.primaryTask.filename}/>
                        <View style={styles.testContainer}>
                            <Text style={styles.question}>{selectedAnswer.primaryTask.question}</Text>
                            <View style={styles.answersSpec}>
                                <View style={[
                                    styles.specAnswer,
                                    selectedAnswer.primaryTask.correctAnswer && styles.correct,
                                    !selectedAnswer.primaryTask.correctAnswer && selectedAnswer.selectedAnswer === 'true' && styles.selectedAnswer,
                                ]}><Text>Tak</Text></View>
                                <View style={[
                                    styles.specAnswer,
                                    !selectedAnswer.primaryTask.correctAnswer && styles.correct,
                                    selectedAnswer.primaryTask.correctAnswer && selectedAnswer.selectedAnswer === 'false' && styles.selectedAnswer,
                                ]}><Text>Nie</Text></View>
                            </View>
                        </View>
                    </View>
                    }
                    {selectedAnswer.specialistTask &&
                    <View>
                        <ImageVideo url={selectedAnswer.specialistTask.filename}/>
                        <View style={styles.testContainer}>
                            <Text style={styles.question}>{selectedAnswer.specialistTask.question}</Text>
                            <View style={styles.answersSpec}>
                                <View style={[
                                    styles.specAnswer,
                                    selectedAnswer.specialistTask.correctAnswer === 'A' && styles.correct,
                                    selectedAnswer.specialistTask.correctAnswer !== 'A' && selectedAnswer.selectedAnswer === 'A' && styles.selectedAnswer
                                ]}><Text>{selectedAnswer.specialistTask.answerA}</Text></View>
                                <View style={[
                                    styles.specAnswer,
                                    selectedAnswer.specialistTask.correctAnswer === 'B' && styles.correct,
                                    selectedAnswer.specialistTask.correctAnswer !== 'B' && selectedAnswer.selectedAnswer === 'B' && styles.selectedAnswer
                                ]}><Text>{selectedAnswer.specialistTask.answerB}</Text></View>
                                <View style={[
                                    styles.specAnswer,
                                    selectedAnswer.specialistTask.correctAnswer === 'C' && styles.correct,
                                    selectedAnswer.specialistTask.correctAnswer !== 'B' && selectedAnswer.selectedAnswer === 'C' && styles.selectedAnswer
                                ]}><Text>{selectedAnswer.specialistTask.answerC}</Text></View>
                            </View>
                        </View>
                    </View>
                    }
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    text: {
        fontSize: 22,
    },
    resultsWrapper: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 25,
        marginRight: 25,
    },
    box: {
        width: 40,
        height: 40,
        margin: 3,
        backgroundColor: "#c41b1b",
    },
    correct: {
        backgroundColor: "#45ac1d",
    },
    selectedAnswer:{
        backgroundColor: "#858585",
    },
    modal: {
        backgroundColor: "#fff",
        height: '100%',
    },
    modalBar: {
        width: '100%',
        height: 51,
        backgroundColor: "#ff8906",
        borderBottomColor: '#e57f0f',
        borderBottomWidth: 3,
        position: 'relative'
    },
    icon: {
        position: 'absolute',
        left: 15,
        bottom: 10
    },
    question: {
        fontSize: 19,
        height: 120,
    },
    testContainer: {
        padding: 25,
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
    returnButton: {
        marginTop: 50,
        marginLeft: '10%',
        backgroundColor: "#dddddd",
        width: '80%',
        alignItems: "center",
        padding: 15,
        borderRadius: 20,
    },
});
