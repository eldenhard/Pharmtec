import { api } from '../helpers/axios'

export const resourse = 'financial-reports'
export const transaction = 'accounting-transactions'
export const balance_items = 'balance-items'
export const items_limits = 'items-limits'
const getFinancialReports = (data) => {
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

const getTransactionsLimits = (data) => {
    return api.get(`${items_limits}/`, data)
}
export default {
    getFinancialReports,
    createNewTransaction,
    createNewFinReport,
    getBalanceItems,
    getTransactionsLimits
}
