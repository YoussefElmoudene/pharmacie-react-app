import axios from "axios"


const API_URL = 'https://pharmacymanagementback-production.up.railway.app/api/zone/'


const ZoneService = {
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

    getAll: async () => {
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
    }
}

export default ZoneService
