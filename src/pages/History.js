import React, {useEffect} from 'react';
import {StyleSheet, View, ScrollView, SafeAreaView, Dimensions, Text} from 'react-native';
import NavBar from "../components/NavBar";
import HistoryListItem from "../components/HistoryListItem";
import {checkUserSignedIn, getHistory} from "../helpers/RestQueries";


const win = Dimensions.get('window');

export default function History() {
    const [userHistory, setUserHistory] = React.useState([])

    useEffect(() => {
        getHistory().then((response) => {
            setUserHistory(response.sort((a, b) => {
                return new Date(b.date) - new Date(a.date); // descending
            }))
        })
    }, []);

    return (
        <View style={styles.container}>
            <NavBar title={"Historia"}/>
            {
                userHistory.length !== 0 &&
                <ScrollView style={{
                    marginTop: 30,
                    height: win.height * 0.85,
                    width: win.width,
                    marginLeft: win.width * 0.2,
                }}>
                    {
                        userHistory.map((item) => {
                            return <HistoryListItem key={item.examId} data={item}/>
                        })
                    }
                </ScrollView>
            }
            {
                userHistory.length === 0 &&
                <Text style={styles.text}>Brak zapisów w historii</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    text: {
        marginTop: 30,
        fontSize: 22
    }
});
