import { api } from '../helpers/axios'

export const resourse = 'financial-reports'
export const transaction = 'accounting-transactions'

const getFinanialReports = (data) => {
    return api.get(`${resourse}/`, data)
}

const createNewTransaction = (data) => {
    return api.post(`${transaction}/`, data)
}
export default {
    getFinanialReports,
    createNewTransaction
}
