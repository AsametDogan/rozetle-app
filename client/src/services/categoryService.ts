import axios from "axios";


export const getAllCategory = async () => {
    const token = localStorage.getItem("auth-token")

    try {
        const response = await axios.get(`https://www.rozetle.com:5005/api/admin/category/getAll`, {
            headers: {
                'auth-token': token
            },
        });
        return response.data
    } catch (error) {
        console.error('Category failed', error);
        return false
    }
}

export const updateCategory = async ({ title, categoryId }) => {
    const token = localStorage.getItem("auth-token")

    const data = { title, categoryId }

    try {
        const response = await axios.put(`https://www.rozetle.com:5005/api/admin/category/update`, data, {
            headers: {
                'auth-token': token
            },
        });
        return true
    } catch (error) {
        console.error('Badge failed', error);
        return false
    }
}


export const createCategory = async (title) => {
    const token = localStorage.getItem("auth-token")

    try {
        const response = await axios.post(`https://www.rozetle.com:5005/api/admin/category/create`, { title }, {
            headers: {
                'auth-token': token
            },
        });

        return true
    } catch (error) {
        console.error('Badge failed', error);
        return false
    }
}

