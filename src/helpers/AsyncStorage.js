import {AsyncStorage} from "react-native";

export const getLogin = async () => {
    return await AsyncStorage.getItem('logIn')
}
