import {AsyncStorage} from "react-native";

export const userLogin = (login, password, history) => {
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
                if (responseData.errorCode) {
                    console.log(responseData)
                } else {
                    AsyncStorage.setItem('logIn', login)
                    AsyncStorage.setItem('token', responseData.token)
                    AsyncStorage.setItem('refreshToken', responseData.refreshToken)
                    history.push('/')
                }
            })
            .done()
    }
}

export const userRegister = (login, password, email, history) => {
    if (login && password && email) {
        fetch("https://testy-na-prawo-jazdy.herokuapp.com/auth/register", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: login,
                password: password,
                email: email,
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.errorCode) {
                    console.log(responseData)
                } else {
                    history.push('/login')
                }
            })
            .done()
    }
}

export const refreshToken = async () => {
    let refreshToken = await AsyncStorage.getItem('refreshToken')
    if (refreshToken) {
        fetch("https://testy-na-prawo-jazdy.herokuapp.com/auth/token/refresh", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                refreshToken: refreshToken
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.errorCode) {

                } else {
                    AsyncStorage.setItem('token', responseData.token)
                }
            })
            .done()
    }

}

export const userLogOut = async () => {
    let refreshToken = await AsyncStorage.getItem('refreshToken')
    if (refreshToken) {
        fetch("https://testy-na-prawo-jazdy.herokuapp.com/auth/logout", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                refreshToken: refreshToken
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData)
                AsyncStorage.removeItem('logIn')
                AsyncStorage.removeItem('token')
                AsyncStorage.removeItem('refreshToken')
            })
            .done()
    }
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

export const primaryTask = async (category, history) =>{
    let token = await AsyncStorage.getItem('token')
    if(token){
        fetch("https://testy-na-prawo-jazdy.herokuapp.com/learn/primaryTask/start/" + category, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                history.push('/test', {test: responseData})
            })
            .done()
    }

}

export const specialistTask = async (category, history) =>{
    let token = await AsyncStorage.getItem('token')
    if(token){
        fetch("https://testy-na-prawo-jazdy.herokuapp.com/learn/specialistTask/start/" + category, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                history.push('/test', {test: responseData})
            })
            .done()
    }

}

export const fullTest = async (category, history) =>{
    let token = await AsyncStorage.getItem('token')
    if(token){
        fetch("https://testy-na-prawo-jazdy.herokuapp.com/exam/start/" + category, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                history.push('/test', {test: responseData})
            })
            .done()
    }

}
