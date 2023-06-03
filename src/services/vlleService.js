import axios from "axios"


const API_URL = 'https://pharmacymanagementback-production.up.railway.app/api/villes/'
const API_URL_GARDE = 'https://pharmacymanagementback-production.up.railway.app/api/garde/'


const get_villes = async () => {
    return await axios.get(`${API_URL}`)
}
const get_gardes = async () => {
    return await axios.get(`${API_URL_GARDE}`)
}
const save_ville = async (data) => {
    return await axios.post(`${API_URL}`, data)
}
const delete_ville = async (id) => {
    return await axios.delete(`${API_URL}id/ ${id}`)
}

export {
    get_villes,
    save_ville,
    delete_ville,
    get_gardes
}
