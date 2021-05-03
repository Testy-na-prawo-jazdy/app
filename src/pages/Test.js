import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text, TextInput, CheckBox, Modal, AsyncStorage} from 'react-native';
import NavBar from "../components/NavBar";


export default function Test(data) {
    const exam = data.location.state.test

    if(exam.examId){
        console.log('exam')
    }else{
        console.log('single')
    }


    return (
        <View style={styles.container}>
            <NavBar title={"Test"}/>
            <View>
                <Text style={styles.text}>Test</Text>
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
