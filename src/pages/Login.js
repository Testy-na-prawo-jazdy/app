import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text, TextInput, CheckBox, Modal, AsyncStorage} from 'react-native';
import {Link} from "react-router-native";
import { useHistory } from "react-router-dom";
import {rgbaColor} from "react-native-reanimated/src/reanimated2/Colors";
import {userLogin} from "../helpers/RestQueries";

export default function Login() {
    const [login, onChangeLogin] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [email, onChangeEmail] = React.useState("");
    const [isSelected, setSelection] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const history = useHistory();

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
                        onValueChange={() => {setSelection(!isSelected); AsyncStorage.setItem('remember', isSelected ? 'true' : 'false')}}
                        style={styles.checkbox}
                    />
                    <Text style={styles.label}>Zapamiętaj mnie</Text>
                </View>
                <Text style={styles.label} onPress={() => setModalVisible(true)}>Nie pamiętasz hasła?</Text>
            </View>
            <View style={styles.buttonBox}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {userLogin(login, password, history)}}
                >
                    <Text>Zaloguj</Text>
                </TouchableOpacity>
                <Link to="/register" style={styles.button}>
                    <Text>Zarejestruj</Text>
                </Link>

                <TouchableOpacity
                    style={styles.buttonGuest}
                    onPress={() =>{AsyncStorage.setItem('logIn', 'TemporaryUser'); history.push('/')}}
                >
                    <Text>Zaloguj jako gość</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>Przypomnij hasło</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeEmail}
                            value={email}
                            placeholder={"Email"}
                        />
                        <Link to="/" style={styles.button} onPress={() => setModalVisible(false)}>
                            <Text>Przypomnij</Text>
                        </Link>
                    </View>
                </View>
            </Modal>
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
    checkboxBox: {
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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: rgbaColor(0,0,0, 0.5),
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
        width: '80%'
    },
});
