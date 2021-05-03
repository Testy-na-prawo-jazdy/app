import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text, TextInput, CheckBox, Modal, AsyncStorage, ScrollView} from 'react-native';
import NavBar from "../components/NavBar";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlay, faCogs } from '@fortawesome/free-solid-svg-icons'
import {fullTest, primaryTask, specialistTask} from "../helpers/RestQueries";
import {useHistory} from "react-router-dom";

export default function Home() {
    const categories = ['A1', 'A', 'A2', 'B', 'C', 'PT', 'D', 'T', 'AM', 'D1', 'C1', 'B1'];
    const [selectedCategory, setCategory] = React.useState(categories[3])
    const history = useHistory();

    return (
        <View style={styles.container}>
            <NavBar title={"Dashboard"}/>
            <Text style={[styles.text, {marginTop: 30}]}>Kategoria</Text>
            <ScrollView style={styles.categoriesContainer} horizontal={true}>
                {categories.map((category) => {
                    if(category === selectedCategory ){
                        return <TouchableOpacity style={styles.categoriesSelected}><Text>{category}</Text></TouchableOpacity>
                    }else{
                        return <TouchableOpacity style={styles.categories} onPress={() => setCategory(category)}><Text>{category}</Text></TouchableOpacity>
                    }
                })}
            </ScrollView>
            <View style={{marginTop: 50}}>
                <TouchableOpacity style={styles.mainButton} onPress={() => fullTest(selectedCategory, history)}><FontAwesomeIcon icon={ faPlay } style={styles.iconMain} size={ 42 }/></TouchableOpacity>
                <TouchableOpacity style={styles.modalButton}><FontAwesomeIcon icon={ faCogs } size={ 26 }/></TouchableOpacity>
            </View>
            <Text style={[styles.text, {marginTop: 70}]}>Szybki test</Text>
            <View style={styles.fastTest}>
                <TouchableOpacity style={styles.primaryTask} onPress={() => primaryTask(selectedCategory, history)}><Text>Pytanie podstawowe</Text></TouchableOpacity>
                <TouchableOpacity style={styles.specialistTask} onPress={() => specialistTask(selectedCategory, history)}><Text>Pytanie specjalistyczne</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    text:{
        fontSize: 22
    },
    categoriesContainer:{
        marginTop: 10,
        height: 60,
        width: '95%',
    },
    categories:{
        height: 50,
        width: 50,
        borderColor: "#ff8906",
        borderWidth: 3,
        margin: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoriesSelected:{
        height: 50,
        width: 50,
        backgroundColor: "#ff8906",
        borderColor: "#ff8906",
        borderWidth: 3,
        margin: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainButton:{
        marginTop: 20,
        width: 200,
        height: 200,
        borderRadius: 200,
        backgroundColor: "#ff8906",
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconMain:{
        color: '#ffffff',
    },
    modalButton:{
        width: 60,
        height: 60,
        borderRadius: 60,
        backgroundColor: "#b1b1b1",
        borderColor: '#8a8a8a',
        borderWidth: 3,
        position: 'absolute',
        top: 20,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fastTest:{
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        marginTop: 10,
    },
    primaryTask:{
        width: '40%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: "#ff8906",
    },
    specialistTask:{
        width: '40%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: "#ff7206",
    }
});
