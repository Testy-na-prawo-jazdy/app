import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text, TextInput, CheckBox, Modal} from 'react-native';
import NavBar from "../components/NavBar";


export default function Home() {
    return (
        <View style={styles.container}>
            <NavBar title={"Dashboard"}/>
            <View>
                <Text style={styles.text}>Home!</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    text:{
        fontSize: 50
    }
});
