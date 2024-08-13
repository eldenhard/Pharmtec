import { api } from '../helpers/axios'

export const resourse = 'financial-reports'
export const transaction = 'accounting-transactions'
export const balance_items = 'balance-items'
export const items_limits = 'items-limits'
const getFinancialReports = (data) => {
    return api.get(`${resourse}/`, {params: data})
}
const confirmFinancialEntry = (id,data) => {
    return api.post(`${transaction}/${id}/confirm/`, data)
}
const editFinancialEntry = (id,data) => {
    return api.patch(`${transaction}/${id}/`, data)
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
    return api.get(`${items_limits}/`, {params: data})
}
const createNewTransactionLimits = (data) => {
    return api.post(`${items_limits}/`, data)
}
export default {
    getFinancialReports,
    confirmFinancialEntry,
    editFinancialEntry,
    createNewTransactionLimits,
    createNewTransaction,
    createNewFinReport,
    getBalanceItems,
    getTransactionsLimits
}
