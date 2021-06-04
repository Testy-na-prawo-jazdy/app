import React, {useEffect} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text, TextInput, CheckBox, Modal, AsyncStorage} from 'react-native';
import NavBar from "../components/NavBar";
import {changeEmail, changePassword, getHistory, userLogOut} from "../helpers/RestQueries";
import {rgbaColor} from "react-native-reanimated/src/reanimated2/Colors";
import {useHistory} from "react-router-dom";
import {getLogin} from "../helpers/AsyncStorage";


export default function Profile() {
    const [password, onChangePassword] = React.useState('')
    const [newPassword, onChangeNewPassword] = React.useState('')
    const [email, onChangeEmail] = React.useState('')
    const [type, setType] = React.useState('')
    const [modalVisible, setModalVisible] = React.useState(false)
    const [login, setLogin] = React.useState('')
    const history = useHistory();

    useEffect(() => {
        getLogin().then(r => setLogin(r))
    }, []);

    return (
        <View style={styles.container}>
            <NavBar title={"Mój profil"}/>
            {login === 'DEMO' ?
                <View style={{width: '90%'}}>
                    <Text style={styles.textInformation}>Aby zmienić dane musisz zalogować się na swoje
                        konto</Text>
                    <TouchableOpacity
                        style={styles.buttonLogout}
                        onPress={() => {
                            userLogOut().then(() => history.push('/login'))
                        }}
                    >
                        <Text>Zaloguj</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={{width: '100%', alignItems: 'center'}}>
                    <Text style={styles.textHeader}>Witaj {login}!</Text>
                    <Text style={styles.text}>Edytuj Dane</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeNewPassword}
                        value={newPassword}
                        placeholder={"Nowe Hasło"}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setModalVisible(true)
                            setType('password')
                        }}
                    >
                        <Text>Zmień hasło</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeEmail}
                        value={email}
                        placeholder={"Nowy Email"}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setModalVisible(true)
                            setType('email')
                        }}
                    >
                        <Text>Zmień email</Text>
                    </TouchableOpacity>
                </View>
            }
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
                        <Text>Podaj stare hasło</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangePassword}
                            value={password}
                            placeholder={"Stare hasło"}
                        />
                        <TouchableOpacity style={styles.button} onPress={() => {
                            if (type === 'email') {
                                onChangeEmail('')
                                onChangePassword('')
                                changeEmail(email, password)
                            }
                            if (type === 'password') {
                                onChangePassword('')
                                onChangeNewPassword('')
                                changePassword(password, newPassword)
                            }
                            setModalVisible(false)
                        }}>
                            <Text>Zapisz</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    textHeader: {
        fontSize: 30,
        marginTop: 10,
        marginBottom: 10,
    },
    text: {
        fontSize: 22
    },
    textInformation: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 16,
        textAlign: 'center',
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
    buttonLogout: {
        backgroundColor: "#ff8906",
        width: '100%',
        alignItems: "center",
        padding: 15,
        borderRadius: 20,
        marginTop: 10,
    },
    button: {
        backgroundColor: "#ff8906",
        width: '80%',
        alignItems: "center",
        padding: 15,
        borderRadius: 20,
        marginTop: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: rgbaColor(0, 0, 0, 0.5),
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
