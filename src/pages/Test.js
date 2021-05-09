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
import ImageVideo from "../components/ImageVideo";

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

    const markAnswer = (id, answer, type) => {
        if (type === 'primaryTask') {
            setPrimaryTaskList([...primaryTaskList, {
                id: id,
                chosenAnswer: answer
            }])
        } else {
            setSpecialistTaskList([...specialistTaskList, {
                id: id,
                chosenAnswer: answer
            }])
        }
        clearTimeout(timeout);
        setProgress(35)
        setIndex(index + 1)
    }

    if (type) {
        let standard = exam.primaryTaskList
        let specialist = exam.specialistTaskList

        if (index === (specialist.length + standard.length)) {
            completeTest(exam.examId, primaryTaskList, specialistTaskList, history);
        }

        // useEffect(() => {
        //     if(progress > 0){
        //         timeout = setTimeout(() => setProgress(progress - 1), 1000)
        //     }else{
        //         setIndex(index + 1)
        //         clearTimeout(timeout);
        //         setProgress(35)
        //     }
        // }, [progress]);

        return (
            <View style={styles.container}>
                <NavBar title={'Test'}/>
                <View>
                    {/*<ProgressBar progress={progress / 35} color={Colors.red800}/>*/}
                    {index < standard.length &&
                    <View>
                        <ImageVideo url={standard[index].primaryTask.filename}/>
                        <View style={styles.testContainer}>
                            <Text
                                style={styles.testNumber}>Pytanie {index + 1} z {standard.length + specialist.length}</Text>
                            <Text style={styles.question}>{standard[index].primaryTask.question}</Text>
                            <View style={styles.answers}>
                                <TouchableOpacity style={styles.trueAnswer} onPress={() => {
                                    markAnswer(standard[index].id, true, 'primaryTask')
                                }}><Text>Tak</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.falseAnswer} onPress={() => {
                                    markAnswer(standard[index].id, false, 'primaryTask')
                                }}><Text>Nie</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    }
                    {index >= standard.length && index < (specialist.length + standard.length) &&
                    <View>
                        <ImageVideo url={specialist[index - standard.length].specialistTask.filename}/>
                        <View style={styles.testContainer}>
                            <Text
                                style={styles.testNumber}>Pytanie {index + 1} z {standard.length + specialist.length}</Text>
                            <Text
                                style={styles.question}>{specialist[index - standard.length].specialistTask.question}</Text>
                            <View style={styles.answersSpec}>
                                <TouchableOpacity style={styles.specAnswer} onPress={() => {
                                    markAnswer(specialist[index - standard.length].id, 'A', 'specialistTask')
                                }}><Text>{specialist[index - standard.length].specialistTask.answerA}</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.specAnswer} onPress={() => {
                                    markAnswer(specialist[index - standard.length].id, 'B', 'specialistTask')
                                }}><Text>{specialist[index - standard.length].specialistTask.answerB}</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.specAnswer} onPress={() => {
                                    markAnswer(specialist[index - standard.length].id, 'C', 'specialistTask')
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
