import axios from "axios";

export const getAllBadges = async () => {
    try {
        const token = localStorage.getItem("auth-token")

        const response = await axios.get(`https://www.rozetle.com:5005/api/admin/getAllBadges`, {
            headers: {
                'auth-token': token
            },
        });

        console.log(response)
        return response.data

    } catch (error) {
        console.error('Badge failed', error);
        return false
    }
}
export const getAvailableBadges = async () => {
    try {
        const token = localStorage.getItem("auth-token")

        const response = await axios.get(`https://www.rozetle.com:5005/api/admin/getAllBadges`, {
            headers: {
                'auth-token': token
            },
        });

        console.log(response)
        return response.data
    } catch (error) {
        console.error('Badge failed', error);
        return false
    }
}

export const createBadge = async (formData) => {

    try {
        const token = localStorage.getItem("auth-token")


        const response = await axios.post('https://rozetle.com:5005/api/admin/badge/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'auth-token': token,
            },
        });
        console.log("!!!!CreateBadgeééééé" + response)
        if (response.status === 201) {
            console.log('Rozet oluşturma başarılı');
            console.log(response.data);
            return true
        } else {
            console.log('Rozet oluşturma başarısız');
            console.log(response.data);
            return false
        }
    } catch (error) {
        console.error('Bir hata oluştu:', error);
        return false
    }
};


export const updateBadge = async (badgeId, data) => {
    const token = localStorage.getItem("auth-token")
    const body = { data, badgeId }

    try {
        const response = await axios.put(`https://www.rozetle.com:5005/api/admin/badge/update`, body, {
            headers: {
                'auth-token': token
            },
        });
        console.log("!!!!!updateCategory!!!!!!" + response)
        return true
    } catch (error) {
        console.error('Badge failed', error);
        return false
    }

}


