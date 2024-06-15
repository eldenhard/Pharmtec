import { api } from '../helpers/axios'

export const resourse = 'financial-reports'
export const transaction = 'accounting-transactions'
export const balance_items = 'balance-items'

const getFinanialReports = (data) => {
    return api.get(`${resourse}/`, {params: data})
}
const createNewFinReport = (data) => {
    return api.post(`${resourse}/`, data)
}
const createNewTransaction = (data) => {
    return api.post(`${transaction}/`, data)
}

const getBalanceItems = (data) => {
    return api.get(`${balance_items}/`, data)
}
export default {
    getFinanialReports,
    createNewTransaction,
    createNewFinReport,
    getBalanceItems
}
