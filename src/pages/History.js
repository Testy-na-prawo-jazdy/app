import React, {useEffect} from 'react';
import {StyleSheet, View, ScrollView, SafeAreaView, Dimensions, Text, TouchableOpacity} from 'react-native';
import NavBar from "../components/NavBar";
import HistoryListItem from "../components/HistoryListItem";
import {checkUserSignedIn, getHistory, userLogOut} from "../helpers/RestQueries";
import {getLogin} from "../helpers/AsyncStorage";
import {useHistory} from "react-router-dom";


const win = Dimensions.get('window');

export default function History() {
    const [userHistory, setUserHistory] = React.useState([])
    const [login, setLogin] = React.useState('')
    const history = useHistory();

    useEffect(() => {
        getLogin().then(r => setLogin(r))
        getHistory().then((response) => {
            setUserHistory(response.sort((a, b) => {
                return new Date(b.date) - new Date(a.date); // descending
            }))
        })
    }, []);

    return (
        <View style={styles.container}>
            <NavBar title={"Historia"}/>
            {login === 'DEMO' ?
                <View style={{width: '90%'}}>
                    <Text style={styles.textInformation}>Aby wyświetlić historię musisz zalogować się na swoje
                        konto</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            userLogOut().then(() => history.push('/login'))
                        }}
                    >
                        <Text>Zaloguj</Text>
                    </TouchableOpacity>
                </View>
                :
                <View>
                    {userHistory.length !== 0 &&
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
    },
    textInformation: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 16,
        textAlign: 'center',
    },
    button: {
        backgroundColor: "#ff8906",
        alignItems: "center",
        padding: 15,
        borderRadius: 20,
        marginTop: 30,
    },
});
