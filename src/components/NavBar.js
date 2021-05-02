import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text, TextInput, CheckBox} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import Modal from 'react-native-modal';
import {checkUserSignedIn, userLogOut} from "../helpers/RestQueries";
import {Redirect} from "react-router-native";
import {useHistory} from "react-router-dom";

export default function NavBar({title}) {
    const [slider, setSlider] = React.useState(false)
    const history = useHistory();

    const toggleModal = () => {
        setSlider(!slider);
    };

    return (
        <View style={styles.container}>
            <View style={styles.navBar}>
                <Icon name="three-bars" style={styles.icon} size={30} color={"#ffffff"}
                      onPress={() => toggleModal()}/>
                <Text style={styles.title}>{title}</Text>
            </View>
            <Modal
                style={{margin: 0}}
                isVisible={slider}
                swipeDirection="left"
                onSwipeComplete={() => toggleModal()}
                animationIn={'slideInLeft'}
                animationOut={'slideOutLeft'}
            >
                <View style={slider ? styles.slider : styles.invisible}>
                    <View style={styles.sliderContent}>
                        <Icon name="chevron-left" style={styles.iconSlider} size={30} color={"#ffffff"}
                              onPress={() => toggleModal()}/>
                        <Text style={styles.menuLabel} onPress={() => {userLogOut(); history.push('/')}}>Dashboard</Text>
                        <Text style={styles.menuLabel} onPress={() => {userLogOut(); history.push('/stats')}}>Statystyki</Text>
                        <Text style={styles.menuLabel} onPress={() => {userLogOut(); history.push('/history')}}>Historia</Text>
                        <Text style={styles.menuLabel} onPress={() => {userLogOut(); history.push('/profile')}}>Mój profil</Text>
                        <Text style={styles.menuLabel} onPress={() => {userLogOut(); history.push('/privacyPolicy')}}>Regulamin</Text>
                        <Text style={styles.menuLabel} onPress={() => {userLogOut(); history.push('/login')}}>Logout</Text>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    navBar: {
        width: '100%',
        height: 75,
        backgroundColor: "#ff8906",
        borderBottomColor: '#e57f0f',
        borderBottomWidth: 3,
        position: 'relative'
    },
    title: {
        fontSize: 22,
        color: "#ffffff",
        alignSelf: 'center',
        position: 'absolute',
        bottom: 10
    },
    icon: {
        position: 'absolute',
        left: 15,
        bottom: 10
    },
    iconSlider: {
        position: 'absolute',
        left: 15,
        top: 10
    },
    slider: {
        position: 'absolute',
        left: 0,
        width: "70%",
        height: "100%",
        backgroundColor: "#ff8906",
    },
    invisible: {
        display: 'none'
    },
    sliderContent: {
        height: '100%',
        paddingTop: 100,
    },
    menuLabel: {
        fontSize: 22,
        color: "#ffffff",
        marginLeft: 30,
        marginTop: 10,
    }
});
