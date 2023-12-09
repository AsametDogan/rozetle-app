import axios from "axios";

export const getAssign = async (id: any) => {
    const serv = `https://www.rozetle.com:5005/api/assign/my/${id}`
    console.log(serv)
    try {
        const response = await axios.get(serv);

        console.log('Assignment Data:', response.data);
        return response
    } catch (error) {
        console.error('Error fetching assignmentasdads data:', error);
    }
}

export const getInfo = async () => {
    const token = localStorage.getItem("auth-token")
    
    try {
        const response = await axios.get(`https://www.rozetle.com:5005/api/admin/getInfo`, {
            headers: {
                'auth-token': token
            },
        })
        console.log("!!!! getInfo: " + response)
        return response?.data?.data
    } catch (error) {
        console.error('Error fetching getInfo data:', error);

    }
}