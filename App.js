import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NativeRouter, Route, Link, Redirect} from "react-router-native";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import Home from "./src/pages/Home";

export default function App() {
    const [login, onChangeLogin] = React.useState(false);
    return (
        <NativeRouter>
            <View>
                <Route exact path="/" component={Home}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
            </View>
            {!login && (<Redirect to={{pathname: '/login'}}/>)}
        </NativeRouter>
    );
}

const styles = StyleSheet.create({
    container: {},
});
