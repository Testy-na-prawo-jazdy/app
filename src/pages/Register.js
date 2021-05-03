import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text, TextInput, ToastAndroid} from 'react-native';
import {Link} from "react-router-native";
import {userRegister} from "../helpers/RestQueries";
import {useHistory} from "react-router-dom";

export default function Register() {
    const [login, onChangeLogin] = React.useState("");
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [repeatPassword, onChangeRepeatPassword] = React.useState("");
    const history = useHistory();

    const isEmailValid = (email) => {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return expression.test(String(email).toLowerCase())
    }

    const formValidation = () =>{
        if(login !== '' && email !== '' && isEmailValid(email) && password !== '' && password === repeatPassword){
            ToastAndroid.show("Zarejestrowano!", ToastAndroid.SHORT)
            return true;
        }else{
            ToastAndroid.show("Niepoprawne dane!", ToastAndroid.SHORT)
            return false;
        }
    }

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
                <TouchableOpacity style={styles.button} onPress={() => {formValidation() && userRegister(login, password, email, history)}}>
                    <Text>Zarejestruj</Text>
                </TouchableOpacity>
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
