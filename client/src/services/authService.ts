import axios from "axios";


export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`https://www.rozetle.com:5005/api/user/login`, {
            email: email,
            password: password
        });
        const token = response.data.data.token;
        console.log(token)
        // Save the token to localStorage or sessionStorage
        localStorage.setItem('auth-token', token);
        return response.status
    } catch (error) {
        console.error('Login failed', error);
        return false
    }
}

export const getMyInfo = async () => {

    const token = localStorage.getItem("auth-token")
    if (!token) {
        console.log("token yok")
        return false
    }
    try {
        const response = await axios.get(`https://www.rozetle.com:5005/api/user/getMyInfo`, {
            headers: {
                'auth-token': token
            },
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getAllUsers = async () => {

    const token = localStorage.getItem("auth-token")
    if (!token) {
        console.log("token yok yetki yok")
        return false
    }
    try {
        const response = await axios.get(`https://www.rozetle.com:5005/api/admin/getAllUsers`, {
            headers: {
                'auth-token': token
            },
        })
        return response.data.data
    } catch (error) {
        console.log(error)
    }
}