import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NativeRouter, Route, Link} from "react-router-native";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";

export default function App() {
    return (
        <NativeRouter>
            <View>
                <Route exact path="/" component={Login}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
            </View>
        </NativeRouter>
    );
}

const styles = StyleSheet.create({
    container: {},
});
