import axios from "axios"


const API_URL = 'https://pharmacymanagementback-production.up.railway.app/api/pharmacies/'


const PharmacyService = {
    save: async (data) => {
        try {
            const response = await axios.post(`${API_URL}`, data)
            console.info(response)
            return response.data
        } catch (error) {
            // Handle error
            console.error('Error saving data:', error)
            throw error
        }
    },


    remove: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}id/ ${id}`)
            return response.data
        } catch (error) {
            // Handle error
            console.error('Error removing data:', error)
            throw error
        }
    },

    getAll: async (id) => {
        try {
            const response = await axios.get(`${API_URL}`)
            return response.data
        } catch (error) {
            // Handle error
            console.error('Error getting all data:', error)
            throw error
        }
    },

    getById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}id/${id}`)
            return response.data
        } catch (error) {
            // Handle error
            console.error('Error getting all data:', error)
            throw error
        }
    },

    get_route_to_pharmacy: async (id, data) => {
        try {
            const response = await axios.get(`${API_URL}id/${id}/itineraire?depart=${encodeURIComponent(JSON.stringify(data))}`)
            return response.data
        } catch (error) {
            // Handle error
            console.error('Error getting all data:', error)
            throw error
        }
    }


}

export default PharmacyService
