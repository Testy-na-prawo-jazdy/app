import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text, TextInput, CheckBox, Modal, AsyncStorage} from 'react-native';
import NavBar from "../components/NavBar";
import {changeEmail, changePassword} from "../helpers/RestQueries";
import {rgbaColor} from "react-native-reanimated/src/reanimated2/Colors";


export default function Profile() {
    const [password, onChangePassword] = React.useState('')
    const [newPassword, onChangeNewPassword] = React.useState('')
    const [email, onChangeEmail] = React.useState('')
    const [type, setType] = React.useState('')
    const [modalVisible, setModalVisible] = React.useState(false)

    return (
        <View style={styles.container}>
            <NavBar title={"Mój profil"}/>
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
    text: {
        fontSize: 22
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
