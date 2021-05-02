import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text, TextInput, CheckBox, Modal, AsyncStorage} from 'react-native';
import NavBar from "../components/NavBar";


export default function History() {
    return (
        <View style={styles.container}>
            <NavBar title={"Historia"}/>
            <View>
                <Text style={styles.text}>Historia</Text>
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
        fontSize: 22
    }
});
