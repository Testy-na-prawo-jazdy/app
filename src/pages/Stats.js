import React, {useEffect} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text, TextInput, CheckBox, Modal, AsyncStorage} from 'react-native';
import {
    LineChart,
    ContributionGraph
} from "react-native-chart-kit";
import NavBar from "../components/NavBar";
import {Dimensions} from "react-native";
import {getHistory, getStatistics, userLogin, userLogOut} from "../helpers/RestQueries";
import {getLogin} from "../helpers/AsyncStorage";
import {useHistory} from "react-router-dom";

export default function Stats() {

    const [labels, setLabels] = React.useState([])
    const [chartData, setData] = React.useState([])
    const [login, setLogin] = React.useState('')
    const history = useHistory();

    useEffect(() => {
        getLogin().then(r => setLogin(r))
        getStatistics().then((response) => {
            response.map((item) => {
                setLabels([...labels, item.date.substring(0, 10)])
                setData([...chartData, parseInt(item.averageScore)])
            })

        })
    }, []);

    return (
        <View style={styles.container}>
            <NavBar title={"Statystyki"}/>
            {login === 'DEMO' ?
                <View style={{width: '90%'}}>
                    <Text style={styles.textInformation}>Aby wyświetlić statystyki musisz zalogować się na swoje
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
                    {chartData.length === 0 ?
                        <View style={{width: '90%'}}>
                            <Text style={styles.text}>Brak statystyk</Text>
                        </View>
                        :
                        <View>
                            <Text style={styles.text}>Ostatnie 30 dni</Text>
                            <Text style={styles.textInformation}>Średnie wyniki z ostatnich 30 dni</Text>
                            {chartData.length > 0 &&
                            <LineChart
                                data={{
                                    labels: labels,
                                    datasets: [
                                        {
                                            data: chartData,
                                        }
                                    ]
                                }}
                                width={Dimensions.get("window").width - 50} // from react-native
                                height={300}
                                yAxisSuffix="pkt"
                                // yAxisInterval={1} // optional, defaults to 1
                                // segments={69}
                                chartConfig={{
                                    backgroundGradientFromOpacity: 0,
                                    backgroundGradientToOpacity: 0,
                                    decimalPlaces: 0, // optional, defaults to 2dp
                                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                    style: {
                                        borderRadius: 16
                                    },
                                    propsForDots: {
                                        r: "6",
                                        strokeWidth: "3",
                                        stroke: "#ffa726"
                                    }
                                }}
                                bezier
                                style={{
                                    // margin: 8,
                                }}
                            />
                            }
                        </View>
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
        marginBottom: 10,
        fontSize: 22,
        textAlign: 'center',
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
