import React, {useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import NavBar from "../components/NavBar";
import HistoryListItem from "../components/HistoryListItem";
import {checkUserSignedIn, getHistory} from "../helpers/RestQueries";


export default function History() {
    const [userHistory, setUserHistory] = React.useState([])

    useEffect(() => {
        getHistory().then((response) => {
            setUserHistory(response)
        })
    }, []);

    return (
        <View style={styles.container}>
            <NavBar title={"Historia"}/>
            <ScrollView style={{marginTop: 30}}>
                {
                    userHistory.map((item) => {
                        return <HistoryListItem key={item.examId} data={item}/>
                    })
                }
            </ScrollView>
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
    }
});
