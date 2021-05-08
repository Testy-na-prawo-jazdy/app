import React from 'react';
import {StyleSheet, View, Text, Dimensions, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/Octicons";
import {getHistoryById} from "../helpers/RestQueries";
import {useHistory} from "react-router-dom";

const win = Dimensions.get('window');

export default function HistoryListItem(props) {
    const history = useHistory();

    return (
        <TouchableOpacity style={styles.container} onPress={() => {getHistoryById(props.data.examId, history)}}>
            <Text style={styles.category}>{props.data.category}</Text>
            <View style={styles.results}>
                <Text style={styles.result}>Wynik: {props.data.score}</Text>
                <Text style={styles.date}>{new Date(props.data.date).toISOString().slice(0, 10)}</Text>
            </View>
            <Icon name="chevron-right" style={styles.icon} size={30} color={"#262626"}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        width: win.width * 0.8,
        borderWidth: 1,
        borderColor: '#707070',
        padding: 20,
        margin: 5,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    category:{
        fontSize: 36,
        fontWeight: "800",
        width: 70,
    },
    results:{
        width: win.width * 0.45,
    },
    icon:{
        marginLeft: 10,
    },
    result:{
        fontSize: 22,
    },
    date:{
        fontSize: 12,
        color: '#474747'
    },
});
