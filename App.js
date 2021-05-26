import React, {useEffect } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NativeRouter, Route, Link, Redirect} from "react-router-native";
import {checkUserSignedIn, userLogOut} from "./src/helpers/RestQueries";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import Home from "./src/pages/Home";
import PrivacyPolicy from "./src/pages/PrivacyPolicy";
import History from "./src/pages/History";
import Stats from "./src/pages/Stats";
import Profile from "./src/pages/Profile";
import Test from "./src/pages/Test";
import Result from "./src/pages/Result";

export default function App() {
    const [isAuthenticated, setAuthentication]  = React.useState(true)

    useEffect(() => {
        checkUserSignedIn().then((value) => setAuthentication(value))
        if(!isAuthenticated){
            userLogOut()
        }
    });

    return (
        <NativeRouter>
            <View>
                <Route exact path="/" component={Home}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/privacyPolicy" component={PrivacyPolicy}/>
                <Route exact path="/history" component={History}/>
                <Route exact path="/stats" component={Stats}/>
                <Route exact path="/profile" component={Profile}/>
                <Route exact path="/test" component={Test}/>
                <Route exact path="/result" component={Result}/>
            </View>
            {!isAuthenticated  && (<Redirect to={{pathname: '/login'}}/>)}
        </NativeRouter>
    );
}

const styles = StyleSheet.create({
    container: {},
});
