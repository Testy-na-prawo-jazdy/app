import {AsyncStorage} from "react-native";

export const  userLogin = (login, password, history) => {
    if (login && password) {
        fetch("https://testy-na-prawo-jazdy.herokuapp.com/auth/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: login,
                password: password,
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                if(responseData.errorCode){
                    console.log(responseData)
                }else{
                    AsyncStorage.setItem('logIn', login)
                    AsyncStorage.setItem('token', responseData.token)
                    AsyncStorage.setItem('refreshToken', responseData.refreshToken)
                    history.push('/')
                }
            })
            .done()
    }
}

export const refreshToken = async() =>{
    let token = await AsyncStorage.getItem('refreshToken')
    if(token){
        fetch("https://testy-na-prawo-jazdy.herokuapp.com/auth/token/refresh", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                refreshToken: token
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                if(responseData.errorCode){

                }else{
                    AsyncStorage.setItem('token', responseData.token)
                }
            })
            .done()
    }

}

export const userLogOut = () => {
    AsyncStorage.removeItem('logIn')
    AsyncStorage.removeItem('token')
    AsyncStorage.removeItem('refreshToken')
}


export const checkUserSignedIn = async () => {
    try {
        await refreshToken();
        let value = await AsyncStorage.getItem('logIn');
        if (value !== null) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Login error')
        return false;
    }
}
