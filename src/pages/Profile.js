import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text, TextInput, CheckBox, Modal, AsyncStorage} from 'react-native';
import NavBar from "../components/NavBar";


export default function Profile() {
    return (
        <View style={styles.container}>
            <NavBar title={"Mój profil"}/>
            <View>
                <Text style={styles.text}>Mój profil</Text>
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