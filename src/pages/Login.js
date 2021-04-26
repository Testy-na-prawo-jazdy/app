import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text, TextInput, CheckBox} from 'react-native';
import {Link} from "react-router-native";

export default function Login() {
    const [login, onChangeLogin] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [isSelected, setSelection] = React.useState(false);

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                resizeMode={"contain"}
                source={require('../assets/images/logo.png')}
            />
            <Text style={styles.textHeader}>Zaloguj się</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeLogin}
                value={login}
                placeholder={"Login"}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                secureTextEntry={true}
                value={password}
                placeholder={"Hasło"}
            />
            <View style={styles.checkboxBox}>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={isSelected}
                        onValueChange={setSelection}
                        style={styles.checkbox}
                    />
                    <Text style={styles.label}>Zapamiętaj mnie</Text>
                </View>
                <Text style={styles.label}>Nie pamiętasz hasła?</Text>
            </View>
            <View style={styles.buttonBox}>
                <TouchableOpacity
                    style={styles.button}
                    // onPress={onPressLearnMore}
                >
                    <Text>Zaloguj</Text>
                </TouchableOpacity>
                <Link to="/register" style={styles.button}>
                    <Text>Zarejestruj</Text>
                </Link>

                <TouchableOpacity
                    style={styles.buttonGuest}
                >
                    <Text>Zaloguj jako gość</Text>
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
    input: {
        width: '80%',
        height: 52,
        margin: 12,
        borderWidth: 1,
        borderColor: '#707070',
        padding: 10,
        fontSize: 22,

    },
    textHeader: {
        fontSize: 26,
        marginBottom: 10,
        marginTop: 10,
        color: '#404040',
    },
    checkboxBox:{
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between',
        width: '80%'
    },
    checkboxContainer: {
        flexDirection: "row",
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },
    buttonBox: {
        marginTop: 40,
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
    buttonGuest: {
        backgroundColor: "#dddddd",
        width: '80%',
        alignItems: "center",
        padding: 15,
        borderRadius: 20,
        marginTop: 50,
    }
});
