import axios from "axios"


const API_URL = 'http://localhost:8037/api'


const get_villes = async () => {
    return await axios.get(`${API_URL}/villes/`)
}

const get_pharmacies = async () => {
    await axios.get(`${API_URL}/pharmacies/`)
}


export {
    get_pharmacies,
    get_villes
}