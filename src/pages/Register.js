import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text, TextInput} from 'react-native';
import {Link} from "react-router-native";

export default function Register() {
    const [login, onChangeLogin] = React.useState("");
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [repeatPassword, onChangeRepeatPassword] = React.useState("");
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                resizeMode={"contain"}
                source={require('../assets/images/logo.png')}
            />
            <Text style={styles.textHeader}>Zarejestruj się</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeLogin}
                value={login}
                placeholder={"Login"}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
                placeholder={"Email"}
                autoCompleteType={"email"}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                secureTextEntry={true}
                value={password}
                placeholder={"Hasło"}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeRepeatPassword}
                secureTextEntry={true}
                value={repeatPassword}
                placeholder={"Powtórz hasło"}
            />
            <View style={styles.buttonBox}>
                <Link to="/login" style={styles.button}>
                    <Text>Zarejestruj</Text>
                </Link>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    logo: {
        marginTop: '15%',
        width: '70%'
    },
    textHeader: {
        fontSize: 26,
        marginBottom: 10,
        marginTop: 10,
        color: '#404040',
    },
    input: {
        width: '80%',
        height: 52,
        margin: 12,
        borderWidth: 1,
        borderColor: '#707070',
        padding: 10,
        fontSize: 22,
    },
    buttonBox: {
        marginTop: 50,
        width: '100%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: "#ff8906",
        width: '80%',
        alignItems: "center",
        padding: 15,
        borderRadius: 20,
        marginTop: 10,
    },
});
