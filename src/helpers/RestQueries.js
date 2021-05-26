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
                    AsyncStorage.setItem('createdAt', new Date().toISOString())
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
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refreshToken: refreshToken
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData)
                if (responseData.errorCode) {
                    console.log(responseData)
                } else {
                    AsyncStorage.setItem('token', responseData.token)
                    AsyncStorage.setItem('createdAt', new Date().toISOString())
                }
            })
            .done()
    }

}

export const userLogOut = async () => {
    let token = await AsyncStorage.getItem('token')
    let refreshToken = await AsyncStorage.getItem('refreshToken')

    if (token) {
        fetch("https://testy-na-prawo-jazdy.herokuapp.com/auth/logout", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                refreshToken: refreshToken
            })
        })
            .then(() => {
                console.log("Logout")
                AsyncStorage.removeItem('logIn')
                AsyncStorage.removeItem('token')
                AsyncStorage.removeItem('refreshToken')
                AsyncStorage.removeItem('createdAt')
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

export const primaryTask = async (category, history) => {
    let time = new Date(await AsyncStorage.getItem('createdAt'))
    if (new Date() > new Date(time.setMinutes(time.getMinutes() + 30))) {
        await refreshToken()
    }
    let token = await AsyncStorage.getItem('token')
    if (token) {
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
                history.push('/test', {test: responseData, category: category})
            })
            .done()
    }

}

export const specialistTask = async (category, history) => {
    let time = new Date(await AsyncStorage.getItem('createdAt'))
    if (new Date() > new Date(time.setMinutes(time.getMinutes() + 30))) {
        await refreshToken()
    }
    let token = await AsyncStorage.getItem('token')
    if (token) {
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
                history.push('/test', {test: responseData, category: category})
            })
            .done()
    }

}

export const fullTest = async (category, history) => {
    let time = new Date(await AsyncStorage.getItem('createdAt'))
    if (new Date() > new Date(time.setMinutes(time.getMinutes() + 30))) {
        await refreshToken()
    }
    let token = await AsyncStorage.getItem('token')
    if (token) {
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
                history.push('/test', {test: responseData, category: category})
            })
            .done()
    }

}

export const completeTest = async (id, primaryTaskList, specialistTaskList, history) => {
    let time = new Date(await AsyncStorage.getItem('createdAt'))
    if (new Date() > new Date(time.setMinutes(time.getMinutes() + 30))) {
        await refreshToken()
    }
    let token = await AsyncStorage.getItem('token')
    if (token) {
        fetch("https://testy-na-prawo-jazdy.herokuapp.com/exam/finish/" + id, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                examId: id,
                primaryTaskList: primaryTaskList,
                specialistTaskList: specialistTaskList,
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                history.push('/result', {results: responseData})
            })
            .done()
    }
}

export const completePrimaryTaskTest = async (id, answer, history) => {
    let time = new Date(await AsyncStorage.getItem('createdAt'))
    if (new Date() > new Date(time.setMinutes(time.getMinutes() + 30))) {
        await refreshToken()
    }
    let token = await AsyncStorage.getItem('token')
    if (token) {
        fetch("https://testy-na-prawo-jazdy.herokuapp.com/learn/primaryTask/finish/" + id, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                id: id,
                chosenAnswer: answer,
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                // history.push('/result', {results: responseData})
            })
            .done()
    }
}

export const completeSpecialistTaskTest = async (id, answer, history) => {
    let time = new Date(await AsyncStorage.getItem('createdAt'))
    if (new Date() > new Date(time.setMinutes(time.getMinutes() + 30))) {
        await refreshToken()
    }
    let token = await AsyncStorage.getItem('token')
    if (token) {
        fetch("https://testy-na-prawo-jazdy.herokuapp.com/learn/specialistTask/finish/" + id, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                id: id,
                chosenAnswer: answer,
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                // history.push('/result', {results: responseData})
            })
            .done()
    }
}

export const getHistory = async () => {
    let time = new Date(await AsyncStorage.getItem('createdAt'))
    if (new Date() > new Date(time.setMinutes(time.getMinutes() + 30))) {
        await refreshToken()
    }
    let token = await AsyncStorage.getItem('token')
    if (token) {
        let response = await fetch("https://testy-na-prawo-jazdy.herokuapp.com/exam/history", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return await response.json();
    }
}

export const getHistoryById = async (id, history) => {
    let time = new Date(await AsyncStorage.getItem('createdAt'))
    if (new Date() > new Date(time.setMinutes(time.getMinutes() + 30))) {
        await refreshToken()
    }
    let token = await AsyncStorage.getItem('token')
    if (token) {
        fetch("https://testy-na-prawo-jazdy.herokuapp.com/exam/result/" + id, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                history.push('/result', {results: responseData})
            })
            .done()
    }
}

export const changePassword = async (oldPassword, newPassword) => {
    let time = new Date(await AsyncStorage.getItem('createdAt'))
    if (new Date() > new Date(time.setMinutes(time.getMinutes() + 30))) {
        await refreshToken()
    }
    let token = await AsyncStorage.getItem('token')
    if (token) {
        fetch("https://testy-na-prawo-jazdy.herokuapp.com/auth/changePassword", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                oldPassword: oldPassword,
                newPassword: newPassword,
            })
        }).done()
    }
}

export const changeEmail = async (newEmail, password) => {
    let time = new Date(await AsyncStorage.getItem('createdAt'))
    if (new Date() > new Date(time.setMinutes(time.getMinutes() + 30))) {
        await refreshToken()
    }
    let token = await AsyncStorage.getItem('token')
    if (token) {
        fetch("https://testy-na-prawo-jazdy.herokuapp.com/auth/changeEmail", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                password: password,
                newEmail: newEmail,
            })
        }).done()
    }
}
