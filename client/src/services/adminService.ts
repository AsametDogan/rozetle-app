import axios from "axios";

import { saveAs } from 'file-saver';
export const changeRole = async ({ userId }) => {
    const token = localStorage.getItem("auth-token")

    const data = { userId }

    try {
        const response = await axios.put(`https://www.rozetle.com:5005/api/admin/user/changeRole`, data, {
            headers: {
                'auth-token': token
            },
        });
        return response.data
    } catch (error) {
        console.error('Badge failed', error);
        return false
    }
}
export const changeIsActive = async ({ badgeId }) => {
    const token = localStorage.getItem("auth-token")

    const data = { badgeId }

    try {
        const response = await axios.put(`https://www.rozetle.com:5005/api/admin/badge/changeIsActive`, data, {
            headers: {
                'auth-token': token
            },
        });
        return response.data
    } catch (error) {
        console.error('Badge failed', error);
        return false
    }
}
export const sendBadges = async ({ badgeId, receiversData, description }) => {
    const token = localStorage.getItem("auth-token")

    const data = { badgeId, receiversData, description }

    try {
        const response = await axios.post(`https://www.rozetle.com:5005/api/admin/sendBadges`, data, {
            responseType: 'blob',
            headers: {
                'auth-token': token,
            },
        });
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        saveAs(blob, 'assignDatas.xlsx');
        console.log(response)
        return response.status
    } catch (error) {
        console.error('Badge failed', error);
        return false
    }
}

export const exportUsers = async () => {
    const token = localStorage.getItem("auth-token")


    try {
        const response = await axios.get(`https://www.rozetle.com:5005/api/admin/users/export`, {
            responseType: 'blob',
            headers: {
                'auth-token': token,
            },
        });
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        saveAs(blob, 'users.xlsx');
        return response
    } catch (error) {
        console.error('Badge failed', error);
        return false
    }
}
export const exportBadges = async () => {
    const token = localStorage.getItem("auth-token")


    try {
        const response = await axios.get(`https://www.rozetle.com:5005/api/admin/badges/export`, {
            responseType: 'blob',
            headers: {
                'auth-token': token,
            },
        });
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        saveAs(blob, 'badges.xlsx');
        return response
    } catch (error) {
        console.error('Badge failed', error);
        return false
    }
}
export const exportAssignments = async () => {
    const token = localStorage.getItem("auth-token")


    try {
        const response = await axios.get(`https://www.rozetle.com:5005/api/admin/assignments/export`, {
            responseType: 'blob',
            headers: {
                'auth-token': token,
            },
        });
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        saveAs(blob, 'assignments.xlsx');
        return response
    } catch (error) {
        console.error('Badge failed', error);
        return false
    }
}
export const exportCategories = async () => {
    const token = localStorage.getItem("auth-token")


    try {
        const response = await axios.get(`https://www.rozetle.com:5005/api/admin/categories/export`, {
            responseType: 'blob',
            headers: {
                'auth-token': token,
            },
        });
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        saveAs(blob, 'categories.xlsx');
        return response
    } catch (error) {
        console.error('Badge failed', error);
        return false
    }
}